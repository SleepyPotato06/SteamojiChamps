/*
  Warnings:

  - Added the required column `platform` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "reference" JSONB NOT NULL;
