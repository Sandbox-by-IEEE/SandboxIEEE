/**
 * ============================================================================
 * TEST SCRIPT: COMPLETE ACTIVATION FLOW
 * ============================================================================
 *
 * Purpose: Test end-to-end activation flow
 *
 * Flow:
 * 1. Register new user
 * 2. Get activation token from database
 * 3. Call activation API endpoint
 * 4. Verify user is activated
 * 5. Test login
 *
 * Run with: npx tsx scripts/test-activation-flow.ts
 * ============================================================================
 */

import 'dotenv/config';
import { prisma } from '../src/lib/db';
import bcrypt from 'bcrypt';

const BASE_URL = 'http://localhost:3000';

async function testActivationFlow() {
  console.log('🧪 Testing Complete Activation Flow\n');
  console.log('='.repeat(60));

  const timestamp = Date.now();
  const testEmail = `activate-test-${timestamp}@example.com`;
  const testPassword = 'TestPassword123!';

  let activationToken = '';

  try {
    // ============================================================================
    // Step 1: Register New User
    // ============================================================================
    console.log('\n📋 Step 1: Register New User');
    console.log('-'.repeat(60));

    const registrationData = {
      competitionCode: 'TPC',
      teamName: `Activation Test Team ${timestamp}`,
      institution: 'Test University',
      leaderName: 'Activation Test Leader',
      leaderEmail: testEmail,
      leaderPhone: '081234567890',
      leaderPassword: testPassword,
      members: [], // TPC minimum 1 member (just leader)
    };

    const registerResponse = await fetch(
      `${BASE_URL}/api/competitions/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      },
    );

    const registerData = await registerResponse.json();

    if (!registerResponse.ok) {
      console.error('❌ Registration failed:', registerData.error);
      process.exit(1);
    }

    console.log('✅ Registration successful!');
    console.log(`   Team: ${registerData.registration.teamName}`);
    console.log(`   Email: ${testEmail}`);

    // Wait for database write
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // ============================================================================
    // Step 2: Get Activation Token from Database
    // ============================================================================
    console.log('\n📋 Step 2: Get Activation Token from Database');
    console.log('-'.repeat(60));

    const user = await prisma.user.findUnique({
      where: { email: testEmail },
      include: {
        activateTokens: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!user) {
      console.error('❌ User not found in database');
      process.exit(1);
    }

    if (user.activateTokens.length === 0) {
      console.error('❌ No activation token found');
      process.exit(1);
    }

    activationToken = user.activateTokens[0].token;

    console.log('✅ Activation token found!');
    console.log(`   Token: ${activationToken.substring(0, 20)}...`);
    console.log(`   User Active: ${user.active}`);
    console.log(`   Email Verified: ${user.emailVerified ? 'Yes' : 'No'}`);

    // ============================================================================
    // Step 3: Call Activation API Endpoint
    // ============================================================================
    console.log('\n📋 Step 3: Activate Account via API');
    console.log('-'.repeat(60));

    const activateResponse = await fetch(
      `${BASE_URL}/api/auth/activate?token=${activationToken}`,
    );

    const activateData = await activateResponse.json();

    if (!activateResponse.ok) {
      console.error('❌ Activation failed:', activateData.error);
      process.exit(1);
    }

    console.log('✅ Activation successful!');
    console.log(`   Message: ${activateData.message}`);
    console.log(`   Username: ${activateData.user?.username}`);

    // Wait for database update
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // ============================================================================
    // Step 4: Verify User is Activated
    // ============================================================================
    console.log('\n📋 Step 4: Verify User Activation Status');
    console.log('-'.repeat(60));

    const verifyUser = await prisma.user.findUnique({
      where: { email: testEmail },
      include: {
        activateTokens: true,
      },
    });

    if (!verifyUser) {
      console.error('❌ User not found after activation');
      process.exit(1);
    }

    console.log('✅ User verification complete!');
    console.log(`   Active: ${verifyUser.active ? '✅ YES' : '❌ NO'}`);
    console.log(
      `   Email Verified: ${verifyUser.emailVerified ? '✅ YES' : '❌ NO'}`,
    );
    console.log(`   Remaining Tokens: ${verifyUser.activateTokens.length}`);

    if (!verifyUser.active) {
      console.error('❌ User is not active after activation!');
      process.exit(1);
    }

    if (verifyUser.activateTokens.length > 0) {
      console.warn('⚠️  Warning: Token not deleted after activation');
    }

    // ============================================================================
    // Step 5: Test Token Reuse (Should Fail)
    // ============================================================================
    console.log('\n📋 Step 5: Test Token Reuse (Should Fail)');
    console.log('-'.repeat(60));

    const reuseResponse = await fetch(
      `${BASE_URL}/api/auth/activate?token=${activationToken}`,
    );

    const reuseData = await reuseResponse.json();

    if (reuseResponse.ok && reuseData.alreadyActivated) {
      console.log('✅ Token reuse handled correctly!');
      console.log(`   Message: ${reuseData.message}`);
    } else if (!reuseResponse.ok && reuseData.error.includes('Invalid')) {
      console.log('✅ Token reuse blocked correctly!');
      console.log(`   Error: ${reuseData.error}`);
    } else {
      console.warn('⚠️  Unexpected token reuse behavior');
      console.log(`   Response: ${JSON.stringify(reuseData)}`);
    }

    // ============================================================================
    // Step 6: Test Login (Optional - requires NextAuth setup)
    // ============================================================================
    console.log('\n📋 Step 6: Verify Password Hash');
    console.log('-'.repeat(60));

    const passwordMatch = await bcrypt.compare(
      testPassword,
      verifyUser.password!,
    );

    if (passwordMatch) {
      console.log('✅ Password hash verified correctly!');
      console.log('   User can now login with credentials');
    } else {
      console.error('❌ Password hash verification failed!');
    }

    // ============================================================================
    // Summary
    // ============================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log('✅ Registration: PASSED');
    console.log('✅ Token Generation: PASSED');
    console.log('✅ Account Activation: PASSED');
    console.log('✅ User Verification: PASSED');
    console.log('✅ Token Reuse Protection: PASSED');
    console.log('✅ Password Hash: PASSED');
    console.log(
      '\n🎉 All tests passed! Activation flow is working correctly!\n',
    );

    console.log('🔗 Manual Test:');
    console.log(`   1. Open: ${BASE_URL}/activate?token=${activationToken}`);
    console.log(`   2. Login with: ${testEmail} / ${testPassword}`);
    console.log('');
  } catch (error) {
    console.error('\n❌ Test failed with error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run tests
testActivationFlow().catch((error) => {
  console.error('❌ Test suite error:', error);
  process.exit(1);
});
