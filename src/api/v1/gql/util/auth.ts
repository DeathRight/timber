import { Account, Domain, Prisma, Room, Server, User } from '@prisma/client';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { RolePermEnumMap, RolePermEnumMapReturn, RolePermEnumsLength, RolePermEnumsType } from '../util/role';

/**
 * Permission helpers
 */
interface PermissionHelper<T extends Record<string, any>> {
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
  canUpdate: <
    E extends keyof Pick<
      RolePermEnumsType,
      "serverDetails" & "domainDetails" & "roomDetails"
    >
  >() => RolePermEnumMapReturn<E, true | false> | undefined;
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
  T extends { [index: string]: any; id: bigint | string }
> = {
  (r: T["id"]): Pick<PermissionHelper<T>, "canRead">;
  (r: T): PermissionHelper<T>;
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

const serverWithIncludes = Prisma.validator<Prisma.ServerArgs>()({
  include: { users: { select: { id: true } } },
});
export type ServerWithUserIds = Prisma.ServerGetPayload<
  typeof serverWithIncludes
>;

const roomWithIncludes = Prisma.validator<Prisma.RoomArgs>()({
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
  server: PermissionUtility<ServerWithUserIds> = (
    ser: ServerWithUserIds | Server["id"]
  ): any => {
    if (typeof ser !== "object") {
      return {
        canRead: () => this.isInServer(ser),
      };
    }

    return {
      toPublic: () => {
        //ser.userIds &&= [];
        (ser as any).users &&= [];
        //ser.domainIds &&= [];
        (ser as any).domains &&= [];
        ser.ownerId &&= BigInt(0);
        ser.startId &&= BigInt(0);
        (ser as any).start &&= {};
        (ser as any).owner &&= {};
        return ser;
      },
      canRead: () => ser.users.includes({ id: this.user.id }),
      canUpdate: () => this.getPermissions(ser.id, "serverDetails"),
      canDelete: () => ser.ownerId === this.user.id,
      canCreateChild: () => this.getPermissions(ser.id, "domainCrud").CREATE,
      canDeleteChild: () => this.getPermissions(ser.id, "domainCrud").DELETE,
    };
  };

  /**
   * Permission methods for domains
   */
  domain: PermissionUtility<Domain> = (dom: Domain | Domain["id"]): any => {
    if (typeof dom !== "object") {
      return {
        canRead: () => true, //TODO: roles
      };
    }

    return {
      toPublic: () => {
        dom.description &&= "";
        dom.displayName &&= "";
        dom.startId &&= BigInt(0);
        (dom as any).start &&= {};
        //dom.roomIds &&= [];
        (dom as any).rooms &&= [];
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
  room: PermissionUtility<RoomWithIncludes> = (
    rm: RoomWithIncludes | Room["id"]
  ): any => {
    if (typeof rm !== "object") {
      return {
        canRead: () => true, //TODO: roles
      };
    }

    return {
      toPublic: () => {
        rm.displayName &&= "";
        rm.thumbnail &&= "";
        rm.domainId &&= BigInt(0);
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
  userToPublic = (usr?: User | null) => {
    if (!usr) return null;
    usr.accountId &&= "";
    //usr.serverIds &&= [];
    (usr as any).servers &&= [];
    //usr.groupChatIds &&= [];
    (usr as any).groupChats &&= [];
    //usr.friendIds &&= [];
    (usr as any).ownedServers &&= [];
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

  constructor(token: DecodedIdToken, account: Account, user: UserWithIncludes) {
    this.token = token;
    this.accountId = account.id;
    this.account = account;
    this.user = user;
  }
}
