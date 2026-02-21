export type SanityImage = {
  _type: "image";
  alt?: string;
  asset?: {
    _ref: string;
    _type: "reference";
  };
};

export type Client = {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  logo?: SanityImage;
  website?: string;
  description?: string;
};

export type ProjectCategory = {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
};

export type SkillSummary = {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
};

export type Project = {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  year?: number;
  category?: ProjectCategory;
  client?: Client;
  skills?: SkillSummary[];
  description?: unknown[];
  featuredImage?: SanityImage;
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
  headerBrandLabel?: string;
  headerNavLinks?: Array<{
    label?: string;
    href?: string;
  }>;
  seoTitle?: string;
  seoDescription?: string;
  socialLinks?: Array<{
    label?: string;
    url?: string;
  }>;
};

export type HeroBlock = {
  _type: "heroBlock";
  _key: string;
  title?: string;
  subtitle?: string;
  mainImage?: SanityImage;
};

export type FeaturedProjectSummary = {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  shortSummary?: string;
  featuredImage?: SanityImage;
};

export type FeaturedProjectsBlock = {
  _type: "featuredProjectsBlock";
  _key: string;
  projects?: FeaturedProjectSummary[];
};

export type SplitContentBlock = {
  _type: "splitContentBlock";
  _key: string;
  image?: SanityImage;
  heading?: string;
  content?: unknown[];
  imageOnRight?: boolean;
};

export type LegacySplitContentBlock = Omit<SplitContentBlock, "_type"> & {
  _type: "splitContent";
};

export type ClientSliderBlock = {
  _type: "clientSliderBlock";
  _key: string;
  heading?: string;
  clients?: Client[];
};

export type PageSection =
  | HeroBlock
  | ClientSliderBlock
  | FeaturedProjectsBlock
  | SplitContentBlock
  | LegacySplitContentBlock;

export type Page = {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  sections?: PageSection[];
};
