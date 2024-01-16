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
          ? session?.user.ticket?.PTC.regist2Status === 'qualified'
            ? 'https://drive.google.com/file/d/1XnjWpTmI6MHzf1ZgDWzODqDEwsHfkacA/view'
            : 'https://drive.google.com/drive/folders/1BRnRPJV18QAmtyLj-CJkmXFafEXyhyUU?usp=drive_link'
          : 'https://drive.google.com/drive/folders/1BRnRPJV18QAmtyLj-CJkmXFafEXyhyUU?usp=drive_link'
      }
    >
      <Button color='gold' isFullWidth>
        {session?.user.ticket?.PTC.verified === 'verified'
          ? session?.user.ticket?.PTC.regist2Status === 'qualified'
            ? 'PTC Semi-Final Guidelines'
            : 'Abstract Submission Guidelines'
          : 'Guidebooks'}
      </Button>
    </a>
  );
}

export default LinkPTCCLient;
