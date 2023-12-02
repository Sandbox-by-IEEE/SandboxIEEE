interface OurMediaPartnerLogo {
  url: string;
  width: number;
  title: string;
  id: string;
  height: number;
}

interface OurSponsorLogo {
  url: string;
  width: number;
  title: string;
  id: string;
  height: number;
}

interface OurSponsorsPage {
  ourSponsorSectionTitle: string;
  ourMediaPartner: string;
  ourMediaPartnerLogo: OurMediaPartnerLogo[];
  ourSponsorLogo: OurSponsorLogo[];
}
export interface OurSponsorsPageProps {
  ourSponsorsPage: OurSponsorsPage;
}
