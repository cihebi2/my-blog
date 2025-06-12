import type { BlogPost } from "./getAllPosts";
import getUniqueTags from "./getUniqueTags";
import getPostsByTag from "./getPostsByTag";

export interface CategoryData {
  tag: {
    tag: string;
    tagName: string;
  };
  postCount: number;
  posts: BlogPost[];
}

/**
 * 获取所有分类数据，包括文章数量统计
 */
export function getCategoryData(posts: BlogPost[]): CategoryData[] {
  const uniqueTags = getUniqueTags(posts);
  
  return uniqueTags.map(tag => {
    const tagPosts = getPostsByTag(posts, tag.tag);
    return {
      tag,
      postCount: tagPosts.length,
      posts: tagPosts
    };
  });
}

/**
 * 获取热门分类（按文章数量排序）
 */
export function getPopularCategories(posts: BlogPost[], limit: number = 6): CategoryData[] {
  const categoryData = getCategoryData(posts);
  
  return categoryData
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, limit);
}

/**
 * 获取指定分类的统计信息
 */
export function getCategoryStats(posts: BlogPost[]) {
  const categoryData = getCategoryData(posts);
  
  return {
    totalCategories: categoryData.length,
    totalPosts: posts.length,
    categoriesWithMultiplePosts: categoryData.filter(cat => cat.postCount > 1).length,
    mostPopularCategory: categoryData.reduce((max, cat) => 
      cat.postCount > max.postCount ? cat : max, categoryData[0]
    ),
    averagePostsPerCategory: Math.round(posts.length / categoryData.length * 10) / 10
  };
} 