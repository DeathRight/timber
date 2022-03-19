import { FastifyRequest } from 'fastify';
import { auth } from 'firebase-admin';

export const getAuthToken = (req: FastifyRequest) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const splat = authHeader.split(" ");
    if (splat[0] === "Bearer") {
      return splat[1];
    }
  }
  return undefined;
};

/**
 * Takes Firebase JWT from authorization header and verifies it
 * @param req FastifyRequest
 * @returns Decoded ID token
 */
export const verifyToken = async (req: FastifyRequest) => {
  const token = getAuthToken(req);
  if (token) {
    try {
      return await auth().verifyIdToken(token);
    } catch (e) {
      console.error("verifyToken error: ", e);
      return null;
    }
  }
  return null;
};
