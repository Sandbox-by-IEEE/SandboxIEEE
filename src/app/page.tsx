'use client';
import { useEffect, useState } from 'react';

import FileInput from '@/components/FileInput';

export interface FileInputType {
  fileName: string;
  fileUrl: string;
}

export default function Home() {
  const [file, setFile] = useState<FileInputType>({
    fileName: '',
    fileUrl: '',
  });
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (file.fileName || url) {
      console.log({ file, url });
    }
  }, [file, url]);

  return (
    <main className='flex p-4 w-screen h-screen items-center justify-center bg-black'>
      <div className='flex gap-2 flex-wrap'>
        <FileInput
          setFile={setFile}
          setUrl={setUrl}
          message={'secondary message'}
          allowedFileTypes={['.jpg', '.pdf']}
          file={file}
        />
      </div>
    </main>
  );
}
