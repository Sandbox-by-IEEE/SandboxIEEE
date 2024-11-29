-- DropForeignKey
ALTER TABLE "RefferalCode" DROP CONSTRAINT "RefferalCode_teamId_fkey";

-- AlterTable
ALTER TABLE "RefferalCode" ALTER COLUMN "teamId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RefferalCode" ADD CONSTRAINT "RefferalCode_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
