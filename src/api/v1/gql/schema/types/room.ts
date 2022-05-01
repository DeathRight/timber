import { Prisma } from '@prisma/client';
import { isAllSame, timberflake } from '@util';
import mercurius from 'mercurius';
import { inputObjectType, mutationField, nonNull, objectType, queryField, subscriptionField } from 'nexus';
import { Room } from 'nexus-prisma';

import { domainWithIncludes } from '../../util/interfaces';
import { topic } from '../../util/topics';

const r = Room;
export const RoomObject = objectType({
  name: r.$name,
  description: r.$description,
  definition(t) {
    t.field(r.id);
    t.field(r.domainId);
    t.field(r.domain);
    t.field(r.displayName);
    t.field(r.thumbnail);
    t.field(r.createdAt);
    t.field(r.updatedAt);
  },
});

/* ------------------------------ Input Objects ----------------------------- */
export const RoomCreateInput = inputObjectType({
  name: "RoomCreateInput",
  definition(t) {
    t.field(r.domainId);
    t.field(r.displayName);
    t.url(r.thumbnail.name, { description: r.thumbnail.description });
  },
});

export const RoomUpdateInput = inputObjectType({
  name: "RoomUpdateInput",
  definition(t) {
    t.nullable.string(r.displayName.name, {
      description: r.displayName.description,
    });
    t.nullable.url(r.thumbnail.name, { description: r.thumbnail.description });
  },
});

/* ---------------------------------- Query --------------------------------- */
export const roomById = queryField("roomById", {
  type: "Room",
  description: "Returns room with `id`",
  args: {
    id: r.id.type,
  },
  async resolve(_, args, ctx) {
    const authRm = ctx.auth.room(args.id);
    if (!authRm.canRead()) {
      throw new mercurius.ErrorWithProps("Invalid permissions!");
    } else {
      const rm = await ctx.prisma.room.findUnique({
        where: { id: args.id },
        ...roomWithIncludes,
      });
      if (!rm) throw new mercurius.ErrorWithProps("Invalid ID!");

      return rm;
    }
  },
});

/* -------------------------------- Mutation -------------------------------- */
export const updateRoom = mutationField("updateRoom", {
  type: "Room",
  description: "Update non-sensitive information of a room",
  args: {
    id: r.id.type,
    data: nonNull(RoomUpdateInput),
  },
  async resolve(_, args, ctx) {
    const { displayName, thumbnail } = args.data;
    let data = {
      displayName: displayName ?? undefined,
      thumbnail: thumbnail ?? undefined,
    };

    // Fetch room and domain to check if user is in it's server and can update
    const room = await ctx.prisma.room.findUnique({
      where: { id: args.id },
      include: { domain: { include: { server: true } } },
    });
    if (!room || !ctx.auth.isInServer(room.domain.serverId))
      throw new mercurius.ErrorWithProps("Unable to fetch server!");

    const rPerms = ctx.auth.room(room);
    const uPerms = rPerms.canUpdate();
    if (isAllSame(false, uPerms))
      throw new mercurius.ErrorWithProps(
        "You don't have permission to update this room!"
      );

    // Omit keys the user does not have permission to update
    data = {
      displayName: uPerms.NAME ? data.displayName : undefined,
      thumbnail: uPerms.DESCRIPTION ? data.thumbnail : undefined,
    };

    //Update room
    const update = await ctx.prisma.room.update({
      where: {
        id: args.id,
      },
      data,
    });

    // Publish changes
    const roomTopic = topic("Room").id(args.id).changed;
    ctx.pubsub.publish({
      topic: roomTopic.label,
      payload: roomTopic.payload(data),
    });

    return update;
  },
});

export const createRoom = mutationField("createRoom", {
  type: "Room",
  description: "Creates a room and updates domain to reflect",
  args: { data: nonNull(RoomCreateInput) },
  async resolve(_, args, ctx) {
    const { domainId, thumbnail, displayName } = args.data;

    // Get domain and server to check for permissions
    const oldDomain = await ctx.prisma.domain.findUnique({
      where: { id: domainId },
      ...domainWithIncludes,
    });

    if (!oldDomain || !ctx.auth.isInServer(oldDomain.serverId))
      throw new mercurius.ErrorWithProps("Unable to fetch server!");
    if (!ctx.auth.domain(oldDomain).canCreateChild())
      throw new mercurius.ErrorWithProps("Invalid permissions!");
    // End perm check

    // Create Room
    const data = {
      id: timberflake(),
      displayName: displayName,
      thumbnail: thumbnail,
    } as Prisma.RoomCreateWithoutDomainInput;
    const domain = await ctx.prisma.domain.update({
      where: { id: domainId },
      data: {
        rooms: {
          create: data,
        },
      },
      // Include only the room we just created
      include: { rooms: { where: { id: data.id } } },
    });

    // Publish changes
    const domainTopic = topic("Domain").id(domain.serverId).childAdded;
    ctx.pubsub.publish({
      topic: domainTopic.label,
      payload: domainTopic.payload(domain),
    });

    const roomTopic = topic("Room").id(data.id as bigint).created;
    ctx.pubsub.publish({
      topic: roomTopic.label,
      // Select first and only object in rooms of domain, which will always be the new one
      payload: roomTopic.payload(domain.rooms[0]),
    });

    return domain.rooms[0];
  },
});

/* ------------------------------ Subscription ------------------------------ */
const roomWithIncludes = Prisma.validator<Prisma.RoomArgs>()({
  include: { domain: { include: { server: true } } },
});
type RoomWithIncludes = Prisma.RoomGetPayload<typeof roomWithIncludes>;

export const roomSnapshotSub = subscriptionField("roomSnapshot", {
  type: "Room",
  description:
    "Subscribes to changes for a room (snapshots), first attempting to return the current snapshot",
  args: {
    id: r.id.type,
  },
  async subscribe(_root, args, ctx, _info) {
    const rm = await ctx.prisma.room.findUnique({
      where: {
        id: args.id,
      },
      ...roomWithIncludes,
    });

    if (!rm)
      throw new mercurius.ErrorWithProps(
        "Unable to fetch snapshot for subscription",
        { type: "room", id: args.id }
      );

    return await topic("Room").id(args.id).changed.snapshot(rm, ctx.pubsub);
  },
  resolve(eventData: RoomWithIncludes, args, ctx) {
    const authRm = ctx.auth.room(eventData);
    if (!authRm.canRead()) return authRm.toPublic();
    else return eventData;
  },
});
