import { PrismaClient } from '@prisma/client';

export const getAccountFromId = async (prisma: PrismaClient, aid: string) => {
  const account = await prisma.account.findUnique({
    where: {
      id: aid,
    },
  });

  return account;
};
