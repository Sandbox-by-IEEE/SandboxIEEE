/*
  Warnings:

  - A unique constraint covering the columns `[refferalCode]` on the table `RefferalCode` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RefferalCode" DROP CONSTRAINT "RefferalCode_teamId_fkey";

-- AlterTable
ALTER TABLE "RefferalCode" ADD COLUMN     "teamName" STRING;

-- CreateIndex
CREATE UNIQUE INDEX "RefferalCode_refferalCode_key" ON "RefferalCode"("refferalCode");
