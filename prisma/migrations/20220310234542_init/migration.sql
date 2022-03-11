/*
  Warnings:

  - You are about to drop the column `authInfo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `authProvider` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `friends` on the `User` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "authInfo",
DROP COLUMN "authProvider",
DROP COLUMN "friends",
ADD COLUMN     "accountId" BIGINT NOT NULL,
ADD COLUMN     "friendIds" BIGINT[];

-- CreateTable
CREATE TABLE "Account" (
    "id" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "authInfo" JSONB[],
    "authProvider" "Provider" NOT NULL DEFAULT E'EMAIL',
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
