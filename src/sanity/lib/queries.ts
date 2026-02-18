export const projectsQuery = `
  *[_type == "project"] | order(year desc, _createdAt desc) {
    _id,
    title,
    slug,
    year,
    description,
    "featuredImage": coalesce(featuredImage, coverImage),
    gallery,
    tags,
    externalUrl
  }
`;

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    description,
    "featuredImage": coalesce(featuredImage, coverImage),
    gallery,
    tags,
    externalUrl
  }
`;

export const projectSlugsQuery = `
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const aboutQuery = `
  *[_type == "about"][0] {
    _id,
    title,
    bio,
    portrait,
    cvUrl
  }
`;

export const skillsQuery = `
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

export const skillBySlugQuery = `
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

export const skillSlugsQuery = `
  *[_type == "skill" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const siteSettingsQuery = `
  coalesce(
    *[_type == "siteSettings" && _id == "siteSettings"][0],
    *[_type == "siteSettings"][0]
  ) {
    _id,
    headerBrandLabel,
    headerNavLinks,
    seoTitle,
    seoDescription,
    socialLinks
  }
`;

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    sections[]{
      ...,
      _type == "heroBlock" => {
        _key,
        _type,
        title,
        subtitle,
        mainImage
      },
      _type == "featuredProjectsBlock" => {
        _key,
        _type,
        projects[]->{
          _id,
          title,
          slug,
          shortSummary,
          "featuredImage": coalesce(featuredImage, coverImage)
        }
      }
    }
  }
`;

export const pageSlugsQuery = `
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`;
