import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { hasRequiredEnv } from "@/sanity/lib/env";
import { fallbackProjects } from "@/sanity/lib/fallbacks";
import { urlForImage } from "@/sanity/lib/image";
import { projectsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";

export const revalidate = 60;

async function getProjects(): Promise<Project[]> {
  const projects = await sanityFetch<Project[]>({ query: projectsQuery, revalidate });
  return projects?.length ? projects : fallbackProjects;
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <section>
      <div className="gap-4 grid mb-8">
        <span className="inline-flex items-center gap-2 bg-[#fffdf7] px-3 py-1.5 border border-[#e7dfd2] rounded-full w-fit text-[#5e564a] text-xs">
          Portfolio
        </span>
        <h1 className="m-0 font-['Canela','Iowan_Old_Style','Times_New_Roman',serif] text-[clamp(2.2rem,6vw,4rem)] leading-none">
          Beulah&apos;s Work
        </h1>
        <p className="max-w-[62ch] text-[#5e564a]">
          A Next.js portfolio connected to Sanity CMS. Start publishing projects in Studio,
          then refine layout and interactions once we have final art direction.
        </p>
        {!hasRequiredEnv && (
          <span className="inline-flex items-center gap-2 bg-[#fffdf7] px-3 py-1.5 border border-[#e7dfd2] rounded-full w-fit text-[#5e564a] text-xs">
            Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in
            `.env.local` to use live content.
          </span>
        )}
      </div>

      <div className="gap-4 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {projects.map((project) => {
          const imageUrl = project.featuredImage ? urlForImage(project.featuredImage).width(800).height(600).url() : null;

          return (
            <Link
              key={project._id}
              href={project.slug?.current ? `/projects/${project.slug.current}` : "#"}
              className="grid bg-[#fffdf7] border border-[#e7dfd2] rounded-[14px] overflow-hidden [grid-template-rows:180px_auto]"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={project.featuredImage?.alt || project.title}
                  width={800}
                  height={600}
                  className="bg-[linear-gradient(120deg,#d9ece7,#f6f0df)] w-full h-full object-cover"
                />
              ) : (
                <div className="bg-[linear-gradient(120deg,#d9ece7,#f6f0df)] w-full h-full" />
              )}

              <div className="gap-2 grid p-4">
                <h2 className="m-0 text-[1.05rem]">{project.title}</h2>
                <div className="text-[#5e564a] text-sm">
                  {project.year ? `${project.year}` : "Year TBD"}
                  {project.tags?.length ? ` · ${project.tags.join(" / ")}` : ""}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
