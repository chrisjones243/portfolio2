import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Portfolio 2",

  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  basePath: "/studio",
  plugins: [
    structureTool({
      name: "caseStudies",
      title: "Case Studies",
      structure: (S) => S.documentTypeList("caseStudy").title("Case Studies"),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
