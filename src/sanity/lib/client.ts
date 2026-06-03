import { createClient } from "@sanity/client";
import { apiVersion, dataset, hasRequiredEnv, projectId, useCdn } from "./env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn
});

type SanityFetchArgs = {
  query: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  revalidate?: number;
};

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60
}: SanityFetchArgs): Promise<T | null> {
  if (!hasRequiredEnv) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate }
    });
  } catch (error) {
    console.warn("Sanity fetch failed.", error);
    return null;
  }
}
