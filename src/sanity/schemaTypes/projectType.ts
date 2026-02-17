import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
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
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number"
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
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
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "skill" }]
        })
      ]
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
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
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [defineArrayMember({ type: "block" })]
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
      media: "featuredImage"
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: subtitle ? String(subtitle) : "No year",
        media
      };
    }
  }
});
