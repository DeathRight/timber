import mercurius from 'mercurius';
import { queryField } from 'nexus';

import { d } from './constants';

export const domainById = queryField("domainById", {
  type: "Domain",
  description: "Returns domain with `id`",
  args: {
    id: d.id.type,
  },
  async resolve(_, args, ctx) {
    const authDom = ctx.auth.domain(args.id);
    if (!authDom.canRead()) {
      throw new mercurius.ErrorWithProps("Invalid permissions!");
    } else {
      const dom = await ctx.prisma.domain.findUnique({
        where: { id: args.id },
        include: { server: true, rooms: true, start: true },
      });
      if (!dom) throw new mercurius.ErrorWithProps("Invalid ID!");
      return dom;
    }
  },
});
