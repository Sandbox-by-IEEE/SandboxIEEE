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

export interface ExhibitionData {
  backgroundImage: Image;
  buttonShowFinal: boolean;
  buttonTextRegister: string;
  buttonTextSeeMore: string;
  buttonTextSeeMote: string;
  countdownTitle: string;
  embedLocationUrl: string;
  explanationDescription:
    | Document
    | Node
    | STType<Record, Record>
    | null
    | undefined;
  explanationTitle: string;
  faqSectionTitle: string;
  finalProjectTitle: string;
  guideDescription: Document | Node | STType<Record, Record> | null | undefined;
  guideTitle: string;
  imageMascot: Image;
  targetDate: string;
  timelineSectionTitle: string;
  titleExhibitionPage: string;
  titleLocation: string;
  ptcSubtitle: string;
  tpcSubtitle: string;
  urlLocationMaps: string;
  buttonTextBackgroundOne: string;
}

export interface AllFinalProjectsExhibition {
  topic: string;
  teamsName: string;
  projectsUrl: string;
  image: Image;
  id: string;
}

export interface FaqExhibition {
  id: string;
  question: string;
  answer: Document | Node | STType<Record, Record> | null | undefined;
}

export interface ExhibitionDataProps {
  exhibition: ExhibitionData;
  allFinalProjectsPtcExhibitions: AllFinalProjectsExhibition[];
  allFinalProjectsTpcExhibitions: AllFinalProjectsExhibition[];
  allFaqExhibitions: FaqExhibition[];
  allTimelineExhibitions: TimelineItem[];
}

export interface TimelineItem {
  text: string;
  date: Date;
}

export interface VoteData {
  titleVotePage: string;
  descriptionVote: Document | Node | STType<Record, Record> | null | undefined;
}
export interface VoteDataProps {
  votePage: VoteData;
  allFinalProjectsPtcExhibitions: AllFinalProjectsExhibition[];
  allFinalProjectsTpcExhibitions: AllFinalProjectsExhibition[];
}
