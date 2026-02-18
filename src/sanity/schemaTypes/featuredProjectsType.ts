import { defineField, defineType } from "sanity";

export const featuredProjectsType = defineType({
  name: "featuredProjectsBlock",
  title: "Featured Projects block",
  type: "object",
  fields: [
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }]
    })
  ]
});
