import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "video", title: "Hero Video", type: "file" }),
    defineField({
      name: "markdown",
      title: "Content (Markdown)",
      type: "text",
      description:
        "Write the case study body in Markdown. Supports headings, bold, italic, links, images, code blocks.",
      rows: 20,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Python", value: "Python" },
          { title: "TypeScript", value: "TypeScript" },
          { title: "JavaScript", value: "JavaScript" },
          { title: "C++", value: "C++" },
          { title: "C", value: "C" },
          { title: "React", value: "React" },
          { title: "React Native", value: "React Native" },
          { title: "PyTorch", value: "PyTorch" },
          { title: "TensorFlow", value: "TensorFlow" },
          { title: "Flask", value: "Flask" },
          { title: "SQLite", value: "SQLite" },
          { title: "Expo", value: "Expo" },
          { title: "Jest", value: "Jest" },
          { title: "Next.js", value: "Next.js" },
          { title: "Tailwind CSS", value: "Tailwind CSS" },
          { title: "Chakra UI", value: "Chakra UI" },
          { title: "GLSL", value: "GLSL" },
          { title: "Java", value: "Java" },
          { title: "Kotlin", value: "Kotlin" },
          { title: "Swift", value: "Swift" },
          { title: "Node.js", value: "Node.js" },
          { title: "scikit-learn", value: "scikit-learn" },
          { title: "BERT", value: "BERT" },
          { title: "FastAPI", value: "FastAPI" },
          { title: "Oracle", value: "Oracle" },
          { title: "Docker", value: "Docker" },
          { title: "PyQt5", value: "PyQt5" },
        ],
      },
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
  ],

  preview: {
    select: { title: "title", media: "image" },
    prepare(selection) {
      return { ...selection };
    },
  },
});
