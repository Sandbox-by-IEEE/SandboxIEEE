import {
  Body,
  Container,
  Head,
  Heading,
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
                  "url('https://res.cloudinary.com/dbdrtwtzl/image/upload/v1736620973/Frame_27_eb4vrv.png')",
              },
            },
          },
        }}
      >
        <Body className='m-auto font-sans h-fit w-full bg-white'>
          <Container className='relative rounded w-[485px] overflow-hidden bg-background bg-cover bg-center bg-no-repeat'>
            <Section className='w-full'>
              <Img
                src={`https://res.cloudinary.com/dbdrtwtzl/image/upload/v1732981083/Component_8_letiv8.png`}
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
            </Section>
            <Section className='w-[485px]'>
              <a
                href='https://sandbox.ieeeitb.com/contact-us'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Img
                  src={`https://res.cloudinary.com/dbdrtwtzl/image/upload/v1732985919/Component_9_rwirho.png`}
                  alt='Vercel'
                  className='w-full'
                />
              </a>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;
