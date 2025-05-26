/*
  Warnings:

  - You are about to drop the column `status` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `coinsEarned` on the `UserChallenge` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UserChallenge` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `UserChallenge` table. All the data in the column will be lost.
  - Added the required column `buttonHex` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageAlt` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagHex` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleHex` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleIcon` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserChallenge" DROP CONSTRAINT "UserChallenge_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "UserChallenge" DROP CONSTRAINT "UserChallenge_userId_fkey";

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "status",
ADD COLUMN     "buttonHex" JSONB NOT NULL,
ADD COLUMN     "imageAlt" TEXT NOT NULL,
ADD COLUMN     "lockStatus" TEXT NOT NULL DEFAULT 'inactive',
ADD COLUMN     "tagHex" JSONB NOT NULL,
ADD COLUMN     "titleHex" TEXT NOT NULL,
ADD COLUMN     "titleIcon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserChallenge" DROP COLUMN "coinsEarned",
DROP COLUMN "status",
DROP COLUMN "submittedAt",
ADD COLUMN     "submissionStatus" TEXT NOT NULL DEFAULT 'Pending';

-- AddForeignKey
ALTER TABLE "UserChallenge" ADD CONSTRAINT "UserChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChallenge" ADD CONSTRAINT "UserChallenge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
