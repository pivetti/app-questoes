/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_ownerId_fkey";

-- DropIndex
DROP INDEX "Question_ownerId_idx";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "ownerId";
