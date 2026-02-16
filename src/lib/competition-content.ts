// Competition content management system
// This file contains all competition-specific content for easy management

export interface CompetitionContent {
  code: string;
  name: string;
  tagline: string;
  description: string;
  prizePool: {
    first: string;
    second: string;
    third: string;
    total?: string;
  };
  timeline: {
    phase: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
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
      'The Business Case Competition challenges teams to analyze complex business problems and develop strategic solutions. Teams will present their case analysis and recommendations to a panel of industry experts.',
    prizePool: {
      first: 'Rp 5,000,000',
      second: 'Rp 3,000,000',
      third: 'Rp 2,000,000',
      total: 'Rp 10,000,000',
    },
    timeline: [
      {
        phase: 'Registration Period',
        description: 'Open registration for all interested teams',
        startDate: '2026-01-01',
        endDate: '2026-02-15',
      },
      {
        phase: 'Case Release',
        description: 'Business case will be released to registered teams',
        startDate: '2026-02-16',
        endDate: '2026-02-16',
      },
      {
        phase: 'Preliminary Round',
        description: 'Submit written case analysis and solution proposal',
        startDate: '2026-02-17',
        endDate: '2026-03-01',
      },
      {
        phase: 'Semi-Final Round',
        description: 'Top 10 teams present their solutions (15 min presentation)',
        startDate: '2026-03-10',
        endDate: '2026-03-12',
      },
      {
        phase: 'Final Round',
        description: 'Top 3 teams compete in live case competition',
        startDate: '2026-03-20',
        endDate: '2026-03-20',
      },
    ],
    faqs: [
      {
        question: 'What is the team size requirement?',
        answer: 'Each team must consist of exactly 3 members from the same institution.',
      },
      {
        question: 'Is there a registration fee?',
        answer: 'Yes, there is a registration fee of Rp 150,000 per team.',
      },
      {
        question: 'What format should the case analysis be submitted in?',
        answer:
          'The written case analysis should be submitted in PDF format, maximum 20 pages excluding appendices.',
      },
      {
        question: 'Can I participate in multiple competitions?',
        answer:
          'Yes, you can participate in multiple competitions, but you must register separate teams for each.',
      },
      {
        question: 'What criteria will be used for judging?',
        answer:
          'Judging criteria include: problem analysis (25%), solution feasibility (25%), strategic thinking (20%), presentation quality (20%), and Q&A performance (10%).',
      },
    ],
    requirements: [
      'Active university or college students',
      'Team of 3 members from the same institution',
      'Basic understanding of business strategy and analysis',
      'Access to presentation software (PowerPoint, Canva, etc.)',
    ],
    deliverables: [
      'Written case analysis (PDF, max 20 pages)',
      'Presentation slides',
      'Executive summary (2 pages)',
      'Financial projections (if applicable)',
    ],
  },

