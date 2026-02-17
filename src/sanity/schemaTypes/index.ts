import type { SchemaTypeDefinition } from "sanity";
import { aboutType } from "./aboutType";
import { projectType } from "./projectType";
import { siteSettingsType } from "./siteSettingsType";
import { skillType } from "./skillType";

export const schemaTypes: SchemaTypeDefinition[] = [
  projectType,
  skillType,
  siteSettingsType
];
