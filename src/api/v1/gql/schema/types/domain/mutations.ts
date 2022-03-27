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
    const { displayName, description, thumbnail, start } = args.data;
    const data = {
      displayName: displayName ?? undefined,
      description: description ?? undefined,
      thumbnail: thumbnail ?? undefined,
      start: start ?? undefined,
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
    const { serverId, displayName, description, thumbnail, start } = args.data;

    //Permissions check
    const oldServer = await ctx.prisma.server.findUnique({
      where: { id: serverId },
    });
    if (!oldServer)
      throw new mercurius.ErrorWithProps("Unable to fetch server");
    if (!ctx.auth.server(oldServer).canAddDomains())
      throw new mercurius.ErrorWithProps(
        "You cannot add domains to this server!"
      );

    const data = {
      id: timberflake(),
      displayName: displayName,
      description: description,
      thumbnail: thumbnail,
      start: start,
      serverId: serverId,
      server: { connect: { id: serverId } },
    } as Prisma.DomainCreateArgs["data"];
    const domain = await ctx.prisma.domain.create({
      data: data,
    });

    //Add domain to server's domainIds list
    const server = await ctx.prisma.server.update({
      where: {
        id: serverId,
      },
      data: {
        domainIds: {
          push: domain.id,
        },
        domains: {
          connect: { id: domain.id },
        },
      },
    });

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
