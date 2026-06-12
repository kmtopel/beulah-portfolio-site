import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Portfolio of design, branding, and content creation projects by Beulah Peters.",
  alternates: { canonical: "/projects" }
};
import { sanityFetch } from "@/sanity/lib/live";
import { projectsQuery, projectFiltersQuery } from "@/sanity/lib/queries";
import type { Project, ProjectCategory, SkillSummary, Client } from "@/sanity/lib/types";
import ProjectGrid from "@/components/project-grid";

type FilterData = {
  categories: ProjectCategory[];
  skills: SkillSummary[];
  clients: Client[];
};

async function getProjects(): Promise<Project[]> {
  const { data } = await sanityFetch({ query: projectsQuery });
  return (data as Project[]) || [];
}

async function getFilters(): Promise<FilterData> {
  const { data } = await sanityFetch({ query: projectFiltersQuery });
  const filters = data as FilterData | null;
  return {
    categories: filters?.categories || [],
    skills: filters?.skills || [],
    clients: filters?.clients || []
  };
}

export default async function ProjectsPage() {
  const [projects, filters] = await Promise.all([getProjects(), getFilters()]);

  return (
    <section className="gap-6 grid">
      <h1 className="m-0 text-[clamp(2.2rem,5vw,3.3rem)] leading-[0.92] type-display">
        Projects
      </h1>

      <Suspense>
        <ProjectGrid
          projects={projects}
          categories={filters.categories}
          skills={filters.skills}
          clients={filters.clients}
        />
      </Suspense>
    </section>
  );
}
