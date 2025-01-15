interface Registration {
  proof: string;
  proofTitle: string;
}

interface RegistrationPrice {
  id: string;
  price: number;
  date: Date;
}

export interface RegistrationProps {
  registration: Registration;
  registrationPrice: RegistrationPrice[];
}
