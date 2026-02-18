import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableContent } from "@/components/portable-content";
import { sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { skillBySlugQuery } from "@/sanity/lib/queries";
import type { Skill } from "@/sanity/lib/types";

type PageProps = {
  params: {
    slug: string;
  };
};

async function getSkill(slug: string): Promise<Skill | null> {
  return sanityFetch<Skill>({
    query: skillBySlugQuery,
    params: { slug },
    revalidate: 120
  });
}

export default async function SkillPage({ params }: PageProps) {
  const skill = await getSkill(params.slug);

  if (!skill) {
    notFound();
  }

  const coverUrl = skill.coverImage ? urlForImage(skill.coverImage).width(1400).height(1000).url() : null;

  return (
    <article className="gap-5 grid">
      <Link href="/skills" className="hover:opacity-70 w-fit text-[#17453a] transition-opacity">
        Back to all skills
      </Link>
      <header>
        <h1 className="type-display m-0 text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.9]">
          {skill.title}
        </h1>
        <p className="mt-3 text-[#5e564a] text-sm">{skill.category || "Skill"}</p>
      </header>

      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={skill.coverImage?.alt || skill.title}
          width={1400}
          height={1000}
          className="border border-[#e7dfd2] rounded-[14px] w-full"
        />
      ) : null}

      {skill.summary ? <p className="max-w-[62ch] leading-relaxed">{skill.summary}</p> : null}

      <div className="[&_p]:mb-4 [&_ul]:mb-4 [&_ul]:pl-6 max-w-none leading-relaxed [&_ul]:list-disc">
        <PortableContent value={skill.description} />
      </div>

      {skill.relatedProjects?.length ? (
        <section className="bg-white p-4 border border-[#e7dfd2] rounded-[14px]">
          <h2 className="m-0 text-lg">Related Projects</h2>
          <ul className="mt-3 mb-0 pl-6 list-disc">
            {skill.relatedProjects.map((project) => (
              <li key={project._id} className="py-0.5">
                {project.slug?.current ? (
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="hover:opacity-70 text-[#17453a] transition-opacity"
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
