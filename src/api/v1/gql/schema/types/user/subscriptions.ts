import { topic } from '@api/v1/gql/util/topics';
import mercurius from 'mercurius';
import { subscriptionField } from 'nexus';

import { UserWithAllIncludes, userWithAllIncludes } from '../../../util/interfaces';
import { u } from './constants';

export const userSnapshotSub = subscriptionField("userSnapshot", {
  type: "User",
  description:
    "Subscribes to changes for a user (snapshots), first attempting to return the current snapshot",
  args: {
    uid: u.id.type,
  },
  async subscribe(_root, args, ctx, _info) {
    const usr = await ctx.prisma.user.findUnique({
      where: {
        id: args.uid,
      },
      ...userWithAllIncludes,
    });
    if (!usr) {
      throw new mercurius.ErrorWithProps(
        "Unable to fetch snapshot for subscription"
      );
    }

    return await topic("User").id(args.uid).changed.snapshot(usr, ctx.pubsub);
    /*return ctx.pubsub.subscribe<PrismaUser>(
      topic("User").id(args.uid).changed.label
    );*/
  },
  resolve(eventData: UserWithAllIncludes, args, ctx) {
    if (!ctx.auth.isClient(args.uid)) {
      return ctx.auth.userToPublic(eventData);
    } else {
      return eventData;
    }
  },
});
