import dotenv from 'dotenv';
import path from 'path';
import { types } from 'pg';

import startServer from './api/startServer';
import { epoch } from './util/constants';
import { root } from './util/util';

// https://github.com/brianc/node-pg-types/issues/78
types.setTypeParser(20, BigInt);
const parseBigIntArray = types.getTypeParser(1016);
types.setTypeParser(1016, (a) => parseBigIntArray(a).map(BigInt));

dotenv.config({ path: "priv.env" });

console.log(process.env.REDIS_URL);

console.log(root);

console.log(epoch);

startServer();
