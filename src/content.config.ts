import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";
import fs from 'fs';

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.union([z.date(), z.string()]).transform((val, ctx) => {
        // 如果是字符串且为"auto"，则使用文件创建时间
        if (typeof val === 'string' && val === 'auto') {
          try {
            const filePath = ctx.path; // 获取当前文件路径
            const fullPath = `./${BLOG_PATH}/${filePath}`;
            const stats = fs.statSync(fullPath);
            return stats.birthtime; // 使用文件创建时间
          } catch (error) {
            // 如果获取文件时间失败，使用当前时间
            return new Date();
          }
        }
        // 如果是字符串，尝试解析为日期
        if (typeof val === 'string') {
          return new Date(val);
        }
        // 如果已经是Date对象，直接返回
        return val;
      }),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const mdxBlog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.union([z.date(), z.string()]).transform((val, ctx) => {
        // 如果是字符串且为"auto"，则使用文件创建时间
        if (typeof val === 'string' && val === 'auto') {
          try {
            const filePath = ctx.path; // 获取当前文件路径
            const fullPath = `./${BLOG_PATH}/${filePath}`;
            const stats = fs.statSync(fullPath);
            return stats.birthtime; // 使用文件创建时间
          } catch (error) {
            // 如果获取文件时间失败，使用当前时间
            return new Date();
          }
        }
        // 如果是字符串，尝试解析为日期
        if (typeof val === 'string') {
          return new Date(val);
        }
        // 如果已经是Date对象，直接返回
        return val;
      }),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

export const collections = { blog, mdxBlog };
