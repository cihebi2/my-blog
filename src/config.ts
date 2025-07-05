export const SITE = {
  website: "https://cihebi.top/", // 你的域名
  author: "Ciheb", // 你的名字
  profile: "https://cihebi.top/", // 你的个人资料链接
  desc: "一个专注于技术分享和思考的个人博客", // 博客描述
  title: "Cihebi's Blog", // 博客标题
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 20,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "✏️ 编辑文章",
    url: "https://github.dev/cihebi2/my-blog/blob/main/", // VS Code Web 编辑器
    githubUrl: "https://github.com/cihebi2/my-blog/edit/main/", // GitHub 编辑器备选
  },
  dynamicOgImage: true,
  lang: "zh-CN", // 设置为中文
  timezone: "Asia/Shanghai", // 中国时区
  autoTimezoneConvert: false, // 是否自动转换时区，false表示直接显示原始时间
} as const;

export const HERO = {
  coverImage: "https://cihebi.oss-cn-shanghai.aliyuncs.com/cover_1.jpg",
  quoteFadeInDuration: 1500,
  quoteDisplayDuration: 8000,
  quoteFadeOutDuration: 1500,
};

// 页面背景配置
export const PAGE_BACKGROUNDS = {
  home: "https://cihebi.oss-cn-shanghai.aliyuncs.com/cover_1.jpg",
  posts: "https://cihebi.oss-cn-shanghai.aliyuncs.com/cover_1.jpg", 
  tags: "https://cihebi.oss-cn-shanghai.aliyuncs.com/cover_1.jpg",
  search: "https://cihebi.oss-cn-shanghai.aliyuncs.com/cover_1.jpg",
  archives: "https://cihebi.oss-cn-shanghai.aliyuncs.com/cover_1.jpg",
  // 你可以为不同页面设置不同的背景图片
  // 例如：
  // posts: "https://cihebi.oss-cn-shanghai.aliyuncs.com/posts_bg.jpg",
  // tags: "https://cihebi.oss-cn-shanghai.aliyuncs.com/tags_bg.jpg",
} as const;

// 获取页面背景的辅助函数
export function getPageBackground(page: keyof typeof PAGE_BACKGROUNDS): string {
  return PAGE_BACKGROUNDS[page] || PAGE_BACKGROUNDS.home;
}
