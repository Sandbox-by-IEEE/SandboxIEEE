import {
  FileInputType,
  IsWarnedFileInputType,
} from '@/components/FileInput/fileInput-type';

export type MemberInfo = {
  name: string;
  email: string;
  institution: string;
  phoneNumber: string;
  age: number;
  twibbonProof: string;
  twibbonProofName: string;
  studentProof: string;
  studentProofName: string;
};

export type InputData = {
  teamName: string;
  memberCount: number;
  members: MemberInfo[];
  paymentMethod?: string;
  paymentProofUrl?: FileInputType[];
};

export type IsWarnedMemberInfo = {
  name: boolean;
  email: boolean;
  institution: boolean;
  phoneNumber: boolean;
  age: boolean;
  twibbonProof: boolean;
  twibbonProofName: boolean;
  studentProof: boolean;
  studentProofName: boolean;
};

export type IsWarnedInputData = {
  teamName: boolean;
  memberCount: boolean;
  members: IsWarnedMemberInfo[];
  paymentMethod?: boolean;
  paymentProofUrl?: IsWarnedFileInputType[];
};
