import { topic } from '@api/v1/gql/util/topics';
import { Prisma } from '@prisma/client';
import { isAllSame, timberflake } from '@util';
import mercurius from 'mercurius';
import { mutationField, nonNull } from 'nexus';

import { domainWithIncludes, serverWithIncludes } from '../../../util/interfaces';
import { d } from './constants';
import { DomainCreateInput, DomainUpdateInput } from './inputs';

export const updateDomain = mutationField("updateDomain", {
  type: "Domain",
  description: "Update non-sensitive information of a domain.",
  args: {
    id: d.id.type,
    data: nonNull(DomainUpdateInput),
  },
  async resolve(_, args, ctx) {
    const { displayName, description, thumbnail, startId, order } = args.data;
    let data: Prisma.DomainUpdateInput = {
      displayName: (displayName ??
        undefined) as Prisma.DomainUpdateInput["displayName"],
      description: description ?? undefined,
      thumbnail: thumbnail ?? undefined,
      start: startId ? { connect: { id: startId } } : undefined,
      order: order ?? undefined,
    };

    // Fetch domain to check if user is in it's server and can update
    const domain = await ctx.prisma.domain.findUnique({
      where: { id: args.id },
      ...domainWithIncludes,
    });
    if (!domain || !ctx.auth.isInServer(domain.serverId))
      throw new mercurius.ErrorWithProps("Unable to fetch domain");

    const dPerms = ctx.auth.domain(domain);
    const uPerms = dPerms.canUpdate();
    if (isAllSame(false, uPerms))
      throw new mercurius.ErrorWithProps(
        "You don't have permission to update this domain!"
      );

    // Check if startId is a valid child room
    if (startId && !domain.rooms.find((r) => r.id === startId))
      data.start = undefined;

    // Omit keys the user does not have permission to update
    data = {
      displayName: uPerms.NAME ? data.displayName : undefined,
      description: uPerms.DESCRIPTION ? data.description : undefined,
      thumbnail: uPerms.THUMBNAIL ? data.thumbnail : undefined,
      // If they have permission to create or delete a room, they can change startId
      start:
        dPerms.canCreateChild() || dPerms.canDeleteChild()
          ? data.start
          : undefined,
      order: dPerms.canDelete() ? data.order : undefined,
    };
    // Update domain
    const update = await ctx.prisma.domain.update({
      where: {
        id: args.id,
      },
      data,
    });

    // Publish changes
    const domainTopic = topic("Domain").id(args.id).changed;
    ctx.pubsub.publish({
      topic: domainTopic.label,
      payload: domainTopic.payload(data),
    });

    return update;
  },
});

export const createDomain = mutationField("createDomain", {
  type: "Domain",
  description: "Creates a domain and updates server to reflect",
  args: { data: nonNull(DomainCreateInput) },
  async resolve(_, args, ctx) {
    const { serverId, displayName, description, thumbnail, startName } =
      args.data;

    //Permissions check
    if (!ctx.auth.server(serverId).canRead())
      throw new mercurius.ErrorWithProps("Invalid permissions!");

    const oldServer = await ctx.prisma.server.findUnique({
      where: { id: serverId },
      ...serverWithIncludes,
    });
    if (!oldServer)
      throw new mercurius.ErrorWithProps("Unable to fetch server");

    if (!ctx.auth.server(oldServer).canCreateChild())
      throw new mercurius.ErrorWithProps("Invalid permissions!");
    //End check

    //Create Domain with starting Room
    const startRoom: Prisma.RoomCreateWithoutDomainInput = {
      id: timberflake(),
      displayName: startName ?? "general",
    };
    const data = {
      id: timberflake(),
      displayName: displayName,
      description: description,
      thumbnail: thumbnail,
      rooms: { create: startRoom },
    } as Prisma.DomainCreateWithoutServerInput;

    //Create & add domain to server's domains
    const server = await ctx.prisma.server.update({
      where: {
        id: serverId,
      },
      data: {
        domains: {
          create: data,
        },
      },
      include: { domains: true },
    });

    //Get domain for publish and return
    const domain = server.domains.find((d) => d.id === data.id);
    if (!domain)
      throw new mercurius.ErrorWithProps(
        "Unable to fetch domain after creation",
        undefined,
        500
      );

    //Publish changes
    const serverTopic = topic("Server").id(serverId).childAdded;
    ctx.pubsub.publish({
      topic: serverTopic.label,
      payload: serverTopic.payload({ domains: [domain] }),
    });

    const domainTopic = topic("Domain").id(data.id as bigint).created;
    ctx.pubsub.publish({
      topic: domainTopic.label,
      payload: domainTopic.payload(domain),
    });

    return domain;
  },
});
