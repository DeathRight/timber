import { Account, prisma, User } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifySecureSession from 'fastify-secure-session';
import { readFileSync } from 'fs';
import { GraphQLSchema } from 'graphql';
import mercurius from 'mercurius';
import redis from 'mqemitter-redis';
import { join } from 'path';

import { verifyToken } from './firebase-auth';
import schemav1 from './gql/schema';
import { GQLAuth } from './gql/util/auth';
import { Context } from './gql/util/context';
import { getAccountFromId } from './gql/util/db/account';
import { getUserFromAccount } from './gql/util/db/user';

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
    context: (
      req: FastifyRequest,
      reply: FastifyReply
    ): Context | Record<string, any> => {
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
      const user = req.session.get("user") as User | undefined;
      const account = req.session.get("account") as Account | undefined;

      if (decodedToken && user && account) {
        ctx.auth = new GQLAuth(decodedToken, account, user);
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
      let user: User | undefined;
      let account: Account | undefined;

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
              "Could not find associated account. Please report!"
            );
          }
          reply.code(200).send();
        } else {
          reply.notFound("userId missing or user not found");
        }
      } else {
        reply.unauthorized("Token not valid!");
      }
    }
  );

  done();
}
