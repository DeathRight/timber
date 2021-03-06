import { interfaceType } from 'nexus';

export const Node = interfaceType({
  name: "Node",
  definition(t) {
    t.nonNull.bigInt("id", {
      description: "Snowflake ID (BigInt) of a resource",
    });
  },
});
