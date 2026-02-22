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
