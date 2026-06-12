import { createClient } from "@sanity/client";
import { apiVersion, dataset, hasRequiredEnv, projectId, useCdn } from "./env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn
});

/**
 * Simple fetch for build-time contexts (generateStaticParams, sitemap)
 * where defineLive's sanityFetch can't run (no request scope for draftMode).
 */
export async function buildTimeFetch<T>(
  query: string,
  params: Record<string, string | number | boolean | null | undefined> = {}
): Promise<T | null> {
  if (!hasRequiredEnv) return null;
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.warn("Sanity build-time fetch failed.", error);
    return null;
  }
}
