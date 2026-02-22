"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { X } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import type { Project, ProjectCategory, SkillSummary, Client } from "@/sanity/lib/types";

interface FilterOption {
  _id: string;
  title: string;
  slug?: { current: string };
}

interface ProjectGridProps {
  projects: Project[];
  categories: ProjectCategory[];
  skills: SkillSummary[];
  clients: Client[];
}

function FilterGroup({
  label,
  paramKey,
  options,
  activeSlug,
  onToggle
}: {
  label: string;
  paramKey: string;
  options: FilterOption[];
  activeSlug: string | null;
  onToggle: (paramKey: string, slug: string | null) => void;
}) {
  if (!options.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wider opacity-50">{label}</span>
      {options.map((option) => {
        const slug = option.slug?.current;
        if (!slug) return null;
        const isActive = activeSlug === slug;

        return (
          <button
            key={option._id}
            onClick={() => onToggle(paramKey, isActive ? null : slug)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              isActive
                ? "bg-[#17453a] text-white border-[#17453a]"
                : "bg-white border-[var(--vanilla-custard)] hover:border-[#17453a]/40"
            }`}
          >
            {option.title}
          </button>
        );
      })}
    </div>
  );
}

export default function ProjectGrid({ projects, categories, skills, clients }: ProjectGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category");
  const activeSkill = searchParams.get("skill");
  const activeClient = searchParams.get("client");

  const hasFilters = activeCategory || activeSkill || activeClient;

  const handleToggle = useCallback(
    (paramKey: string, slug: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set(paramKey, slug);
      } else {
        params.delete(paramKey);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (activeCategory && project.category?.slug?.current !== activeCategory) {
        return false;
      }
      if (activeSkill && !project.skills?.some((s) => s.slug?.current === activeSkill)) {
        return false;
      }
      if (activeClient && project.client?.slug?.current !== activeClient) {
        return false;
      }
      return true;
    });
  }, [projects, activeCategory, activeSkill, activeClient]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <div className="flex flex-col gap-3">
            <FilterGroup label="Category" paramKey="category" options={categories} activeSlug={activeCategory} onToggle={handleToggle} />
            <FilterGroup label="Skill" paramKey="skill" options={skills} activeSlug={activeSkill} onToggle={handleToggle} />
            <FilterGroup label="Client" paramKey="client" options={clients} activeSlug={activeClient} onToggle={handleToggle} />
          </div>

          {hasFilters ? (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 text-sm text-[#17453a] hover:opacity-70 transition-opacity w-fit md:shrink-0"
            >
              <X size={14} />
              Clear filters
            </button>
          ) : null}
        </div>

        {activeSkill ? (() => {
          const activeSkillTitle = skills.find((s) => s.slug?.current === activeSkill)?.title;
          return activeSkillTitle ? (
            <Link
              href={`/skills/${activeSkill}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-medium text-white bg-[#17453a] rounded-full hover:opacity-90 transition-opacity w-fit"
            >
              Read more about my experience with {activeSkillTitle} &rarr;
            </Link>
          ) : null;
        })() : null}
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((project) => {
            const imageUrl = project.featuredImage
              ? urlForImage(project.featuredImage).width(800).height(600).url()
              : null;

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
          })
        ) : (
          <p className="col-span-full text-center py-12 opacity-50">
            No projects match the selected filters.
          </p>
        )}
      </div>
    </>
  );
}
