import { NextRequest, NextResponse } from 'next/server';

import { utapi } from '@/lib/uploadthing';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request as FormData
    const formData = await req.formData();
    const fileUploaded = formData.get('file') as File;

    if (!fileUploaded) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 },
      );
    }

    if (fileUploaded.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: 'File size exceeds the maximum allowed (10MB).' },
        { status: 400 },
      );
    }

    // Pass the file directly to the upload function
    const response = await utapi.uploadFiles([fileUploaded]);
    return NextResponse.json({
      message: 'File uploaded successfully',
      secure_url: response[0].data?.appUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'File upload failed', error },
      { status: 500 },
    );
  }
}
