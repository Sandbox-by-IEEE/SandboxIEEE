/**
 * ============================================================================
 * THE SANDBOX 3.0 - DATABASE SEED SCRIPT
 * ============================================================================
 * 
 * Purpose: Initialize database with required data for development/production
 * 
 * Seeds:
 * 1. Competition configurations (PTC, TPC, BCC)
 * 2. Initial Super Admin account
 * 
 * Usage:
 *   npx prisma db seed
 * 
 * ⚠️ WARNING: Change Super Admin password immediately after first login!
 * ============================================================================
 */

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ============================================================================
  // 1. Seed Competition Configurations
  // ============================================================================
  console.log('📋 Seeding Competition configurations...');

  // ProtoTech Contest (PTC)
  const ptc = await prisma.competition.upsert({
    where: { code: 'PTC' },
    update: {},
    create: {
      code: 'PTC',
      name: 'ProtoTech Contest',
      description:
        'Hardware and IoT prototype competition for innovative technology solutions',
      registrationDeadline: new Date('2026-08-01T23:59:59+07:00'), // Aug 1, 2026
      preliminaryDeadline: new Date('2026-08-15T23:59:59+07:00'), // Aug 15, 2026
      semifinalDeadline: new Date('2026-09-01T23:59:59+07:00'), // Sep 1, 2026
      finalDeadline: null, // Live pitching only (no file submission)
      registrationFee: 150000, // IDR 150,000
      minTeamSize: 3,
      maxTeamSize: 5,
      isActive: true,
    },
  });
  console.log('  ✅ PTC created:', ptc.name);

  // Technovate Paper Competition (TPC)
  const tpc = await prisma.competition.upsert({
    where: { code: 'TPC' },
    update: {},
    create: {
      code: 'TPC',
      name: 'Technovate Paper Competition',
      description:
        'Research paper competition for academic innovation and technology advancement',
      registrationDeadline: new Date('2026-08-01T23:59:59+07:00'),
      preliminaryDeadline: new Date('2026-08-15T23:59:59+07:00'),
      semifinalDeadline: new Date('2026-09-01T23:59:59+07:00'),
      finalDeadline: null, // Live presentation only
      registrationFee: 100000, // IDR 100,000
      minTeamSize: 1,
      maxTeamSize: 3,
      isActive: true,
    },
  });
  console.log('  ✅ TPC created:', tpc.name);

  // Business Case Competition (BCC)
  const bcc = await prisma.competition.upsert({
    where: { code: 'BCC' },
    update: {},
    create: {
      code: 'BCC',
      name: 'Business Case Competition',
      description:
        'Business case analysis competition for innovative business solutions',
      registrationDeadline: new Date('2026-08-01T23:59:59+07:00'),
      preliminaryDeadline: new Date('2026-08-15T23:59:59+07:00'),
      semifinalDeadline: new Date('2026-09-01T23:59:59+07:00'),
      finalDeadline: new Date('2026-09-10T23:59:59+07:00'), // Final pitch deck required
      registrationFee: 125000, // IDR 125,000
      minTeamSize: 3,
      maxTeamSize: 3, // Fixed team size
      isActive: true,
    },
  });
  console.log('  ✅ BCC created:', bcc.name);

  // ============================================================================
  // 2. Seed Initial Super Admin
  // ============================================================================
  console.log('\n👤 Seeding Super Admin account...');

  const SUPER_ADMIN_PASSWORD = 'SuperAdmin2026!'; // ⚠️ CHANGE IMMEDIATELY
  const hashedPassword = await hash(SUPER_ADMIN_PASSWORD, 10);

  const superAdmin = await prisma.admin.upsert({
    where: { username: 'superadmin' },
    update: {},
    create: {
      username: 'superadmin',
      email: 'admin@sandbox.ieee-itb.org',
      password: hashedPassword,
      adminRole: 'super_admin',
      isActive: true,
    },
  });

  console.log('  ✅ Super Admin created:');
  console.log('     Username:', superAdmin.username);
  console.log('     Email:', superAdmin.email);
  console.log('     Password:', SUPER_ADMIN_PASSWORD);
  console.log(
    '     ⚠️  WARNING: Change this password immediately after first login!'
  );

  // ============================================================================
  // Seed Summary
  // ============================================================================
  console.log('\n✨ Database seed completed successfully!\n');
  console.log('📊 Summary:');
  console.log('   - Competitions:', 3, '(PTC, TPC, BCC)');
  console.log('   - Admins:', 1, '(Super Admin)');
  console.log('\n🔐 Super Admin Credentials:');
  console.log('   Username: superadmin');
  console.log('   Password:', SUPER_ADMIN_PASSWORD);
  console.log('\n🚀 Next steps:');
  console.log('   1. Login to admin panel: /admin/login');
  console.log('   2. Change Super Admin password immediately');
  console.log('   3. Create additional admin accounts for staff');
  console.log('   4. Update competition deadlines if needed\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
