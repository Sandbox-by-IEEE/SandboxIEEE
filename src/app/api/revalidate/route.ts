import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Secret Validation
  const secret = req.nextUrl.searchParams.get('secret');

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
    }: { idToRevalidate: number; pageToRevalidate: string } = await req.json();

    // Revalidate Main Page
    if (pageToRevalidate === '') {
      await revalidatePath('/');
    }

    // Revalidate Single Instance (if there is one)c
    if (pageToRevalidate) {
      revalidatePath(`/${pageToRevalidate}`);
    }

    // Revalidate Multiple Instance (if there is one)
    if (idToRevalidate) {
      revalidatePath(`/${pageToRevalidate}/${idToRevalidate}`);
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
