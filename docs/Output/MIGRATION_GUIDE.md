# 🚀 THE SANDBOX 3.0 - DATABASE MIGRATION GUIDE

## Overview

This guide walks you through migrating from Sandbox v2.0 to v3.0 with a **fresh database schema**.

### Migration Strategy: Fresh Start (Drop All Tables)

**Decision:** Clean slate approach - all v2.0 tables will be dropped and new v3.0 schema will be created.

**Reason:** v3.0 has significant architectural changes (one-user-one-competition constraint, new models, different relationships) that make data migration complex and potentially error-prone.

---

## ⚠️ BEFORE YOU BEGIN

### Backup Checklist

**If you want to preserve any v2.0 data:**

```bash
# Export current database (optional)
pg_dump $DATABASE_URL > backup_sandbox_v2_$(date +%Y%m%d).sql
```

**What will be LOST:**

- ❌ All user accounts (participants will need to re-register)
- ❌ All team registrations
- ❌ All submissions (abstracts, payments, etc.)
- ❌ Exhibition data, grand seminar tickets
- ❌ Voting data (Karya system)

**What will be PRESERVED:**

- ✅ CockroachDB cluster (not deleted)
- ✅ Environment variables
- ✅ UploadThing files (CDN remains accessible)
- ✅ Google Sheets exports (if you have them)

---

## 📋 STEP-BY-STEP MIGRATION

### Step 1: Verify Environment

```bash
# Check current directory
pwd  # Should be: /Users/jae/Documents/sandbox/SandboxIEEE

# Verify .env file exists and has DATABASE_URL
cat .env | grep DATABASE_URL

# Install dependencies (if not already installed)
npm install
```

### Step 2: Generate Prisma Client

```bash
# Generate TypeScript types from new schema
npx prisma generate
```

**Expected output:**

```
✔ Generated Prisma Client (5.x.x) to ./node_modules/@prisma/client
```

### Step 3: Push New Schema to Database

**⚠️ WARNING: This will DROP ALL EXISTING TABLES**

```bash
# Push schema and run seed script
npm run db:push
```

**What this does:**

1. Drops all existing tables in database
2. Creates new v3.0 tables based on `prisma/schema.prisma`
3. Runs `prisma/seed.ts` to insert:
   - 3 Competition records (PTC, TPC, BCC)
   - 1 Super Admin account

**Expected output:**

```
🌱 Starting database seed...

📋 Seeding Competition configurations...
  ✅ PTC created: ProtoTech Contest
  ✅ TPC created: Technovate Paper Competition
  ✅ BCC created: Business Case Competition

👤 Seeding Super Admin account...
  ✅ Super Admin created:
     Username: superadmin
     Email: admin@sandbox.ieee-itb.org
     Password: SuperAdmin2026!
     ⚠️  WARNING: Change this password immediately after first login!

✨ Database seed completed successfully!
```

### Step 4: Verify Migration

```bash
# Open Prisma Studio to inspect database
npm run studio
```

