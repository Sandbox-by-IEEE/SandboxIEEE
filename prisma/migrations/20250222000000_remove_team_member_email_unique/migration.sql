-- DropIndex: Remove unique constraint on team_members.email
-- This constraint causes false "email already registered" errors because
-- member emails are auto-generated placeholders derived from names.
-- Two different teams with members named "John Doe" would collide.
DROP INDEX IF EXISTS "team_members_email_key";

-- DropIndex: Remove the email index (no longer needed for uniqueness lookups)
DROP INDEX IF EXISTS "team_members_email_idx";
