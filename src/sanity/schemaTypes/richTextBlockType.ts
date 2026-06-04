import { defineArrayMember, defineField, defineType } from "sanity";

export const richTextBlockType = defineType({
  name: "richTextBlock",
  title: "Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" }
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strikethrough", value: "strike-through" },
              { title: "Code", value: "code" }
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] })
                  }),
                  defineField({
                    name: "openInNewTab",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: false
                  })
                ]
              }
            ]
          },
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" }
          ]
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text"
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption"
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      content: "content"
    },
    prepare({ content }) {
      const firstBlock = (content || []).find(
        (block: { _type: string }) => block._type === "block"
      );
      const text = firstBlock?.children
        ?.map((child: { text?: string }) => child.text)
        .join("") || "Empty rich text block";

      return {
        title: text.length > 60 ? text.slice(0, 60) + "…" : text,
        subtitle: "Rich Text"
      };
    }
  }
});
