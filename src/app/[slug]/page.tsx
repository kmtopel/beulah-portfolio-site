import { notFound } from "next/navigation";
import PageSections from "@/components/page-sections";
import { sanityFetch } from "@/sanity/lib/client";
import { pageBySlugQuery, pageSlugsQuery } from "@/sanity/lib/queries";
import type { Page } from "@/sanity/lib/types";

export const revalidate = 120;
export const dynamicParams = false;
export const dynamic = "force-static";

const reservedSlugs = new Set(["home", "projects", "skills"]);

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({ query: pageSlugsQuery, revalidate });

  return (
    slugs
      ?.map((item) => item.slug)
      .filter((slug): slug is string => Boolean(slug) && !reservedSlugs.has(slug))
      .map((slug) => ({ slug })) || []
  );
}

async function getPage(slug: string): Promise<Page | null> {
  return sanityFetch<Page>({
    query: pageBySlugQuery,
    params: { slug },
    revalidate
  });
}

export default async function DynamicPage({ params }: PageProps) {
  if (reservedSlugs.has(params.slug)) {
    notFound();
  }

  const page = await getPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <section className="gap-6 grid">
      {page.sections?.length ? <PageSections sections={page.sections} /> : null}
    </section>
  );
}
