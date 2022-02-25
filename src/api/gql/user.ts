import { idArg, nonNull, objectType, queryField } from 'nexus';

import { getUser } from '../../util/util';

export interface IUser {
  id: string;
  displayName: string;
  createdAt: string;
  avatar?: string;
  lastSeen?: number | Date;
  servers?: string[];
  friends?: string[];
  groupchats?: string[];
  disabled?: boolean;
}

export const User = objectType({
  name: "User",
  definition(t) {
    t.implements("Node");
    t.nonNull.string("displayName", { description: "Global display name" });
    t.nonNull.date("createdAt", {
      description: "Time in milliseconds since epoch the user was created at",
    });
    t.string("avatar", { description: "URL for user's avatar" });
    t.date("lastSeen", {
      description:
        "Time in milliseconds since epoch the user was last logged in",
    });
    t.list.bigint("servers", {
      description: "Array of server IDs the user is a member of",
    });
    t.list.bigint("friends", {
      description: "Array of user IDs the user is friends with",
    });
    t.list.bigint("groupchats", {
      description: "Array of room IDs for group chats the user is a member of",
    });
    t.boolean("disabled", {
      description: "Whether or not the user's account is disabled",
    });
  },
});

export const userByIdQuery = queryField("userById", {
  type: "User",
  args: { id: nonNull(idArg({ description: "UUID of the user" })) },
  async resolve(_, args, ctx) {
    return await getUser("id", args.id, ctx.pg);
  },
});

export const userByNameQuery = queryField("userByName", {
  type: "User",
  args: {
    displayName: nonNull(idArg({ description: "Display Name of the user" })),
  },
  async resolve(_, args, ctx) {
    return await getUser("displayName", args.displayName, ctx.pg);
  },
});

/*export const userPaginationQuery = queryField("userPagination", {
  type: nonNull(list("User")),
  args: {
    before: stringArg({
      description: "User UUID to start page before [n-1] (optional)",
    }),
    after: stringArg({
      description: "User UUID to start page after [n+1] (optional)",
    }),
    limit: stringArg({ description: "Maximum number of users in a page" }),
  },
  async resolve(_, args, ctx) {},
});*/
// TODO
