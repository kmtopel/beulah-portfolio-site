export type SanityImage = {
  _type: "image";
  alt?: string;
  asset?: {
    _ref: string;
    _type: "reference";
  };
};

export type Project = {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  year?: number;
  description?: unknown[];
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  tags?: string[];
  externalUrl?: string;
};

export type About = {
  _id: string;
  title?: string;
  bio?: unknown[];
  portrait?: SanityImage;
  cvUrl?: string;
};

export type Skill = {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  category?: string;
  summary?: string;
  description?: unknown[];
  coverImage?: SanityImage;
  relatedProjects?: Array<{
    _id: string;
    title: string;
    slug?: {
      current: string;
    };
  }>;
};

export type SiteSettings = {
  _id: string;
  seoTitle?: string;
  seoDescription?: string;
  socialLinks?: Array<{
    label?: string;
    url?: string;
  }>;
};
