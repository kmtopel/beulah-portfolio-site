import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Beulah Peter's Portfolio Site",
  description: "Portfolio website powered by Next.js and Sanity"
};

const fallbackHeader = {
  brandLabel: "Beulah",
  brandHref: "/",
  navLinks: [
    { label: "Projects", href: "/" },
    { label: "Skills", href: "/skills" },
    { label: "About", href: "/about" }
  ]
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await sanityFetch<SiteSettings>({ query: siteSettingsQuery, revalidate: 300 });

  const brandLabel = siteSettings?.headerBrandLabel || fallbackHeader.brandLabel;
  const brandHref = siteSettings?.headerBrandHref || fallbackHeader.brandHref;
  const navLinks =
    siteSettings?.headerNavLinks
      ?.filter((item): item is { label: string; href: string } => Boolean(item?.label && item?.href))
      .map((item) => ({ label: item.label, href: item.href })) || fallbackHeader.navLinks;

  return (
    <html lang="en">
      <body className="bg-[radial-gradient(circle_at_top_right,_#ffefd6,_#f5f5ef_45%)] m-0 font-['Avenir_Next','Avenir','Helvetica_Neue',sans-serif] text-[#181611]">
        <Header brandLabel={brandLabel} brandHref={brandHref} navLinks={navLinks} />
        <main className="mx-auto px-5 pt-8 pb-20 w-full max-w-[1020px]">{children}</main>
      </body>
    </html>
  );
}
