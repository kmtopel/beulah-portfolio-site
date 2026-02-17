import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { hasRequiredEnv } from "@/sanity/lib/env";
import { fallbackSkills } from "@/sanity/lib/fallbacks";
import { urlForImage } from "@/sanity/lib/image";
import { skillsQuery } from "@/sanity/lib/queries";
import type { Skill } from "@/sanity/lib/types";

export const revalidate = 120;

async function getSkills(): Promise<Skill[]> {
  const skills = await sanityFetch<Skill[]>({ query: skillsQuery, revalidate });
  return skills?.length ? skills : fallbackSkills;
}

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <section>
      <div className="mb-8 grid gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e7dfd2] bg-[#fffdf7] px-3 py-1.5 text-xs text-[#5e564a]">
          Skills
        </span>
        <h1 className="m-0 font-['Canela','Iowan_Old_Style','Times_New_Roman',serif] text-[clamp(2.2rem,6vw,4rem)] leading-none">
          Core Skills
        </h1>
        <p className="max-w-[62ch] text-[#5e564a]">
          A structured list of Beulah&apos;s capabilities. Each skill has a detail page and can
          link to related projects.
        </p>
        {!hasRequiredEnv && (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e7dfd2] bg-[#fffdf7] px-3 py-1.5 text-xs text-[#5e564a]">
            Configure Sanity env vars to load live skill content.
          </span>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {skills.map((skill) => {
          const imageUrl = skill.coverImage ? urlForImage(skill.coverImage).width(800).height(600).url() : null;

          return (
            <Link
              key={skill._id}
              href={skill.slug?.current ? `/skills/${skill.slug.current}` : "#"}
              className="grid overflow-hidden rounded-[14px] border border-[#e7dfd2] bg-[#fffdf7] [grid-template-rows:180px_auto]"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={skill.coverImage?.alt || skill.title}
                  width={800}
                  height={600}
                  className="h-full w-full bg-[linear-gradient(120deg,#d9ece7,#f6f0df)] object-cover"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(120deg,#d9ece7,#f6f0df)]" />
              )}

              <div className="grid gap-2 p-4">
                <h2 className="m-0 text-[1.05rem]">{skill.title}</h2>
                <div className="text-sm text-[#5e564a]">
                  {skill.category || "Skill"}
                  {skill.summary ? ` · ${skill.summary}` : ""}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