  TPC: {
    code: 'TPC',
    name: 'Technovate Paper Competition',
    tagline: 'Research That Shapes The Future',
    description:
      'The Technovate Paper Competition invites students to present original research papers on innovative technology solutions. Submit your groundbreaking research and compete for recognition in the academic community.',
    prizePool: {
      first: 'Rp 4,000,000',
      second: 'Rp 2,500,000',
      third: 'Rp 1,500,000',
      total: 'Rp 8,000,000',
    },
    timeline: [
      {
        phase: 'Registration Period',
        description: 'Open registration for paper submissions',
        startDate: '2026-01-01',
        endDate: '2026-02-20',
      },
      {
        phase: 'Abstract Submission',
        description: 'Submit research paper abstract (500 words)',
        startDate: '2026-01-15',
        endDate: '2026-02-20',
      },
      {
        phase: 'Full Paper Submission',
        description: 'Submit complete research paper for review',
        startDate: '2026-02-21',
        endDate: '2026-03-05',
      },
      {
        phase: 'Paper Review Period',
        description: 'Expert panel reviews submitted papers',
        startDate: '2026-03-06',
        endDate: '2026-03-15',
      },
      {
        phase: 'Final Presentation',
        description: 'Top 10 papers present findings to judges',
        startDate: '2026-03-22',
        endDate: '2026-03-23',
      },
    ],
    faqs: [
      {
        question: 'What is the team size requirement?',
        answer: 'Teams can consist of 2-3 members from the same institution.',
      },
      {
        question: 'What topics are acceptable for the research paper?',
        answer:
          'Papers should focus on innovative technology solutions in fields like AI, IoT, blockchain, renewable energy, or other emerging technologies.',
      },
      {
        question: 'Is there a specific paper format required?',
        answer:
          'Yes, papers must follow IEEE format guidelines. Templates will be provided upon registration.',
      },
      {
        question: 'Can we submit previously published work?',
        answer:
          'No, all submissions must be original, unpublished work. Plagiarism will result in disqualification.',
      },
      {
        question: 'Will the papers be published?',
        answer:
          'Selected papers will be published in the conference proceedings with ISBN.',
      },
    ],
    requirements: [
      'Active university or college students',
      'Team of 2-3 members',
      'Original, unpublished research',
      'Basic understanding of research methodology',
    ],
    deliverables: [
      'Abstract (500 words)',
      'Full paper (IEEE format, 6-8 pages)',
      'Presentation slides',
      'Research data/code (if applicable)',
    ],
  },

  PTC: {
    code: 'PTC',
    name: 'ProtoTech Contest',
    tagline: 'Build The Future, Today',
    description:
      'The ProtoTech Contest challenges teams to design and develop innovative technology prototypes. Transform your ideas into working prototypes and compete against the best innovators.',
    prizePool: {
      first: 'Rp 7,000,000',
      second: 'Rp 4,000,000',
      third: 'Rp 2,000,000',
      total: 'Rp 13,000,000',
    },
    timeline: [
      {
        phase: 'Registration Period',
        description: 'Open registration for all prototype teams',
        startDate: '2026-01-01',
        endDate: '2026-02-10',
      },
      {
        phase: 'Proposal Submission',
        description: 'Submit prototype concept and design document',
        startDate: '2026-01-15',
        endDate: '2026-02-15',
      },
      {
        phase: 'Development Phase',
        description: 'Build and test your prototype',
        startDate: '2026-02-16',
        endDate: '2026-03-10',
      },
      {
        phase: 'Preliminary Demo',
        description: 'Submit video demonstration and technical documentation',
        startDate: '2026-03-11',
        endDate: '2026-03-15',
      },
      {
        phase: 'Final Exhibition',
        description: 'Top 15 teams showcase prototypes at live exhibition',
        startDate: '2026-03-25',
        endDate: '2026-03-26',
      },
    ],
    faqs: [
      {
        question: 'What is the team size requirement?',
        answer: 'Teams can consist of 3-5 members from the same institution.',
      },
      {
        question: 'Is there a registration fee?',
        answer: 'Yes, registration fee is Rp 200,000 per team.',
      },
      {
        question: 'What type of prototypes are acceptable?',
        answer:
          'Hardware, software, or hybrid prototypes addressing real-world problems. Must be functional and demonstrable.',
      },
      {
        question: 'Will materials/components be provided?',
        answer:
          'No, teams are responsible for sourcing and funding their own materials. Budget should be reasonable and documented.',
      },
      {
        question: 'Can we use existing open-source projects?',
        answer:
          'Yes, but you must clearly document what is original work vs. existing components. Innovation and originality are key judging criteria.',
      },
      {
        question: 'What if our prototype fails during the demo?',
        answer:
          'You will have a backup video demonstration. However, live demos score higher than videos.',
      },
    ],
    requirements: [
      'Active university or college students',
      'Team of 3-5 members',
      'Functional prototype (hardware/software/hybrid)',
      'Project must address a real-world problem',
    ],
    deliverables: [
      'Design document & proposal',
      'Working prototype',
      'Technical documentation',
      'Demo video (3-5 minutes)',
      'Source code (if applicable)',
      'Bill of materials',
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
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
