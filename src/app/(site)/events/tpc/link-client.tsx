'use client';
import { useSession } from 'next-auth/react';

import Button from '@/components/Button';

function LinkTPCClient() {
  const { data: session } = useSession();

  const linkHref =
    session?.user.ticket?.TPC.verified === 'verified'
      ? 'https://drive.google.com/file/d/1yfrPlYfwlcEOUEkiat2yhhHddV8KBcut/view?usp=sharing'
      : 'https://drive.google.com/drive/folders/1BRnRPJV18QAmtyLj-CJkmXFafEXyhyUU?usp=drive_link';

  return (
    <a href={linkHref} target='_blank' rel='noopener noreferrer'>
      <Button color='gold' isFullWidth>
        {session?.user.ticket?.TPC.verified === 'verified' &&
          'Abstract Submission '}
        Guidelines
      </Button>
    </a>
  );
}

export default LinkTPCClient;
