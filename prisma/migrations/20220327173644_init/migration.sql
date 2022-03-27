/*
  Warnings:

  - You are about to drop the column `start` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Server` table. All the data in the column will be lost.
  - Added the required column `startId` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domainId` to the `Server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startId` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Domain" DROP COLUMN "start",
ADD COLUMN     "startId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Server" DROP COLUMN "start",
ADD COLUMN     "domainId" BIGINT NOT NULL,
ADD COLUMN     "startId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
