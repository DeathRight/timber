import { intersectIds } from '@util';
import mercurius from 'mercurius';
import { objectType, queryField } from 'nexus';
import { User } from 'nexus-prisma';

const u = User;

export interface UserObjectI {
  id: typeof u.id.type;
  accountId?: typeof u.accountId.type;
  displayName: typeof u.displayName.type;
  avatar: typeof u.avatar.type;
  createdAt: typeof u.createdAt.type;
  lastSeen: typeof u.lastSeen.type;
  disabled: typeof u.disabled.type;
  serverIds?: typeof u.serverIds.type;
  friendIds?: typeof u.friendIds.type;
  groupChatIds?: typeof u.groupChatIds.type;
  updatedAt?: typeof u.updatedAt.type;
}
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
    "Returns user with `id`. Sensitive fields will be empty unless user is current user",
  args: {
    id: u.id.type,
  },
  async resolve(_, args, ctx) {
    const auth = ctx.auth;
    const prisma = ctx.prisma;
    let usr = await prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
    if (!auth.isClient(args.id) && usr) {
      usr.accountId = "";
      usr.serverIds = [];
      usr.groupChatIds = [];
      usr.friendIds = [];
    }
    if (!usr) throw new mercurius.ErrorWithProps("Invalid ID");
    return usr;
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
          displayName: true,
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
      if (usr && usr.id !== authUser.id) {
        return {
          id: usr.id,
          displayName: usr.displayName,
          avatar: usr.avatar,
          disabled: usr.disabled,
          createdAt: usr.createdAt,
          lastSeen: usr.lastSeen,
        };
      }
    }
    if (!usr) throw new mercurius.ErrorWithProps("Invalid name");
    return usr;
  },
});

export const userCommonalityQuery = queryField("userCommonality", {
  type: "Json",
  description:
    "Returns serverIds and friendIds common between current user and another user",
  args: {
    uid: u.id.type,
  },
  async resolve(_, args, ctx) {
    const prisma = ctx.prisma;

    const usr1 = ctx.auth.user;
    const usr2 = await prisma.user.findUnique({
      where: { id: args.uid },
      select: { friendIds: true, serverIds: true },
    });
    if (!usr2) {
      throw new mercurius.ErrorWithProps("Invalid ID");
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
