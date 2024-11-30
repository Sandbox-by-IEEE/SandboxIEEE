import {
  type Document,
  type Node,
  type Record,
  type StructuredText as STType,
} from 'datocms-structured-text-utils';

interface H4hPage {
  h4hSectionTitles: string;
  titleH4hPages: string;
  timelineSectionTitle: string;
  targetDate: string;
  regisFeesSectionTitle: string;
  subtitle: string;
  description: string;
  guidebook: string;
  regisFeesDescription:
    | Document
    | Node
    | STType<Record, Record>
    | null
    | undefined;
  imageMascot: {
    title: string;
    width: number;
    url: string;
    height: number;
  };
  hadiahDescription:
    | Document
    | Node
    | STType<Record, Record>
    | null
    | undefined;
  hadiahSectionTitle: string;
  guideSectionTitle: string;
  guideDescription: Document | Node | STType<Record, Record> | null | undefined;
  faqSectionTitle: string;
  explanationDescription:
    | Document
    | Node
    | STType<Record, Record>
    | null
    | undefined;
  countdownSectionTitle: string;
  buttonTextSeeMore: string;
  buttonTextRegister: string;
  backgroundImage: {
    width: number;
    url: string;
    title: string;
    height: number;
  };
}

interface timeLineH4H {
  id: string;
  text: string;
  date: Date;
}

interface FaqH4h {
  id: string;
  question: string;
  answer: Document | Node | STType<Record, Record> | null | undefined;
}

export interface H4HProps {
  h4hPage: H4hPage;
  allFaqH4hs: FaqH4h[];
  allTimelineH4hs: timeLineH4H[];
}
