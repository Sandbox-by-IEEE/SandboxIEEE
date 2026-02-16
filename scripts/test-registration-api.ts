/**
 * ============================================================================
 * TEST SCRIPT: REGISTRATION API ENDPOINTS
 * ============================================================================
 * 
 * Run with: npx tsx scripts/test-registration-api.ts
 * 
 * Tests:
 * 1. GET /api/competitions - List all competitions
 * 2. GET /api/competitions/[code] - Get competition details
 * 3. POST /api/competitions/register - Register team
 * 4. GET /api/competitions/register?email=... - Check registration
 * ============================================================================
 */

import 'dotenv/config';

const BASE_URL = 'http://localhost:3000'; // Force localhost for testing

async function testRegistrationAPI() {
  console.log('🧪 Testing Registration API Endpoints...\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  // Test 1: List all competitions
  console.log('📋 Test 1: GET /api/competitions');
  try {
    const response = await fetch(`${BASE_URL}/api/competitions`);
    const data = await response.json();

    if (response.ok) {
      console.log('✅ Success!');
      console.log(`   Found ${data.competitions.length} competitions:`);
      data.competitions.forEach((comp: any) => {
        console.log(`   - ${comp.code}: ${comp.name} (${comp.teamSize.min}-${comp.teamSize.max} members)`);
      });
    } else {
      console.log('❌ Failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Error:', error);
  }

  console.log('\n---\n');

  // Test 2: Get PTC competition details
  console.log('📋 Test 2: GET /api/competitions/PTC');
  try {
    const response = await fetch(`${BASE_URL}/api/competitions/PTC`);
    const data = await response.json();

    if (response.ok) {
      console.log('✅ Success!');
      console.log(`   Name: ${data.name}`);
      console.log(`   Code: ${data.code}`);
      console.log(`   Team Size: ${data.teamSize.min}-${data.teamSize.max}`);
      console.log(`   Fee: Rp ${data.registrationFee.toLocaleString()}`);
      console.log(`   Active: ${data.isActive}`);
      console.log(`   Registrations: ${data.registrationCount}`);
    } else {
      console.log('❌ Failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Error:', error);
  }

  console.log('\n---\n');

  // Test 3: Check if email is registered
  const testEmail = 'testuser' + Date.now() + '@example.com';
  console.log(`📋 Test 3: GET /api/competitions/register?email=${testEmail}`);
  try {
    const response = await fetch(
      `${BASE_URL}/api/competitions/register?email=${testEmail}`
    );
    const data = await response.json();

    if (response.ok) {
      console.log('✅ Success!');
      console.log(`   Registered: ${data.registered}`);
      if (data.registered) {
        console.log(`   Team: ${data.registration.teamName}`);
        console.log(`   Competition: ${data.registration.competition}`);
      }
    } else {
      console.log('❌ Failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Error:', error);
  }

  console.log('\n---\n');

  // Test 4: Register a team
  console.log('📋 Test 4: POST /api/competitions/register');
  const registrationData = {
    competitionCode: 'PTC',
    teamName: 'Test Team ' + Date.now(),
    institution: 'Test University',
    leaderName: 'Test Leader',
    leaderEmail: testEmail,
    leaderPhone: '081234567890',
    leaderPassword: 'TestPassword123!',
    members: [
      {
        fullName: 'Member 1',
        email: 'member1_' + Date.now() + '@example.com',
        phoneNumber: '081234567891',
      },
      {
        fullName: 'Member 2',
        email: 'member2_' + Date.now() + '@example.com',
        phoneNumber: '081234567892',
      },
    ],
  };

  try {
    const response = await fetch(`${BASE_URL}/api/competitions/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('✅ Registration Success!');
      console.log(`   Team: ${data.registration.teamName}`);
      console.log(`   Competition: ${data.registration.competition}`);
      console.log(`   Members: ${data.registration.memberCount}`);
      console.log(`   Status: ${data.registration.status}`);
      console.log(`   Phase: ${data.registration.currentPhase}`);
      console.log(`   Message: ${data.message}`);
    } else {
      console.log('❌ Registration Failed:', data.error);
      if (data.details) {
        data.details.forEach((detail: any) => {
          console.log(`   - ${detail.field}: ${detail.message}`);
        });
      }
    }
  } catch (error) {
    console.log('❌ Error:', error);
  }

  console.log('\n---\n');

  // Test 5: Verify registration was saved
  console.log(`📋 Test 5: Verify registration - GET /api/competitions/register?email=${testEmail}`);
  try {
    const response = await fetch(
      `${BASE_URL}/api/competitions/register?email=${testEmail}`
    );
    const data = await response.json();

    if (response.ok) {
      console.log('✅ Success!');
      console.log(`   Registered: ${data.registered}`);
      if (data.registered) {
        console.log(`   Team: ${data.registration.teamName}`);
        console.log(`   Competition: ${data.registration.competition} (${data.registration.competitionCode})`);
        console.log(`   Members: ${data.registration.memberCount}`);
        console.log(`   Status: ${data.registration.status}`);
        console.log(`   Active: ${data.registration.isActive}`);
      }
    } else {
      console.log('❌ Failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Error:', error);
  }

  console.log('\n🎉 Test completed!\n');
}

// Run tests
testRegistrationAPI().catch((error) => {
  console.error('❌ Test suite error:', error);
  process.exit(1);
});
