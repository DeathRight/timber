import { topic } from '@api/v1/gql/util/topics';
import { subscriptionField } from 'nexus';

import { PrismaUser, u } from './constants';

export const userChangedSub = subscriptionField("userChanged", {
  type: "User",
  description: "Subscribes to changes for a user",
  args: {
    uid: u.id.type,
  },
  async subscribe(_root, args, ctx, _info) {
    return await ctx.pubsub.subscribe<PrismaUser>(
      topic("User").id(args.uid).changed.label()
    );
  },
  resolve(eventData: PrismaUser, args, ctx) {
    if (!ctx.auth.isClient(args.uid)) {
      return ctx.auth.userToPublic(eventData);
    } else {
      return eventData;
    }
  },
});
