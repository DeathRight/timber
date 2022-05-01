import { PrismaClient } from '@prisma/client';

import { userWithIncludes } from '../interfaces';

export const getUserFromAccount = async (
  prisma: PrismaClient,
  aid: string,
  uid: BigInt
) => {
  const user = await prisma.user.findFirst({
    where: {
      id: uid as bigint, //schema compat
      accountId: aid,
    },
    ...userWithIncludes,
  });

  return user;
};
