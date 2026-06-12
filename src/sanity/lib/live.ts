import { defineLive } from "next-sanity";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

// defineLive() throws when called outside React Server Components
// (e.g. during static prerendering of /_not-found).
// Provide safe fallbacks so the module can still be imported.
function createLive() {
  try {
    return defineLive({
      client: client.withConfig({
        // Live Content API requires a modern API version
        apiVersion: "2024-08-15"
      }),
      serverToken: token,
      browserToken: token,
      fetchOptions: {
        // Fallback TTL if the live SSE connection drops
        revalidate: 60
      }
    });
  } catch {
    // Return stubs for static prerendering contexts
    return {
      sanityFetch: (() => {
        throw new Error("sanityFetch from defineLive is not available in this context");
      }) as never,
      SanityLive: (() => null) as never
    };
  }
}

export const { sanityFetch, SanityLive } = createLive();
