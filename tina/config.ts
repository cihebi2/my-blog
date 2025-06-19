import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  
  // 访问令牌配置
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  
  // 内容架构配置
  schema: {
    collections: [
      {
        name: "post",
        label: "博客文章",
        path: "src/data/blog",
        format: "md",
        ui: {
          // 自定义文件名
          filename: {
            readonly: false,
            slugify: (values) => {
              // 使用标题生成文件名
              return `${values?.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')}`
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            required: true,
          },
          {
            type: "datetime",
            name: "pubDatetime",
            label: "发布时间",
            required: true,
          },
          {
            type: "datetime",
            name: "modDatetime",
            label: "修改时间",
            required: false,
          },
          {
            type: "string",
            name: "author",
            label: "作者",
            required: false,
          },
          {
            type: "string",
            name: "slug",
            label: "URL路径",
            required: false,
          },
          {
            type: "boolean",
            name: "featured",
            label: "推荐文章",
            required: false,
          },
          {
            type: "boolean",
            name: "draft",
            label: "草稿",
            required: false,
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            required: false,
            list: true,
          },
          {
            type: "image",
            name: "ogImage",
            label: "封面图片",
            required: false,
          },
          {
            type: "string",
            name: "canonicalURL",
            label: "规范URL",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "正文内容",
            isBody: true,
            templates: [
              {
                name: "DateTime",
                label: "日期时间",
                inline: true,
                fields: [
                  {
                    name: "format",
                    label: "格式",
                    type: "string",
                    options: ["utc", "iso", "local"],
                  },
                ],
              },
              {
                name: "BlockQuote",
                label: "引用块",
                fields: [
                  {
                    name: "children",
                    label: "引用内容",
                    type: "rich-text",
                  },
                ],
              },
              {
                name: "CodeBlock",
                label: "代码块",
                fields: [
                  {
                    name: "lang",
                    label: "编程语言",
                    type: "string",
                  },
                  {
                    name: "children",
                    label: "代码内容",
                    type: "rich-text",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});