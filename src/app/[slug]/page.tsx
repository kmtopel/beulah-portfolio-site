import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageSections from "@/components/page-sections";
import { sanityFetch } from "@/sanity/lib/live";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import type { Page } from "@/sanity/lib/types";

export const dynamic = "force-dynamic";

const reservedSlugs = new Set(["home", "projects", "skills", "studio"]);

type PageProps = {
  params: {
    slug: string;
  };
};

async function getPage(slug: string): Promise<Page | null> {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug }
  });
  return data as Page | null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (reservedSlugs.has(params.slug)) return {};
  const page = await getPage(params.slug);
  if (!page) return {};

  return {
    title: page.title,
    alternates: { canonical: `/${params.slug}` }
  };
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
