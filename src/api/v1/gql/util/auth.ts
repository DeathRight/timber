import { Account, Server, User } from '@prisma/client';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

/*export const authCheck = (ctx: Context) => {
  if (!ctx.user) throw new mercurius.ErrorWithProps("NOT AUTHORIZED");
};*/

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
  server = (ser: Server) => {
    return {
      canUpdate: () => ser.ownerId === this.user.id,
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
    usr.groupChatIds &&= [];
    usr.friendIds &&= [];
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
    ser.start &&= ""; //TODO: start should be bigint to match domain ID type
    return ser;
  };

  constructor(token: DecodedIdToken, account: Account, user: User) {
    this.token = token;
    this.accountId = account.id;
    this.account = account;
    this.user = user;
  }
}
