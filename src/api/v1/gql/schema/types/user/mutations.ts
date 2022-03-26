import { topic } from '@api/v1/gql/util/topics';
import { timberflake } from '@util';
import { mutationField, nonNull } from 'nexus';

import { UserCreateInput, UserUpdateInput } from './inputs';

export const updateUser = mutationField("updateUser", {
  type: "User",
  description:
    "Update non-sensitive information of currently logged in user. `lastSeen` will get updated automatically unless a value is provided; if null, does nothing.",
  args: {
    data: nonNull(UserUpdateInput),
  },
  async resolve(_, args, ctx) {
    const { displayName, avatar, lastSeen } = args.data;
    const client = ctx.auth.user;
    const data = {
      displayName: displayName ?? undefined,
      avatar: avatar ?? undefined,
      lastSeen: lastSeen === null ? undefined : lastSeen ?? Date.now(), //If null, do nothing. If undefined, get timestamp. Else, set.
    };

    const user = await ctx.prisma.user.update({
      where: {
        id: client.id,
      },
      data,
    });

    const userTopic = topic("User").id(client.id).changed;
    ctx.pubsub.publish({
      topic: userTopic.label,
      payload: userTopic.payload(data),
    });

    return user;
  },
});

export const createUser = mutationField("createUser", {
  type: "User",
  description: "Create user on currently logged in account.",
  args: { data: nonNull(UserCreateInput) },
  async resolve(_, args, ctx) {
    const acc = ctx.auth.account;
    const data = {
      id: timberflake(),
      accountId: acc.id,
      lastSeen: Date.now(),
      ...args.data,
    };

    const user = await ctx.prisma.user.create({
      data: data,
    });

    const userTopic = topic("User").id(data.id).created;
    ctx.pubsub.publish({
      topic: userTopic.label,
      payload: userTopic.payload(user),
    });

    return user;
  },
});
