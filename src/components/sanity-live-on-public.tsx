"use client";

import { usePathname } from "next/navigation";
import { SanityLive } from "@/sanity/lib/live";

/**
 * Renders the SanityLive SSE listener on public pages only.
 * Excluded from /studio routes to prevent router.refresh() from
 * interrupting Studio uploads and editor state.
 */
export default function SanityLiveOnPublic() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <SanityLive />;
}
