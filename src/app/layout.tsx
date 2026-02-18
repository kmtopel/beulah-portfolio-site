import { Archivo_Narrow, Cormorant_Garamond, Manrope } from "next/font/google";
import Header from "@/components/header";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const accentFont = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  weight: ["500", "600", "700"]
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await sanityFetch<SiteSettings>({ query: siteSettingsQuery, revalidate: 300 });
  const navLinks =
    siteSettings?.headerNavLinks?.flatMap((item) =>
      item?.label && item?.href ? [{ label: item.label, href: item.href }] : []
    ) ?? [];

  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${accentFont.variable} relative isolate overflow-x-clip bg-white text-[var(--dark-olive-green)] antialiased`}
      >
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-white [background:radial-gradient(130%_100%_at_10%_92%,rgba(203,223,189,0.74)_0%,rgba(203,223,189,0.52)_35%,rgba(203,223,189,0.24)_60%,rgba(203,223,189,0.07)_78%,rgba(203,223,189,0)_90%),radial-gradient(105%_86%_at_28%_82%,rgba(203,223,189,0.18)_0%,rgba(203,223,189,0.08)_42%,rgba(203,223,189,0)_72%),#fff] md:[background:radial-gradient(120%_95%_at_12%_88%,rgba(203,223,189,0.78)_0%,rgba(203,223,189,0.56)_32%,rgba(203,223,189,0.26)_57%,rgba(203,223,189,0.08)_74%,rgba(203,223,189,0)_86%),radial-gradient(90%_78%_at_30%_80%,rgba(203,223,189,0.22)_0%,rgba(203,223,189,0.1)_40%,rgba(203,223,189,0)_72%),#fff]"
        />
        <div className="relative z-10">
          <Header navLinks={navLinks} />
          <main className="mx-auto px-5 pt-8 pb-20 w-full max-w-[1020px]">{children}</main>
        </div>
      </body>
    </html>
  );
}
