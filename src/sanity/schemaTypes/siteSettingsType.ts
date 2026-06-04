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
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "YouTube", value: "youtube" },
                  { title: "GitHub", value: "github" },
                  { title: "Dribbble", value: "dribbble" },
                  { title: "Behance", value: "behance" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Twitch", value: "twitch" },
                  { title: "Email", value: "email" },
                  { title: "Website", value: "website" }
                ]
              },
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) =>
                rule.required().uri({ allowRelative: false, scheme: ["http", "https", "mailto"] })
            })
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url"
            },
            prepare({ platform, url }) {
              const labels: Record<string, string> = {
                instagram: "Instagram",
                linkedin: "LinkedIn",
                facebook: "Facebook",
                twitter: "Twitter / X",
                youtube: "YouTube",
                github: "GitHub",
                dribbble: "Dribbble",
                behance: "Behance",
                tiktok: "TikTok",
                twitch: "Twitch",
                email: "Email",
                website: "Website"
              };
              return {
                title: labels[platform] || platform,
                subtitle: url
              };
            }
          }
        })
      ]
    })
  ]
});
