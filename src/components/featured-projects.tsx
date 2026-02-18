import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import type { FeaturedProjectSummary } from "@/sanity/lib/types";

interface FeaturedProjectsProps {
  projects: FeaturedProjectSummary[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects?.length) {
    return null;
  }

  return (
    <section className="mt-20 lg:mt-28 mb-20 lg:mb-24">
      <h2 className="mb-10 font-bold text-3xl type-display">Featured Projects</h2>
      <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
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
              <h3 className="mb-2 font-semibold text-xl">{project.title}</h3>
              {project.shortSummary ? (
                <p className="text-gray-700 text-sm">{project.shortSummary}</p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
      <a href="/projects" className="inline-block mt-4 text-center hover:underline">See all projects</a>
    </section>
  );
}
