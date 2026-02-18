import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { singletonActions, singletonTypes, structure } from "./src/sanity/structure";
const projectId =
  import.meta.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "";

const dataset =
  import.meta.env.SANITY_STUDIO_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  import.meta.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

if (!projectId) {
  throw new Error(
    "Missing Sanity project id. Set SANITY_STUDIO_PROJECT_ID (preferred) or NEXT_PUBLIC_SANITY_PROJECT_ID."
  );
}

export default defineConfig({
  name: "default",
  title: "Beulah Peters Portfolio Site",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  document: {
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(
            (action) =>
              action.action ? singletonActions.has(action.action) : false
          )
        : prev,
    newDocumentOptions: (prev, context) =>
      context.creationContext.type === "global"
        ? prev.filter(
            (templateItem) => !singletonTypes.has(templateItem.templateId)
          )
        : prev
  },
  schema: {
    types: schemaTypes
  }
});
