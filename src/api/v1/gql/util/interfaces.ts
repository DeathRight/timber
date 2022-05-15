import { Prisma } from '@prisma/client';

import { RolePermEnumMapReturn, RolePermEnumsType } from './role';

export enum SortingOrder {
  DESC = "DESC",
  ASC = "ASC",
}

export interface CursorConfig {
  before?: string;
  after?: string;
  limit: number;
  order: SortingOrder;
}

export interface PageResult<T = any> {
  result: any[];
  count: number;
}

export const topics = {
  userChanged: (uid: bigint) => `USER:${uid.toString()}:CHANGED`,
  userCreated: (aid: string, uid: bigint) =>
    `ACCOUNT:${aid}:USER:CREATED:${uid.toString()}`,
  accountChanged: (aid: string) => `ACCOUNT:${aid}:CHANGED`,
};

/**
 * Auth permission helpers
 */
export interface PermissionHelper<
  T extends Record<string, any>,
  E extends keyof Pick<
    RolePermEnumsType,
    "serverDetails" | "domainDetails" | "roomDetails"
  >
> {
  /**
   * Sanitizes of sensitive information and returns the result for public consumption
   */
  toPublic: () => T;
  /**
   * Whether client can read resource
   */
  canRead: () => boolean;
  /**
   * List of locally non-sensitive properties of resource user can update
   */
  canUpdate: () => RolePermEnumMapReturn<E, true | false>;
  /**
   * Whether client can delete resource
   */
  canDelete: () => boolean;
  /**
   * Whether client can create sub-resources of resource (e.g.: domains, rooms)
   */
  canCreateChild: () => boolean;
  /**
   * Whether client can delete sub-resources of resource (e.g.: domains, rooms)
   */
  canDeleteChild: () => boolean;
}
export type PermissionUtility<
  T extends { [index: string]: any; id: bigint | string },
  E extends keyof Pick<
    RolePermEnumsType,
    "serverDetails" | "domainDetails" | "roomDetails"
  >
> = {
  (r: T["id"]): Pick<PermissionHelper<T, E>, "canRead">;
  (r: T): PermissionHelper<T, E>;
};
/* -------------------------------------------------------------------------- */
/*                                Type helpers                                */
/* -------------------------------------------------------------------------- */
export const accountWithIncludes = Prisma.validator<Prisma.AccountArgs>()({
  include: { users: { select: { id: true } } },
});
export type AccountWithIncludes = Prisma.AccountGetPayload<
  typeof accountWithIncludes
>;
export const accountWithAllIncludes = Prisma.validator<Prisma.AccountArgs>()({
  include: { users: true },
});
export type AccountWithAllIncludes = Prisma.AccountGetPayload<
  typeof accountWithAllIncludes
>;

export const userWithIncludes = Prisma.validator<Prisma.UserArgs>()({
  include: {
    servers: { select: { id: true } },
    friends: { select: { id: true } },
    groupChats: { select: { id: true } },
    serverUsers: {
      select: { id: true, serverId: true },
      include: { roles: true },
    },
  },
});
export type UserWithIncludes = Prisma.UserGetPayload<typeof userWithIncludes>;

export const userWithAllIncludes = Prisma.validator<Prisma.UserArgs>()({
  include: {
    account: true,
    servers: true,
    friends: true,
    groupChats: true,
    serverUsers: true,
    ownedServers: true,
  },
});
export type UserWithAllIncludes = Prisma.UserGetPayload<
  typeof userWithAllIncludes
>;

export const serverUserWithIncludes = Prisma.validator<Prisma.ServerUserArgs>()(
  {
    include: {
      user: true,
      server: true,
      roles: true,
    },
  }
);
export type ServerUserWithIncludes = Prisma.ServerUserGetPayload<
  typeof serverUserWithIncludes
>;

const serverWithUserIds = Prisma.validator<Prisma.ServerArgs>()({
  include: { users: { select: { id: true } } },
});
export type ServerWithUserIds = Prisma.ServerGetPayload<
  typeof serverWithUserIds
>;

export const serverWithIncludes = Prisma.validator<Prisma.ServerArgs>()({
  include: {
    users: true,
    domains: true,
    start: true,
    owner: true,
    serverUsers: true,
    roles: true,
  },
});
export type ServerWithIncludes = Prisma.ServerGetPayload<
  typeof serverWithIncludes
>;

export const domainWithIncludes = Prisma.validator<Prisma.DomainArgs>()({
  include: { server: true, start: true, rooms: true },
});
export type DomainWithIncludes = Prisma.DomainGetPayload<
  typeof domainWithIncludes
>;

export const roomWithIncludes = Prisma.validator<Prisma.RoomArgs>()({
  include: { domain: true },
});
export type RoomWithIncludes = Prisma.RoomGetPayload<typeof roomWithIncludes>;

export const groupChatWithIncludes = Prisma.validator<Prisma.GroupChatArgs>()({
  include: { users: true, owner: true },
});
export type GroupChatWithIncludes = Prisma.GroupChatGetPayload<
  typeof groupChatWithIncludes
>;

export const roleWithIncludes = Prisma.validator<Prisma.RoleArgs>()({
  include: { server: true, members: true },
});
export type RoleWithIncludes = Prisma.RoleGetPayload<typeof roleWithIncludes>;
/* ---------------------------- End type helpers ---------------------------- */
