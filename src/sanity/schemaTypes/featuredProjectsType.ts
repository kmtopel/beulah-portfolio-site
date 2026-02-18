import { defineField, defineType } from "sanity";
import { projectType } from "./projectType";

export const featuredProjectsType = defineType({
    name: "featuredProjects",
    title: "Featured Projects",
    type: "object",
    fields: [
        defineField({
            name: "projects",
            title: "Projects",
            type: "array",
            of: [
                { type: "reference", to: [{ type: "project" }] }
            ]
        })
    ]
});