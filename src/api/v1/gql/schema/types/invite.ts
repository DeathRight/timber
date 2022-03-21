import { InviteType } from '@prisma/client';
import { timberflake } from '@util';
import { inputObjectType, mutationField, nonNull, objectType, unionType } from 'nexus';
import { Invite } from 'nexus-prisma';

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
            return await ctx.prisma.server.findUnique(where);
          case "GroupChat":
            return await ctx.prisma.groupChat.findUnique(where);
          case "Friend":
            return ctx.auth.userToPublic(
              await ctx.prisma.user.findUnique(where)
            );
        }
      },
    });
    t.field(i.partyId);
    t.field(i.expiresAt);
  },
});

/* -------------------------------------------------------------------------- */
/*                                  Mutations                                 */
/* -------------------------------------------------------------------------- */
export const InviteCreateInput = inputObjectType({
  name: "InviteCreateInput",
  definition(t) {
    t.field(i.partyId);
    t.field(i.expiresAt);
  },
});

export const createServerInvite = mutationField("createServerInvite", {
  type: "Invite",
  description: "Creates a server invite with optional expiration date",
  args: {
    data: nonNull(InviteCreateInput),
  },
  async resolve(source, args, ctx) {
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
