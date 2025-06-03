-- AlterTable
ALTER TABLE "UserChallenge" ADD COLUMN     "isGraded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pointsAwareded" INTEGER NOT NULL DEFAULT 0;
