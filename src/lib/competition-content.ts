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
        question: 'What is BCC?',
        answer:
          'Business Case Competition (BCC) is a national-level analytical competition where undergraduate students solve real-world business problems related to smart automation technology.',
      },
      {
        question: 'Who can participate?',
        answer:
          'Active undergraduate (S1/D4) students from any accredited university in Indonesia.',
      },
      {
        question: 'How many members per team?',
        answer:
          'Each team must consist of exactly 3 members from the same institution.',
      },
      {
        question: 'What is the registration fee?',
        answer: 'Early Registration: Rp 150,000 per team. Normal Registration: Rp 180,000 per team.',
      },
      {
        question: 'What are the competition phases?',
        answer:
          'BCC has three rounds: Preliminary (written case analysis), Semifinal (presentation to judges), and Final (live case competition with mentoring).',
      },
      {
        question: 'Can I participate in multiple competitions?',
        answer:
          'Each account can only register for one competition. However, team members can be part of teams in different competitions.',
      },
    ],
    requirements: [
      'Active undergraduate (S1/D4) students',
      'Team of exactly 3 members from the same institution',
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
        question: 'What is TPC?',
        answer:
          'Technovate Paper Competition (TPC) is a national-level scientific paper competition where students apply scientific methodology to address relevant issues.',
      },
      {
        question: 'Who can participate?',
        answer:
          'Active undergraduate (S1/D4) or high school/equivalent (SMA/SMK/MA) students in Indonesia.',
      },
      {
        question: 'How many members per team?',
        answer:
          'Teams can consist of 1 to 3 members. Solo participation is allowed.',
      },
      {
        question: 'What is the registration fee?',
        answer:
          'Early Registration: Rp 125,000 per team. Normal Registration: Rp 150,000 per team.',
      },
      {
        question: 'What format should the paper follow?',
        answer:
          'Papers must follow the provided template format. Detailed guidelines will be shared upon registration.',
      },
      {
        question: 'What are the competition phases?',
        answer:
          'TPC has two main rounds: Preliminary (paper submission) and Semifinal (revised paper + coaching). Finalists proceed to the Grand Final for presentation.',
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
        question: 'What is PTC?',
        answer:
          'ProtoTech Competition (PTC) is a national-scale prototyping competition challenging students to develop innovative smart automation solutions.',
      },
      {
        question: 'Who can participate?',
        answer:
          'Active undergraduate (S1/D4) or high school/equivalent (SMA/SMK/MA) students in Indonesia.',
      },
      {
        question: 'How many members per team?',
        answer:
          'Teams must consist of 3 to 5 members from the same institution.',
      },
      {
        question: 'What is the registration fee?',
        answer:
          'Early Registration: Rp 200,000 per team. Normal Registration: Rp 220,000 per team.',
      },
      {
        question: 'What type of prototypes are acceptable?',
        answer:
          'Hardware, software, or hybrid prototypes using smart automation technology to address real-world problems.',
      },
      {
        question: 'What are the competition phases?',
        answer:
          'PTC has three rounds: Preliminary (abstract submission), Semifinal (detailed proposal), and Final (prototyping + coaching sessions + live pitching).',
      },
    ],
    requirements: [
      'Active undergraduate or high school students',
      'Team of 3-5 members from the same institution',
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
