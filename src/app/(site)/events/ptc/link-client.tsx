'use client';
import { useSession } from 'next-auth/react';

import Button from '@/components/Button';

function LinkPTCCLient() {
  const { data: session } = useSession();

  return (
    <a
      target='_blank'
      href={
        session?.user.ticket?.PTC.verified === 'verified'
          ? 'https://drive.google.com/file/d/1t4HAvE1Xvh3sLA8vl9yHN_gL42B93BD-/view?usp=sharing'
          : "'https://drive.google.com/drive/folders/1BRnRPJV18QAmtyLj-CJkmXFafEXyhyUU?usp=drive_link'"
      }
    >
      <Button color='gold' isFullWidth>
        {session?.user.ticket?.PTC.verified === 'verified' &&
          'Abstract Submission'}
        Guidelines
      </Button>
    </a>
  );
}

export default LinkPTCCLient;
