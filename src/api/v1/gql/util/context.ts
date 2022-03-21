import { GQLAuth } from '@api/v1/gql/util/auth';
import { PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { MercuriusContext } from 'mercurius';

export interface Context extends MercuriusContext {
  req: FastifyRequest;
  prisma: PrismaClient;
  auth: GQLAuth;
}
