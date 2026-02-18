import FeaturedProjects from "@/components/featured-projects";
import Hero from "@/components/hero";
import type { PageSection } from "@/sanity/lib/types";

type PageSectionsProps = {
  sections: PageSection[];
};

export default function PageSections({ sections }: PageSectionsProps) {
  return (
    <div className="grid">
      {sections.map((section) => {
        if (section._type === "heroBlock") {
          return <Hero key={section._key} heroData={section} />;
        }

        if (section._type === "featuredProjectsBlock") {
          return <FeaturedProjects key={section._key} projects={section.projects || []} />;
        }

        return (
          <section
            key={section._key}
            className="bg-[var(--tertiary)] p-4 border border-[var(--vanilla-custard)] rounded-[14px] text-sm"
          >
            Unsupported section type: {section._type}
          </section>
        );
      })}
    </div>
  );
}
