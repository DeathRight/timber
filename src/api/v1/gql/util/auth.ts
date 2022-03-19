import { User } from '@prisma/client';
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
  user: User;

  isClient = (uid: bigint) => {
    return this.user?.id === uid;
  };
  constructor(token: DecodedIdToken, user: User) {
    this.token = token;
    this.accountId = token.uid;
    this.user = user;
  }
}
