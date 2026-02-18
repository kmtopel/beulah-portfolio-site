import { defineField, defineType } from "sanity";

export const splitContentType = defineType({
  name: "splitContentBlock",
  title: "Split content block",
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
    }),
    defineField({
      name: "imageOnRight",
      title: "Image on right",
      type: "boolean"
    })
  ],
    preview: {
    select: {
      title: "heading",
      media: "image"
    }
  }
});
