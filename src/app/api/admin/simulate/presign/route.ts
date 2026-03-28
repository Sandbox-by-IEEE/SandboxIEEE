import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase';

const SIM_MARKER = '__SIM__';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.admin || session.admin.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { fileName, fileSize, contentType, storagePrefix, registrationId } =
      await req.json();

    if (!fileName || !contentType || typeof fileSize !== 'number') {
      return NextResponse.json(
        { error: 'Missing file metadata' },
        { status: 400 },
      );
    }

    if (fileSize > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File exceeds 20MB limit' },
        { status: 400 },
      );
    }

    // Verify this is a real simulation (registration ID must exist and be marked as simulation)
    if (registrationId) {
      const { prisma } = await import('@/lib/db');
      const reg = await prisma.competitionRegistration.findUnique({
        where: { id: registrationId },
        include: { team: true },
      });
      if (!reg?.team?.teamName.startsWith(SIM_MARKER)) {
        return NextResponse.json(
          { error: 'Invalid simulation registration' },
          { status: 400 },
        );
      }
    }

    const ext =
      fileName.lastIndexOf('.') >= 0
        ? fileName.substring(fileName.lastIndexOf('.'))
        : '';
    const prefix = storagePrefix || `simulation/${Date.now().toString(36)}`;
    const storagePath = `${prefix}_${Date.now()}${ext}`;

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.storage
      .from('semifinal')
      .createSignedUploadUrl(storagePath);

    if (error) {
      console.error('[Simulate/presign] Supabase error:', error.message);
      return NextResponse.json(
        { error: 'Failed to create upload URL' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      signedUrl: data.signedUrl,
      storagePath: data.path,
      token: data.token,
    });
  } catch (error) {
    console.error('[Simulate/presign] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
