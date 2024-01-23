import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailProps {
  qrUrl?: string;
  name: string;
  heading: string;
  content: string;
}

export const Email = ({ qrUrl, name, heading, content }: EmailProps) => {
  return (
    <Html>
      <Head></Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              backgroundImage: {
                background:
                  "url('https://res.cloudinary.com/dssrh53qx/image/upload/v1697286411/bg-emails_vslt35.png')",
              },
            },
          },
        }}
      >
        <Body className='m-auto font-sans h-fit w-full bg-white'>
          <Container className='relative rounded w-[485px] overflow-hidden bg-background bg-cover bg-center bg-no-repeat'>
            <Section className='w-full'>
              <Img
                src={`https://res.cloudinary.com/dssrh53qx/image/upload/v1697283874/header_wrtaop.png`}
                alt='Vercel'
                className='w-full'
              />
            </Section>
            <Section className='z-[10] w-[437px]'>
              <Row className='w-full px-10'>
                <Text className='text-[#705229] text-lg font-black drop-shadow-[0px_4px_4px _rgba(0,0,0,0.25)] w-full'>
                  Dear {name},
                </Text>
                <Heading className='text-[#AB814E] text-xl w-full font-bold'>
                  {heading}
                </Heading>
                <Text className='text-[#705229] gap-2 flex flex-col text-sm font-semibold drop-shadow-[0px_4px_4px _rgba(0,0,0,0.25)] w-full'>
                  {content.split('\n').map((line, index) => {
                    const urlPattern = new RegExp('(https?://[^\\s]+)', 'g');
                    return (
                      <React.Fragment key={index}>
                        {urlPattern.test(line) ? (
                          <Link href={line}>{line}</Link>
                        ) : (
                          <p>{line}</p>
                        )}
                      </React.Fragment>
                    );
                  })}
                </Text>

                {qrUrl ? (
                  <Img
                    src={qrUrl}
                    alt='QR'
                    className='w-[180px] h-[180px] aspect-square mx-auto'
                  />
                ) : null}
                <Text className='text-[#705229] text-sm font-semibold drop-shadow-[0px_4px_4px _rgba(0,0,0,0.25)] w-full'>
                  Best Regards, <br /> SANDBOX Team
                </Text>
              </Row>
              <Row className='w-full px-10'>
                <Hr className=' border border-solid border-[#705229] my-0 mt-4 w-full' />
                <Text className='m-0 mb-1 p-0 text-xs font-semibold text-[#705229] w-full py-2'>
                  Contact{' '}
                  <Link href='https://sandbox.ieeeitb.com/contact-us'>
                    Our Website
                  </Link>
                </Text>
              </Row>
            </Section>
            <Section className='w-[485px]'>
              <Img
                src={`https://res.cloudinary.com/dssrh53qx/image/upload/v1697283840/footer_qslzrm.png`}
                alt='Vercel'
                className=' w-full'
              />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;
