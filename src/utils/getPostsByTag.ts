import type { BlogPost } from "./getAllPosts";
import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";

const getPostsByTag = (posts: BlogPost[], tag: string) =>
  getSortedPosts(
    posts.filter(post => slugifyAll(post.data.tags).includes(tag))
  );

export default getPostsByTag;
