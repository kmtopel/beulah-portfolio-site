import { defineArrayMember, defineField, defineType } from "sanity";

export const skillType = defineType({
  name: "skill",
  title: "Skill",
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
      name: "hasDetailPage",
      title: "Enable detail page",
      description: "When checked, this skill will have its own page with full description and related projects.",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      hidden: ({ document }) => !document?.hasDetailPage
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
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
      ],
      hidden: ({ document }) => !document?.hasDetailPage
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "summary",
      media: "coverImage"
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: subtitle || "Skill",
        media
      };
    }
  }
});
