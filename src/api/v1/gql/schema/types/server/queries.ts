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
    const ser = await ctx.prisma.server.findUnique({
      where: {
        id: args.id,
      },
      include: { start: true, domains: true, users: true },
    });
    if (!ser) throw new mercurius.ErrorWithProps("Invalid ID");

    if (!ctx.auth.server(args.id).canRead()) {
      return ctx.auth.server(ser).toPublic();
    } else {
      return ser;
    }
  },
});
