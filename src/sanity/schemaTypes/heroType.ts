import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "heroBlock",
  title: "Hero block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string"
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string"
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    })
  ]
});
