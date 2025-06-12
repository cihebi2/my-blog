import rss from "@astrojs/rss";
import { getPath } from "@/utils/getPath";
import getAllPosts from "@/utils/getAllPosts";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export async function GET() {
  const posts = await getAllPosts();
  const publishedPosts = posts.filter(({ data }) => !data.draft);
  const sortedPosts = getSortedPosts(publishedPosts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPath(id, filePath),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
