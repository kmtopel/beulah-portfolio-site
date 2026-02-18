// series of 3 cards with image, title, description, and link to project page
import Image from "next/image";
import Link from "next/link";

export interface FeaturedProject {
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
}

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="my-20">
      <h2 className="mb-10 font-bold text-3xl type-display">Featured Projects</h2>
      <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={project.href}
            className="group block shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition-shadow"
          >
            <div className="relative h-48">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl || ""}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="bg-gray-200 size-full" />
              )}
            </div>
            <div className="p-4">
              <h3 className="mb-2 font-semibold text-xl">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}