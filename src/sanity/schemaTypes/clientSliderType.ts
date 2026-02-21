import { defineField, defineType } from "sanity";

export const clientSliderType = defineType({
  name: "clientSliderBlock",
  title: "Client Slider block",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Our Clients"
    })
  ],
  preview: {
    select: {
      title: "heading"
    },
    prepare({ title }) {
      return {
        title: title || "Client Slider"
      };
    }
  }
});
