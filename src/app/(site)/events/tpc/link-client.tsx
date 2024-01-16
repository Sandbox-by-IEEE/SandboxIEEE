'use client';
import { useSession } from 'next-auth/react';

import Button from '@/components/Button';

function LinkTPCClient() {
  const { data: session } = useSession();

  const linkHref =
    session?.user.ticket?.TPC.verified === 'verified'
      ? session?.user.ticket?.TPC.regist2Status === 'qualified'
        ? 'https://drive.google.com/file/d/1exhZwUVVCNWARio57EM56WPZ4wX_UB00/view'
        : 'https://drive.google.com/drive/folders/1BRnRPJV18QAmtyLj-CJkmXFafEXyhyUU?usp=drive_link'
      : 'https://drive.google.com/drive/folders/1BRnRPJV18QAmtyLj-CJkmXFafEXyhyUU?usp=drive_link';

  return (
    <a href={linkHref} target='_blank' rel='noopener noreferrer'>
      <Button color='gold' isFullWidth>
        {session?.user.ticket?.TPC.verified === 'verified'
          ? session?.user.ticket?.TPC.regist2Status === 'qualified'
            ? 'TPC Semi-Final Guidelines'
            : 'Abstract Submission Guidelines'
          : 'Guidebooks'}
      </Button>
    </a>
  );
}

export default LinkTPCClient;
