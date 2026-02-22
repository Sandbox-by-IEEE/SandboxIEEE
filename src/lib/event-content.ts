/**
 * ============================================================================
 * EVENT CONTENT - Static display content for each event
 * ============================================================================
 *
 * Contains descriptions, FAQs, speakers, and links for Exhibition and
 * Grand Seminar pages. These are informational pages (no registration flow).
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
  'grand-seminar': {
    code: 'grand-seminar',
    name: 'Grand Seminar',
    tagline: 'Inspiring Minds, Shaping The Future',
    description:
      'Grand Seminar is a flagship seminar serving as the main intellectual gateway of The Sandbox 3.0, combining expert insights and youth perspectives on Smart Automation Technology and its impact on industry and society. The seminar focuses on industry perspectives on automation and smart systems, youth innovation, future skills, and technology-driven problem solving, as well as bridging discussion-based learning with real innovation showcased in the Exhibition.',
    date: 'February 28, 2026',
    dateISO: '2026-02-28T09:00:00+07:00',
    venue: 'To Be Announced',
    speakers: [
      {
        name: 'Speaker 1',
        title: 'Keynote Speaker',
        organization: 'Coming Soon',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula sit amet velit eget malesuada. Suspendisse non porta velit. Cras eu arcu et urna venenatis finibus vitae id risus. Vivamus ultricies bibendum magna, rhoncus maximus elit venenatis rhoncus.',
      },
      {
        name: 'Speaker 2',
        title: 'Guest Speaker',
        organization: 'Coming Soon',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula sit amet velit eget malesuada. Suspendisse non porta velit. Cras eu arcu et urna venenatis finibus vitae id risus. Vivamus ultricies bibendum magna, rhoncus maximus elit venenatis rhoncus.',
      },
    ],
    links: [
      {
        label: 'Registration Link',
        url: '#',
      },
      {
        label: 'Event Guidebook',
        url: '#',
      },
      {
        label: 'SOP & TOR',
        url: '#',
      },
    ],
  },

  //YIF event
  'youth-international-forum': {
    code: 'youth-international-forum',
    name: 'Youth International Forum',
    tagline: 'Empowering Youth, Connecting the World',
    description: 'Youth International Forum (YIF) is a global discussion platform where young innovators share ideas and solutions related to Smart Automation Technology and its impact on society and industry. As part of The Sandbox 3.0, YIF highlights youth innovation, future skills, and collaborative problem solving while connecting discussions to real innovations presented in the Exhibition.',
    date: 'February 28, 2026',
    dateISO: '2026-02-28T09:00:00+07:00',
    venue: 'To Be Announced',
    speakers: [
      {
        name: 'Xaviera Putri Ardianingsih Listyo',
        title: 'The Essential Tech Stack for 2030: Surviving the Era of Smart Automation',
        organization: 'Coming Soon',
        description: 'As industries pivot toward Industry 4.0 and Smart Automation, the demand for talent is shifting rapidly. It is no longer just about knowing how to code; it is about knowing how to think. In this session, Xaviera breaks down the "Survival Kit" for the next decade. She will explore the intersection of human critical thinking and industrial machine logic, discussing the essential hard and soft skills required to remain relevant.',
      },
      {
        name: 'Sebastian Teddy',
        title: 'Content 4.0: Leveraging Smart Automation for Creative Careers',
        organization: 'Coming Soon',
        description: 'Smart Automation isn\'t just for factories; it is revolutionizing the creative economy. Sebastian Teddy dives into Content 4.0, identifying how creators can harness automation tools and AI to scale their personal branding and streamline workflows. This session bridges the gap between technology and creativity, proving that automation is the ultimate tool for efficiency in modern career paths.',
      },
    ],
    links: [
      {
        label: 'Registration Link',
        url: '#',
      },
      {
        label: 'Event Guidebook',
        url: '#',
      },
      {
        label: 'SOP & TOR',
        url: '#',
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
