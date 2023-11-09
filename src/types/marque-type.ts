export type SponsorLogo = {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
};

export type OurSponsorsPageResponse = {
  ourSponsorLogo: SponsorLogo[];
};

export type MarquePropsData = {
  ourSponsorsPage: OurSponsorsPageResponse;
};
