import { makeSchema } from 'nexus';
import path from 'path';

import * as types from '.';
import { root } from '../../../util/constants';

export default makeSchema({
  types,
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
