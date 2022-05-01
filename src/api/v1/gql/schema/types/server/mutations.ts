import { topic } from '@api/v1/gql/util/topics';
import { Prisma } from '@prisma/client';
import { isAllSame, timberflake } from '@util';
import mercurius from 'mercurius';
import { mutationField, nonNull } from 'nexus';

import { serverWithIncludes } from '../../../util/interfaces';
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
    const { displayName, description, thumbnail, startId } = args.data;
    let data = {
      displayName: displayName ?? undefined,
      description: description ?? undefined,
      thumbnail: thumbnail ?? undefined,
      start: startId ? { connect: { id: startId } } : undefined,
    } as Prisma.ServerUpdateArgs["data"];

    // Permission checks
    if (!ctx.auth.isInServer(args.id))
      throw new mercurius.ErrorWithProps("You are not in this server!");
    const server = await ctx.prisma.server.findUnique({
      where: { id: args.id },
      ...serverWithIncludes,
    });
    if (!server) throw new mercurius.ErrorWithProps("Unable to fetch server");

    const sPerms = ctx.auth.server(server);
    const uPerms = sPerms.canUpdate();
    if (isAllSame(false, uPerms))
      throw new mercurius.ErrorWithProps(
        "You don't have permission to update this server!"
      );

    // Omit keys the user does not have permission to update
    data = {
      displayName: uPerms.NAME ? data.displayName : undefined,
      description: uPerms.DESCRIPTION ? data.description : undefined,
      thumbnail: uPerms.THUMBNAIL ? data.thumbnail : undefined,
      start:
        sPerms.canCreateChild() || sPerms.canDeleteChild()
          ? data.start
          : undefined,
    };

    // Update server
    const update = await ctx.prisma.server.update({
      where: {
        id: args.id,
      },
      data,
      // * Include all
      include: {
        domains: true,
        users: true,
        serverUsers: true,
        roles: true,
        start: true,
      },
    });

    const serverTopic = topic("Server").id(args.id).changed;
    ctx.pubsub.publish({
      topic: serverTopic.label,
      payload: serverTopic.payload(data), // ? Prisma client update types add 'number' as possible bigint ID, bug?
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
    const { displayName, description, thumbnail, startName } = args.data;

    // Create starting domain and room
    const startRoom: Prisma.RoomCreateWithoutDomainInput = {
      id: timberflake(),
      displayName: "general",
    };
    const startDomain: Prisma.DomainCreateWithoutServerInput = {
      id: timberflake(),
      displayName: startName ?? "general",
      rooms: { create: startRoom },
      start: { connect: { id: startRoom.id } },
    };
    // Create ServerUser
    const serverUser: Prisma.ServerUserCreateWithoutServerInput = {
      id: timberflake(),
      user: { connect: { id: client.id } },
    };
    // Create Owner role with client's ServerUser as a member
    const ownerRole: Prisma.RoleCreateWithoutServerInput = {
      id: timberflake(),
      order: 1,
      displayName: "Owner",
      color: "#00F",
      owner: true,
      members: { connect: { id: serverUser.id } },
    };

    // Create server
    const data = {
      id: timberflake(),
      owner: { connect: { id: client.id } },
      displayName: displayName,
      description: description,
      thumbnail: thumbnail,
      domains: { create: startDomain },
      start: { connect: { id: startDomain.id } },
      users: { connect: { id: client.id } },
      serverUsers: { create: serverUser },
      roles: { create: ownerRole },
    } as Prisma.ServerCreateArgs["data"];
    const server = await ctx.prisma.server.create({
      data: data,
      ...serverWithIncludes,
    });

    // Add server to user's serverIds list
    const user = await ctx.prisma.user.update({
      where: {
        id: client.id,
      },
      data: {
        servers: {
          connect: { id: server.id },
        },
        ownedServers: {
          connect: { id: server.id },
        },
      },
      include: {
        servers: { select: { id: true } },
        groupChats: { select: { id: true } },
        friends: { select: { id: true } },
        serverUsers: { include: { roles: true } },
      },
    });

    // Update session and emit update for changed user and created server
    ctx.req.session.set("user", user);
    ctx.auth.updateUser(user);

    const userTopic = topic("User").id(client.id).childAdded;
    ctx.pubsub.publish({
      topic: userTopic.label,
      payload: userTopic.payload({ servers: [server] }),
    });

    const serverTopic = topic("Server").id(data.id as bigint).created;
    ctx.pubsub.publish({
      topic: serverTopic.label,
      payload: serverTopic.payload(server),
    });

    return server;
  },
});
