import { topic } from '@api/v1/gql/util/topics';
import mercurius from 'mercurius';
import { subscriptionField } from 'nexus';

import { ServerWithIncludes, serverWithIncludes } from '../../../util/interfaces';
import { s } from './constants';

export const serverSnapshotSub = subscriptionField("serverSnapshot", {
  type: "Server",
  description:
    "Subscribes to changes for a server (snapshots), first attempting to return the current snapshot",
  args: {
    id: s.id.type,
  },
  async subscribe(_root, args, ctx, _info) {
    const ser = await ctx.prisma.server.findUnique({
      where: {
        id: args.id,
      },
      // Include all
      ...serverWithIncludes,
    });
    if (!ser) {
      throw new mercurius.ErrorWithProps(
        "Unable to fetch snapshot for subscription",
        { type: "server", id: args.id }
      );
    }

    return await topic("Server").id(args.id).changed.snapshot(ser, ctx.pubsub);
  },
  resolve(eventData: ServerWithIncludes, args, ctx) {
    if (!ctx.auth.isInServer(args.id)) {
      return ctx.auth.serverToPublic(eventData);
    } else {
      return eventData;
    }
  },
});
