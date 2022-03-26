import { intersectIds } from '@util';
import mercurius from 'mercurius';
import { queryField } from 'nexus';

import { u } from './constants';

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