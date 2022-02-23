import * as fastify from 'fastify';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

declare module "fastify" {
  export interface FastifyInstance {
    verifyToken: (
      request: fastify.FastifyRequest,
      reply: fastify.FastifyReply,
      done?: (err: Error) => void
    ) => Promise<DecodedIdToken | null>;
  }

  export interface FastifyRequest {
    authToken: DecodedIdToken | undefined | null;
  }
}
