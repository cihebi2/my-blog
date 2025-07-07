# 自动时间戳功能说明

## 功能概述

博客系统现在支持自动使用文档创建时间作为文章发布时间，无需手动指定时间戳。

## 使用方法

### 方式1：使用 "auto" 关键字

在文章的 frontmatter 中，将 `pubDatetime` 设置为 `auto`：

```yaml
---
title: "文章标题"
author: "Ciheb"
pubDatetime: auto
description: "文章描述"
tags: ["标签1", "标签2"]
featured: true
draft: false
---
```

系统会自动使用文件的创建时间作为发布时间。

### 方式2：传统手动指定（仍然支持）

```yaml
---
title: "文章标题"
author: "Ciheb"
pubDatetime: 2025-07-07T09:33:48Z
description: "文章描述"
---
```

## 技术实现

### Schema 修改

修改了 `src/content.config.ts` 中的博客 schema：

```typescript
pubDatetime: z.union([z.date(), z.string()]).transform((val, ctx) => {
  // 如果是字符串且为"auto"，则使用文件创建时间
  if (typeof val === 'string' && val === 'auto') {
    try {
      const filePath = ctx.path;
      const fullPath = `./${BLOG_PATH}/${filePath}`;
      const stats = fs.statSync(fullPath);
      return stats.birthtime; // 使用文件创建时间
    } catch (error) {
      // 如果获取文件时间失败，使用当前时间
      return new Date();
    }
  }
  // 如果是字符串，尝试解析为日期
  if (typeof val === 'string') {
    return new Date(val);
  }
  // 如果已经是Date对象，直接返回
  return val;
})
```

### 优势

1. **自动化**：无需手动计算和输入时间戳
2. **准确性**：使用文件系统的实际创建时间
3. **向后兼容**：不影响现有文章的时间戳
4. **灵活性**：支持自动和手动两种方式

### 注意事项

1. 使用 Git 时，文件创建时间可能会改变
2. 在不同操作系统之间迁移文件时，创建时间可能不准确
3. 如果需要精确控制发布时间，仍建议使用手动指定的方式

## 示例

**自动时间戳文章示例：**
```yaml
---
title: "图神经网络在蛋白质设计中的革命性进展"
author: "Ciheb"
pubDatetime: auto  # 自动使用文件创建时间
description: "深入解析图神经网络技术突破"
tags: ["AI", "蛋白质设计"]
featured: true
draft: false
---
```

这个功能让博客写作更加高效，减少了手动管理时间戳的负担。