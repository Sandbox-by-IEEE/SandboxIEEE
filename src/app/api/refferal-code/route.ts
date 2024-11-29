import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ message: 'Code is required', status: 400 });
  }

  try {
    const unusedCode = await prisma.refferalCode.findFirst({
      where: {
        refferalCode: code,
        isUsed: false,
      },
    });

    if (!unusedCode) {
      return NextResponse.json({
        message: 'Code not found or already used',
        status: 404,
      });
    }

    return NextResponse.json({ unusedCode, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching code', status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json(); // Parse the request body
    const { code, teamId, teamName } = body;

    if (!code || !teamId) {
      return NextResponse.json({
        message: 'Code and teamId are required',
        status: 400,
      });
    }

    const currentCode = await prisma.refferalCode.findFirst({
      where: {
        refferalCode: code,
      },
    });

    if (!currentCode) {
      return NextResponse.json({ message: 'Code not found', status: 404 });
    }

    const updatedCode = await prisma.refferalCode.update({
      where: {
        id: currentCode.id, // Use ID to uniquely identify the record
      },
      data: {
        isUsed: !currentCode.isUsed,
        teamId: currentCode.isUsed ? null : teamId,
        teamName: currentCode.isUsed ? null : teamName,
      },
    });

    return NextResponse.json({
      message: 'Code updated successfully',
      updatedCode,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating code', status: 500 });
  }
}
