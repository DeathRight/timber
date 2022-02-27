import { FastifyReply, FastifyRequest } from 'fastify';
import { PostgresDb } from 'fastify-postgres';
import { auth } from 'firebase-admin';

import { CursorConfig } from '../api/v1/gql/src/interfaces';

export const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

export function EnumToObject(e: any) {
  let ret: Record<string, number> = {};
  Object.keys(e)
    .filter((v) => !StringIsNumber(v))
    .map((key) => (ret[key] = e[key]));
  return ret;
}

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

export const pgGetOne = async <T = any>(
  table: string,
  column: string,
  value: string | BigInt,
  pg: PostgresDb & Record<string, PostgresDb>
) => {
  const p = await pg.connect();
  const q = await p.query("SELECT * FROM $1 WHERE $2=$3", [
    table,
    column,
    value,
  ]);
  p.release();
  if (q.rowCount <= 0) return null; // throw new Error(`Could not find ${table} with ${column} of "${value}"`);
  return q.rows[0] as T;
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
  value: string | BigInt,
  pg: PostgresDb & Record<string, PostgresDb>
) => {
  return pgGetOne("users", column, value, pg);
};
