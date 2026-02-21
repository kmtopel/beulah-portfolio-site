import { defineField, defineType } from "sanity";

export const featuredProjectsType = defineType({
  name: "featuredProjectsBlock",
  title: "Featured Projects block",
  type: "object",
  fields: [
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }]
    })
  ],
  preview: {
    select: {
      project0: "projects.0.title",
      project1: "projects.1.title",
      project2: "projects.2.title"
    },
    prepare({ project0, project1, project2 }) {
      const projects = [project0, project1, project2].filter(Boolean);
      return {
        title: "Featured Projects",
        subtitle: projects.length > 0
          ? projects.join(", ")
          : "No projects selected"
      };
    }
  }
});
