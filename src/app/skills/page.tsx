import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { hasRequiredEnv } from "@/sanity/lib/env";
import { urlForImage } from "@/sanity/lib/image";
import { skillsQuery } from "@/sanity/lib/queries";
import type { Skill } from "@/sanity/lib/types";

export const revalidate = 120;

async function getSkills(): Promise<Skill[]> {
  const skills = await sanityFetch<Skill[]>({ query: skillsQuery, revalidate });
  return skills || [];
}

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <section>
      <div className="gap-4 grid mb-8">
        <span className="inline-flex items-center gap-2 bg-[#fffdf7] px-3 py-1.5 border border-[#e7dfd2] rounded-full w-fit text-[#5e564a] text-xs">
          Skills
        </span>
        <h1 className="type-display m-0 text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.9]">
          Core Skills
        </h1>
        <p className="max-w-[62ch] text-[#5e564a]">
          A structured list of Beulah&apos;s capabilities. Each skill has a detail page and can
          link to related projects.
        </p>
        {!hasRequiredEnv && (
          <span className="inline-flex items-center gap-2 bg-[#fffdf7] px-3 py-1.5 border border-[#e7dfd2] rounded-full w-fit text-[#5e564a] text-xs">
            Configure Sanity env vars to load live skill content.
          </span>
        )}
      </div>

      <div className="gap-4 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {skills.map((skill) => {
          const imageUrl = skill.coverImage ? urlForImage(skill.coverImage).width(800).height(600).url() : null;

          return (
            <Link
              key={skill._id}
              href={skill.slug?.current ? `/skills/${skill.slug.current}` : "#"}
              className="grid bg-white border border-[#e7dfd2] rounded-[14px] overflow-hidden [grid-template-rows:180px_auto]"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={skill.coverImage?.alt || skill.title}
                  width={800}
                  height={600}
                  className="bg-[linear-gradient(120deg,#d9ece7,#f6f0df)] size-full object-cover"
                />
              ) : (
                <div className="bg-[linear-gradient(120deg,#d9ece7,#f6f0df)] size-full" />
              )}

              <div className="gap-2 grid p-4">
                <h2 className="m-0 text-[1.05rem]">{skill.title}</h2>
                <div className="text-[#5e564a] text-sm">
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
