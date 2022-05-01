import { PrismaClient } from '@prisma/client';

import { accountWithIncludes } from '../interfaces';

export const getAccountFromId = async (prisma: PrismaClient, aid: string) => {
  const account = await prisma.account.findUnique({
    where: {
      id: aid,
    },
    ...accountWithIncludes,
  });

  return account;
};
