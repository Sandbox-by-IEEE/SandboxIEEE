import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

// eslint-disable-next-line unused-imports/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    const teamPassed = [
      'FansPakBandung',
      'WANGSIT NEW GEN',
      'Eureka',
      'Bangan',
      'HehoGawk',
    ];

    const allTeams = await prisma.regist3Data.findMany({
      where: {
        statusPayment: 'verified',
        team: {
          ticketCompetition: {
            competitionType: 'PTC',
          },
        },
      },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    const passedTeams = allTeams.filter((team) =>
      teamPassed.includes(team.team.teamName),
    );

    const failedTeams = allTeams.filter(
      (team) => !teamPassed.includes(team.team.teamName),
    );

    const failedMsg = `Dear Semi-finalist of The Sandbox Prototech Contest,

    We extend our sincere appreciation to you for taking part in our esteemed competition. Your enthusiasm, dedication, and innovative spirit have truly made this contest an enriching experience.
    
    While the journey to the finals may not have been this time, please know that your contributions have not gone unnoticed. The quality and uniqueness of your submission were commendable, reflecting the high standard of talent and creativity within our community.
    
    It is never easy to receive news that your application did not meet the final requirements. However, we want to emphasize that this outcome does not diminish the value of your efforts. The competition was fierce, and the decision-making process was undoubtedly challenging.
    
    Your participation has contributed significantly to the vibrant and collaborative atmosphere of The Sandbox Prototech Contest. We hope that you found the experience both rewarding and enlightening. The ideas and insights you shared have added immense value to the overall discourse and have furthered the innovative spirit that defines our community.
    
    As we navigate through the realm of technology and creativity, we encourage you to view this as a stepping stone rather than a roadblock. Your journey doesn't end here, and we believe that your skills and passion will lead to remarkable achievements in the future.
    
    To express our gratitude further, we invite your team to attend our Grand Seminar at ITB on 9 March 2024. We hope this opportunity will push your creativity and elevate your idea.
    
    Once again, we express our deepest gratitude for your participation in The Sandbox Prototech Contest. Your commitment to pushing the boundaries of innovation is truly inspiring, and we look forward to witnessing your continued success on this exciting journey.
    
    Thank you for being an integral part of our community, and we hope to see you actively involved in our future endeavors.
    
    Best regards,
    
    Ardra Rafif Sahasika 
    Head of Competition
    The Sandbox Prototech Contest Team
    IEEE ITB SB`;

    const successMsg = `
    Congratulations, you have passed the Semi-Final Stage and are starting your journey in our competition with the Final stage. More comprehensive information regarding Final can be accessed in our Final Stage guideline document below.
    
    https://drive.google.com/file/d/1sN1eyhB5zM1TEJyAylBDJBMRustbp2K6/view?usp=drivesdk
    
    All information about the Final guidelines and submission are attached in our website in each of competition page
    
    You can join our WhatsApp Group by clicking the link provided below.
    
    https://chat.whatsapp.com/IXuPB8JkwtQB0bnWY2txnd
    
    Thank you and best of luck!`;

    const heading = `PTC Finalist Announcement`;

    for (const data of failedTeams) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: data.team.members.map((member) => member.email),
        subject: `[SANDBOX] PTC Finalist Announcement`,
        html: render(
          Email({
            heading: heading,
            content: failedMsg,
            name: data.teamName,
          }),
          { pretty: true },
        ),
      };

      await transporter.sendMail(mailOptions);
      console.log('failed team: ', data.teamName);
    }

    for (const dataSuccess of passedTeams) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: dataSuccess.team.members.map((member) => member.email),
        subject: `[SANDBOX] PTC Finalist Announcement`,
        html: render(
          Email({
            heading: heading,
            content: successMsg,
            name: dataSuccess.teamName,
          }),
          { pretty: true },
        ),
      };

      await transporter.sendMail(mailOptions);
      console.log('passed team: ', dataSuccess.teamName);
    }

    // eslint-disable-next-line no-console
    console.log('POST_SEND_EMAIL: All email was sent');
    return NextResponse.json(
      {
        message: `${passedTeams.length} Success Final Data sent and ${failedTeams.length} Failed Final Data sent also`,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_POST_SEND_EMAIL: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
