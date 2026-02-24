/**
 * Get the base URL for the application.
 *
 * Resolution order:
 * 1. NEXT_PUBLIC_BASE_URL  – explicitly set production URL
 * 2. NEXTAUTH_URL          – NextAuth callback base
 * 3. VERCEL_URL            – auto-injected by Vercel (no protocol)
 * 4. localhost fallback    – local development only
 */
export function getBaseUrl(): string {
  const publicBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(
    /['"]/g,
    '',
  ).trim();
  if (publicBaseUrl) return publicBaseUrl.replace(/\/+$/, '');

  const nextAuthUrl = process.env.NEXTAUTH_URL?.replace(/['"]/g, '').trim();
  if (nextAuthUrl) return nextAuthUrl.replace(/\/+$/, '');

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl}`;

  return 'http://localhost:3000';
}
