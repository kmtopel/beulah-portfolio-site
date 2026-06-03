import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { singletonActions, singletonTypes, structure } from "./src/sanity/structure";

// Next.js inlines NEXT_PUBLIC_* env vars at compile time only when
// referenced literally — dynamic property access won't be replaced.
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "";

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

if (!projectId) {
  throw new Error(
    "Missing Sanity project id. Set NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_STUDIO_PROJECT_ID."
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
