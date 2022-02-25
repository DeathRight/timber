import { makeSchema } from 'nexus';
import path from 'path';

import { root } from '../../util/util';
import * as types from './';

export default makeSchema({
  types,
  outputs: {
    schema: path.join(root, "./src/schema.graphql"),
    typegen: path.join(root, "./src/nexus-typegen.ts"),
  },
  contextType: {
    module: require.resolve(path.join(root, "./util/context.ts")),
    export: "Context",
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
});
