import { topic } from '@api/v1/gql/util/topics';
import { Prisma } from '@prisma/client';
import { timberflake } from '@util';
import mercurius from 'mercurius';
import { mutationField, nonNull } from 'nexus';

import { s } from './constants';
import { ServerCreateInput, ServerUpdateInput } from './inputs';

export const updateServer = mutationField("updateServer", {
  type: "Server",
  description: "Update non-sensitive information of a server.",
  args: {
    id: s.id.type,
    data: nonNull(ServerUpdateInput),
  },
  async resolve(_, args, ctx) {
    const { displayName, description, thumbnail, start } = args.data;
    const data = {
      displayName: displayName ?? undefined,
      description: description ?? undefined,
      thumbnail: thumbnail ?? undefined,
      start: start ?? undefined,
    };

    if (!ctx.auth.isInServer(args.id))
      throw new mercurius.ErrorWithProps("You are not in this server!");
    const server = await ctx.prisma.server.findUnique({
      where: { id: args.id },
    });
    if (!server) throw new mercurius.ErrorWithProps("Unable to fetch server");
    if (!ctx.auth.server(server).canUpdate)
      throw new mercurius.ErrorWithProps("You cannot update this server!");

    const update = await ctx.prisma.server.update({
      where: {
        id: args.id,
      },
      data,
    });

    const serverTopic = topic("Server").id(args.id).changed;
    ctx.pubsub.publish({
      topic: serverTopic.label,
      payload: serverTopic.payload(data),
    });

    return update;
  },
});

export const createServer = mutationField("createServer", {
  type: "Server",
  description: "Creates a server and updates current user to reflect",
  args: { data: nonNull(ServerCreateInput) },
  async resolve(_, args, ctx) {
    const client = ctx.auth.user;
    const { displayName, description, thumbnail, start } = args.data;

    const data = {
      id: timberflake(),
      ownerId: client.id,
      displayName: displayName,
      description: description,
      thumbnail: thumbnail,
      start: start,
      userIds: [client.id],
      users: { connect: { id: client.id } },
    } as Prisma.ServerCreateArgs["data"];
    const server = await ctx.prisma.server.create({
      data: data,
    }); //TODO: create default Domain, and in turn, default Room

    //Add server to user's serverIds list
    const user = await ctx.prisma.user.update({
      where: {
        id: client.id,
      },
      data: {
        serverIds: {
          push: server.id,
        },
        servers: {
          connect: { id: server.id },
        },
        ownedServers: {
          connect: { id: server.id },
        },
      },
    });

    //Update session and emit update for changed user
    ctx.req.session.set("user", user);
    ctx.auth.updateUser(user);
    const userTopic = topic("User").id(client.id).changed;
    ctx.pubsub.publish({
      topic: userTopic.label,
      payload: userTopic.payload(user),
    });

    const serverTopic = topic("Server").id(data.id as bigint).created;
    ctx.pubsub.publish({
      topic: serverTopic.label,
      payload: serverTopic.payload(server),
    });

    return server;
  },
});
