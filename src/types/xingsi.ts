// 行思录数据类型定义

export interface ThemeActionReview {
  title: string;
  details: {
    本周主题: string;
    今日实验: string;
    行动与观察: string;
  };
}

export interface InsightAwareness {
  感受: string;
  洞察: string;
}

export interface XingsiRecord {
  datetime: string;
  flomo_link: string;
  今日小计: string;
  主题行动复盘: ThemeActionReview;
  察觉与洞察: InsightAwareness;
  明日计划: string;
  image_url?: string;
}

export type XingsiData = XingsiRecord[];