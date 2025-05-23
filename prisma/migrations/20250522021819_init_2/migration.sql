-- AlterTable
ALTER TABLE "User" ALTER COLUMN "totalCoinsAchieved" SET DEFAULT 0,
ALTER COLUMN "achievements" SET DEFAULT ARRAY[]::TEXT[];
