import {
  type Document,
  type Node,
  type Record,
  type StructuredText as STType,
} from 'datocms-structured-text-utils';

import { TimelineItem } from '@/types/exhibition-type';

interface Homepage {
  trailerSectionTitle: string;
  titleHomepage: string;
  titleCountdownNearestEvent: string;
  timelineSectionTitle: string;
  textButtonSeeMore: string;
  targetDate: Date;
  tagline: string;
  sandboxLogo: Image;
  ieeeLogo: Image;
  faqSectionTitle: string;
  explanationTitle: string;
  explanationDescription:
    | Document
    | Node
    | STType<Record, Record>
    | null
    | undefined;
  embedYoutubeId: string;
  buttonTextTwo: string;
  buttonTextPastEvents: string;
  buttonTextPartnerUs: string;
  buttonTextOne: string;
  ourSponsor: string;
  buttonTextGetKnowUs: string;
  background: Image[];
  ourSponsorLogo: Image[];
  ourEventSectionTitle: string;
  linkButtonTwo: string;
  linkButtonOne: string;
}

interface OurEventsHomepage {
  id: string;
  image: Image;
  highlightEvent?: string;
  explanationEvent: Document | Node | STType<Record, Record> | null | undefined;
  eventName: string;
  buttonSeeMore: boolean;
  buttonRegister: boolean;
}

interface FaqHomepage {
  id: string;
  answer: Document | Node | STType<Record, Record> | null | undefined;
  question: string;
}

interface Image {
  url: string;
  width: number;
  id: string;
  title: string;
  height: number;
}

export interface HomepageProps {
  homepage: Homepage;
  allTimelineSandboxes: TimelineItem[];
  allOurEventsHomepages: OurEventsHomepage[];
  allFaqHomePages: FaqHomepage[];
}
