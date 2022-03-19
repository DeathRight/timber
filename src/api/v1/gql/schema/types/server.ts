import mercurius from 'mercurius';
import { objectType, queryField } from 'nexus';
import { Server } from 'nexus-prisma';

const s = Server;
export const ServerObject = objectType({
  name: s.$name,
  description: s.$description,
  definition(t) {
    t.field(s.id);
    t.field(s.displayName);
    t.field(s.description);
    t.field(s.start);
    t.field(s.thumbnail);
    t.field(s.createdAt);
    t.field(s.updatedAt);
    t.field(s.owner);
    t.field(s.ownerId);
    t.field(s.users);
    t.field(s.userIds);
    t.field(s.domainIds);
    t.field(s.domains);
  },
});

export const serverById = queryField("serverById", {
  type: "Server",
  description: "Returns server with `id`",
  args: {
    id: s.id.type,
  },
  async resolve(_, args, ctxt) {
    const prisma = ctxt.prisma;
    const ser = await prisma.server.findUnique({
      where: {
        id: args.id,
      },
    });
    if (!ser) throw new mercurius.ErrorWithProps("Invalid ID");
    return ser;
  },
});
