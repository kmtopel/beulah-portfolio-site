import { defineField, defineType } from "sanity";

export const projectCategoryType = defineType({
  name: "projectCategory",
  title: "Project Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      title: "title"
    }
  }
});
