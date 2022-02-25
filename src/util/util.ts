import { FastifyReply, FastifyRequest } from 'fastify';
import { PostgresDb } from 'fastify-postgres';
import { auth } from 'firebase-admin';
import path from 'path';

import { IUser } from '../api/gql';
import { CursorConfig } from './interfaces';

export const root = path.resolve("./src");

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

export const verifyToken = async (
  req: FastifyRequest,
  reply: FastifyReply,
  done: (err: Error) => void
) => {
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

export const pgGetOne = async (
  table: string,
  column: string,
  value: string,
  pg: PostgresDb & Record<string, PostgresDb>
) => {
  const p = await pg.connect();
  const q = await p.query("SELECT * FROM $1 WHERE $2=$3", [
    table,
    column,
    value,
  ]);
  p.release();
  if (q.rowCount <= 0)
    throw new Error(`Could not find ${table} with ${column} of "${value}"`);
  return q.rows[0];
};

export const pgGetPage = async (
  table: string,
  column: string,
  value: string,
  pg: PostgresDb & Record<string, PostgresDb>,
  config?: CursorConfig
) => {
  const p = await pg.connect();

  p.release();
};

export const getUser = async (
  column: string,
  value: string,
  pg: PostgresDb & Record<string, PostgresDb>
) => {
  return pgGetOne("users", column, value, pg) as unknown as IUser;
};
