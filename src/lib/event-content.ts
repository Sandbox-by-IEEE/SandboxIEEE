/**
 * ============================================================================
 * EVENT CONTENT - Static display content for each event
 * ============================================================================
 *
 * Contains descriptions, FAQs, speakers, and links for the
 * YIF x Grand Seminar page. This is an informational page (no registration flow).
 * ============================================================================
 */

export interface Speaker {
  name: string;
  title: string;
  organization: string;
  description: string;
  imageUrl?: string;
}

export interface LinkTreeItem {
  label: string;
  url: string;
  description?: string;
}

export interface EventContent {
  code: string;
  name: string;
  tagline: string;
  description: string;
  date: string; // Display date string
  dateISO: string; // ISO date for countdown
  venue: string;
  speakers?: Speaker[];
  links: LinkTreeItem[];
}

export const EVENT_CONTENT: Record<string, EventContent> = {
  'yif-x-grand-seminar': {
    code: 'yif-x-grand-seminar',
    name: 'YIF x Grand Seminar',
    tagline: 'Inspiring Minds, Shaping The Future',
    description:
      'YIF x Grand Seminar is a flagship event of The Sandbox 3.0 that combines a world-class seminar with a global youth discussion platform. Featuring expert insights alongside youth perspectives, this event explores Smart Automation Technology and its impact on industry and society. It focuses on industry perspectives on automation and smart systems, youth innovation, future skills, and technology-driven problem solving — bridging discussion-based learning with real innovation showcased in the Exhibition.',
    date: 'March 7, 2026',
    dateISO: '2026-03-07T09:00:00+07:00',
    venue: 'To Be Announced',
    speakers: [
      {
        name: 'Xaviera Putri Ardianingsih Listyo',
        title:
          'The Essential Tech Stack for 2030: Surviving the Era of Smart Automation',
        organization: 'Coming Soon',
        description:
          'As industries pivot toward Industry 4.0 and Smart Automation, the demand for talent is shifting rapidly. It is no longer just about knowing how to code; it is about knowing how to think. In this session, Xaviera breaks down the "Survival Kit" for the next decade. She will explore the intersection of human critical thinking and industrial machine logic, discussing the essential hard and soft skills required to remain relevant.',
      },
      {
        name: 'Sebastian Teddy',
        title: 'Content 4.0: Leveraging Smart Automation for Creative Careers',
        organization: 'Coming Soon',
        description:
          "Smart Automation isn't just for factories; it is revolutionizing the creative economy. Sebastian Teddy dives into Content 4.0, identifying how creators can harness automation tools and AI to scale their personal branding and streamline workflows. This session bridges the gap between technology and creativity, proving that automation is the ultimate tool for efficiency in modern career paths.",
      },
    ],
    links: [
      {
        label: 'Register Now',
        url: '/event/yif-x-grand-seminar/register',
      },
      {
        label: 'SOP',
        url: 'https://drive.google.com/file/d/1ET9a9e-w-d6pVki9TboVl3BWetyuewSQ/view?usp=sharin',
      },
      {
        label: 'TOR',
        url: 'https://drive.google.com/file/d/1vv6TaTXmVnaIKLesP01BTRoZS6x0-5V-/view?usp=sharin',
      },
    ],
  },
};

// Helper function to get event content
export function getEventContent(code: string): EventContent | null {
  const lowerCode = code.toLowerCase();
  return EVENT_CONTENT[lowerCode] || null;
}

// Get all event codes
export function getAllEventCodes(): string[] {
  return Object.keys(EVENT_CONTENT);
}
