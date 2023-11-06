import {
  type Document,
  type Node,
  type Record,
  type StructuredText as STType,
} from 'datocms-structured-text-utils';

type Image = {
  url: string;
  width: number;
  title: string;
  height: number;
};

export type Documentation = {
  id: string;
  url: string;
  width: number;
  title: string;
  height: number;
};

type Event = {
  title: string;
  image: Image;
  id: string;
  description: Document | Node | STType<Record, Record> | null | undefined;
  documentation: Documentation[];
};

export type pastEventsProps = {
  allPastEvents: Event[];
};
