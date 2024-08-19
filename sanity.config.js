import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Portfolio 2",

  projectId: "focqo3a2",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      name: "caseStudies",
      title: "Case Studies",
      structure: (S) =>
        S.list()
          .title("Site Content")
          .items([
            S.listItem("caseStudy")
              .title("Case Studies")
              .child(S.documentTypeList("caseStudy").title("Case Studies")),
            S.listItem("resume")
              .title("Resume")
              .child(S.documentTypeList("resume").title("Resume")),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
