export type MemberInfo = {
  name: string;
  email: string;
  phoneNumber: string;
  lineId: string;
};

export type InputData = {
  memberCount: number;
  bankAccName: string;
  members: MemberInfo[];
  registrationType?: string;
  paymentMethod?: string;
  paymentProofName: string;
  paymentProofUrl: string;
};

export type IsWarnedMemberInfo = {
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
  lineId: boolean;
};

export type IsWarnedInputData = {
  memberCount: boolean;
  bankAccName: boolean;
  members: IsWarnedMemberInfo[];
  paymentMethod?: boolean;
  registrationType?: boolean;
  paymentProofName: boolean;
  paymentProofUrl: boolean;
};
