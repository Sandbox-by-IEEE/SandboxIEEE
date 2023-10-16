import { NextApiResponse } from 'next';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Extends body type of NextRequest
interface CustomRequest extends ReadableStream<Uint8Array> {
  idToRevalidate?: string;
  pageToRevalidate: string;
}
export async function POST(request: NextRequest, response: NextApiResponse) {
  // Secret Validation
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');
  if (secret !== process.env.CMS_REVALIDATE_TOKEN) {
    return response.status(401).json({
      error: 'Invalid Token.',
    });
  }

  try {
    // const body: CustomRequest | null = (await request.body) as CustomRequest; // Parse the JSON data from the stream
    // if (!body) {
    //   return response.status(400).json({
    //     error: "Bad request, no body found",
    //   });
    // }
    // // Get record id to revalidate
    // const idToRevalidate = body.idToRevalidate;
    // const pageToRevalidate = body.pageToRevalidate;

    // Revalidate main pagetorevalidate
    if (path) {
      await revalidatePath(path);
    }

    // // Revalidate Multiple Instance (if there is one)
    // if (idToRevalidate) {
    //   await revalidatePath(`/${pageToRevalidate}/${idToRevalidate}`);
    // }

    // Return a successful response
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `Success Revalidating on ${path}`,
    });
  } catch (err) {
    // Handle the error and send a custom response
    return NextResponse.error();
  }
}
