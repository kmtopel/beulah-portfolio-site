import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project"] | order(year desc, _createdAt desc) {
    _id,
    title,
    slug,
    year,
    description,
    coverImage,
    gallery,
    tags,
    externalUrl
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    description,
    coverImage,
    gallery,
    tags,
    externalUrl
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const aboutQuery = groq`
  *[_type == "about"][0] {
    _id,
    title,
    bio,
    portrait,
    cvUrl
  }
`;

export const skillsQuery = groq`
  *[_type == "skill"] | order(title asc) {
    _id,
    title,
    slug,
    category,
    summary,
    description,
    coverImage,
    relatedProjects[]->{
      _id,
      title,
      slug
    }
  }
`;

export const skillBySlugQuery = groq`
  *[_type == "skill" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    summary,
    description,
    coverImage,
    relatedProjects[]->{
      _id,
      title,
      slug
    }
  }
`;

export const skillSlugsQuery = groq`
  *[_type == "skill" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    seoTitle,
    seoDescription,
    socialLinks
  }
`;
