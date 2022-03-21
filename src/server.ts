import start from '@api/start';
import { epoch, root } from '@util/constants';
import dotenv from 'dotenv';
import { types } from 'pg';

// https://github.com/brianc/node-pg-types/issues/78
types.setTypeParser(20, BigInt);
const parseBigIntArray = types.getTypeParser(1016);
types.setTypeParser(1016, (a) => parseBigIntArray(a).map(BigInt));

dotenv.config({ path: "priv.env" });

console.log(process.env.REDIS_URL);

console.log(root);

console.log(epoch);
/* ------------------------------ Start Server ------------------------------ */
start();
