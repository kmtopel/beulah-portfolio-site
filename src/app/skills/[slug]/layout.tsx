import type { ReactNode } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { skillSlugsQuery } from "@/sanity/lib/queries";

export const revalidate = 120;
export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: skillSlugsQuery,
    revalidate
  });

  return (
    slugs
      ?.map((item) => item.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ slug })) || []
  );
}

type SkillSlugLayoutProps = {
  children: ReactNode;
};

export default function SkillSlugLayout({ children }: SkillSlugLayoutProps) {
  return children;
}
