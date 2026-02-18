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
    <section className="gap-6 grid">
      <h1 className="m-0 text-[clamp(2.2rem,5vw,3.3rem)] leading-[0.92] type-display">
        Projects
      </h1>

      <div className="gap-4 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {projects.map((project) => {
          const imageUrl = project.featuredImage ? urlForImage(project.featuredImage).width(800).height(600).url() : null;

          return (
            <Link
              key={project._id}
              href={project.slug?.current ? `/projects/${project.slug.current}` : "#"}
              className="grid bg-white border border-[var(--vanilla-custard)] rounded-[14px] overflow-hidden [grid-template-rows:180px_auto]"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={project.featuredImage?.alt || project.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-[linear-gradient(120deg,var(--tea-green),var(--tertiary))] w-full h-full" />
              )}
              <div className="gap-1 grid p-4">
                <h2 className="text-3xl">{project.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
