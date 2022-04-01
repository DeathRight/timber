import { topic } from '@api/v1/gql/util/topics';
import { Prisma } from '@prisma/client';
import { timberflake } from '@util';
import mercurius from 'mercurius';
import { mutationField, nonNull } from 'nexus';

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
    const { displayName, description, thumbnail, startId } = args.data;
    const data = {
      displayName: displayName ?? undefined,
      description: description ?? undefined,
      thumbnail: thumbnail ?? undefined,
      startId: startId ?? undefined,
    };

    if (!ctx.auth.isInServer(args.id))
      throw new mercurius.ErrorWithProps("You are not in this server!");
    const domain = await ctx.prisma.domain.findUnique({
      where: { id: args.id },
    });
    if (!domain) throw new mercurius.ErrorWithProps("Unable to fetch domain");
    if (!ctx.auth.domain(domain).canUpdate)
      throw new mercurius.ErrorWithProps("You cannot update this domain!");

    const update = await ctx.prisma.domain.update({
      where: {
        id: args.id,
      },
      data,
    });

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
      include: { users: { select: { id: true } } },
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
    const serverTopic = topic("Server").id(serverId).changed;
    ctx.pubsub.publish({
      topic: serverTopic.label,
      payload: serverTopic.payload(server),
    });

    const domainTopic = topic("Domain").id(data.id as bigint).created;
    ctx.pubsub.publish({
      topic: domainTopic.label,
      payload: domainTopic.payload(domain),
    });

    return domain;
  },
});
