import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyMongoNestedObject, FastifyMongoObject } from 'fastify-mongodb';
import { PostgresDb } from 'fastify-postgres';
import { FastifyRedis } from 'fastify-redis';

export interface Context {
  req: FastifyRequest;
  reply: FastifyReply;
  pg: PostgresDb & Record<string, PostgresDb>;
  mongo: FastifyMongoObject & FastifyMongoNestedObject;
  redis: FastifyRedis;
}
