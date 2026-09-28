export type ApplyTutorPayload = {
  bio: string;
  headline: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certificates: {
    url: string | null;
    key: string | null;
  }[];
  experiences: {
    role: string;
    company: string;
    duration: string;
    description?: string;
  }[];
  skills: string[];
  links: {
    linkedin: string | null;
    portfolio: string | null;
    github: string | null;
  };
};