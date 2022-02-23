import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export interface User {
  id: number;
  avatar: string;
  displayName: string;
  creationTime: string;
  lastSeen: string;
  disabled: boolean;
}

export const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "User object type",
  fields: {
    id: {
      type: GraphQLInt,
      resolve: (obj: User) => obj.id,
    },
    avatar: {
      type: GraphQLString,
      resolve: (obj) => obj.avatar,
    },
    displayName: {
      type: GraphQLString,
      resolve: (obj) => obj.displayName,
    },
    creationTime: {
      type: GraphQLString,
      resolve: (obj) => obj.creationTime,
    },
    lastSeen: {
      type: GraphQLString,
      resolve: (obj) => obj.lastSeen,
    },
    disable: {
      type: GraphQLBoolean,
      resolve: (obj) => obj.disabled,
    },
  },
});

export let UserArg = new GraphQLInputObjectType({
  name: "UserArg",
  fields: {
    avatar: { type: GraphQLString },
    displayName: { type: GraphQLString },
    lastSeen: { type: GraphQLString },
  },
});

export const UserMutations = new GraphQLObjectType({
  name: "",
  description: "",
  fields: {
    createUser: {
      type: UserType,
      args: { input: { type: UserArg } },
      description: "Handler for create user",
      resolve: async (obj, { input }, context) => {
        const { pgPool, mongo } = context;
        const user = await pgPool.query(
          `insert into users(fist_name) 
          values($1) returning *`,
          [input.firstname]
        );
        await mongo.collection("metrics").update(
          { key: "userCount" },
          { $inc: { value: 1 } },
          {
            upsert: 1,
          }
        );
        return user;
      },
    },
  },
}).getFields;