**Verify in Prisma Studio (http://localhost:5555):**

- ✅ 3 records in `competitions` table
- ✅ 1 record in `admins` table
- ✅ All 15 tables exist:
  - users, accounts, sessions, verification_tokens
  - activate_tokens, reset_tokens
  - competitions, competition_registrations
  - teams, team_members
  - preliminary_submissions, payments
  - semifinal_submissions, final_submissions
  - admins

### Step 5: Test Super Admin Login

**Initial Super Admin Credentials:**

```
Username: superadmin
Email: admin@sandbox.ieee-itb.org
Password: SuperAdmin2026!
```

**Test login:**

1. Start dev server: `npm run dev`
2. Navigate to admin panel (create this page later)
3. Login with above credentials
4. **IMMEDIATELY** change password after first login

### Step 6: Update NextAuth Configuration

**Current state:** `src/lib/authOptions.ts` still uses v2.0 session structure.

**Action required:** After schema deployment, update session callbacks to use new structure.

**Reference for later update:**

```typescript
// OLD v2.0 structure
session.user.ticketsCompetition = [...]

// NEW v3.0 structure
session.user.registration = {...}
```

**⚠️ NOTE:** Do NOT update `authOptions.ts` immediately - this will be done in Phase 2 to avoid breaking existing pages.

---

## 🔄 Alternative: Manual Migration (If Needed)

If you decide later to preserve some v2.0 data:

```bash
# Step 1: Export v2.0 data
npx prisma db pull --schema=prisma/schema.v2.prisma

# Step 2: Create migration script (manual)
# src/scripts/migrate-v2-to-v3.ts

# Step 3: Run migration
npx tsx src/scripts/migrate-v2-to-v3.ts
```

---

## 📊 Post-Migration Checklist

### Immediate Tasks

- [x] Database schema migrated
- [x] Seed data inserted
- [x] Super Admin account created
- [ ] Super Admin password changed
- [ ] Test admin login functionality
- [ ] Create additional admin accounts for staff

### Phase 2 Tasks (After Migration)

- [ ] Update `authOptions.ts` session callbacks
- [ ] Create admin dashboard UI
- [ ] Create user registration flow
- [ ] Implement team registration
- [ ] Build submission forms
- [ ] Test complete competition flow

### Configuration Updates

- [ ] Update competition deadlines in database if needed:
  ```sql
  UPDATE competitions SET registration_deadline = '2026-08-01 23:59:59+07' WHERE code = 'PTC';
  ```
- [ ] Update registration fees if needed:
  ```sql
  UPDATE competitions SET registration_fee = 150000 WHERE code = 'PTC';
  ```

---

## 🆘 Troubleshooting

### Issue: "Database connection failed"

**Solution:**

```bash
# Verify DATABASE_URL format
echo $DATABASE_URL

# Test connection
npx prisma db execute --stdin <<< "SELECT 1"
```

### Issue: "Seed script fails"

**Solution:**

```bash
# Check seed script output
npm run db:seed

# If tsx not found:
npm install tsx --save-dev
```

### Issue: "Table already exists"

**Solution:**

```bash
# Force reset database
npx prisma migrate reset --force

# Then push schema again
npm run db:push
```

### Issue: "Cannot find module @prisma/client"

**Solution:**

```bash
# Regenerate Prisma Client
npx prisma generate

# Reinstall dependencies if needed
rm -rf node_modules package-lock.json
npm install
```

---

## 🔐 Security Reminders

### Super Admin Account

**⚠️ CRITICAL:**

1. **Change default password immediately** after first login
2. Use strong password (min 12 characters, mix of upper/lower/numbers/symbols)
3. Store password securely (use password manager)
4. Enable 2FA if implementing in future

### Database Access

- **Never** expose `DATABASE_URL` in client-side code
- Keep `.env` file out of version control
- Use Vercel environment variables for production
- Restrict database access to authorized IPs only (CockroachDB settings)

### Admin Accounts

- Create separate accounts for each staff member
- Use **moderator** role for competition staff (not super_admin)
- Use **finance** role only for payment verification team
- Deactivate accounts when staff leave team

---

## 📈 Next Steps

### Phase 1: Core System (Current)

✅ Schema migration completed
✅ Admin account created
⬜ Admin dashboard UI
⬜ Admin registration form (for Super Admin to create staff accounts)

### Phase 2: User System

⬜ User registration API
⬜ Email verification
⬜ Team registration form
⬜ Dashboard for participants

### Phase 3: Submission System

⬜ Preliminary submission
⬜ Payment verification
⬜ Semifinal submission
⬜ Final submission (BCC)

### Phase 4: Admin Workflows

⬜ Registration approval interface
⬜ Submission review interface
⬜ Payment verification interface
⬜ Finalist selection interface

---

## 📝 Notes

- **Migration Date:** January 31, 2026
- **Strategy:** Fresh start (drop all v2.0 tables)
- **Database:** CockroachDB (PostgreSQL-compatible)
- **ORM:** Prisma 6.2.1
- **Auth:** NextAuth.js 4.24.5

**Questions?** Contact development team or refer to:

- Prisma docs: https://www.prisma.io/docs
- NextAuth docs: https://next-auth.js.org/
- CockroachDB docs: https://www.cockroachlabs.com/docs/

---

**END OF MIGRATION GUIDE**
