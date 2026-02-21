import { defineArrayMember, defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
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
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({ type: "heroBlock" }),
        defineArrayMember({ type: "clientSliderBlock" }),
        defineArrayMember({ type: "featuredProjectsBlock" }),
        defineArrayMember({ type: "splitContentBlock" })
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current"
    }
  }
});
