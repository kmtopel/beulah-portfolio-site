import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableContent } from "@/components/portable-content";
import { sanityFetch } from "@/sanity/lib/client";
import { hasRequiredEnv } from "@/sanity/lib/env";
import { urlForImage } from "@/sanity/lib/image";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";
import { ChevronLeft } from "lucide-react";

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

  return [];
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

  return null;
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const coverUrl = project.featuredImage ? urlForImage(project.featuredImage).width(1400).height(1000).url() : null;

  return (
    <article className="gap-5 grid">
      <Link href="/projects" className="flex items-center hover:opacity-70 w-fit text-[#17453a] transition-opacity">
        <ChevronLeft className="size-4" />
        <span>All Projects</span>
      </Link>
      <header>
        <h1 className="m-0 text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.9] type-display">
          {project.title}
        </h1>
      </header>

      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={project.featuredImage?.alt || project.title}
          width={1400}
          height={1000}
          className="border border-[#e7dfd2] rounded-[14px] w-full"
        />
      ) : null}

      <div className="[&_p]:mb-4 [&_ul]:mb-4 [&_ul]:pl-6 max-w-none leading-relaxed [&_ul]:list-disc">
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
