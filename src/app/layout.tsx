import { Archivo_Narrow, Bodoni_Moda, Manrope } from "next/font/google";
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

const displayFont = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"]
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
        className={`${bodyFont.variable} ${displayFont.variable} ${accentFont.variable} bg-white text-[var(--dark-olive-green)] antialiased`}
      >
        <Header
          navLinks={navLinks}
        />
        <main className="mx-auto px-5 pt-8 pb-20 w-full max-w-[1020px]">{children}</main>
      </body>
    </html>
  );
}
