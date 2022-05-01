import { prisma } from '@prisma/client';
import { timberflake } from '@util';
import fictionalNames from '@util/fictionalNames';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifySecureSession from 'fastify-secure-session';
import { readFileSync } from 'fs';
import { GraphQLSchema } from 'graphql';
import mercurius from 'mercurius';
import redis from 'mqemitter-redis';
import { join } from 'path';
import { adjectives, uniqueNamesGenerator } from 'unique-names-generator';

import { verifyToken } from './firebase-auth';
import schemav1 from './gql/schema';
import { GQLAuth } from './gql/util/auth';
import { Context } from './gql/util/context';
import { getAccountFromId } from './gql/util/db/account';
import { getUserFromAccount } from './gql/util/db/user';
import { AccountWithIncludes, accountWithIncludes, UserWithIncludes } from './gql/util/interfaces';

export default async function (fastify: FastifyInstance, opts: any, done: any) {
  /* ----------------------------- Secure-Session ----------------------------- */
  fastify.register(fastifySecureSession, {
    cookieName: "timber-I-session",
    key: readFileSync(join(__dirname, "secret-key")),
    cookie: {
      path: "/",
      secure: process.env.PROD,
    },
  });
  /* -------------------------------- Mercurius ------------------------------- */
  const redisCon = {
    url: process.env.REDIS_URL,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  };

  const mercuriusEmitter = redis({
    host: redisCon.url.split(":")[0],
    port: Number(redisCon.url.split(":")[1]),
    username: redisCon.username,
    password: redisCon.password,
  });

  await fastify.register(mercurius, {
    schema: schemav1 as unknown as GraphQLSchema,
    graphiql: true,
    prefix: "/api/v1/",
    context: (req: FastifyRequest, reply: FastifyReply) => {
      return {
        req,
        reply,
        prisma: fastify.prisma,
      };
    },
    subscription: {
      emitter: mercuriusEmitter,
    },
  });
  /* ----------------------------- Authentication ----------------------------- */
  fastify.graphql.addHook(
    "preExecution",
    async (schema, document, ctx: Context) => {
      const req = ctx.req;
      const decodedToken = await verifyToken(req);
      const user = req.session.get("user") as UserWithIncludes | undefined;
      const account = req.session.get("account") as
        | AccountWithIncludes
        | undefined;

      if (decodedToken && user && account) {
        ctx.auth = new GQLAuth(decodedToken, account, user, ctx.prisma);
      } else {
        ctx.reply.hijack();
        if (!decodedToken) ctx.reply.unauthorized("Token not valid!");
        else if (!user) ctx.reply.badRequest("Missing session cookie!");
        else ctx.reply.internalServerError();
      }
    }
  );

  fastify.get("/", async function (req: FastifyRequest, reply: FastifyReply) {
    const query = "{ add(x: 2, y: 2) }";
    return reply.graphql(query);
  });

  /* ------------------------------ Login handler ----------------------------- */
  fastify.post<{ Querystring: { userId: string | undefined } }>(
    "/login",
    {
      schema: {
        querystring: {
          userId: { type: "string" },
        },
      },
    },
    async (req, reply) => {
      const decodedToken = await verifyToken(req);
      let user: UserWithIncludes | undefined;
      let account: AccountWithIncludes | undefined;

      // ? If userId is given, attempts to login and set session with fetched account and user
      // ? Else: Attempts to fetch account and user using existing session/token
      // ? If account doesn't exist, tries to create and set session with new account and user

      if (decodedToken) {
        const userId = req.query.userId;

        if (userId) {
          user =
            (await getUserFromAccount(
              fastify.prisma,
              decodedToken.uid,
              BigInt(userId)
            )) ?? undefined;
        }

        if (user) {
          req.session.set("user", user);
          account =
            (await getAccountFromId(fastify.prisma, user.accountId)) ??
            undefined;
          if (account) {
            req.session.set("account", account);
          } else {
            // Should never reach unless database outage for some reason
            reply.internalServerError(
              "Could not fetch associated account. Please report!"
            );
          }
          reply.code(200).send();
        } else if (!user && !userId) {
          // userId query string not found. Could be attempting to register?
          account =
            (await getAccountFromId(fastify.prisma, decodedToken.uid)) ??
            undefined;
          if (!account) {
            // Account doesn't exist but token is verified, so they registered with Firebase Auth successfully
            // Create new account and user
            const newUserId = timberflake();
            account = await fastify.prisma.account.create({
              data: {
                id: decodedToken.uid,
                users: {
                  create: {
                    id: newUserId,
                    displayName: uniqueNamesGenerator({
                      dictionaries: [adjectives, fictionalNames],
                      style: "capital",
                      length: 2,
                      separator: "",
                    }),
                    lastSeen: Date.now(),
                  },
                },
              },
              ...accountWithIncludes,
            });

            if (account) {
              req.session.set("account", account);
              user =
                (await getUserFromAccount(
                  fastify.prisma,
                  account.id,
                  newUserId
                )) ?? undefined;
              if (user) {
                req.session.set("user", user);
                reply.code(200).send();
              }
            }
          } else {
            // Account already exists, so they need to login with a specific user
            // First, try to pull user ID from session
            const newUser = req.session.get("user") as
              | UserWithIncludes
              | undefined;
            if (!newUser) {
              reply.notFound("userId missing");
            } else {
              user =
                (await getUserFromAccount(
                  fastify.prisma,
                  account.id,
                  BigInt(newUser.id)
                )) ?? undefined;
              if (!user) {
                // Unable to fetch user for some reason, even though ID should be valid
                // Was the user deleted?
                reply.internalServerError("Unable to fetch user!");
              }
            }
          }
        } else {
          // userId given but could not fetch user. Could be invalid ID, or database error
          reply.internalServerError("Unable to fetch user!");
        }
      } else {
        reply.unauthorized("Token not valid!");
      }
    }
  );

  done();
}
