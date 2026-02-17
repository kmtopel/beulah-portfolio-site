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
      <h1 className="font-['Canela','Iowan_Old_Style','Times_New_Roman',serif] text-[clamp(2.2rem,6vw,4rem)] leading-none">
        Projects
      </h1> 
    </section>
  );
}
