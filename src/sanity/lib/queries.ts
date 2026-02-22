export const projectsQuery = `
  *[_type == "project"] | order(year desc, _createdAt desc) {
    _id,
    title,
    slug,
    year,
    category->{_id, title, slug},
    client->{_id, title, slug, logo, website},
    skills[]->{_id, title, slug},
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
    client->{_id, title, slug, logo, website},
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
    summary,
    description,
    coverImage
  }
`;

export const skillBySlugQuery = `
  *[_type == "skill" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    description,
    coverImage
  }
`;

export const projectsBySkillSlugQuery = `
  *[_type == "project" && $skillSlug in skills[]->slug.current] | order(_createdAt desc) [0...3] {
    _id,
    title,
    slug,
    "featuredImage": coalesce(featuredImage, coverImage)
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
      },
      _type == "clientSliderBlock" => {
        _key,
        _type,
        heading,
        "clients": *[_type == "client"] | order(title asc) {
          _id,
          title,
          slug,
          logo,
          website
        }
      }
    }
  }
`;

export const projectFiltersQuery = `{
  "categories": *[_type == "projectCategory"] | order(title asc) { _id, title, slug },
  "skills": *[_type == "skill"] | order(title asc) { _id, title, slug },
  "clients": *[_type == "client"] | order(title asc) { _id, title, slug }
}`;

export const pageSlugsQuery = `
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`;
