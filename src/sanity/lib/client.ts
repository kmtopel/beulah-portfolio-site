import { createClient, type QueryParams } from "next-sanity";
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
  params?: QueryParams;
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

  return client.fetch<T>(query, params, {
    next: { revalidate }
  });
}
