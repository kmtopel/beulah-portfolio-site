import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableContent } from "@/components/portable-content";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    slug: string;
  };
};

async function getProject(slug: string): Promise<Project | null> {
  const { data } = await sanityFetch({
    query: projectBySlugQuery,
    params: { slug }
  });
  return data as Project | null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return {};

  const ogImage = project.featuredImage
    ? urlForImage(project.featuredImage).width(1200).height(630).url()
    : undefined;

  return {
    title: project.title,
    description: project.tags?.join(", ") || `${project.title} — a project by Beulah Peters`,
    alternates: { canonical: `/projects/${params.slug}` },
    openGraph: {
      title: project.title,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {})
    }
  };
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

      {project.client ? (
        <p className="text-sm text-[#17453a]/70">
          Client:{" "}
          {project.client.website ? (
            <a href={project.client.website} target="_blank" rel="noreferrer" className="underline">
              {project.client.title}
            </a>
          ) : (
            <span>{project.client.title}</span>
          )}
        </p>
      ) : null}

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
