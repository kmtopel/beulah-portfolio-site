import ClientSlider from "@/components/client-slider";
import FeaturedProjects from "@/components/featured-projects";
import Hero from "@/components/hero";
import SplitContent from "@/components/split-content";
import type { PageSection } from "@/sanity/lib/types";

type PageSectionsProps = {
  sections: PageSection[];
};

export default function PageSections({ sections }: PageSectionsProps) {
  return (
    <div className="gap-8 md:gap-10 lg:gap-14 grid">
      {sections.map((section, index) => {
        if (section._type === "heroBlock") {
          return <Hero key={section._key} heroData={section} />;
        }

        if (section._type === "clientSliderBlock") {
          return <ClientSlider key={section._key} heading={section.heading} clients={section.clients || []} />;
        }

        if (section._type === "featuredProjectsBlock") {
          return <FeaturedProjects key={section._key} projects={section.projects || []} />;
        }

        if (section._type === "splitContentBlock" || section._type === "splitContent") {
          return <SplitContent key={section._key} block={section} />;
        }

        return (
          <section
            key={`unsupported-section-${index}`}
            className="bg-[var(--tertiary)] p-4 border border-[var(--vanilla-custard)] rounded-[14px] text-sm"
          >
            Unsupported section type.
          </section>
        );
      })}
    </div>
  );
}
