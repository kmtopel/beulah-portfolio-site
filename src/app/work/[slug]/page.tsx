import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableContent } from "@/components/portable-content";
import { sanityFetch } from "@/sanity/lib/client";
import { hasRequiredEnv } from "@/sanity/lib/env";
import { fallbackProjects } from "@/sanity/lib/fallbacks";
import { urlForImage } from "@/sanity/lib/image";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";

export const revalidate = 60;

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: projectSlugsQuery,
    revalidate
  });

  if (slugs?.length) {
    return slugs.map((item) => ({ slug: item.slug }));
  }

  return fallbackProjects
    .map((item) => item.slug?.current)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

async function getProject(slug: string): Promise<Project | null> {
  const project = await sanityFetch<Project>({
    query: projectBySlugQuery,
    params: { slug },
    revalidate
  });

  if (project) {
    return project;
  }

  if (!hasRequiredEnv) {
    return fallbackProjects.find((item) => item.slug?.current === slug) || null;
  }

  return null;
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const coverUrl = project.coverImage ? urlForImage(project.coverImage).width(1400).height(1000).url() : null;

  return (
    <article className="grid gap-5">
      <Link href="/" className="w-fit text-[#17453a] transition-opacity hover:opacity-70">
        Back to all work
      </Link>
      <header>
        <h1 className="m-0 font-['Canela','Iowan_Old_Style','Times_New_Roman',serif] text-[clamp(2.2rem,6vw,4rem)] leading-none">
          {project.title}
        </h1>
        <p className="mt-3 text-sm text-[#5e564a]">
          {project.year ? `${project.year}` : "Year TBD"}
          {project.tags?.length ? ` · ${project.tags.join(" / ")}` : ""}
        </p>
      </header>

      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={project.coverImage?.alt || project.title}
          width={1400}
          height={1000}
          className="w-full rounded-[14px] border border-[#e7dfd2]"
        />
      ) : null}

      <div className="max-w-none leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
        <PortableContent value={project.description} />
      </div>

      {project.externalUrl ? (
        <p>
          <a href={project.externalUrl} target="_blank" rel="noreferrer" className="text-[#17453a]">
            Visit project link
          </a>
        </p>
      ) : null}
    </article>
  );
}
