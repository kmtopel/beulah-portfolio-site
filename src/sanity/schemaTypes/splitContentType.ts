import { defineField, defineType } from "sanity";

export const splitContentType = defineType({
  name: "splitContent",
  title: "Split content",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string"
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }]
    })
  ],
    preview: {
    select: {
      title: "heading",
      media: "image"
    }
  }
});