import {
  Body,
  Container,
  Head,
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

interface EmailAuthProps {
  name: string;
  token: string;
  baseUrl: string;
}

export const EmailAuth = ({ name, token, baseUrl }: EmailAuthProps) => {
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
        <Body className='mx-auto my-auto font-sans h-fit w-full bg-white'>
          <Container className='relative rounded w-[465px] overflow-hidden bg-background bg-cover bg-center bg-no-repeat'>
            <Section className='w-full'>
              <Img
                src={`https://res.cloudinary.com/dssrh53qx/image/upload/v1697283874/header_wrtaop.png`}
                alt='Vercel'
                className='w-full'
              />
            </Section>
            <Section className='z-[10] w-[417px]'>
              <Row className='w-full px-10'>
                <Text className='text-[#705229] text-xl font-black drop-shadow-[0px_4px_4px _rgba(0,0,0,0.25)] w-full'>
                  Hello {name},
                </Text>
                <Text className='text-[#705229] text-sm font-semibold drop-shadow-[0px_4px_4px _rgba(0,0,0,0.25)] w-full'>
                  Please click on the button below to verify your email address
                  for your SANDBOX account. if you {"didn't"} ask to verify this
                  address, you can ignore this email.
                </Text>
              </Row>
              <Row className='mx-auto px-10 my-3 w-full'>
                <Link
                  href={`${baseUrl}/api/user/activate/${token}`}
                  className='mx-auto text-base text-center h-fit w-fit flex justify-center items-center py-2 px-3 rounded-md bg-[#0D432F] text-white cursor-pointer'
                >
                  Verify Email
                </Link>
              </Row>
              <Row className='w-full px-10'>
                <Text className='text-[#705229] text-sm font-semibold drop-shadow-[0px_4px_4px _rgba(0,0,0,0.25)] w-full'>
                  If the button above {"doesn't"} work, please click{' '}
                  <Link
                    href={`${baseUrl}/api/user/activate/${token}`}
                    className='cursor-pointer underline'
                  >
                    here
                  </Link>
                </Text>

                <Text className='text-[#705229] text-sm font-semibold drop-shadow-[0px_4px_4px _rgba(0,0,0,0.25)] w-full'>
                  Best Regards, <br /> SANDBOX Team
                </Text>
              </Row>
              <Row className='w-full '>
                <Hr className=' border border-solid border-[#705229] my-0 mt-4 w-full' />
                <Text className='m-0 mb-1 p-0 text-xs font-semibold text-[#705229] w-full py-2'>
                  Contact{' '}
                  <Link href='https://sandbox.ieeeitb.com/contact-us'>
                    Our Website
                  </Link>
                </Text>
              </Row>
            </Section>
            <Section className='w-[465px]'>
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

export default EmailAuth;
