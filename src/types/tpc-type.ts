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

export interface TPCData {
  backgroundImage: Image;
  buttonTextRegister: string;
  buttonTextSeeMore: string;
  buttonTextSeeMote: string;
  countdownSectionTitle: string;
  embedLocationUrl: string;
  explanationDescription:
    | Document
    | Node
    | STType<Record, Record>
    | null
    | undefined;
  explanationTitle: string;
  faqSectionTitle: string;
  guideSectionTitle: string;
  guideDescription: Document | Node | STType<Record, Record> | null | undefined;
  guideTitle: string;
  hadiahSectionTitle: string;
  imageMascot: Image;
  regisFeesSectionTitle: string;
  targetDate: string;
  timelineSectionTitle: string;
  titleTpcPage: string;
  tpcSectionTitle: string;
  ptcSubtitle: string;
  tpcSubtitle: string;
}

export interface FaqTpc {
  id: string;
  question: string;
  answer: Document | Node | STType<Record, Record> | null | undefined;
}

export interface TPCDataProps {
  Tpc: TPCData;
  allFaqTPC: FaqTpc[];
}
