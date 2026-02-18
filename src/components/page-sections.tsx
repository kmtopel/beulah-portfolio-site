import Hero from "@/components/hero";
import type { HeroBlock } from "@/sanity/lib/types";

type PageSectionsProps = {
  sections: HeroBlock[];
};

export default function PageSections({ sections }: PageSectionsProps) {
  return (
    <div className="grid">
      {sections.map((section) => {
        if (section._type === "heroBlock") {
          return <Hero key={section._key} heroData={section} />;
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
