/*
  Warnings:

  - You are about to drop the column `buttonHex` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `tagHex` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `titleHex` on the `Challenge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "buttonHex",
DROP COLUMN "tagHex",
DROP COLUMN "titleHex",
ADD COLUMN     "themeColor" TEXT NOT NULL DEFAULT 'blue';
