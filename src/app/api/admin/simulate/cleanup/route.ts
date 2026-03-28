import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getSupabaseAdmin } from '@/lib/supabase';

const SIM_MARKER = '__SIM__';

/** Recursively list all files under a folder prefix in a Supabase bucket */
async function listStorageFolder(
  bucket: string,
  folder: string,
): Promise<string[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage.from(bucket).list(folder, {
    limit: 1000,
  });
  if (error || !data) return [];

  const paths: string[] = [];
  for (const item of data) {
    const fullPath = `${folder}/${item.name}`;
    if (item.metadata == null) {
      // It's a folder — recurse
      const nested = await listStorageFolder(bucket, fullPath);
      paths.push(...nested);
    } else {
      paths.push(fullPath);
    }
  }
  return paths;
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.admin || session.admin.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { registrationId } = await req.json();

    // Support cleanup-all mode (no registrationId)
    if (!registrationId) {
      return cleanupAll();
    }

    // Find the registration
    const registration = await prisma.competitionRegistration.findUnique({
      where: { id: registrationId },
      include: {
        team: { include: { members: true } },
        semifinal: true,
        preliminary: true,
        payment: true,
        user: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 },
      );
    }

    // Safety: only allow deleting simulation records
    if (!registration.team?.teamName.startsWith(SIM_MARKER)) {
      return NextResponse.json(
        { error: 'This endpoint only deletes simulation records' },
        { status: 403 },
      );
    }

    const deleted: string[] = [];

    // ── 1. Delete Supabase storage files ──
    // Extract the simulation folder from the team name: __SIM__BCC__<simId>
    const simId = registration.team.teamName
      .replace(/^__SIM__\w+__/, '')
      .replace(/__$/, '');
    if (simId) {
      const supabase = getSupabaseAdmin();
      const simFolder = `simulation/${simId}`;
      const files = await listStorageFolder('semifinal', simFolder);
      if (files.length > 0) {
        const { error } = await supabase.storage
          .from('semifinal')
          .remove(files);
        if (!error) {
          deleted.push(
            `storage:semifinal/${simFolder} (${files.length} file(s))`,
          );
        } else {
          console.warn(
            '[Simulate/cleanup] Supabase delete warn:',
            error.message,
          );
          deleted.push(
            `storage:semifinal/${simFolder} (delete partial — ${error.message})`,
          );
        }
      }
    }

    // ── 2. Delete DB records in dependency order ──
    if (registration.semifinal) {
      await prisma.semifinalSubmission.delete({
        where: { id: registration.semifinal.id },
      });
      deleted.push(`semifinal_submission:${registration.semifinal.id}`);
    }

    if (registration.preliminary) {
      await prisma.preliminarySubmission.delete({
        where: { id: registration.preliminary.id },
      });
      deleted.push(`preliminary_submission:${registration.preliminary.id}`);
    }

    if (registration.payment) {
      await prisma.payment.delete({ where: { id: registration.payment.id } });
      deleted.push(`payment:${registration.payment.id}`);
    }

    await prisma.teamMember.deleteMany({
      where: { teamId: registration.team.id },
    });
    deleted.push(`team_members:${registration.team.members.length}`);

    await prisma.team.delete({ where: { id: registration.team.id } });
    deleted.push(`team:${registration.team.teamName}`);

    await prisma.competitionRegistration.delete({
      where: { id: registrationId },
    });
    deleted.push(`registration:${registrationId}`);

    await prisma.user.delete({ where: { id: registration.user.id } });
    deleted.push(`user:${registration.user.email}`);

    return NextResponse.json({
      success: true,
      message: 'Simulation cleaned up successfully',
      deleted,
    });
  } catch (error) {
    console.error('[Simulate/cleanup] error:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}

/** Cleanup ALL simulation records (emergency/orphan cleanup) */
async function cleanupAll(): Promise<NextResponse> {
  const simTeams = await prisma.team.findMany({
    where: { teamName: { startsWith: '__SIM__' } },
    include: {
      registration: {
        include: {
          semifinal: true,
          preliminary: true,
          payment: true,
          user: true,
        },
      },
      members: true,
    },
  });

  if (simTeams.length === 0) {
    return NextResponse.json({
      success: true,
      message: 'No simulation data found',
      deleted: [],
    });
  }

  const deleted: string[] = [];
  const supabase = getSupabaseAdmin();

  // Delete all simulation/ storage folder
  const allFiles = await listStorageFolder('semifinal', 'simulation');
  if (allFiles.length > 0) {
    await supabase.storage.from('semifinal').remove(allFiles);
    deleted.push(`storage:semifinal/simulation (${allFiles.length} file(s))`);
  }

  for (const team of simTeams) {
    const reg = team.registration;
    if (!reg) continue;

    if (reg.semifinal) {
      await prisma.semifinalSubmission.delete({
        where: { id: reg.semifinal.id },
      });
      deleted.push(`semifinal:${reg.semifinal.id}`);
    }
    if (reg.preliminary) {
      await prisma.preliminarySubmission.delete({
        where: { id: reg.preliminary.id },
      });
    }
    if (reg.payment) {
      await prisma.payment.delete({ where: { id: reg.payment.id } });
    }

    await prisma.teamMember.deleteMany({ where: { teamId: team.id } });
    await prisma.team.delete({ where: { id: team.id } });
    await prisma.competitionRegistration.delete({ where: { id: reg.id } });
    await prisma.user.delete({ where: { id: reg.user.id } });
    deleted.push(`simulation:${team.teamName}`);
  }

  return NextResponse.json({
    success: true,
    message: `Cleaned up ${simTeams.length} simulation(s)`,
    deleted,
  });
}
