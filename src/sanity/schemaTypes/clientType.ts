import { defineField, defineType } from "sanity";

export const clientType = defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name",
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
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url"
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3
    })
  ],
  preview: {
    select: {
      title: "title",
      media: "logo"
    }
  }
});
