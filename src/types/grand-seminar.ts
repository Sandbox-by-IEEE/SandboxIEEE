import {
  type Document,
  type Node,
  type Record,
  type StructuredText as STType,
} from 'datocms-structured-text-utils';

interface Image {
  width: number;
  url: string;
  title: string;
  height: number;
}

interface Company {
  url: string;
  width: number;
  title: string;
  height: number;
}

interface SpeakerDetails {
  id: string;
  linkedin: string;
  name: string;
  post: string;
  company: Company;
  desc: Document | Node | STType<Record, Record> | null | undefined;
  image: Image;
}

interface Faq {
  id: string;
  question: string;
  answer: Document | Node | STType<Record, Record> | null | undefined;
}

interface GrandSeminar {
  titleSeminarPage: string;
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
  detailSpeakerSectionTitle: string;
  countdownTitle: string;
  buttonTextSeeMoreCountdown: string;
  buttonTextSeeMore: string;
  buttonTextRegister: string;
  backgroundImage: Image;
}

export interface GrandSeminarPageProps {
  grandSeminar: GrandSeminar;
  allSpeakerDetails: SpeakerDetails[];
  allFaqGrandSeminars: Faq[];
}
