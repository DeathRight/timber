import mercurius from 'mercurius';
import { inputObjectType, objectType, queryField } from 'nexus';
import { ServerUser } from 'nexus-prisma';

import { serverUserWithIncludes } from '../../util/auth';

const u = ServerUser;

export const ServerUserObject = objectType({
  name: u.$name,
  description: u.$description,
  definition(t) {
    t.field(u.id);
    t.field(u.displayName);
    t.url("avatar", {
      description:
        "Either server specific avatar, or global avatar from base User",
      async resolve(src, _, ctx) {
        // Return global avatar for now
        const usr = await ctx.prisma.user.findUnique({
          where: { id: src.userId },
        });
        if (usr) {
          return usr.avatar;
        } else {
          return null;
        }
      },
    });
    t.field(u.serverId);
    t.field(u.server);
    t.field(u.userId);
    t.field(u.user);
    t.field(u.roles);
    t.field(u.createdAt);
    t.field(u.updatedAt);
  },
});
/* --------------------------------- Inputs --------------------------------- */
export const ServerUserUpdateInput = inputObjectType({
  name: "ServerUserUpdateInput",
  definition(t) {
    t.nullable.string(u.displayName.name, {
      description: u.displayName.description,
    });
    t.nullable.url("avatar");
  },
});

export const ServerUserCreateInput = inputObjectType({
  name: "ServerUserCreateInput",
  definition(t) {
    t.nullable.string(u.displayName.name, {
      description: u.displayName.description,
    });
    t.nullable.url("avatar");
  },
});

/* ---------------------------------- Query --------------------------------- */
export const serverUserByIdQuery = queryField("serverUserById", {
  type: "ServerUser",
  description:
    "Returns ServerUser with `id`. Sensitive fields will be empty unless base user is current user",
  args: {
    id: u.id.type,
  },
  async resolve(_, args, ctx) {
    let usr = await ctx.prisma.serverUser.findUnique({
      where: { id: args.id },
      ...serverUserWithIncludes,
    });
    if (!usr) throw new mercurius.ErrorWithProps("Invalid ID");
    // If client isn't in the server, they cannot access any information
    if (!ctx.auth.isInServer(usr.serverId))
      throw new mercurius.ErrorWithProps("Invalid permissions!");

    usr.displayName ??= usr.user.displayName;
    if (!ctx.auth.isClient(usr.userId)) {
      usr = ctx.auth.serverUserToPublic(usr);
    }
    return usr;
  },
});

export const serverUserByUserAndServerIdQuery = queryField(
  "serverUserByUserAndServerId",
  {
    type: "ServerUser",
    description:
      "Returns ServerUser by `uId` and `sId`. Sensitive fields will be empty unless base user is current user",
    args: {
      uId: u.userId.type,
      sId: u.serverId.type,
    },
    async resolve(_, args, ctx) {
      // If client isn't in the server, they cannot access any information
      if (!ctx.auth.isInServer(args.sId))
        throw new mercurius.ErrorWithProps("Invalid permissions!");

      let usr = await ctx.prisma.serverUser.findUnique({
        where: {
          userId_serverId: { serverId: args.sId, userId: args.uId },
        },
        ...serverUserWithIncludes,
      });
      if (!usr) throw new mercurius.ErrorWithProps("Invalid ID");

      if (!ctx.auth.isClient(usr.userId)) {
        usr = ctx.auth.serverUserToPublic(usr);
      }
      return usr;
    },
  }
);
