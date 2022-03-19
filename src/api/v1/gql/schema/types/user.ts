import mercurius from 'mercurius';
import { objectType, queryField } from 'nexus';
import { User } from 'nexus-prisma';

import { intersectIds } from '../../../../../util';

const u = User;
export const UserObject = objectType({
  name: u.$name,
  description: u.$description,
  definition(t) {
    t.field(u.id);
    t.field(u.accountId);
    t.field(u.account);
    t.field(u.displayName);
    t.field(u.avatar);
    t.field(u.createdAt);
    t.field(u.lastSeen);
    t.field(u.disabled);
    t.field(u.servers);
    t.field(u.serverIds);
    t.field(u.friendIds);
    t.field(u.groupChatIds);
    t.field(u.groupChats);
    t.field(u.updatedAt);
    t.field(u.ownedServers);
  },
});

export const userByIdQuery = queryField("userById", {
  type: "User",
  description:
    "Returns user with `id`. Only public fields will be available unless user is current user",
  args: {
    id: u.id.type,
  },
  async resolve(_, args, ctx) {
    const authUser = ctx.auth.user;
    const prisma = ctx.prisma;
    let usr: any;
    if (authUser.id !== args.id) {
      usr = await prisma.user.findUnique({
        where: {
          id: args.id,
        },
        select: {
          displayName: true,
          avatar: true,
          disabled: true,
          createdAt: true,
          lastSeen: true,
        },
      });
    } else {
      usr = await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    }
    if (!usr) throw new mercurius.ErrorWithProps("Invalid ID");
    return usr;
    //return await getUser("id", args.id, ctx.pg);
  },
});

export const userByNameQuery = queryField("userByName", {
  type: "User",
  description:
    "Returns user with `displayName`. Only public fields will be available unless user is current user",
  args: {
    displayName: u.displayName.type,
  },
  async resolve(_, args, ctx) {
    const authUser = ctx.auth.user;
    const prisma = ctx.prisma;
    let usr: any;
    if (authUser.displayName !== args.displayName) {
      usr = await prisma.user.findFirst({
        where: {
          displayName: args.displayName,
        },
        select: {
          id: true,
          avatar: true,
          disabled: true,
          createdAt: true,
          lastSeen: true,
        },
      });
    } else {
      usr = await prisma.user.findFirst({
        where: {
          displayName: args.displayName,
        },
      });
    }
    if (!usr) throw new mercurius.ErrorWithProps("Invalid name");
    return usr;
  },
});

export const usersCommonality = queryField("usersCommonality", {
  type: "Json",
  description: "Returns serverIds and friendIds common between two users",
  args: {
    firstUserId: u.id.type,
    secondUserId: u.id.type,
  },
  async resolve(_, args, ctx) {
    const prisma = ctx.prisma;

    const usr1 = await prisma.user.findUnique({
      where: { id: args.firstUserId },
      select: { friendIds: true, serverIds: true },
    });
    const usr2 = await prisma.user.findUnique({
      where: { id: args.secondUserId },
      select: { friendIds: true, serverIds: true },
    });
    if (!usr1 || !usr2) {
      const ids = [];
      if (!usr1) ids.push(args.firstUserId);
      if (!usr2) ids.push(args.secondUserId);
      throw new mercurius.ErrorWithProps("Invalid ID", { ids: ids });
    }

    const serverIds = intersectIds(usr1.serverIds, usr2.serverIds);
    const friendIds = intersectIds(usr1.friendIds, usr2.friendIds);
    return { friendIds: friendIds, serverIds: serverIds };
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

/*export const createUser = mutationField("createUser", {
  type: "User",
  async resolve(_, args, ctx) {
    const pubsub = ctx.pubsub!;
  },
});*/
