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
      <div className="mb-8 grid gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e7dfd2] bg-[#fffdf7] px-3 py-1.5 text-xs text-[#5e564a]">
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
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e7dfd2] bg-[#fffdf7] px-3 py-1.5 text-xs text-[#5e564a]">
            Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in
            `.env.local` to use live content.
          </span>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {projects.map((project) => {
          const imageUrl = project.coverImage ? urlForImage(project.coverImage).width(800).height(600).url() : null;

          return (
            <Link
              key={project._id}
              href={project.slug?.current ? `/work/${project.slug.current}` : "#"}
              className="grid overflow-hidden rounded-[14px] border border-[#e7dfd2] bg-[#fffdf7] [grid-template-rows:180px_auto]"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={project.coverImage?.alt || project.title}
                  width={800}
                  height={600}
                  className="h-full w-full bg-[linear-gradient(120deg,#d9ece7,#f6f0df)] object-cover"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(120deg,#d9ece7,#f6f0df)]" />
              )}

              <div className="grid gap-2 p-4">
                <h2 className="m-0 text-[1.05rem]">{project.title}</h2>
                <div className="text-sm text-[#5e564a]">
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
