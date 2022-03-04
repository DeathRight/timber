import { User as PrismaUser } from '@prisma/client';
import mercurius from 'mercurius';
import { objectType, queryField } from 'nexus';
import { User } from 'nexus-prisma';

import { intersectIds } from '../../../../util';

const u = User;
export const UserObject = objectType({
  name: u.$name,
  description: u.$description,
  definition(t) {
    t.field(u.id);
    t.field(u.displayName);
    t.field(u.avatar);
    t.field(u.createdAt);
    t.field(u.lastSeen);
    t.field(u.authInfo);
    t.field(u.authProvider);
    t.field(u.disabled);
    t.field(u.servers);
    t.field(u.serverIds);
    t.field(u.friends);
    t.field(u.groupChatIds);
    t.field(u.groupChats);
    t.field(u.updatedAt);
    t.field(u.ownedServers);
  },
});

export const userByIdQuery = queryField("userById", {
  type: "Json",
  args: {
    id: u.id.type,
  },
  async resolve(_, args, ctx) {
    const authUser = ctx.user!;
    const prisma = ctx.prisma;
    let usr: Partial<PrismaUser> | null | undefined;
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
  type: "Json",
  args: {
    displayName: u.displayName.type,
  },
  async resolve(_, args, ctx) {
    const authUser = ctx.user!;
    const prisma = ctx.prisma;
    let usr: Partial<PrismaUser> | null | undefined;
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
  args: {
    firstUserId: u.id.type,
    secondUserId: u.id.type,
  },
  async resolve(_, args, ctx) {
    const authUser = ctx.user!;
    const prisma = ctx.prisma;
    let commonality: { friends: []; servers: [] };

    const usr1 = await prisma.user.findUnique({
      where: { id: args.firstUserId },
      select: { friends: true, serverIds: true },
    });
    const usr2 = await prisma.user.findUnique({
      where: { id: args.secondUserId },
      select: { friends: true, serverIds: true },
    });
    if (!usr1 || !usr2) {
      const ids = [];
      if (!usr1) ids.push(args.firstUserId);
      if (!usr2) ids.push(args.secondUserId);
      throw new mercurius.ErrorWithProps("Invalid ID", { ids: ids });
    }

    const serverIds = intersectIds(usr1.serverIds, usr2.serverIds);
    const friendIds = intersectIds(usr1.friends, usr2.friends);
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
