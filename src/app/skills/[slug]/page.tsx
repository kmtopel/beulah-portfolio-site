import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableContent } from "@/components/portable-content";
import { sanityFetch } from "@/sanity/lib/client";
import { hasRequiredEnv } from "@/sanity/lib/env";
import { fallbackSkills } from "@/sanity/lib/fallbacks";
import { urlForImage } from "@/sanity/lib/image";
import { skillBySlugQuery, skillSlugsQuery } from "@/sanity/lib/queries";
import type { Skill } from "@/sanity/lib/types";

export const revalidate = 120;

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: skillSlugsQuery,
    revalidate
  });

  if (slugs?.length) {
    return slugs.map((item) => ({ slug: item.slug }));
  }

  return fallbackSkills
    .map((item) => item.slug?.current)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

async function getSkill(slug: string): Promise<Skill | null> {
  const skill = await sanityFetch<Skill>({
    query: skillBySlugQuery,
    params: { slug },
    revalidate
  });

  if (skill) {
    return skill;
  }

  if (!hasRequiredEnv) {
    return fallbackSkills.find((item) => item.slug?.current === slug) || null;
  }

  return null;
}

export default async function SkillPage({ params }: PageProps) {
  const skill = await getSkill(params.slug);

  if (!skill) {
    notFound();
  }

  const coverUrl = skill.coverImage ? urlForImage(skill.coverImage).width(1400).height(1000).url() : null;

  return (
    <article className="grid gap-5">
      <Link href="/skills" className="w-fit text-[#17453a] transition-opacity hover:opacity-70">
        Back to all skills
      </Link>
      <header>
        <h1 className="m-0 font-['Canela','Iowan_Old_Style','Times_New_Roman',serif] text-[clamp(2.2rem,6vw,4rem)] leading-none">
          {skill.title}
        </h1>
        <p className="mt-3 text-sm text-[#5e564a]">{skill.category || "Skill"}</p>
      </header>

      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={skill.coverImage?.alt || skill.title}
          width={1400}
          height={1000}
          className="w-full rounded-[14px] border border-[#e7dfd2]"
        />
      ) : null}

      {skill.summary ? <p className="max-w-[62ch] leading-relaxed">{skill.summary}</p> : null}

      <div className="max-w-none leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
        <PortableContent value={skill.description} />
      </div>

      {skill.relatedProjects?.length ? (
        <section className="rounded-[14px] border border-[#e7dfd2] bg-[#fffdf7] p-4">
          <h2 className="m-0 text-lg">Related Projects</h2>
          <ul className="mb-0 mt-3 list-disc pl-6">
            {skill.relatedProjects.map((project) => (
              <li key={project._id} className="py-0.5">
                {project.slug?.current ? (
                  <Link
                    href={`/work/${project.slug.current}`}
                    className="text-[#17453a] transition-opacity hover:opacity-70"
                  >
                    {project.title}
                  </Link>
                ) : (
                  project.title
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
