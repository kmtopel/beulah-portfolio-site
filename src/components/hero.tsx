import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { HeroBlock } from "@/sanity/lib/types";
import type { CSSProperties } from "react";

interface HeroProps {
  heroData: HeroBlock;
}

export default function Hero({ heroData }: HeroProps) {
  const { title, subtitle, mainImage } = heroData;
  const imageUrl =
    mainImage && mainImage.asset
      ? urlForImage(mainImage).width(1800).height(900).url()
      : null;
  const sectionStyles = {
    "--hero-mobile-size": "clamp(14rem, calc(100vw - 4rem), 20rem)",
    "--hero-desktop-size": "clamp(18rem, 35vw, 23.75rem)",
    "--hero-desktop-gap": "clamp(2.5rem, 6vw, 4.5rem)",
  } as CSSProperties;

  return (
    <section
      className="relative lg:mt-[var(--hero-desktop-gap)] lg:mb-[var(--hero-desktop-gap)]"
      style={sectionStyles}
    >
      <div className="lg:hidden z-20 relative mx-auto mb-[calc(var(--hero-mobile-size)*-0.5)] w-[var(--hero-mobile-size)]">
        <div className="relative shadow-[0_24px_50px_rgba(0,0,0,0.18)] border-[10px] border-white rounded-full w-full aspect-square overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={mainImage?.alt || title || "Hero image"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-[var(--vanilla-custard)] size-full" />
          )}
        </div>
      </div>

      <div className="lg:hidden content-center gap-4 grid bg-[var(--dark-olive-green)] px-8 md:px-10 pt-[calc(var(--hero-mobile-size)*0.5+1.5rem)] pb-10">
        {title ? (
          <h1 className="m-0 text-[clamp(2rem,11vw,3.4rem)] text-white text-center leading-[0.9] type-display">
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <p className="m-0 max-w-[56ch] font-bold text-white/85 text-lg text-center leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="hidden lg:block relative">
        <div className="relative grid grid-cols-[67fr_33fr]">
          <div className="content-center gap-4 grid bg-[var(--dark-olive-green)] px-16 py-14">
            {title ? (
              <h1 className="m-0 text-[clamp(2.4rem,6vw,4.8rem)] text-white text-left leading-[0.88] type-display">
                {title}
              </h1>
            ) : null}
            {subtitle ? (
              <p className="m-0 max-w-[56ch] font-bold text-white/85 text-2xl text-left leading-relaxed">
                {subtitle}
              </p>
            ) : null}
          </div>
          <div className="bg-[linear-gradient(to_right,var(--dark-olive-green)_0%,var(--dark-olive-green)_50%,transparent_50%,transparent_100%)]" />
        </div>

        <div className="top-1/2 right-0 z-10 absolute size-[var(--hero-desktop-size)] -translate-y-1/2">
          <div className="relative shadow-[0_24px_50px_rgba(0,0,0,0.18)] border-[10px] border-white rounded-full size-full overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={mainImage?.alt || title || "Hero image"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-[var(--vanilla-custard)] size-full" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
