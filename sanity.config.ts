import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { getSanityProjectConfig } from "./sanity.env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { singletonActions, singletonTypes, structure } from "./src/sanity/structure";

const { projectId, dataset } = getSanityProjectConfig();

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
