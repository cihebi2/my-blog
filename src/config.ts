export const SITE = {
  website: "https://cihebi.top/", // 你的域名
  author: "Ciheb", // 你的名字
  profile: "https://cihebi.top/", // 你的个人资料链接
  desc: "一个专注于技术分享和思考的个人博客", // 博客描述
  title: "Ciheb's Blog", // 博客标题
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "建议修改",
    url: "https://github.com/your-username/your-repo/edit/main/", // 如果你想启用编辑功能，请更新为你的GitHub仓库URL
  },
  dynamicOgImage: true,
  lang: "zh-CN", // 设置为中文
  timezone: "Asia/Shanghai", // 中国时区
} as const;
