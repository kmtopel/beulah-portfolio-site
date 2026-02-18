import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { fallbackProjects } from "@/sanity/lib/fallbacks";
import { urlForImage } from "@/sanity/lib/image";
import { projectsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";

export const revalidate = 60;

async function getProjects(): Promise<Project[]> {
  const projects = await sanityFetch<Project[]>({ query: projectsQuery, revalidate });
  return projects?.length ? projects : fallbackProjects;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="grid gap-6">
      <h1 className="type-display m-0 text-[clamp(2.2rem,5vw,3.3rem)] leading-[0.92]">
        Projects
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {projects.map((project) => {
          const imageUrl = project.featuredImage ? urlForImage(project.featuredImage).width(800).height(600).url() : null;

          return (
            <Link
              key={project._id}
              href={project.slug?.current ? `/projects/${project.slug.current}` : "#"}
              className="grid overflow-hidden rounded-[14px] border border-[var(--vanilla-custard)] bg-[var(--tertiary)] [grid-template-rows:180px_auto]"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={project.featuredImage?.alt || project.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(120deg,var(--tea-green),var(--tertiary))]" />
              )}
              <div className="grid gap-1 p-4">
                <h2 className="m-0 text-[1.05rem]">{project.title}</h2>
                <p className="m-0 text-sm text-[var(--reddish-brown)]">
                  {project.year ? String(project.year) : "Year TBD"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
