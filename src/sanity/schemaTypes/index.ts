import type { SchemaTypeDefinition } from "sanity";
import { featuredProjectsType } from "./featuredProjectsType";
import { heroType } from "./heroType";
import { pageType } from "./pageType";
import { projectType } from "./projectType";
import { siteSettingsType } from "./siteSettingsType";
import { skillType } from "./skillType";
import { splitContentType } from "./splitContentType";

export const schemaTypes: SchemaTypeDefinition[] = [
  featuredProjectsType,
  heroType,
  pageType,
  projectType,
  skillType,
  siteSettingsType,
  splitContentType
];
