import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "headerBrandLabel",
      title: "Header brand label",
      type: "string",
      initialValue: "Beulah",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "headerNavLinks",
      title: "Header navigation links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href"
            }
          }
        })
      ],
      initialValue: [
        { label: "Projects", href: "/" },
        { label: "Skills", href: "/skills" },
        { label: "About", href: "/about" }
      ]
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string"
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text"
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "url"
            }
          }
        })
      ]
    })
  ]
});
