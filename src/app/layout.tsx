import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beulah Portfolio",
  description: "Portfolio website powered by Next.js and Sanity"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0 bg-[radial-gradient(circle_at_top_right,_#ffefd6,_#f5f5ef_45%)] font-['Avenir_Next','Avenir','Helvetica_Neue',sans-serif] text-[#181611]">
        <header className="mx-auto flex w-full max-w-[1020px] items-center justify-between gap-4 px-5 py-5">
          <Link
            href="/"
            className="font-['Canela','Iowan_Old_Style','Times_New_Roman',serif] text-[1.2rem] tracking-[0.03em]"
          >
            Beulah
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className="transition-opacity hover:opacity-70">
              Work
            </Link>
            <Link href="/skills" className="transition-opacity hover:opacity-70">
              Skills
            </Link>
            <Link href="/about" className="transition-opacity hover:opacity-70">
              About
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-[1020px] px-5 pb-20 pt-8">{children}</main>
      </body>
    </html>
  );
}
