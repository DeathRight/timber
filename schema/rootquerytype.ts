import { GraphQLObjectType } from 'graphql';

import { UserQueries } from './types/User';

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  description: "This holds all the query APIs",
  fields: {
    ...UserQueries,
  },
});

export default RootQueryType;
