-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING,
    "email" STRING,
    "emailVerified" TIMESTAMP(3),
    "image" STRING,
    "password" STRING,
    "karyaId" STRING,
    "active" BOOL NOT NULL DEFAULT false,
    "credential" BOOL DEFAULT false,
    "username" STRING,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivateToken" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "token" STRING NOT NULL,
    "activatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivateToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetToken" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "token" STRING NOT NULL,
    "activatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT8,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" STRING NOT NULL,
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "RegisExhiData" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "collectiveType" STRING NOT NULL DEFAULT '1',
    "registrationType" STRING NOT NULL,
    "verified" BOOL NOT NULL DEFAULT false,
    "paymentMethod" STRING NOT NULL,
    "paymentProof" STRING NOT NULL,
    "statusData" STRING NOT NULL DEFAULT 'waiting',

    CONSTRAINT "RegisExhiData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketGS" (
    "id" STRING NOT NULL,
    "active" BOOL NOT NULL DEFAULT false,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "idLine" STRING NOT NULL,
    "regisId" STRING,
    "transactionDetailId" STRING,

    CONSTRAINT "TicketGS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketExhibition" (
    "id" STRING NOT NULL,
    "verified" BOOL NOT NULL DEFAULT false,
    "active" BOOL NOT NULL DEFAULT false,
    "userId" STRING NOT NULL,
    "nameCustomer" STRING NOT NULL,
    "paymentMethod" STRING NOT NULL,
    "proof" STRING NOT NULL,
    "names" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "address" STRING NOT NULL,
    "institution" STRING NOT NULL,
    "phoneNumber" STRING NOT NULL,
    "ages" STRING NOT NULL,
    "amountPrice" STRING NOT NULL,
    "ticketType" STRING NOT NULL,

    CONSTRAINT "TicketExhibition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketCompetition" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "competitionType" STRING NOT NULL,
    "verified" STRING NOT NULL DEFAULT 'pending',

    CONSTRAINT "TicketCompetition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" STRING NOT NULL,
    "ticketId" STRING NOT NULL,
    "teamName" STRING NOT NULL,
    "chairmanName" STRING NOT NULL,
    "chairmanEmail" STRING NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abstract" (
    "id" STRING NOT NULL,
    "teamId" STRING NOT NULL,
    "teamName" STRING NOT NULL,
    "letterPlagiarism" STRING NOT NULL,
    "abstract" STRING NOT NULL,
    "status" STRING NOT NULL DEFAULT 'waiting',

    CONSTRAINT "Abstract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantCompetition" (
    "id" STRING NOT NULL,
    "teamId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "institution" STRING NOT NULL,
    "phoneNumber" STRING NOT NULL,
    "age" STRING NOT NULL,
    "twibbonProof" STRING NOT NULL,
    "studentProof" STRING NOT NULL,

    CONSTRAINT "ParticipantCompetition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regist3Data" (
    "id" STRING NOT NULL,
    "teamId" STRING NOT NULL,
    "teamName" STRING NOT NULL,
    "statusPayment" STRING NOT NULL DEFAULT 'waiting',
    "billName" STRING NOT NULL,
    "paymentProof" STRING NOT NULL,
    "paymentMethod" STRING NOT NULL,

    CONSTRAINT "Regist3Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Karya" (
    "id" STRING NOT NULL,
    "countVote" INT8 NOT NULL DEFAULT 0,
    "teamId" STRING NOT NULL,
    "linkFullPaper" STRING,
    "linkVideo" STRING,
    "linkVideo2" STRING,

    CONSTRAINT "Karya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionDetail" (
    "id" STRING NOT NULL,
    "total" INT8 NOT NULL,
    "status" STRING NOT NULL DEFAULT 'no-status',
    "statusData" STRING NOT NULL DEFAULT 'waiting',
    "customerName" STRING NOT NULL,
    "customerEmail" STRING NOT NULL,
    "registrationType" STRING NOT NULL,
    "paymentType" STRING,
    "snapToken" STRING NOT NULL,
    "snapRedirectURL" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "metadata" JSONB,
    "deletedData" JSONB,

    CONSTRAINT "TransactionDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NewKaryaRelation" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ActivateToken_token_key" ON "ActivateToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_token_key" ON "ResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "RegisExhiData_userId_key" ON "RegisExhiData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TicketExhibition_userId_key" ON "TicketExhibition"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_ticketId_key" ON "Team"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamName_key" ON "Team"("teamName");

-- CreateIndex
CREATE UNIQUE INDEX "Abstract_teamId_key" ON "Abstract"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Regist3Data_teamId_key" ON "Regist3Data"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Karya_teamId_key" ON "Karya"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "_NewKaryaRelation_AB_unique" ON "_NewKaryaRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_NewKaryaRelation_B_index" ON "_NewKaryaRelation"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_karyaId_fkey" FOREIGN KEY ("karyaId") REFERENCES "Karya"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivateToken" ADD CONSTRAINT "ActivateToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetToken" ADD CONSTRAINT "ResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisExhiData" ADD CONSTRAINT "RegisExhiData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketGS" ADD CONSTRAINT "TicketGS_regisId_fkey" FOREIGN KEY ("regisId") REFERENCES "RegisExhiData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketGS" ADD CONSTRAINT "TicketGS_transactionDetailId_fkey" FOREIGN KEY ("transactionDetailId") REFERENCES "TransactionDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketExhibition" ADD CONSTRAINT "TicketExhibition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketCompetition" ADD CONSTRAINT "TicketCompetition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "TicketCompetition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abstract" ADD CONSTRAINT "Abstract_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantCompetition" ADD CONSTRAINT "ParticipantCompetition_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regist3Data" ADD CONSTRAINT "Regist3Data_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karya" ADD CONSTRAINT "Karya_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDetail" ADD CONSTRAINT "TransactionDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewKaryaRelation" ADD CONSTRAINT "_NewKaryaRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Karya"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewKaryaRelation" ADD CONSTRAINT "_NewKaryaRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

