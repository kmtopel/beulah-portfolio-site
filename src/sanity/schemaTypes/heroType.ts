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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "mainImage"
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Hero",
        subtitle: subtitle || "Hero block",
        media
      };
    }
  }
});
