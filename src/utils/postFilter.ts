import type { BlogPost } from "./getAllPosts";
import { SITE } from "@/config";

const postFilter = ({ data }: BlogPost) => {
  // 获取上海时间 (UTC+8)
  const shanghaiTime = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const postTime = new Date(data.pubDatetime);
  
  // 将文章发布时间也转换为上海时间进行比较
  const postTimeSH = new Date(postTime.getTime() + 8 * 60 * 60 * 1000);
  
  const isPublishTimePassed =
    shanghaiTime.getTime() > postTimeSH.getTime() - SITE.scheduledPostMargin;
  
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
