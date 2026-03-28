/**
 * ============================================================================
 * ONE-TIME ADMIN SCRIPT: Manual Registration Insertion
 * ============================================================================
 *
 * Purpose: Insert a team registration for a team that attempted to register
 * before the March 16, 23:59 WIB deadline but whose data was not saved due
 * to the file upload bug.
 *
 * This script:
 * - Accepts team registration data as a structured JSON payload
 * - Uses the same validation and schema as normal registration
 * - Bypasses the registration deadline check (one-time, scoped operation)
 * - Creates: User → CompetitionRegistration → Team → TeamMembers → Payment
 * - Does NOT modify or delete any existing records
 *
 * Usage:
 *   npx tsx scripts/admin-insert-registration.ts
 *
 * Before running:
 *   1. Fill in the REGISTRATION_DATA below with the affected team's info
 *   2. Verify the data is correct
 *   3. Run the script
 *   4. Verify the record appears in the admin dashboard
 *
 * After use:
 *   This script is inert — it only runs when explicitly invoked.
 *   No permanent backdoor or API endpoint is created.
 *
 * ============================================================================
 */

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// ============================================================================
// REGISTRATION DATA — Fill in before running
// ============================================================================

interface TeamMemberData {
  fullName: string;
  email: string;
  phoneNumber: string;
  institution: string;
}

interface RegistrationPayload {
  // Competition: "BCC" | "PTC" | "TPC"
  competitionCode: 'BCC' | 'PTC' | 'TPC';

  // Team info
  teamName: string;

  // Leader info (leader is also a team member at orderIndex 0)
  leader: {
    fullName: string;
    email: string; // Must be unique — this becomes the User account email
    phoneNumber: string;
    institution: string;
    password: string; // Temporary password for the leader's account
  };

  // Additional team members (orderIndex 1, 2, ...)
  members: TeamMemberData[];

  // Payment info (optional — skip if payment was handled externally)
  payment?: {
    amount: number; // Amount in IDR (e.g., 150000)
    paymentMethod: string; // e.g., "QRIS", "Bank Transfer"
    billName: string; // Name on payment proof
    paymentProofUrl: string; // URL to payment proof (upload manually to Supabase first, or provide external URL)
  };

