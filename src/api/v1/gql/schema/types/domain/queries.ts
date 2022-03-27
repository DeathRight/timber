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
    const prisma = ctx.prisma;
    const dom = await prisma.domain.findUnique({
      where: {
        id: args.id,
      },
    });
    if (!dom) throw new mercurius.ErrorWithProps("Invalid ID");

    const authDom = ctx.auth.domain(dom);
    if (!authDom.canView()) {
      return authDom.toPublic();
    } else {
      return dom;
    }
  },
});
