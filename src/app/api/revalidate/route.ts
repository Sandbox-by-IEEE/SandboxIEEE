import { NextApiResponse } from 'next';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponse) {
  // Secret Validation
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.CMS_REVALIDATE_TOKEN) {
    return res.status(401).json({
      error: 'Invalid Token.',
    });
  }

  try {
    // Get body content
    const {
      idToRevalidate,
      pageToRevalidate,
    }: { idToRevalidate: number; pageToRevalidate: string } = await req.json();

    // Revalidate Main Page
    if (pageToRevalidate === '') {
      revalidatePath('/');
    }

    // Revalidate Single Instance (if there is one)
    if (pageToRevalidate) {
      await revalidatePath(`/exhibition`);
    }

    // Revalidate Multiple Instance (if there is one)
    if (idToRevalidate) {
      await revalidatePath(`/exhibition/${idToRevalidate}`);
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
