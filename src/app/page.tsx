import PageSections from "@/components/page-sections";
import { hasRequiredEnv } from "@/sanity/lib/env";
import { sanityFetch } from "@/sanity/lib/live";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import type { Page } from "@/sanity/lib/types";

export const dynamic = "force-dynamic";

async function getHomePage(): Promise<Page | null> {
  const { data: homeByName } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "home" }
  });

  if (homeByName) {
    return homeByName as Page;
  }

  const { data: homeBySlash } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "/" }
  });

  return homeBySlash as Page | null;
}

export default async function HomePage() {
  const homePage = await getHomePage();
  const sections = homePage?.sections || [];

  return (
    <section>
      {sections.length > 0 ? (
        <PageSections sections={sections} />
      ) : (
        <div className="rounded-[14px] border border-[var(--vanilla-custard)] bg-[var(--tertiary)] p-6 text-[var(--reddish-brown)]">
          {!hasRequiredEnv
            ? "Set SANITY env vars to load the CMS home page."
            : "Create a `Page` document with slug `home` and add blocks in `sections`."}
        </div>
      )}
    </section>
  );
}
