import mercurius from 'mercurius';
import { queryField } from 'nexus';

import { s } from './constants';

export const serverById = queryField("serverById", {
  type: "Server",
  description: "Returns server with `id`",
  args: {
    id: s.id.type,
  },
  async resolve(_, args, ctx) {
    const prisma = ctx.prisma;
    const ser = await prisma.server.findUnique({
      where: {
        id: args.id,
      },
    });
    if (!ser) throw new mercurius.ErrorWithProps("Invalid ID");

    if (!ctx.auth.isInServer(args.id)) {
      return ctx.auth.serverToPublic(ser);
    } else {
      return ser;
    }
  },
});
