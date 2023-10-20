import {
  type Document,
  type Node,
  type Record,
  type StructuredText as STType,
} from 'datocms-structured-text-utils';

export interface Image {
  url: string;
  title: string;
  width: number;
  height: number;
}

export interface GrandSeminar {
  titleSeminarPage: string;
  timelineSectionTitle: string;
  targetDate: string;
  ourSpeakerTitleSection: string;
  imageMascot: Image;
  faqSectionTitle: string;
  explanationTitle: string;
  explanationDescription:
    | Document
    | Node
    | STType<Record, Record>
    | null
    | undefined;
  countdownTitle: string;
  buttonTextSeeMoreCountdown: string;
  buttonTextSeeMore: string;
  buttonTextRegister: string;
  backgroundImage: Image;
}

export interface FaqGrandSeminar {
  id: string;
  question: string;
  answer: Document | Node | STType<Record, Record> | null | undefined;
}

export interface Speaker {
  id: string;
  name: string;
  instagramUsername: string;
  imageSpeaker: Image;
  explanationSpeaker:
    | Document
    | Node
    | STType<Record, Record>
    | null
    | undefined;
  company: Image;
  positionSpeaker: string;
}

export interface GrandSeminarPageProps {
  grandSeminar: GrandSeminar;
  allFaqGrandSeminars: FaqGrandSeminar[];
  allOurSpeakers: Speaker[];
}
