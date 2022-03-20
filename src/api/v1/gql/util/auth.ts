import { Account, User } from '@prisma/client';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

/*export const authCheck = (ctx: Context) => {
  if (!ctx.user) throw new mercurius.ErrorWithProps("NOT AUTHORIZED");
};*/

/**
 * Auth helper class
 */
export class GQLAuth {
  token: DecodedIdToken;
  accountId: string;
  account: Account;
  user: User;

  /**
   * Determines whether user ID is a member of client account
   * @param uid User ID to check against
   * @returns
   */
  isClient = (uid: bigint) => {
    return this.user.id === uid || this.account.userIds.includes(uid);
  };
  constructor(token: DecodedIdToken, account: Account, user: User) {
    this.token = token;
    this.accountId = account.id;
    this.account = account;
    this.user = user;
  }
}
