import Fastify from 'fastify';
import fastifyRateLimit from 'fastify-rate-limit';
import fastifySensible from 'fastify-sensible';
import { cert, initializeApp } from 'firebase-admin/app';

import prismaPlugin from '../plugins/prisma';
import serviceAccountKey from '../util/Firebase/serviceAccountKey.json';
import v1 from './v1';

export default async function () {
  /* ----------------------------- Firebase Admin ----------------------------- */
  const firebase = initializeApp({
    credential: cert({
      projectId: serviceAccountKey.project_id,
      clientEmail: serviceAccountKey.client_email,
      privateKey: serviceAccountKey.private_key,
    }),
  });
  /* --------------------------------- Fastify -------------------------------- */
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(fastifyRateLimit, {
    max: 100,
  });

  fastify.register(fastifySensible);

  fastify.register(prismaPlugin);

  //v1 route
  fastify.register(v1, { prefix: "/v1" });

  fastify.listen(3000);
}
