import Link from "next/link";

export default function StudioPage() {
  return (
    <section>
      <h1>Sanity Studio</h1>
      <p>
        GitHub Pages can only host static files, so Studio is not embedded in this deployment.
      </p>
      <p>
        Manage your content in the Sanity dashboard or deploy Studio separately with:
        <code> npm run sanity deploy</code>
      </p>
      <p>
        <a href="https://www.sanity.io/manage" target="_blank" rel="noreferrer">
          Open Sanity Manage
        </a>
      </p>
      <p>
        <Link href="/">Back to site</Link>
      </p>
    </section>
  );
}
