import { InviteType } from '@prisma/client';
import { timberflake } from '@util';
import mercurius from 'mercurius';
import { inputObjectType, list, mutationField, nonNull, objectType, queryField, unionType } from 'nexus';
import { Invite } from 'nexus-prisma';

import { serverUserWithIncludes, serverWithIncludes, userWithAllIncludes } from '../../util/interfaces';

export const PartyUnion = unionType({
  name: "Party",
  description:
    "The party object of the invite. Either Server, GroupChat, or User (for friend requests)",
  asNexusMethod: "party",
  definition(t) {
    t.members("Server", "GroupChat", "User");
  },
});

const i = Invite;
export const InviteObject = objectType({
  name: i.$name,
  description: i.$description,
  definition(t) {
    t.field(i.id);
    t.field(i.type);
    t.party("party", {
      async resolve(source, _, ctx) {
        const where = { where: { id: source.partyId } };
        switch (source.type) {
          case "Server":
            return await ctx.prisma.server.findUnique({
              ...where,
              ...serverWithIncludes,
            });
          case "GroupChat":
            return await ctx.prisma.groupChat.findUnique({ ...where });
          case "Friend":
            return ctx.auth.userToPublic(
              await ctx.prisma.user.findUnique({
                ...where,
                ...userWithAllIncludes,
              })
            );
        }
      },
    });
    t.field(i.partyId);
    t.field(i.expiresAt);
  },
});

/* ---------------------------------- Query --------------------------------- */
export const getInviteById = queryField("getInviteById", {
  type: "Invite",
  description:
    "Gets invite by id `id`. Will throw an error if not on recipients list",
  args: {
    id: i.id.type,
  },
  async resolve(_, args, ctx) {
    const inv = await ctx.prisma.invite.findUnique({ where: { id: args.id } });
    if (!inv) {
      throw new mercurius.ErrorWithProps("Unable to fetch invite");
    }

    const rec = inv.recipientIds;
    if (rec.length > 0 && !rec.find((id) => id === ctx.auth.user.id)) {
      throw new mercurius.ErrorWithProps("Invalid permissions!");
    }
    return inv;
  },
});

export const getInvitesByPartyId = queryField("getInvitesByPartyId", {
  type: list("Invite"),
  description:
    "Gets a list of all invites by partyId `id`. InviteType `type` must be specified for permission check",
  args: {
    id: i.partyId.type,
    type: i.type.type,
  },
  async resolve(_, args, ctx) {
    const { id, type } = args;
    switch (type) {
      case "Server":
        if (ctx.auth.isInServer(id)) break;
        else throw new mercurius.ErrorWithProps("Invalid permissions!");
      case "GroupChat":
        const gc = await ctx.prisma.groupChat.findUnique({
          where: { id: id },
          include: { users: { select: { id: true } } },
        });
        if (gc && gc.users.find((u) => u.id === ctx.auth.user.id)) break;
        else throw new mercurius.ErrorWithProps("Invalid permissions!");
      case "Friend":
        if (ctx.auth.isClient(id)) break;
        else throw new mercurius.ErrorWithProps("Invalid permissions!");
    }
    // Passed permissions check
    return ctx.prisma.invite.findMany({ where: { partyId: id } });
  },
});

/* -------------------------------------------------------------------------- */
/*                                   Inputs                                   */
/* -------------------------------------------------------------------------- */
export const InviteCreateInput = inputObjectType({
  name: "InviteCreateInput",
  definition(t) {
    t.field(i.partyId);
    t.field(i.expiresAt);
  },
});

export const InviteUpdateInput = inputObjectType({
  name: "InviteUpdateInput",
  definition(t) {
    t.nullable.field(i.expiresAt);
    t.nullable.field(i.recipientIds);
  },
});

