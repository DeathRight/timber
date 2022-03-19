import { PostgresDb } from 'fastify-postgres';

import { CursorConfig, PageResult, SortingOrder } from '../interfaces';

export const pgGetOne = async <T = any>(
  table: string,
  column: string,
  value: string | BigInt,
  pg: PostgresDb & Record<string, PostgresDb>
) => {
  const p = await pg.connect();
  try {
    const q = await p.query("SELECT * FROM $1 WHERE $2=$3", [
      table,
      column,
      value,
    ]);
    p.release();
    if (q.rowCount <= 0) return null; // throw new Error(`Could not find ${table} with ${column} of "${value}"`);
    return q.rows[0] as T;
  } catch (e) {
    p.release();
    console.error(e);
    return null;
  }
};

export const pgGetPage = async (
  table: string,
  column: string,
  pg: PostgresDb & Record<string, PostgresDb>,
  config: CursorConfig = { limit: 100, order: SortingOrder.DESC }
) => {
  const p = await pg.connect();

  let query = `SELECT * FROM ${table}`;

  let where: string[] = [];
  if (config.before || config.after) {
    where[0] = "WHERE";
    if (config.after) {
      where.push(`${column} > ${config.after}`);
    }
    if (config.after && config.before) {
      where.push("AND");
    }
    if (config.before) {
      where.push(`${column} < ${config.before}`);
    }
  }
  if (where.length > 0) {
    query += " " + where.join(" ");
  }

  query += ` ORDER BY ${column} ${config.order}`;
  query += `LIMIT ${config.limit}`;
  // wow *>_> .... query strings

  try {
    const q = await p.query(query);
    p.release();
    return { result: q.rows, count: q.rowCount } as PageResult;
  } catch (e: any) {
    p.release();
    console.error(e);
    return null;
  }
};

export const pgGetAllIn = async (
  table: string,
  column: string,
  _in: string[],
  pg: PostgresDb & Record<string, PostgresDb>
) => {
  const p = await pg.connect();

  let inQ = "";
  _in.forEach((v, i) => {
    inQ += `'${v}'`;
    if (_in.length > i + 1) inQ += ",";
  });

  try {
    const q = await p.query("SELECT * FROM $1 WHERE $2 IN ($3)", [
      table,
      column,
      inQ,
    ]);
    return { result: q.rows, count: q.rowCount } as PageResult;
  } catch (e) {
    p.release();
    console.error(e);
    return null;
  }
};
