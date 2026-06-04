import ClientSlider from "@/components/client-slider";
import FeaturedProjects from "@/components/featured-projects";
import Hero from "@/components/hero";
import { PortableContent } from "@/components/portable-content";
import SplitContent from "@/components/split-content";
import type { PageSection } from "@/sanity/lib/types";

type PageSectionsProps = {
  sections: PageSection[];
};

function renderSection(section: PageSection) {
  if (section._type === "heroBlock") {
    return <Hero heroData={section} />;
  }

  if (section._type === "clientSliderBlock") {
    return <ClientSlider heading={section.heading} clients={section.clients || []} />;
  }

  if (section._type === "featuredProjectsBlock") {
    return <FeaturedProjects projects={section.projects || []} />;
  }

  if (section._type === "richTextBlock") {
    return (
      <div className="max-w-none prose prose-lg [&>*+*]:mt-4">
        <PortableContent value={section.content} />
      </div>
    );
  }

  if (section._type === "splitContentBlock" || section._type === "splitContent") {
    return <SplitContent block={section} />;
  }

  return (
    <div className="bg-[var(--tertiary)] p-4 border border-[var(--vanilla-custard)] rounded-[14px] text-sm">
      Unsupported section type.
    </div>
  );
}

export default function PageSections({ sections }: PageSectionsProps) {
  return (
    <div className="gap-8 md:gap-10 lg:gap-14 grid">
      {sections.map((section) => (
        <div key={section._key} data-name={`block/${section._type}`}>
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
}
