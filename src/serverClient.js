import { createClient } from "@sanity/client";

// Server-only client — never exposed to the browser.
// Uses useCdn: true for fast edge-cached reads of published content.
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  useCdn: true,
  apiVersion: "2024-06-01",
});
