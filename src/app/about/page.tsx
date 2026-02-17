import Image from "next/image";
import { PortableContent } from "@/components/portable-content";
import { sanityFetch } from "@/sanity/lib/client";
import { hasRequiredEnv } from "@/sanity/lib/env";
import { fallbackAbout } from "@/sanity/lib/fallbacks";
import { urlForImage } from "@/sanity/lib/image";
import { aboutQuery } from "@/sanity/lib/queries";
import type { About } from "@/sanity/lib/types";

export const revalidate = 300;

async function getAbout(): Promise<About> {
  const about = await sanityFetch<About>({ query: aboutQuery, revalidate });
  return about || fallbackAbout;
}

export default async function AboutPage() {
  const about = await getAbout();
  const portraitUrl = about.portrait ? urlForImage(about.portrait).width(880).height(1100).url() : null;

  return (
    <section>
      <div className="mb-8 grid gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e7dfd2] bg-[#fffdf7] px-3 py-1.5 text-xs text-[#5e564a]">
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

      <div className="grid gap-6 md:grid-cols-[320px_1fr] md:items-start">
        {portraitUrl ? (
          <Image
            src={portraitUrl}
            alt={about.portrait?.alt || "Portrait"}
            width={880}
            height={1100}
            className="w-full max-w-[440px] rounded-[14px] border border-[#e7dfd2]"
          />
        ) : null}

        <article className="max-w-none leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
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
