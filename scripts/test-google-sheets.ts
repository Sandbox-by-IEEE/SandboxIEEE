/**
 * ============================================================================
 * TEST SCRIPT: GOOGLE SHEETS INTEGRATION
 * ============================================================================
 * 
 * Purpose: Test connection dan functionality Google Sheets API
 * 
 * Run with: npx tsx scripts/test-google-sheets.ts
 * ============================================================================
 */

import 'dotenv/config';
import { google } from 'googleapis';

async function testGoogleSheetsConnection() {
  console.log('🧪 Testing Google Sheets Integration...\n');

  // Step 1: Check environment variables
  console.log('📋 Step 1: Checking environment variables...');
  const requiredEnvVars = [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_SHEET_ID_PTC',
    'GOOGLE_SHEET_ID_TPC',
    'GOOGLE_SHEET_ID_BCC',
  ];

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:');
    missingVars.forEach((varName) => console.error(`   - ${varName}`));
    console.error('\n💡 Add these to your .env file first!\n');
    process.exit(1);
  }

  console.log('✅ All environment variables found\n');

  // Step 2: Test authentication
  console.log('🔐 Step 2: Testing Google Sheets authentication...');

  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    console.log('✅ Authentication successful\n');

    // Step 3: Test reading from each sheet
    console.log('📖 Step 3: Testing read access to sheets...\n');

    const competitions = [
      { code: 'PTC', sheetId: process.env.GOOGLE_SHEET_ID_PTC },
      { code: 'TPC', sheetId: process.env.GOOGLE_SHEET_ID_TPC },
      { code: 'BCC', sheetId: process.env.GOOGLE_SHEET_ID_BCC },
    ];

    for (const comp of competitions) {
      try {
        console.log(`   Testing ${comp.code} sheet...`);

        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: comp.sheetId!,
          range: 'Sheet1!A1:Z1', // Read header row
        });

        const headers = response.data.values?.[0] || [];
        console.log(`   ✅ ${comp.code}: Connected (${headers.length} columns found)`);

        if (headers.length > 0) {
          console.log(`      Headers: ${headers.slice(0, 5).join(', ')}${headers.length > 5 ? '...' : ''}`);
        } else {
          console.log(`      ⚠️  No headers found. Please add header row first!`);
        }
      } catch (error: any) {
        console.error(`   ❌ ${comp.code}: Failed to read sheet`);
        console.error(`      Error: ${error.message}`);

        if (error.message.includes('not found')) {
          console.error(`      💡 Check if Sheet ID is correct: ${comp.sheetId}`);
        } else if (error.message.includes('permission')) {
          console.error(`      💡 Share sheet with: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
        }
      }
    }

    console.log('\n📝 Step 4: Testing write access (append test row)...\n');

    // Test append to PTC sheet only
    const testSheetId = process.env.GOOGLE_SHEET_ID_PTC!;
    const testData = [
      [
        'TEST_' + Date.now(), // Registration ID
        'Test Team',
        'Test University',
        'Test Leader',
        'testleader@example.com',
        '081234567890',
        '4', // Member count (including leader)
        'PTC',
        'Member 1 | member1@example.com | 081234567891',
        'Member 2 | member2@example.com | 081234567892',
        'Member 3 | member3@example.com | 081234567893',
        '', // Member 4 (empty for this test)
        'pending',
        'unpaid',
        'registration',
        new Date().toISOString(),
        'test_script',
      ],
    ];

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: testSheetId,
        range: 'Sheet1!A:Z',
        valueInputOption: 'RAW',
        requestBody: {
          values: testData,
        },
      });

      console.log('   ✅ Successfully appended test row to PTC sheet');
      console.log('   📊 Check your Google Sheet to verify!\n');
    } catch (error: any) {
      console.error('   ❌ Failed to append test row');
      console.error(`      Error: ${error.message}\n`);
    }

    console.log('🎉 Test completed!\n');
    console.log('📋 Next Steps:');
    console.log('   1. Check your Google Sheets to see the test data');
    console.log('   2. Delete the test row if everything looks good');
    console.log('   3. Ready to implement registration API endpoint\n');

  } catch (error: any) {
    console.error('❌ Authentication failed');
    console.error(`   Error: ${error.message}\n`);

    if (error.message.includes('invalid_grant')) {
      console.error('💡 Possible issues:');
      console.error('   - Private key format is incorrect');
      console.error('   - Service account email is wrong');
      console.error('   - Check your .env file formatting\n');
    }

    process.exit(1);
  }
}

// Run the test
testGoogleSheetsConnection().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
