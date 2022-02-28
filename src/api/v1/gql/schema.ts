import { makeSchema } from 'nexus';
import NexusPrismaScalars from 'nexus-prisma/scalars';
import path from 'path';

import * as types from '.';
import { root } from '../../../util/constants';

export default makeSchema({
  types: [types, NexusPrismaScalars],
  outputs: {
    schema: path.join(__dirname, "./src/schema.graphql"),
    typegen: path.join(__dirname, "./src/nexus-typegen.ts"),
  },
  contextType: {
    module: require.resolve(path.resolve(root, "./util/context")),
    export: "Context",
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
});