/* -------------------------------------------------------------------------- */
/*                                  Mutations                                 */
/* -------------------------------------------------------------------------- */
export const createServerInvite = mutationField("createServerInvite", {
  type: "Invite",
  description: "Creates a server invite with optional expiration date",
  args: {
    data: nonNull(InviteCreateInput),
  },
  async resolve(source, args, ctx) {
    if (!ctx.auth.isInServer(args.data.partyId)) {
      throw new mercurius.ErrorWithProps("Invalid permissions!");
    }
    // Client is in server, fetch serverUser
    const su = await ctx.prisma.serverUser.findUnique({
      where: {
        userId_serverId: {
          userId: ctx.auth.user.id,
          serverId: args.data.partyId,
        },
      },
      ...serverUserWithIncludes,
    });
    if (!su) {
      throw new mercurius.ErrorWithProps(
        "unable to fetch ServerUser to check permissions"
      );
    }
    if (!ctx.auth.serverUser(su).canInvite()) {
      throw new mercurius.ErrorWithProps("Invalid permissions!");
    }
    // Client can invite

    return await ctx.prisma.invite.create({
      data: {
        id: timberflake() as bigint,
        type: InviteType.Server,
        partyId: args.data.partyId,
        expiresAt: args.data.expiresAt,
      },
    });
  },
});

export const createGroupChatInvite = mutationField("createGroupChatInvite", {
  type: "Invite",
  description: "Creates a Group Chat invite with optional expiration date",
  args: {
    data: nonNull(InviteCreateInput),
  },
  async resolve(source, args, ctx) {
    const gc = await ctx.prisma.groupChat.findUnique({
      where: { id: args.data.partyId },
      include: { users: { select: { id: true } } },
    });
    if (!gc || gc.users.find((u) => u.id === ctx.auth.user.id)) {
      // Client is not in group chat
      throw new mercurius.ErrorWithProps("Invalid permissions!");
    }

    return await ctx.prisma.invite.create({
      data: {
        id: timberflake() as bigint,
        type: InviteType.GroupChat,
        partyId: args.data.partyId,
        expiresAt: args.data.expiresAt,
      },
    });
  },
});

export const createFriendInvite = mutationField("createFriendInvite", {
  type: "Invite",
  description: "Creates a friend invite to user with ID `uid`",
  args: {
    uid: i.partyId.type,
  },
  async resolve(source, args, ctx) {
    return await ctx.prisma.invite.create({
      data: {
        id: timberflake() as bigint,
        type: InviteType.Friend,
        partyId: ctx.auth.user.id,
        recipientIds: [args.uid],
      },
    });
  },
});

export const deleteInvite = mutationField("deleteInvite", {
  type: "Invite",
  description: "Deletes an invite so it is no longer usable",
  args: { id: i.id.type },
  async resolve(_, args, ctx) {
    const source = await ctx.prisma.invite.findUnique({
      where: { id: args.id },
    });
    if (!source) {
      throw new mercurius.ErrorWithProps("Unable to fetch invite");
    }
    const type = source.type;
    switch (type) {
      case "Server":
        if (ctx.auth.isInServer(source.partyId)) {
          const su = await ctx.prisma.serverUser.findUnique({
            where: {
              userId_serverId: {
                userId: ctx.auth.user.id,
                serverId: source.partyId,
              },
            },
            ...serverUserWithIncludes,
          });
          if (su) {
            if (ctx.auth.serverUser(su).canInvite()) break;
          }
        }
        // If break is not reached above, then throw perms error
        throw new mercurius.ErrorWithProps("Invalid permissions!");
      case "GroupChat":
        const gc = await ctx.prisma.groupChat.findUnique({
          where: { id: source.partyId },
          include: { users: { select: { id: true } } },
        });
        if (gc && gc.users.find((u) => u.id === ctx.auth.user.id)) {
          // Client is in group chat
          break;
        } else {
          throw new mercurius.ErrorWithProps("Invalid permissions!");
        }
      case "Friend":
        if (ctx.auth.isClient(source.partyId)) break;
        else throw new mercurius.ErrorWithProps("Invalid permissions!");
    }
    // Valid permissions if we have reached here
    return await ctx.prisma.invite.delete({ where: { id: args.id } });
  },
});

export const acceptInvite = mutationField("acceptInvite", {
  type: "Invite",
  description:
    "Accepts an invite and removes client from recipients list if applicable, and if last, deletes invite",
  args: { id: i.id.type },
  async resolve(_, args, ctx) {
    // TODO
  },
});
