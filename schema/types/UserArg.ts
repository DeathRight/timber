import { GraphQLInputObjectType, GraphQLString } from 'graphql';

let UserArg = new GraphQLInputObjectType({
  name: "UserArg",
  fields: {
    firstname: { type: GraphQLString },
  },
});

export default UserArg;
