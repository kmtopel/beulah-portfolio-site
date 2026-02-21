"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
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
  if (!clients?.length) return null;

  return (
    <section className="w-full">
      {heading ? (
        <h2 className="mb-5 font-bold text-3xl type-display">{heading}</h2>
      ) : null}

      <Swiper
        modules={[Navigation, FreeMode]}
        navigation
        freeMode
        slidesPerView="auto"
        spaceBetween={32}
        className="client-slider w-full"
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
                className="flex items-center h-20"
              >
                {logo ? (
                  <Image
                    src={urlForImage(logo).width(200).height(100).url()}
                    alt={logo.alt || title}
                    width={200}
                    height={100}
                    className="object-contain h-16 w-auto brightness-0 opacity-60 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="flex items-center h-16 px-4 font-medium text-sm text-[#333] opacity-60 hover:text-black hover:opacity-100 transition-all">
                    {title}
                  </span>
                )}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        .client-slider .swiper-button-next,
        .client-slider .swiper-button-prev {
          color: #17453a;
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 9999px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        }
        .client-slider .swiper-button-next::after,
        .client-slider .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }
        .client-slider .swiper-button-disabled {
          display: none;
        }
      `}</style>
    </section>
  );
}
