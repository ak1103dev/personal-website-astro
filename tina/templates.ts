import type { TinaField } from "tinacms";
export function ______blogFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "description",
      required: true,
    },
    {
      type: "string",
      name: "author",
      label: "author",
    },
    {
      type: "datetime",
      name: "pubDatetime",
      label: "pubDatetime",
    },
    {
      type: "string",
      name: "postSlug",
      label: "postSlug",
    },
    {
      type: "boolean",
      name: "featured",
      label: "featured",
    },
    {
      type: "boolean",
      name: "draft",
      label: "draft",
    },
    {
      type: "string",
      name: "tags",
      label: "tags",
      list: true,
    },
    {
      type: "image",
      name: "ogImage",
      label: "ogImage",
    },
  ] as TinaField[];
}
