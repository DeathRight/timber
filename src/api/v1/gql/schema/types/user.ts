import { User as PrismaUser } from '@prisma/client';
import { intersectIds } from '@util';
import mercurius from 'mercurius';
import { inputObjectType, mutationField, nonNull, objectType, queryField, subscriptionField } from 'nexus';
import { User } from 'nexus-prisma';

import { topics } from '../../util/interfaces';

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
    t.nonNull.timestamp(u.lastSeen.name, {
      description: u.lastSeen.description,
      resolve: u.lastSeen.resolve,
    });
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

/* -------------------------------------------------------------------------- */
/*                                   Queries                                  */
/* -------------------------------------------------------------------------- */
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
      usr = auth.userToPublic(usr);
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
    const auth = ctx.auth;
    let usr = await ctx.prisma.user.findFirst({
      where: { displayName: args.displayName },
    });
    if (usr && !auth.isClient(usr.id)) {
      usr = auth.userToPublic(usr);
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
    const usr1 = ctx.auth.user;
    const usr2 = await ctx.prisma.user.findUnique({
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

/* -------------------------------------------------------------------------- */
/*                                  Mutations                                 */
/* -------------------------------------------------------------------------- */
export const UserUpdateInput = inputObjectType({
  name: "UserUpdateInput",
  definition(t) {
    t.nullable.string(u.avatar.name, { description: u.avatar.description });
    t.nullable.string(u.displayName.name, {
      description: u.displayName.description,
    });
    t.nullable.timestamp(u.lastSeen.name, {
      description: u.lastSeen.description,
    });
  },
});
export const updateUser = mutationField("updateUser", {
  type: "User",
  description:
    "Update non-sensitive information of currently logged in user. `lastSeen` will get updated automatically unless a value is provided; if null, does nothing.",
  args: {
    data: nonNull(UserUpdateInput),
  },
  async resolve(_, args, ctx) {
    const { displayName, avatar, lastSeen } = args.data;
    const client = ctx.auth.user;
    const data = {
      displayName: displayName ?? undefined,
      avatar: avatar ?? undefined,
      lastSeen: lastSeen === null ? undefined : lastSeen ?? Date.now(), //If null, do nothing. If undefined, get timestamp. Else, set.
    };

    const user = await ctx.prisma.user.update({
      where: {
        id: client.id,
      },
      data,
    });

    ctx.pubsub.publish({
      topic: topics.userChanged(client.id),
      payload: data,
    });

    return user;
  },
});

/* -------------------------------------------------------------------------- */
/*                                Subscriptions                               */
/* -------------------------------------------------------------------------- */
export const userChangedSub = subscriptionField("userChanged", {
  type: "User",
  description: "Subscribes to changes for a user",
  args: {
    uid: u.id.type,
  },
  async subscribe(_root, args, ctx, _info) {
    return await ctx.pubsub.subscribe<PrismaUser>(topics.userChanged(args.uid));
  },
  resolve(eventData) {
    return eventData as PrismaUser;
  },
});
