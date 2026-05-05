import { defineField, defineType } from "sanity";

export default defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  fields: [
    defineField({ name: "file", title: "File", type: "file" }),
    defineField({
      name: "availableForWork",
      title: "Available for Work",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
