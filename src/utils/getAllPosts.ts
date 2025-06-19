import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

type BlogPost = CollectionEntry<"blog"> | CollectionEntry<"mdxBlog">;

const getAllPosts = async (): Promise<BlogPost[]> => {
  const [mdPosts, mdxPosts] = await Promise.all([
    getCollection("blog"),
    getCollection("mdxBlog"),
  ]);
  
  return [...mdPosts, ...mdxPosts];
};

export default getAllPosts;
export type { BlogPost }; 