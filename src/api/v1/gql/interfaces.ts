import { interfaceType } from 'nexus';

export const Node = interfaceType({
  name: "Node",
  definition(t) {
    t.nonNull.bigint("id", {
      description: "Snowflake ID (BigInt) of a resource",
    });
  },
});
