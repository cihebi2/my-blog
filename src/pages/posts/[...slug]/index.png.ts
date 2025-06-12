import type { APIRoute } from "astro";
import { getPath } from "@/utils/getPath";
import getAllPosts from "@/utils/getAllPosts";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { SITE } from "@/config";
import type { BlogPost } from "@/utils/getAllPosts";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const posts = await getAllPosts();
  const publishedPosts = posts.filter(({ data }) => !data.draft && !data.ogImage);

  return publishedPosts.map(post => ({
    params: { slug: getPath(post.id, post.filePath, false) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(
    await generateOgImageForPost(props as BlogPost),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};
