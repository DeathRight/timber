import { PostgresDb } from 'fastify-postgres';

import { pgGetOne } from '.';

export const getUser = async (
  column: string,
  value: string | BigInt,
  pg: PostgresDb & Record<string, PostgresDb>
) => {
  return pgGetOne("users", column, value, pg);
};
