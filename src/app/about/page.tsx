import Image from "next/image";
import { PortableContent } from "@/components/portable-content";
import { sanityFetch } from "@/sanity/lib/client";
import { hasRequiredEnv } from "@/sanity/lib/env";
import { fallbackAbout } from "@/sanity/lib/fallbacks";
import { urlForImage } from "@/sanity/lib/image";
import { aboutQuery } from "@/sanity/lib/queries";
import type { About } from "@/sanity/lib/types";

export const revalidate = 10;

async function getAbout(): Promise<About> {
  const about = await sanityFetch<About>({ query: aboutQuery, revalidate });
  return about || fallbackAbout;
}

export default async function AboutPage() {
  const about = await getAbout();
  const portraitUrl = about.portrait ? urlForImage(about.portrait).width(880).height(1100).url() : null;

  return (
    <section>
      <div className="gap-4 grid mb-8">
        <span className="inline-flex items-center gap-2 bg-[#fffdf7] px-3 py-1.5 border border-[#e7dfd2] rounded-full w-fit text-[#5e564a] text-xs">
          About
        </span>
        <h1 className="m-0 font-['Canela','Iowan_Old_Style','Times_New_Roman',serif] text-[clamp(2.2rem,6vw,4rem)] leading-none">
          {about.title || "About Beulah"}
        </h1>
        {!hasRequiredEnv && (
          <p className="max-w-[62ch] text-[#5e564a]">
            This page is rendering fallback content until your Sanity env vars are configured.
          </p>
        )}
      </div>

      <div className="md:items-start gap-6 grid md:grid-cols-[320px_1fr]">
        {portraitUrl ? (
          <Image
            src={portraitUrl}
            alt={about.portrait?.alt || "Portrait"}
            width={880}
            height={1100}
            className="border border-[#e7dfd2] rounded-[14px] w-full max-w-[440px]"
          />
        ) : null}

        <article className="[&_p]:mb-4 [&_ul]:mb-4 [&_ul]:pl-6 max-w-none leading-relaxed [&_ul]:list-disc">
          <PortableContent value={about.bio} />
          {about.cvUrl ? (
            <p>
              <a href={about.cvUrl} target="_blank" rel="noreferrer">
                View CV
              </a>
            </p>
          ) : null}
        </article>
      </div>
    </section>
  );
}
