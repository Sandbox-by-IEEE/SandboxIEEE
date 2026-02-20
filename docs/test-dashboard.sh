#!/bin/bash
# Dashboard Quick Test Script

echo "🧪 Dashboard Testing Script"
echo "=========================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local expected_code=$3
    
    echo -n "Testing $name... "
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>&1)
    
    if [ "$response" = "$expected_code" ]; then
        echo -e "${GREEN}✅ PASS${NC} (HTTP $response)"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAIL${NC} (Expected $expected_code, got $response)"
        ((FAILED++))
    fi
}

# Function to test file exists
test_file() {
    local name=$1
    local file=$2
    
    echo -n "Checking $name... "
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ EXISTS${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ MISSING${NC}"
        ((FAILED++))
    fi
}

echo "📁 File Structure Tests"
echo "----------------------"
test_file "Dashboard page" "src/app/dashboard/page.tsx"
test_file "DashboardClient" "src/app/dashboard/DashboardClient.tsx"
test_file "TeamProfileCard" "src/app/dashboard/_components/TeamProfileCard.tsx"
test_file "ProgressTracker" "src/app/dashboard/_components/ProgressTracker.tsx"
test_file "StatusBanner" "src/app/dashboard/_components/StatusBanner.tsx"
test_file "SubmissionSection" "src/app/dashboard/_components/SubmissionSection.tsx"
test_file "PreliminaryForm" "src/app/dashboard/_components/submissions/PreliminarySubmissionForm.tsx"
test_file "API route" "src/app/api/dashboard/submissions/preliminary/route.ts"
test_file "Mascot 3" "public/mascots/mascot-3.svg"
test_file "Mascot 4" "public/mascots/mascot-4.svg"
test_file "Mascot 5" "public/mascots/mascot-5.svg"
echo ""

echo "🌐 Endpoint Tests"
echo "----------------"
test_endpoint "Homepage" "http://localhost:3000" "200"
test_endpoint "Dashboard (auth required)" "http://localhost:3000/dashboard" "307"
test_endpoint "Login page" "http://localhost:3000/login" "200"
test_endpoint "Competitions" "http://localhost:3000/competitions" "200"
test_endpoint "API Health" "http://localhost:3000/api/competitions" "200"
echo ""

echo "🏗️ Build Test"
echo "-------------"
echo "Running production build..."
cd /Users/jae/Documents/sandbox/SandboxIEEE
npm run build > /tmp/dashboard-build.log 2>&1
BUILD_EXIT=$?

if [ $BUILD_EXIT -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful${NC}"
    ((PASSED++))
    
    # Check if dashboard route exists in build
    if grep -q "ƒ /dashboard" /tmp/dashboard-build.log; then
        echo -e "${GREEN}✅ Dashboard route compiled${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ Dashboard route not found in build${NC}"
        ((FAILED++))
    fi
else
    echo -e "${RED}❌ Build failed${NC}"
    echo "Check /tmp/dashboard-build.log for details"
    ((FAILED++))
fi
echo ""

echo "📊 Test Summary"
echo "==============="
TOTAL=$((PASSED + FAILED))
echo "Total tests: $TOTAL"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Please review.${NC}"
    exit 1
fi
