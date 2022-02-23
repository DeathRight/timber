import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyAuth from 'fastify-auth';
import fastifyMongodb from 'fastify-mongodb';
import fastifyPostgres from 'fastify-postgres';
import fastifyRedis from 'fastify-redis';
import fastifySensible from 'fastify-sensible';
import websocketPlugin, { SocketStream } from 'fastify-websocket';
import admin from 'firebase-admin';

import { User } from './schema/types/User';
import { verifyToken } from './util';

/* -------------------------------- Firebase -------------------------------- */
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: serviceAccount,
});
/* --------------------------------- Fastify -------------------------------- */
const fastify = Fastify({
  logger: true,
});
/* ----------------------------- Fastify Plugins ---------------------------- */
fastify.register(fastifyPostgres, {
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
});

fastify.register(fastifyMongodb, {
  forceClose: true,
  url: process.env.MONGODB_CONNECTION_STRING,
});

fastify.register(fastifyRedis, {
  URL: process.env.REDIS_CONNECTION_STRING,
});

fastify.register(websocketPlugin);

fastify.register(fastifyAuth);

fastify.register(fastifySensible);
/* ------------------------------- Decoraters ------------------------------- */
fastify.decorate("verifyToken", verifyToken);

fastify.decorateRequest("authToken", "");

fastify.addHook(
  "preHandler",
  async (req: FastifyRequest, reply: FastifyReply) => {
    req.authToken = await fastify.verifyToken(req, reply);
    if (!req.authToken) {
      reply.unauthorized();
      reply.hijack();
    }
  }
);
/* ---------------------------- Websocket Routes ---------------------------- */
fastify.get(
  "/ws",
  {
    websocket: true,
    schema: {
      headers: {
        type: "object",
        properties: {
          authorization: { type: "string" },
        },
        required: ["authorization"],
      },
    },
  },
  (connection: SocketStream, req: FastifyRequest) => {
    const idToken = req.authToken;
    if (idToken) {
      connection.socket.on("userChanged", (user: Partial<User>) => {});

      connection.socket.on("getUserById", (userId: string) => {});
    }
  }
);
/* ------------------------------- API Routes ------------------------------- */
/* --------------------------------- Listen --------------------------------- */
fastify.listen(3000, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
