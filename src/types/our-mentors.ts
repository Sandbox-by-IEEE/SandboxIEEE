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

export interface MentorPage {
  title: string;
}

export interface Mentor {
  id: string;
  image: Image;
  name: string;
  post: string;
  desc: Document | Node | STType<Record, Record> | null | undefined;
  company: Image;
  invert: boolean;
  instagram: string;
  horizontal: boolean;
}

export interface OurMentorsPageProps {
  ourMentorsPage: MentorPage;
  allMentorDetails: Mentor[];
}
