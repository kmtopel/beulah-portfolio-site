import type { SchemaTypeDefinition } from "sanity";
import { clientSliderType } from "./clientSliderType";
import { clientType } from "./clientType";
import { featuredProjectsType } from "./featuredProjectsType";
import { heroType } from "./heroType";
import { pageType } from "./pageType";
import { projectCategoryType } from "./projectCategoryType";
import { projectType } from "./projectType";
import { siteSettingsType } from "./siteSettingsType";
import { skillType } from "./skillType";
import { splitContentType } from "./splitContentType";

export const schemaTypes: SchemaTypeDefinition[] = [
  clientSliderType,
  clientType,
  featuredProjectsType,
  heroType,
  pageType,
  projectCategoryType,
  projectType,
  skillType,
  siteSettingsType,
  splitContentType
];
