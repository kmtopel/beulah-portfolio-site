import type { StructureResolver } from "sanity/structure";

export const singletonTypes = new Set(["siteSettings"]);
export const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() || "")
      )
    ]);
