import PageSections from "@/components/page-sections";
import { sanityFetch } from "@/sanity/lib/client";
import { hasRequiredEnv } from "@/sanity/lib/env";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import type { Page } from "@/sanity/lib/types";

export const revalidate = 60;

async function getHomePage(): Promise<Page | null> {
  const homeByName = await sanityFetch<Page>({
    query: pageBySlugQuery,
    params: { slug: "home" },
    revalidate
  });

  if (homeByName) {
    return homeByName;
  }

  return sanityFetch<Page>({
    query: pageBySlugQuery,
    params: { slug: "/" },
    revalidate
  });
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
