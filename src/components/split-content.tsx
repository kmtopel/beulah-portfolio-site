import Image from "next/image";
import { PortableContent } from "@/components/portable-content";
import { urlForImage } from "../sanity/lib/image";
import type { LegacySplitContentBlock, SplitContentBlock } from "@/sanity/lib/types";
interface SplitContentProps {
  block: SplitContentBlock | LegacySplitContentBlock;
}

export default function SplitContent({ block }: SplitContentProps) {
  const { image, heading, content, imageOnRight } = block;
  const imageUrl = image ? urlForImage(image).width(800).url() : null;
  const imageWrapperClasses = imageOnRight ? "lg:order-2" : "lg:order-1";
  const contentWrapperClasses = imageOnRight ? "lg:order-1" : "lg:order-2";

  return (
    <section className="items-center gap-12 lg:gap-20 grid lg:grid-cols-2">
      <div className={`relative rounded-lg w-full aspect-square overflow-hidden ${imageWrapperClasses}`}>
        <div className="relative shadow-[0_24px_50px_rgba(0,0,0,0.18)] border-[10px] border-white rounded-lg size-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alt || heading || "Split content image"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-[var(--vanilla-custard)] size-full" />
          )}
        </div>
      </div>
      <div className={contentWrapperClasses}>
        {heading ? (
          <h2 className="mb-4 font-bold text-3xl type-display">{heading}</h2>
        ) : null}
        {content ? (
          <div className="max-w-none prose prose-lg">
            <PortableContent value={content} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
