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
      <body className="bg-[radial-gradient(circle_at_top_right,_#ffefd6,_#f5f5ef_45%)] m-0 font-['Avenir_Next','Avenir','Helvetica_Neue',sans-serif] text-[#181611]">
        <header className="flex justify-between items-center gap-4 mx-auto px-5 py-5 w-full max-w-[1020px]">
          <Link
            href="/"
            className="font-['Canela','Iowan_Old_Style','Times_New_Roman',serif] text-[1.2rem] tracking-[0.03em]"
          >
            Beulah
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/projects" className="hover:opacity-70 transition-opacity">
              Projects
            </Link>
            <Link href="/skills" className="hover:opacity-70 transition-opacity">
              Skills
            </Link>
            <Link href="/about" className="hover:opacity-70 transition-opacity">
              About
            </Link>
          </nav>
        </header>
        <main className="mx-auto px-5 pt-8 pb-20 w-full max-w-[1020px]">{children}</main>
      </body>
    </html>
  );
}
