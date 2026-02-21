import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { projectsQuery, projectFiltersQuery } from "@/sanity/lib/queries";
import type { Project, ProjectCategory, SkillSummary, Client } from "@/sanity/lib/types";
import ProjectGrid from "@/components/project-grid";

export const revalidate = 60;

type FilterData = {
  categories: ProjectCategory[];
  skills: SkillSummary[];
  clients: Client[];
};

async function getProjects(): Promise<Project[]> {
  const projects = await sanityFetch<Project[]>({ query: projectsQuery, revalidate });
  return projects || [];
}

async function getFilters(): Promise<FilterData> {
  const filters = await sanityFetch<FilterData>({ query: projectFiltersQuery, revalidate });
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
