import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "User object type",
  fields: {
    id: {
      type: GraphQLInt,
      resolve: (obj) => obj.id,
    },
    firstName: {
      type: GraphQLString,
      resolve: (obj) => obj.first_name,
    },
  },
});

export default UserType;
