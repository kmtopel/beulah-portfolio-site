import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableContent } from "@/components/portable-content";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { skillBySlugQuery, projectsBySkillSlugQuery } from "@/sanity/lib/queries";
import type { Skill, Project } from "@/sanity/lib/types";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    slug: string;
  };
};

async function getSkill(slug: string): Promise<Skill | null> {
  const { data } = await sanityFetch({
    query: skillBySlugQuery,
    params: { slug }
  });
  return data as Skill | null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const skill = await getSkill(params.slug);
  if (!skill) return {};

  const ogImage = skill.coverImage
    ? urlForImage(skill.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title: skill.title,
    description: skill.summary || `${skill.title} — a core skill by Beulah Peters`,
    alternates: { canonical: `/skills/${params.slug}` },
    openGraph: {
      title: skill.title,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {})
    }
  };
}

export default async function SkillPage({ params }: PageProps) {
  const [skill, relatedProjectsResult] = await Promise.all([
    getSkill(params.slug),
    sanityFetch({
      query: projectsBySkillSlugQuery,
      params: { skillSlug: params.slug }
    })
  ]);

  const relatedProjects = (relatedProjectsResult.data as Pick<Project, "_id" | "title" | "slug" | "featuredImage">[]) || [];

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
        <h1 className="m-0 text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.9] type-display">
          {skill.title}
        </h1>
        {skill.summary ? <p className="mt-3 text-[#5e564a] text-sm">{skill.summary}</p> : null}
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

      {relatedProjects.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-5 font-bold text-3xl type-display">Related Projects</h2>
          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((project) => (
              <Link
                key={project._id}
                href={project.slug?.current ? `/projects/${project.slug.current}` : "#"}
                className="group block bg-white shadow-lg hover:shadow-xl border border-[var(--vanilla-custard)] rounded-lg overflow-hidden transition-shadow"
              >
                <div className="relative h-48">
                  {project.featuredImage ? (
                    <Image
                      src={urlForImage(project.featuredImage).width(800).height(600).url()}
                      alt={project.featuredImage?.alt || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="bg-[linear-gradient(120deg,var(--tea-green),var(--tertiary))] size-full" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-xl">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <Link
              href={`/projects?skill=${params.slug}`}
              className="group inline-flex items-center gap-2 bg-[#17453a] hover:opacity-90 px-5 py-2.5 rounded-full font-medium text-white text-base transition-opacity"
            >
              <span>See more projects related to this skill</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
            </Link>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-[#17453a] text-base border border-[#17453a] hover:bg-[#17453a]/5 transition-colors"
            >
              <span>All Projects</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
            </Link>
          </div>
        </section>
      ) : null}
    </article>
  );
}
