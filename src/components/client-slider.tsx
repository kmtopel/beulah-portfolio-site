"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { urlForImage } from "@/sanity/lib/image";
import type { Client } from "@/sanity/lib/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

interface ClientSliderProps {
  heading?: string;
  clients: Client[];
}

export default function ClientSlider({ heading, clients }: ClientSliderProps) {
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  const updateNav = (swiper: SwiperType) => {
    setCanGoPrev(!swiper.isBeginning);
    setCanGoNext(!swiper.isEnd);
  };

  if (!clients?.length) return null;

  return (
    <section className="w-full">
      {heading ? (
        <h2 className="mb-5 font-bold text-3xl type-display">{heading}</h2>
      ) : null}

      <Swiper
        modules={[Navigation, FreeMode]}
        navigation={{
          nextEl: ".client-slider-next",
          prevEl: ".client-slider-prev"
        }}
        freeMode
        grabCursor
        slidesPerView="auto"
        spaceBetween={32}
        touchEventsTarget="container"
        className="client-slider w-full !overflow-visible"
        onSwiper={updateNav}
        onSlideChange={updateNav}
        onReachBeginning={updateNav}
        onReachEnd={updateNav}
      >
        {clients.map((client) => {
          if (!client?._id) return null;
          const slug = client.slug?.current;
          const title = client.title || "Client";
          const logo = client.logo?.asset ? client.logo : null;

          return (
            <SwiperSlide key={client._id} className="!w-auto">
              <Link
                href={slug ? `/projects?client=${slug}` : "/projects"}
                className="flex items-center h-28"
              >
                {logo ? (
                  <Image
                    src={urlForImage(logo).width(400).fit("max").url()}
                    alt={logo.alt || title}
                    width={300}
                    height={200}
                    className="opacity-60 hover:opacity-100 brightness-0 w-auto h-24 object-contain transition-opacity"
                  />
                ) : (
                  <span className="flex items-center opacity-60 hover:opacity-100 px-4 h-24 font-medium text-[#333] hover:text-black text-sm transition-all">
                    {title}
                  </span>
                )}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {(canGoPrev || canGoNext) && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button disabled={!canGoPrev} className="flex justify-center items-center bg-white hover:bg-[#17453a]/5 disabled:opacity-30 border border-[var(--vanilla-custard)] rounded-full w-9 h-9 text-[#17453a] transition-colors disabled:cursor-default client-slider-prev">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button disabled={!canGoNext} className="flex justify-center items-center bg-white hover:bg-[#17453a]/5 disabled:opacity-30 border border-[var(--vanilla-custard)] rounded-full w-9 h-9 text-[#17453a] transition-colors disabled:cursor-default client-slider-next">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      )}

      <style jsx global>{`
        .client-slider,
        .client-slider .swiper-wrapper {
          overflow: visible !important;
        }
        .client-slider .swiper-button-next,
        .client-slider .swiper-button-prev {
          display: none;
        }
      `}</style>
    </section>
  );
}
