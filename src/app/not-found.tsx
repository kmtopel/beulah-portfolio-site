import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found"
};

export default function NotFoundPage() {
  return (
    <section>
      <h1>Not found</h1>
      <p>The page you were looking for does not exist.</p>
      <Link href="/">Return home</Link>
    </section>
  );
}
