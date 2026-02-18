import type { About, Project, Skill } from "./types";

export const fallbackProjects: Project[] = [
  {
    _id: "fallback-1",
    title: "Untitled Campaign",
    slug: { current: "untitled-campaign" },
    tags: ["Editorial", "Direction"]
  },
  {
    _id: "fallback-2",
    title: "Short Film Frames",
    slug: { current: "short-film-frames" },
    tags: ["Film", "Photography"]
  }
];

export const fallbackAbout: About = {
  _id: "fallback-about",
  title: "About Beulah",
  bio: [
    {
      _key: "bio-1",
      _type: "block",
      children: [
        {
          _key: "child-1",
          _type: "span",
          marks: [],
          text: "Add your Sanity project details in .env.local to load real content from the CMS."
        }
      ],
      markDefs: [],
      style: "normal"
    }
  ]
};

export const fallbackSkills: Skill[] = [
  {
    _id: "fallback-skill-1",
    title: "Creative Direction",
    slug: { current: "creative-direction" },
    category: "Direction",
    summary: "Leading visual storytelling, concepting, and campaign direction."
  },
  {
    _id: "fallback-skill-2",
    title: "Editorial Design",
    slug: { current: "editorial-design" },
    category: "Design",
    summary: "Designing layouts and systems for print and digital editorial work."
  }
];
