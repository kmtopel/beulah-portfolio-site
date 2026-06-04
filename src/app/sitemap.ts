import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { projectSlugsQuery, skillSlugsQuery, pageSlugsQuery } from "@/sanity/lib/queries";

const SITE_URL = "https://beulahpeters.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, skillSlugs, pageSlugs] = await Promise.all([
    sanityFetch<Array<{ slug: string }>>({ query: projectSlugsQuery }),
    sanityFetch<Array<{ slug: string }>>({ query: skillSlugsQuery }),
    sanityFetch<Array<{ slug: string }>>({ query: pageSlugsQuery })
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/skills`, changeFrequency: "monthly", priority: 0.7 }
  ];

  const projectRoutes: MetadataRoute.Sitemap = (projectSlugs || [])
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${SITE_URL}/projects/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }));

  const skillRoutes: MetadataRoute.Sitemap = (skillSlugs || [])
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${SITE_URL}/skills/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }));

  const pageRoutes: MetadataRoute.Sitemap = (pageSlugs || [])
    .filter((item) => item.slug && !["home"].includes(item.slug))
    .map((item) => ({
      url: `${SITE_URL}/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5
    }));

  return [...staticRoutes, ...projectRoutes, ...skillRoutes, ...pageRoutes];
}
