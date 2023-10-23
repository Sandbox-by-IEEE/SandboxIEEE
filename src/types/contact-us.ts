import {
  type Document,
  type Node,
  type Record,
  type StructuredText as STType,
} from 'datocms-structured-text-utils';

interface ContactUsProps {
  contactUsTitle: string;
  description: Document | Node | STType<Record, Record> | null | undefined;
}

interface ContactPersonProps {
  id: number;
  lineId: string;
  nameContactPerson: string;
  phoneNumber: string;
}

export interface ContactUsPageProps {
  contactUsPage: ContactUsProps;
  allContactPeople: ContactPersonProps[];
}
