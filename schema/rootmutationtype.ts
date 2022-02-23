import { GraphQLObjectType } from 'graphql';

import { UserMutations } from './types/User';

const RootMutationType = new GraphQLObjectType({
  name: "RootMutationType",
  description: "this holds all the mutation APIs",
  fields: {
    ...UserMutations,
  },
});

export default RootMutationType;
