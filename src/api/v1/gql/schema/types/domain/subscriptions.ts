import { topic } from '@api/v1/gql/util/topics';
import mercurius from 'mercurius';
import { subscriptionField } from 'nexus';

import { DomainWithIncludes, domainWithIncludes } from '../../../util/interfaces';
import { d } from './constants';

export const domainSnapshotSub = subscriptionField("domainSnapshot", {
  type: "Domain",
  description:
    "Subscribes to changes for a domain (snapshots), first attempting to return the current snapshot",
  args: {
    id: d.id.type,
  },
  async subscribe(_root, args, ctx, _info) {
    const dom = await ctx.prisma.domain.findUnique({
      where: {
        id: args.id,
      },
      ...domainWithIncludes,
    });
    if (!dom) {
      throw new mercurius.ErrorWithProps(
        "Unable to fetch snapshot for subscription",
        { type: "domain", id: args.id }
      );
    }

    return await topic("Domain").id(args.id).changed.snapshot(dom, ctx.pubsub);
  },
  resolve(eventData: DomainWithIncludes, args, ctx) {
    const authDom = ctx.auth.domain(eventData);
    if (!authDom.canRead()) {
      return authDom.toPublic();
    } else {
      return eventData;
    }
  },
});
