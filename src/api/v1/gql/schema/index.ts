import { makeSchema } from 'nexus';
import NexusPrismaScalars from 'nexus-prisma/scalars';
import path from 'path';

import * as types from './types';

export default makeSchema({
  types: [types, NexusPrismaScalars],
  outputs: {
    schema: path.join(__dirname, "../util/schema.graphql"),
    typegen: path.join(__dirname, "../util/nexus-typegen.ts"),
  },
  contextType: {
    module: require.resolve(path.join(__dirname, "../util/context")),
    export: "Context",
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
});
