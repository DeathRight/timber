import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyMongodb from 'fastify-mongodb';
import fastifyPostgres from 'fastify-postgres';
import fastifyRedis from 'fastify-redis';
import websocketPlugin from 'fastify-websocket';
import { GraphQLSchema } from 'graphql';
import mercurius from 'mercurius';

import { Context } from '../util/context';
import schema from './gql/schema';

export default function () {
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
    url: process.env.REDIS_URL,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  });

  fastify.register(websocketPlugin);

  fastify.register(mercurius, {
    schema: schema as unknown as GraphQLSchema,
    graphiql: true,
    context: (req: FastifyRequest, reply: FastifyReply): Context => {
      return {
        req,
        reply,
        pg: fastify.pg,
        mongo: fastify.mongo,
        redis: fastify.redis,
      };
    },
  });

  fastify.get("/", async function (req: FastifyRequest, reply: FastifyReply) {
    const query = "{ add(x: 2, y: 2) }";
    return reply.graphql(query);
  });

  fastify.listen(3000);
}
