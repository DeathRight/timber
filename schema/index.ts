import { GraphQLSchema } from 'graphql';

import RootMutationType from './rootmutationtype';
import RootQueryType from './rootquerytype';

const Schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

export default Schema;
