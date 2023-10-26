import { FileInputType } from '@/components/FileInput/fileInput-type';

export type memberInfo = {
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

export type inputData = {
  teamName: string;
  memberCount: number;
  members: memberInfo[];
  paymentMethod?: string;
  paymentProofUrl?: FileInputType[];
};
