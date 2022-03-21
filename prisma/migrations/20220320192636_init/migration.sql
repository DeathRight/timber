-- CreateEnum
CREATE TYPE "InviteType" AS ENUM ('Server', 'GroupChat', 'Friend');

-- CreateTable
CREATE TABLE "Invite" (
    "id" BIGINT NOT NULL,
    "type" "InviteType" NOT NULL,
    "partyId" BIGINT NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);
