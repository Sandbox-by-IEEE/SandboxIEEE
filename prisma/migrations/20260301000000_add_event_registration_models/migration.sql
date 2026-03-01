-- AlterEnum
ALTER TYPE "admin_role" ADD VALUE 'event_admin';

-- CreateTable
CREATE TABLE "event_registrations" (
    "id" STRING NOT NULL,
    "userId" STRING,
    "eventCode" STRING NOT NULL,
    "fullName" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phoneNumber" STRING NOT NULL,
    "institution" STRING NOT NULL,
    "verificationStatus" "verification_status" NOT NULL DEFAULT 'pending',
    "rejectionReason" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_payments" (
    "id" STRING NOT NULL,
    "registrationId" STRING NOT NULL,
    "amount" INT4 NOT NULL,
    "paymentProofUrl" STRING NOT NULL,
    "paymentMethod" STRING NOT NULL DEFAULT 'QRIS',
    "billName" STRING NOT NULL,
    "status" "payment_status" NOT NULL DEFAULT 'pending',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),
    "verificationNotes" STRING,
    "verifiedBy" STRING,

    CONSTRAINT "event_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_registrations_eventCode_idx" ON "event_registrations"("eventCode");

-- CreateIndex
CREATE INDEX "event_registrations_verificationStatus_idx" ON "event_registrations"("verificationStatus");

-- CreateIndex
CREATE INDEX "event_registrations_email_idx" ON "event_registrations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "event_registrations_userId_eventCode_key" ON "event_registrations"("userId", "eventCode");

-- CreateIndex
CREATE UNIQUE INDEX "event_payments_registrationId_key" ON "event_payments"("registrationId");

-- CreateIndex
CREATE INDEX "event_payments_registrationId_idx" ON "event_payments"("registrationId");

-- CreateIndex
CREATE INDEX "event_payments_status_idx" ON "event_payments"("status");

-- AddForeignKey
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_payments" ADD CONSTRAINT "event_payments_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "event_registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
