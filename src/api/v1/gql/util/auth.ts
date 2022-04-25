import { Account, Domain, Prisma, Room, Server, User } from '@prisma/client';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { RolePermEnumMap, RolePermEnumMapReturn, RolePermEnumsLength, RolePermEnumsType } from '../util/role';
import { Context } from './context';

/**
 * Permission helpers
 */
interface PermissionHelper<
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
type PermissionUtility<
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
/* ---------------------------- End type helpers ---------------------------- */
/**
 * Auth helper class
 */
export class GQLAuth {
  token: DecodedIdToken;
  accountId: Account["id"];
  account: Account;
  user: UserWithIncludes;
  prisma: Context["prisma"];

  updateUser = (u: typeof this.user) => (this.user = u);

  /**
   * Determines whether user ID is a member of client account
   * @param uid User ID to check against
   * @returns
   */
  isClient = (uid: User["id"]) => {
    return this.user.id === uid || this.account.userIds.includes(uid);
  };
  /**
   * Determines whether user ID is a member of server
   */
  isInServer = (sid: Server["id"]) => {
    return this.user.servers.includes({ id: sid });
  };
  /**
   * Whether client has an Admin role in the server with ID of `sid`
   */
  isAdmin = (sid: Server["id"]) => {
    const su = this.user.serverUsers.find((v) => v.id === sid);
    if (!su) return false;

    return su.roles.find((r) => r.owner || r.admin) !== undefined;
  };
  /**
   * Gets boolean permissions map of client ServerUser from highest role permissions
   */
  getPermissions = <T extends keyof RolePermEnumsType>(
    sid: Server["id"],
    type: T
  ) => {
    const su = this.user.serverUsers.find((v) => v.serverId === sid);
    // If ServerUser doesn't exist for this server, user isn't in server. Return with all permissions set to false
    if (!su) {
      return RolePermEnumMap(type);
    }

    // If admin or owner, will be all permissions set to `true`, otherwise will be undefined
    let ret: RolePermEnumMapReturn<T, true> | undefined = undefined;
    // If not admin or owner, will fill with highest permissions of every role
    let eret: RolePermEnumsType[T][] = [];

    su.roles.every((r) => {
      if (r.admin || r.owner) {
        ret = RolePermEnumMap(type, true);
        return false;
      }

      const enums = r[type] as RolePermEnumsType[T][];
      eret.push(...enums);
      // If number of permissions is the same as the length of obtained permissions, we are done searching
      if (eret.length === RolePermEnumsLength[type]) return false;
    });

    return ret ?? RolePermEnumMap(type, eret);
  };

  /**
   * Permission methods for servers
   */
  server: PermissionUtility<ServerWithIncludes, "serverDetails"> = (
    ser: ServerWithIncludes | Server["id"]
  ): any => {
    if (typeof ser !== "object") {
      return {
        canRead: () => this.isInServer(ser),
      };
    }

    return {
      toPublic: () => {
        ser.users &&= [];
        ser.domains &&= [];
        ser.ownerId &&= BigInt(0);
        ser.owner &&= {} as typeof ser.owner; // * Lie to TS, it's ok, we've covered in docs
        ser.startId &&= BigInt(0);
        ser.start &&= {} as typeof ser.start;
        ser.serverUsers &&= [];
        return ser;
      },
      canRead: () => ser.users.find((u) => u.id === this.user.id), // * Do not want to use isInServer since session may be out of sync
      canUpdate: () => this.getPermissions(ser.id, "serverDetails"),
      canDelete: () => ser.ownerId === this.user.id,
      canCreateChild: () => this.getPermissions(ser.id, "domainCrud").CREATE,
      canDeleteChild: () => this.getPermissions(ser.id, "domainCrud").DELETE,
    };
  };

