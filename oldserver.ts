import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { MongoClient } from 'mongodb';
import { Pool } from 'pg';

import Schema from './schema';

/* ------------------------------------ * ----------------------------------- */
const app = express();
const PORT = process.env.PORT || 3000;
/* ------------------------------------ * ----------------------------------- */
const pgPool = new Pool({
  user: "admin",
  host: "localhost",
  database: "graphql_test",
  password: "xxxxx",
});

MongoClient.connect(
  "mongodb://localhost:27017/graphqltest",
  (err, mongoClient) => {
    if (!mongoClient) throw new Error("Couldn't connect to mongodb!");
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: Schema,
        graphiql: true,
        context: {
          pgPool: pgPool,
          mongo: mongoClient!.db("graphql-training"),
        },
      })
    );

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
);
