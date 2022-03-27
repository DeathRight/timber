import { Account, Domain, Room, Server, User } from '@prisma/client';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

/*export const authCheck = (ctx: Context) => {
  if (!ctx.user) throw new mercurius.ErrorWithProps("NOT AUTHORIZED");
};*/

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
   * Whether client can update locally non-sensitive properties of resource
   */
  canUpdate: () => boolean;
  /**
   * Whether client can delete resource
   */
  canDelete: () => boolean;
  /**
   * Whether client can create sub-resources of resource (e.g.: domains, rooms)
   */
  canCreateChild: () => boolean;
}
type PermissionUtility<
  T extends { [index: string]: any; id: bigint | string }
> = {
  (r: T["id"]): Pick<PermissionHelper<T>, "canRead">;
  (r: T): PermissionHelper<T>;
};

/**
 * Auth helper class
 */
export class GQLAuth {
  token: DecodedIdToken;
  accountId: Account["id"];
  account: Account;
  user: User;

  updateUser = (u: User) => (this.user = u);

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
    return this.user.serverIds.includes(sid);
  };

  /**
   * Permission methods for servers
   */
  server: PermissionUtility<Server> = (ser: Server | Server["id"]): any => {
    if (typeof ser !== "object") {
      return {
        canRead: () => this.isInServer(ser),
      };
    }

    return {
      toPublic: () => {
        ser.userIds &&= [];
        (ser as any).users &&= [];
        ser.domainIds &&= [];
        (ser as any).domains &&= [];
        ser.ownerId &&= BigInt(0);
        ser.startId &&= BigInt(0);
        (ser as any).start &&= {};
        return ser;
      },
      canRead: () => ser.userIds.includes(this.user.id),
      canUpdate: () => ser.ownerId === this.user.id,
      canDelete: () => ser.ownerId === this.user.id,
      canCreateChild: () => ser.ownerId === this.user.id,
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
        dom.roomIds &&= [];
        (dom as any).rooms &&= [];
        return dom;
      },
      canRead: () => true,
      canUpdate: () => true,
      canDelete: () => true,
      canCreateChild: () => true,
    };
  };
  /**
   * Permission methods for rooms
   */
  room: PermissionUtility<Room> = (rm: Room | Room["id"]): any => {
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
      canRead: () => true,
      canUpdate: () => true,
      canDelete: () => true,
      canCreateChild: () => true,
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
    usr.serverIds &&= [];
    (usr as any).servers &&= [];
    usr.groupChatIds &&= [];
    (usr as any).groupChats &&= [];
    usr.friendIds &&= [];
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
    ser.userIds &&= [];
    ser.domainIds &&= [];
    ser.ownerId &&= BigInt(0);
    ser.startId &&= BigInt(0); //TODO: start should be bigint to match domain ID type
    return ser;
  };

  constructor(token: DecodedIdToken, account: Account, user: User) {
    this.token = token;
    this.accountId = account.id;
    this.account = account;
    this.user = user;
  }
}
