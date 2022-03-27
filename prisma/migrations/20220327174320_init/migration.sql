/*
  Warnings:

  - You are about to drop the column `domainId` on the `Server` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Server" DROP CONSTRAINT "Server_domainId_fkey";

-- AlterTable
ALTER TABLE "Server" DROP COLUMN "domainId";

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_startId_fkey" FOREIGN KEY ("startId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_startId_fkey" FOREIGN KEY ("startId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
