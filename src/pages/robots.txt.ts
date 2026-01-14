import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /.well-known/
Disallow: /api/
Disallow: /age-25/

# 针对主要搜索引擎
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: 360Spider
Allow: /

User-agent: Sogou web spider
Allow: /

# Sitemap位置
Sitemap: ${sitemapURL.href}
Sitemap: ${new URL("rss.xml", sitemapURL.origin).href}

# 爬取延迟 (秒)
Crawl-delay: 1
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