  // Optional: Google Drive link for proof of registration (KTM, etc.)
  proofOfRegistrationLink?: string;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  FILL IN THE AFFECTED TEAM'S DATA BELOW                                  ║
// ║  Replace the placeholder values with actual data from the team.           ║
// ╚════════════════════════════════════════════════════════════════════════════╝

const REGISTRATION_DATA: RegistrationPayload = {
  competitionCode: 'TPC',

  teamName: 'Frieda Filza Ester Merasuki ITB',

  leader: {
    fullName: 'Esteranza Early Syakira',
    email: 'syakira.early.esteranza@gmail.com',
    phoneNumber: '087872011202',
    institution: 'SMA Al-Hikmah Surabaya',
    password: 'TempPass123!',
  },

  members: [
    {
      fullName: 'Frieda Nadhine Isradanti',
      email: '',
      phoneNumber: '081232538925',
      institution: 'SMA Al-Hikmah Surabaya',
    },
    {
      fullName: 'Filza Naura Leatisa Djokovik',
      email: '',
      phoneNumber: '081222250499',
      institution: 'SMA Al-Hikmah Surabaya',
    },
  ],

  proofOfRegistrationLink:
    'https://drive.google.com/drive/folders/1JDGaco-ukJ5MqV0E-2ui2im9CBtcS7dX',
};

// ============================================================================
// SCRIPT LOGIC — Do not modify below this line
// ============================================================================

async function insertRegistration(data: RegistrationPayload) {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  ADMIN: Manual Registration Insertion                ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  // ── Step 1: Validate competition exists ──
  console.log('1️⃣  Checking competition...');
  const competition = await prisma.competition.findUnique({
    where: { code: data.competitionCode },
  });

  if (!competition) {
    throw new Error(
      `Competition "${data.competitionCode}" not found in database.`,
    );
  }
  console.log(`   ✅ Competition: ${competition.name} (${competition.code})`);

  // ── Step 2: Validate team size ──
  const totalMembers = data.members.length + 1; // +1 for leader
  if (
    totalMembers < competition.minTeamSize ||
    totalMembers > competition.maxTeamSize
  ) {
    throw new Error(
      `Team size ${totalMembers} is invalid for ${data.competitionCode}. ` +
        `Required: ${competition.minTeamSize}-${competition.maxTeamSize} members.`,
    );
  }
  console.log(`   ✅ Team size: ${totalMembers} members (valid)`);

  // ── Step 3: Check for duplicate team name ──
  console.log('2️⃣  Checking for conflicts...');
  const existingTeam = await prisma.team.findFirst({
    where: {
      teamName: data.teamName,
      registration: { competitionId: competition.id },
    },
  });

  if (existingTeam) {
    throw new Error(
      `Team name "${data.teamName}" already exists in ${data.competitionCode}.`,
    );
  }

  // ── Step 4: Check for duplicate user ──
  const existingUser = await prisma.user.findUnique({
    where: { email: data.leader.email.toLowerCase() },
    include: { registration: true },
  });

  if (existingUser?.registration) {
    throw new Error(
      `User ${data.leader.email} is already registered for a competition. ` +
        `Registration ID: ${existingUser.registration.id}`,
    );
  }
  console.log('   ✅ No conflicts found');

  // ── Step 5: Create or find user ──
  console.log('3️⃣  Creating user account...');
  let user: { id: string; email: string };

  if (existingUser) {
    // User account exists but has no competition registration
    user = existingUser;
    console.log(
      `   ℹ️  Using existing user account: ${user.email} (${user.id})`,
    );
  } else {
    // Create new user account
    const hashedPassword = await hash(data.leader.password, 10);
    user = await prisma.user.create({
      data: {
        username:
          data.leader.email.split('@')[0] + '_' + Date.now().toString(36),
        name: data.leader.fullName,
        email: data.leader.email.toLowerCase(),
        password: hashedPassword,
        active: true, // Skip email verification for admin-inserted registrations
        emailVerified: new Date(), // Mark as verified
      },
    });
    console.log(`   ✅ Created user: ${user.email} (${user.id})`);
  }

  // ── Step 6: Create registration, team, members, and payment in a transaction ──
  console.log('4️⃣  Creating registration record...');

  const registration = await prisma.$transaction(async (tx) => {
    // Create CompetitionRegistration
    const reg = await tx.competitionRegistration.create({
      data: {
        userId: user.id,
        competitionId: competition.id,
        verificationStatus: 'pending',
        currentPhase: 'registration',
        team: {
          create: {
            teamName: data.teamName,
            proofOfRegistrationLink: data.proofOfRegistrationLink || '',
            leaderUserId: user.id,
            members: {
              create: [
                // Leader as first member (orderIndex 0)
                {
                  fullName: data.leader.fullName,
                  email: data.leader.email.toLowerCase(),
                  phoneNumber: data.leader.phoneNumber,
                  institution: data.leader.institution,
                  orderIndex: 0,
                },
                // Additional team members
                ...data.members.map((member, idx) => ({
                  fullName: member.fullName,
                  email: member.email.toLowerCase(),
                  phoneNumber: member.phoneNumber,
                  institution: member.institution,
                  orderIndex: idx + 1,
                })),
              ],
            },
          },
        },
      },
    });

    // Create Payment record (if payment data provided)
    if (data.payment) {
      await tx.payment.create({
        data: {
          registrationId: reg.id,
          amount: data.payment.amount,
          paymentProofUrl: data.payment.paymentProofUrl,
          paymentMethod: data.payment.paymentMethod,
          billName: data.payment.billName,
          status: 'pending',
        },
      });
    }

    return reg;
  });

  console.log(`   ✅ Registration created: ${registration.id}`);

  // ── Step 7: Verify the record ──
  console.log('5️⃣  Verifying inserted record...');
  const fullRecord = await prisma.competitionRegistration.findUnique({
    where: { id: registration.id },
    include: {
      user: { select: { id: true, email: true, name: true, active: true } },
      competition: { select: { code: true, name: true } },
      team: {
        include: {
          members: { orderBy: { orderIndex: 'asc' } },
        },
      },
      payment: true,
    },
  });

  if (!fullRecord) {
    throw new Error(
      'CRITICAL: Registration was created but could not be verified!',
    );
  }

  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  ✅ REGISTRATION INSERTED SUCCESSFULLY               ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('\n📋 Summary:');
  console.log(`   Registration ID:  ${fullRecord.id}`);
  console.log(
    `   Competition:      ${fullRecord.competition.name} (${fullRecord.competition.code})`,
  );
  console.log(`   Team Name:        ${fullRecord.team?.teamName}`);
  console.log(
    `   Leader:           ${fullRecord.user.name} (${fullRecord.user.email})`,
  );
  console.log(`   Members:          ${fullRecord.team?.members.length} total`);
  fullRecord.team?.members.forEach((m, i) => {
    console.log(
      `     ${i === 0 ? '👑' : '  '} ${m.fullName} — ${m.email} (${m.institution})`,
    );
  });
  console.log(
    `   Payment:          ${fullRecord.payment ? `Rp ${fullRecord.payment.amount.toLocaleString('id-ID')} (${fullRecord.payment.status})` : 'N/A (handled externally)'}`,
  );
  console.log(`   Status:           ${fullRecord.verificationStatus}`);
  console.log(`   Phase:            ${fullRecord.currentPhase}`);
  console.log(`   User Active:      ${fullRecord.user.active}`);
  console.log('\n📌 Next Steps:');
  console.log('   1. Verify record in admin dashboard at /admin/registrations');
  console.log('   2. Approve the registration if payment proof is valid');
  console.log('   3. Share login credentials with the team leader:');
  console.log(`      Email: ${data.leader.email}`);
  console.log(`      Password: ${data.leader.password}`);
  console.log(
    '      (Remind them to change their password after first login)\n',
  );
}

// ── Entry point ──
async function main() {
  // Safety check: ensure placeholder data is replaced
  if (
    REGISTRATION_DATA.teamName === 'TEAM_NAME_HERE' ||
    REGISTRATION_DATA.leader.email === 'leader@example.com'
  ) {
    console.error(
      '\n❌ ERROR: Please fill in the REGISTRATION_DATA with actual team data before running.',
    );
    console.error('   Open this file and replace all placeholder values.\n');
    process.exit(1);
  }

  try {
    await insertRegistration(REGISTRATION_DATA);
  } catch (error) {
    console.error(
      '\n❌ FAILED:',
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
