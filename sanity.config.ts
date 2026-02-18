import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { singletonActions, singletonTypes, structure } from "./src/sanity/structure";

type EnvMap = Record<string, string | undefined>;

const importMetaEnv =
  (typeof import.meta !== "undefined"
    ? (import.meta as unknown as { env?: EnvMap }).env
    : undefined) || {};
const processEnv =
  typeof process !== "undefined" && process.env
    ? (process.env as EnvMap)
    : {};

const projectId =
  importMetaEnv.SANITY_STUDIO_PROJECT_ID ||
  processEnv.SANITY_STUDIO_PROJECT_ID ||
  importMetaEnv.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  processEnv.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "";

const dataset =
  importMetaEnv.SANITY_STUDIO_DATASET ||
  processEnv.SANITY_STUDIO_DATASET ||
  importMetaEnv.NEXT_PUBLIC_SANITY_DATASET ||
  processEnv.NEXT_PUBLIC_SANITY_DATASET ||
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