  /**
   * Permission methods for domains
   */
  domain: PermissionUtility<DomainWithIncludes, "domainDetails"> = (
    dom: DomainWithIncludes | Domain["id"]
  ): any => {
    if (typeof dom !== "object") {
      return {
        canRead: async () => {
          const domain = await this.prisma.domain.findUnique({
            where: { id: dom },
          });
          if (!domain || !this.isInServer(domain.serverId)) return false; // ? Seperate domain non-existance error throw?

          return this.getPermissions(domain.serverId, "domainCrud").READ;
        },
      };
    }

    return {
      toPublic: () => {
        dom.description &&= "";
        dom.displayName &&= "";
        dom.startId &&= BigInt(0);
        dom.start &&= {} as typeof dom.start; // * Lie to TS, it's ok, we've covered in docs
        dom.rooms &&= [];
        dom.server &&= {} as typeof dom.server;
        dom.serverId &&= BigInt(0);
        dom.order &&= -1;
        return dom;
      },
      canRead: () => this.getPermissions(dom.serverId, "domainCrud").READ,
      canUpdate: () => this.getPermissions(dom.serverId, "domainDetails"),
      canDelete: () => this.getPermissions(dom.serverId, "domainCrud").DELETE,
      canCreateChild: () =>
        this.getPermissions(dom.serverId, "roomCrud").CREATE,
      canDeleteChild: () =>
        this.getPermissions(dom.serverId, "roomCrud").DELETE,
    };
  };

  /**
   * Permission methods for rooms
   */
  room: PermissionUtility<RoomWithIncludes, "roomDetails"> = (
    rm: RoomWithIncludes | Room["id"]
  ): any => {
    if (typeof rm !== "object") {
      return {
        canRead: async () => {
          const room = await this.prisma.room.findUnique({
            where: { id: rm },
            include: { domain: { include: { server: true } } },
          });
          if (!room || !this.isInServer(room.domain.serverId)) return false; // ? Seperate room non-existance error throw?

          return this.getPermissions(room.domain.serverId, "roomCrud").READ;
        },
      };
    }

    return {
      toPublic: () => {
        rm.displayName &&= "";
        rm.thumbnail &&= "";
        rm.domainId &&= BigInt(0);
        rm.domain &&= {} as typeof rm.domain;
        return rm;
      },
      canRead: () => this.getPermissions(rm.domain.serverId, "roomCrud").READ,
      canUpdate: () => this.getPermissions(rm.domain.serverId, "roomDetails"),
      canDelete: () =>
        this.getPermissions(rm.domain.serverId, "roomCrud").DELETE,
      canCreateChild: () => false,
      canDeleteChild: () => false,
    };
  };

  /**
   * Sanitizes User of sensitive information and returns the result for public consumption
   * @param usr User to sanitize
   * @returns User with sensitive information sanitized
   */
  userToPublic = (usr?: UserWithAllIncludes | null) => {
    if (!usr) return null;
    usr.accountId &&= "";
    usr.account &&= {} as typeof usr.account;
    usr.friends &&= [];
    usr.servers &&= [];
    usr.ownedServers &&= [];
    usr.groupChats &&= [];
    usr.serverUsers &&= [];
    return usr;
  };

  serverUserToPublic = (usr: ServerUserWithIncludes) => {
    usr.user &&= {} as typeof usr.user;
    //usr.userId &&= BigInt(0);
    return usr;
  };

  /**
   * Sanitizes Server of sensitive information and returns the result for public consumption
   * @param ser Server to sanitize
   * @returns Server with sensitive information sanitized
   */
  serverToPublic = (ser: Server | null) => {
    if (!ser) return null;
    //ser.userIds &&= [];
    //ser.domainIds &&= [];
    (ser as any).users &&= [];
    (ser as any).domains &&= [];
    (ser as any).owner &&= {};
    ser.ownerId &&= BigInt(0);
    (ser as any).start &&= {};
    ser.startId &&= BigInt(0); //TODO: start should be bigint to match domain ID type
    return ser;
  };

  constructor(
    token: DecodedIdToken,
    account: Account,
    user: UserWithIncludes,
    prismaClient: Context["prisma"]
  ) {
    this.token = token;
    this.accountId = account.id;
    this.account = account;
    this.user = user;
    this.prisma = prismaClient;
  }
}
