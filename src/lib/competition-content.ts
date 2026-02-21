/**
 * ============================================================================
 * COMPETITION CONTENT - Static display content for each competition
 * ============================================================================
 *
 * NOTE: Timeline dates are stored in the database (CompetitionTimeline model).
 * This file only contains descriptions, FAQs, requirements, and deliverables.
 * The prizePool.total is the ONLY prize field used — no 1st/2nd/3rd breakdown.
 * ============================================================================
 */

export interface CompetitionContent {
  code: string;
  name: string;
  tagline: string;
  description: string;
  prizePool: {
    total: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  requirements: string[];
  deliverables: string[];
}

export const COMPETITION_CONTENT: Record<string, CompetitionContent> = {
  BCC: {
    code: 'BCC',
    name: 'Business Case Competition',
    tagline: 'Solve Real Business Challenges',
    description:
      'Business Case Competition (BCC) is a national-level analytical competition that challenges undergraduate students to solve real-world business problems related to the implementation of smart automation technology. Participants are required to analyze complex industry cases, develop data-driven and structured solutions, and present feasible strategies that balance technological innovation, operational efficiency, and business sustainability.',
    prizePool: {
      total: 'Rp 25.000.000++',
    },
    faqs: [
      {
        question: 'How many phases are there in BCC?',
        answer:
          'BCC consists of three phases: Preliminary Phase (Executive Summary submission), Semifinal Phase (Proposal submission + coaching session), and Final Phase (Pitch deck presentation).',
      },
      {
        question: 'Can teams use assumptions in their analysis?',
        answer:
          'Yes. Participants may use reasonable and well-justified assumptions. All assumptions must be clearly stated and logically supported.',
      },
      {
        question: 'Are teams allowed to use external data?',
        answer:
          'Yes. Participants are encouraged to use credible external sources to strengthen their analysis. All references must be properly cited.',
      },
      {
        question: 'Is there any registration fee?',
        answer:
          'No, there is no registration fee yet for the preliminary round.',
      },
      {
        question: 'Can high school students join the BCC competition?',
        answer:
          'Unfortunately, BCC is currently open for undergraduate university students from any major or university only.',
      },
      {
        question:
          'Can I join individually or with a team consisting of less than 3 members?',
        answer:
          'No. Participants are expected to join as a team of 3 people. It can be a combination of different majors or universities.',
      },
      {
        question:
          'Will teams receive benefits or a certificate after joining the BCC competition?',
        answer: '',
      },
      {
        question:
          'Do teams need to follow a specific executive summary template?',
        answer: '',
      },
      {
        question: 'Will teams be assisted with mentoring or coaching support?',
        answer:
          'Only selected teams that continue to the semifinal and final round will receive online coaching and mentoring sessions.',
      },
    ],
    requirements: [
      'Active undergraduate (S1/D4) students',
      'Team of exactly 3 members (can be from different institutions)',
      'Basic understanding of business strategy and analysis',
      'Access to presentation software (PowerPoint, Canva, etc.)',
    ],
    deliverables: [
      'Written case analysis (PDF)',
      'Presentation slides',
      'Executive summary',
      'Business strategy proposal',
    ],
  },

  TPC: {
    code: 'TPC',
    name: 'Technovate Paper Competition',
    tagline: 'Research That Shapes The Future',
    description:
      'Technovate Paper Competition (TPC) is a competition held at the national level, aiming to challenge undergraduate and high school students to apply scientific methodology to scrutinize and propose solutions addressing relevant issues in accordance with the designated subtheme.',
    prizePool: {
      total: 'Rp 25.000.000++',
    },
    faqs: [
      {
        question: 'Is TPC open for high school students?',
        answer:
          'Yes, it welcomes high school students to showcase their ideas. Mixed teams of college and high school students are allowed.',
      },
      {
        question:
          'Is it allowed to team up with members from different schools/universities?',
        answer:
          'Yes, as long as each member is proven to be an active student at their corresponding institution.',
      },
      {
        question: 'Is there a registration fee?',
        answer:
          'Yes. Each team must pay a registration fee of IDR 125,000 per team.',
      },
      {
        question: 'Can we use pre-existing data from ERP systems like SAP?',
        answer:
          'Yes. The cornerstone of this challenge is improving how data from centralized systems can be used to plot shortcuts for optimized supply corridors or even safe corridors during a crisis.',
      },
      {
        question:
          'Is a hardware prototype required for the automation tech each team focuses on?',
        answer:
          'No. You are invited to internalize the use of deep learning and AI to simulate or generate alternative supply routes, etc. While mockups and prototypes can be used to visualize your solution, a robust simulation concept is sufficient.',
      },
      {
        question: 'Can a previously developed project be submitted?',
        answer: '',
      },
      {
        question: 'Can we revise our submission after uploading?',
        answer: '',
      },
    ],
    requirements: [
      'Active undergraduate or high school students',
      'Team of 1-3 members',
      'Original, unpublished research',
      'Basic understanding of scientific methodology',
    ],
    deliverables: [
      'Research paper (following provided template)',
      'Presentation slides (for finalists)',
    ],
  },

  PTC: {
    code: 'PTC',
    name: 'ProtoTech Competition',
    tagline: 'Build The Future, Today',
    description:
      'ProtoTech Competition (PTC) is a national-scale prototyping competition that challenges undergraduate and high school students to develop innovative solutions using smart automation technology. Through a structured competition flow — from abstract submission to prototyping and final pitching — participants are encouraged to design practical, scalable, and impactful automation systems that address real-world industrial and societal challenges.',
    prizePool: {
      total: 'Rp 25.000.000++',
    },
    faqs: [
      {
        question: 'Is the prototype required to be hardware-based?',
        answer:
          'Yes. PTC focuses on smart automation technology that involves physical prototyping. Software-only solutions are not eligible. If your solution includes software (e.g., dashboard, AI system, application), it must be integrated with a measurable physical prototype/device.',
      },
      {
        question:
          'If my innovation is mainly an application, can I just present it using a laptop or phone?',
        answer:
          'No. Applications must be supported by a physical prototype/device. The prototype must have measurable physical dimensions and tangible implementation.',
      },
      {
        question: 'Is there a specific abstract format?',
        answer:
          'Yes. The official abstract template will be provided during the abstract submission period. Participants must follow the given outline structure.',
      },
      {
        question: 'Is Full Paper submission mandatory?',
        answer:
          'Yes. In PTC 2026, all semifinalists are required to submit a Full Paper as part of the semifinal phase. The Full Paper serves as the main technical evaluation document.',
      },
      {
        question: 'Is Video Idea Pitching mandatory?',
        answer:
          'Video Idea Pitching is optional. However, submitted videos will be eligible for the "Favorite Video Award," which is determined based on social media engagement (likes).',
      },
      {
        question: 'How does the coaching system work this year?',
        answer:
          'PTC 2026 coaching sessions are conducted fully asynchronously. The system includes: Coach-curated guidance documents (e.g., "Prototyping Roadmap & Validation Guide"), structured Q&A sheets, and written feedback on progress reports. Coaches will be assigned starting from the final stage and distributed proportionally among finalists.',
      },
      {
        question: 'When does coaching begin?',
        answer:
          'Coaching begins in the final phase, Prototyping. This ensures focused mentoring for selected teams.',
      },
      {
        question: 'How long is the prototyping phase?',
        answer:
          'The prototyping phase runs for approximately 4 weeks to allow adequate development, testing, and refinement before the Grand Final.',
      },
      {
        question: 'Are simulation-based prototypes allowed?',
        answer: '',
      },
    ],
    requirements: [
      'Active undergraduate or high school students',
      'Team of 3-5 members (can be from different institutions)',
      'Functional prototype (hardware/software/hybrid)',
      'Project must address a real-world problem using smart automation',
    ],
    deliverables: [
      'Abstract/proposal document (PDF)',
      'Working prototype',
      'Technical documentation',
      'Demo video (for finalists)',
    ],
  },
};

// Helper function to get competition content
export function getCompetitionContent(code: string): CompetitionContent | null {
  const upperCode = code.toUpperCase();
  return COMPETITION_CONTENT[upperCode] || null;
}

// Helper to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    timeZone: 'Asia/Jakarta',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
