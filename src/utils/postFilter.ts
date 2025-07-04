import type { BlogPost } from "./getAllPosts";
import { SITE } from "@/config";

const postFilter = ({ data }: BlogPost) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
