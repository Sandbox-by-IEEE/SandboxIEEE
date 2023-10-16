import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Secret Validation
  const secret = req.nextUrl.searchParams.get('secret');
  const path = req.nextUrl.searchParams.get('path');
  if (secret !== process.env.CMS_REVALIDATE_TOKEN) {
    return NextResponse.json(
      { error: 'Unathorized Request', message: 'Wrong token' },
      { status: 401 },
    );
  }

  try {
    // Get body content
    const {
      idToRevalidate,
      pageToRevalidate,
    }: { idToRevalidate: string; pageToRevalidate: string } = await req.json();

    // Revalidate Main Page
    if (pageToRevalidate === '') {
      revalidatePath('/');
    }
    if (path) {
      await revalidatePath(path);
    }
    // Revalidate Single Instance (if there is one)
    if (pageToRevalidate) {
      await revalidatePath(`/${pageToRevalidate}`);
    }

    // Revalidate Multiple Instance (if there is one)
    if (idToRevalidate) {
      await revalidatePath(`/${pageToRevalidate}/${idToRevalidate}`);
    }

    // Return a successful response
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `Success Revalidating on ${pageToRevalidate}`,
    });
  } catch (err) {
    // Handle the error and send a custom response
    return NextResponse.error();
  }
}
