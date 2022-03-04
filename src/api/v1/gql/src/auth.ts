import { Context } from '@util/context';
import mercurius from 'mercurius';

export const authCheck = (ctx: Context) => {
  if (!ctx.user) throw new mercurius.ErrorWithProps("NOT AUTHORIZED");
};
