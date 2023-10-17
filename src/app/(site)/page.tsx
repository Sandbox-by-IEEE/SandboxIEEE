'use client';
import { useEffect, useState } from 'react';

import FileInput from '@/components/FileInput';

export interface FileInputType {
  fileName: string;
  fileUrl: string;
}

export default function Home() {
  const [files, setFiles] = useState<FileInputType[] | undefined>();
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (files?.length || url) {
      console.log({ files, url });
    }
  }, [files, url]);

  return (
    <main className='flex p-4 w-screen h-screen items-center justify-center bg-black'>
      <div className='flex gap-2 flex-wrap'>
        <FileInput
          setFiles={setFiles}
          setUrl={setUrl}
          message={'secondary message'}
          allowedFileTypes={['.jpg', '.pdf', '.jpeg', '.png']}
          files={files}
        />
      </div>
    </main>
  );
}
