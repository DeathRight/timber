import { GQLAuth } from '@api/v1/gql/util/auth';
import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { MQEmitterRedis } from 'mqemitter-redis';

export interface Context {
  req: FastifyRequest;
  reply: FastifyReply;
  prisma: PrismaClient;
  auth: GQLAuth;
  pubsub?: MQEmitterRedis;
}
