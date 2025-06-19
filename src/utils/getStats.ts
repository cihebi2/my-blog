import { getCollection } from "astro:content";
import { SITE } from "../config";

export interface SiteStats {
  totalPosts: number;
  totalWords: number;
  totalViews: number;
  runtimeDays: number;
  lastUpdated: string;
}

// 网站启动时间 - 请根据实际情况修改
const SITE_START_DATE = new Date("2025-06-19"); // 网站启动日期

// 计算文章总字数
export async function calculateTotalWords(): Promise<number> {
  try {
    const posts = await getCollection("blog");
    let totalWords = 0;
    
    for (const post of posts) {
      const content = post.body || "";
      // 移除 Markdown 语法和特殊字符，然后计算字数
      const plainText = content
        .replace(/```[\s\S]*?```/g, "") // 移除代码块
        .replace(/`[^`]*`/g, "") // 移除行内代码
        .replace(/!\[.*?\]\(.*?\)/g, "") // 移除图片
        .replace(/\[.*?\]\(.*?\)/g, "") // 移除链接
        .replace(/#{1,6}\s/g, "") // 移除标题标记
        .replace(/[*_~`]/g, "") // 移除格式化字符
        .replace(/\s+/g, " ") // 合并空白字符
        .trim();
      
      // 中英文字数统计
      const chineseChars = (plainText.match(/[\u4e00-\u9fff]/g) || []).length;
      const englishWords = (plainText.match(/[a-zA-Z]+/g) || []).length;
      
      totalWords += chineseChars + englishWords;
    }
    
    return totalWords;
  } catch (error) {
    console.error("计算字数时出错:", error);
    return 0;
  }
}

// 计算网站运行天数
export function calculateRuntimeDays(): number {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - SITE_START_DATE.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// 获取最后更新时间
export function getLastUpdated(): string {
  return new Date().toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

// 获取所有统计数据
export async function getSiteStats(): Promise<SiteStats> {
  try {
    const posts = await getCollection("blog");
    const totalPosts = posts.filter(post => !post.data.draft).length;
    const totalWords = await calculateTotalWords();
    const runtimeDays = calculateRuntimeDays();
    const lastUpdated = getLastUpdated();
    
    // 访问量可以从 localStorage 读取或使用第三方服务
    const totalViews = getVisitorCount();
    
    return {
      totalPosts,
      totalWords,
      totalViews,
      runtimeDays,
      lastUpdated,
    };
  } catch (error) {
    console.error("获取网站统计数据时出错:", error);
    return {
      totalPosts: 0,
      totalWords: 0,
      totalViews: 0,
      runtimeDays: 0,
      lastUpdated: getLastUpdated(),
    };
  }
}

// 简单的访客计数器（基于 localStorage）
export function getVisitorCount(): number {
  if (typeof window === "undefined") return 0;
  
  const STORAGE_KEY = "cihebi-blog-visitor-count";
  const VISITOR_KEY = "cihebi-blog-visited";
  
  // 检查是否是新访客
  const hasVisited = localStorage.getItem(VISITOR_KEY);
  
  if (!hasVisited) {
    // 新访客，增加计数
    const currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    const newCount = currentCount + 1;
    localStorage.setItem(STORAGE_KEY, newCount.toString());
    localStorage.setItem(VISITOR_KEY, "true");
    return newCount;
  }
  
  // 老访客，返回当前计数
  return parseInt(localStorage.getItem(STORAGE_KEY) || "0");
}

// 获取访客IP（需要服务端支持或第三方服务）
export async function getVisitorIP(): Promise<string> {
  try {
    // 使用免费的IP查询服务
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip || "未知";
  } catch (error) {
    return "未知";
  }
}