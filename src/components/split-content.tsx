// create a view for the split content type schema block
import Image from "next/image";
import { urlForImage } from "../sanity/lib/image";
import { SplitContentType } from "../types/sanity";

interface SplitContentProps {
  block: SplitContentType;
}

export default function SplitContent({ block }: SplitContentProps) {
  const { image, heading, content } = block;
  const imageUrl = image ? urlForImage(image).width(800).url() : null;

  return (
    <section className="items-center gap-12 lg:gap-20 grid lg:grid-cols-2 mt-20 lg:mt-28 mb-20 lg:mb-24">
      <div className="relative rounded-lg w-full aspect-square overflow-hidden">
        <div className="relative shadow-[0_24px_50px_rgba(0,0,0,0.18)] border-[10px] border-white rounded-lg size-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image.alt || heading || "Split content image"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-[var(--vanilla-custard)] size-full" />
          )}
        </div>
      </div>
      <div>
        {heading ? (
          <h2 className="mb-4 font-bold text-3xl type-display">{heading}</h2>
        ) : null}
        {content ? (
          <div className="max-w-none prose prose-lg">
            {/* @ts-expect-error */}
            {content.map((block, index) => (
                <div key={index}>   
                    {/* @ts-expect-error */}
                    <PortableText value={block} />
                </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}