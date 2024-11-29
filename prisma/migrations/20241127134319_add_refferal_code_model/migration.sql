-- CreateTable
CREATE TABLE "RefferalCode" (
    "id" STRING NOT NULL,
    "refferalCode" STRING NOT NULL,
    "isUsed" BOOL NOT NULL DEFAULT false,
    "teamId" STRING NOT NULL,

    CONSTRAINT "RefferalCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefferalCode_teamId_key" ON "RefferalCode"("teamId");

-- AddForeignKey
ALTER TABLE "RefferalCode" ADD CONSTRAINT "RefferalCode_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
