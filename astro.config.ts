import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  output: "server",
  adapter: vercel(),
  integrations: [
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        themes: { light: "min-light", dark: "night-owl" },
        wrap: true,
      },
      remarkPlugins: [remarkToc],
      rehypePlugins: [],
    }),
    sitemap({
      filter: (page) => {
        if (!SITE.showArchives && page.endsWith("/archives")) return false;
        // Keep private personal pages out of sitemap by default.
        if (page.startsWith("/age-25")) return false;
        return true;
      },
    }),
  ],
  markdown: {
    // Note: some remark/rehype plugins ship type signatures that are stricter
    // than Astro's config expects. Cast to keep `astro check` happy.
    remarkPlugins: [remarkToc, remarkMath as any],
    rehypePlugins: [rehypeKatex as any],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    // 移除过时的 experimentalLayout 配置
    // 在 Astro v5 中，responsive 行为已经是默认的
  },
  experimental: {
    // 移除已经稳定或过时的实验性功能
    // svg: true - 在 Astro v5 中已经稳定
    // responsiveImages: true - 在 Astro v5 中已经稳定  
    // preserveScriptOrder: true - 在 Astro v5 中已经稳定
  },
});
