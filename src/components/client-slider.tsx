"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import type { Client } from "@/sanity/lib/types";

interface ClientSliderProps {
  heading?: string;
  clients: Client[];
}

const VIEWPORT_BUFFER = 1.5;
const EASE_DURATION_MS = 600;

/** Smoothly ramp the playbackRate of all animations on `el` toward `target` over `duration` ms. */
function easePlaybackRate(el: HTMLElement, target: number, duration: number) {
  const animations = el.getAnimations();
  if (!animations.length) return;

  const start = animations[0].playbackRate;
  if (start === target) return;

  const t0 = performance.now();

  const tick = (now: number) => {
    const elapsed = now - t0;
    const progress = Math.min(elapsed / duration, 1);
    // ease-in-out cubic
    const eased =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    const rate = start + (target - start) * eased;

    animations.forEach((a) => {
      a.playbackRate = rate;
    });

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

export default function ClientSlider({ heading, clients }: ClientSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const originalsRef = useRef<HTMLElement[]>([]);

  const layout = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const originals = originalsRef.current;
    if (!originals.length) return;

    // Remove previous clones
    track.querySelectorAll("[data-marquee-clone]").forEach((n) => n.remove());

    // Reset animation to force reflow
    track.style.animation = "none";
    void track.offsetWidth;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      track.classList.remove("animate-marquee", "self-start", "w-max");
      track.classList.add("flex-wrap", "justify-center", "gap-y-4");
      track.style.removeProperty("--marquee-shift");
      track.style.animation = "";
      return;
    }

    track.classList.remove("flex-wrap", "justify-center", "gap-y-4");
    track.classList.add("self-start", "w-max");

    const singleSetWidth = originals.reduce(
      (sum, el) => sum + el.getBoundingClientRect().width,
      0
    );
    if (singleSetWidth === 0) return;

    const desiredWidth = window.innerWidth * 2 * VIEWPORT_BUFFER;
    const copies = Math.max(2, Math.ceil(desiredWidth / singleSetWidth));

    const frag = document.createDocumentFragment();
    for (let i = 1; i < copies; i++) {
      originals.forEach((el) => {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.setAttribute("aria-hidden", "true");
        clone.dataset.marqueeClone = "true";
        clone.querySelectorAll("img").forEach((img) => img.setAttribute("alt", ""));
        frag.appendChild(clone);
      });
    }
    track.appendChild(frag);

    track.style.setProperty("--marquee-shift", `-${100 / copies}%`);
    track.style.animation = "";
    track.classList.add("animate-marquee");
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Capture the original children (before cloning)
    originalsRef.current = Array.from(track.children) as HTMLElement[];

    // Wait for images to load, then run layout
    const imgs = Array.from(track.querySelectorAll("img"));
    const pending = imgs.filter((img) => !img.complete);

    if (pending.length) {
      Promise.all(
        pending.map(
          (img) =>
            new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            })
        )
      ).then(layout);
    } else {
      layout();
    }

    // Re-layout on resize (width changes only)
    let resizeTimer: ReturnType<typeof setTimeout>;
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 150);
    };
    window.addEventListener("resize", onResize);

    // Re-layout on reduced motion preference change
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", layout);

    return () => {
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", layout);
      clearTimeout(resizeTimer);
    };
  }, [layout]);

  const handleMouseEnter = useCallback(() => {
    const track = trackRef.current;
    if (track) easePlaybackRate(track, 0, EASE_DURATION_MS);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const track = trackRef.current;
    if (track) easePlaybackRate(track, 1, EASE_DURATION_MS);
  }, []);

  if (!clients?.length) return null;

  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen flex flex-col items-center gap-8 overflow-hidden py-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {heading ? (
        <h2 className="font-bold text-3xl type-display">{heading}</h2>
      ) : null}

      <div ref={trackRef} className="flex items-center w-max self-start">
        {clients.map((client) => {
          if (!client?._id) return null;
          const slug = client.slug?.current;
          const title = client.title || "Client";
          const logo = client.logo?.asset ? client.logo : null;

          return (
            <div key={client._id} className="shrink-0 flex">
              <Link
                href={slug ? `/projects?client=${slug}` : "/projects"}
                className="group flex items-center justify-center px-10 md:px-16 py-4"
              >
                {logo ? (
                  <Image
                    src={urlForImage(logo).width(400).fit("max").url()}
                    alt={logo.alt || title}
                    width={300}
                    height={200}
                    className="opacity-60 group-hover:opacity-100 brightness-0 w-auto h-16 md:h-20 object-contain transition-opacity"
                  />
                ) : (
                  <span className="opacity-60 group-hover:opacity-100 font-medium text-sm transition-opacity whitespace-nowrap">
                    {title}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
