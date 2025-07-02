# 📝 博客文章格式指南

本指南详细介绍了如何在 Cihebi's Blog 中创建和格式化博客文章。

## 📁 文件结构

```
src/data/blog/
├── your-article-title.md     # 标准文章
├── your-article-title.mdx    # 支持React组件的文章
└── image/                    # 文章图片目录
    └── article-name/         # 按文章名创建子目录
        ├── image1.png
        └── image2.jpg
```

## 🎯 Frontmatter 配置

每篇文章必须以 YAML frontmatter 开头，包含以下字段：

### 必需字段

```yaml
---
title: "你的文章标题"                    # 文章标题
author: "Ciheb"                        # 作者名
pubDatetime: 2025-01-01T10:00:00Z      # 发布时间 (ISO 8601格式)
description: "文章简短描述"              # 文章描述 (SEO重要)
tags: ["标签1", "标签2", "标签3"]       # 文章标签
draft: false                           # 是否为草稿
---
```

### 可选字段

```yaml
---
# 基础信息
slug: "custom-url-slug"                # 自定义URL路径 (默认基于标题生成)
featured: true                         # 是否为精选文章
modDatetime: 2025-01-02T15:30:00Z      # 修改时间

# SEO优化
ogImage: "https://example.com/image.jpg"  # 社交分享图片
canonicalURL: "https://original-url.com"  # 原始文章URL (转载时使用)

# 高级配置
layout: "../../layouts/PostDetails.astro" # 自定义布局 (通常不需要)
---
```

## ✨ 内容格式规范

### 1. 标题结构

```markdown
# 一级标题 (文章开头，通常与frontmatter中的title一致)

## 二级标题 (主要章节)

### 三级标题 (子章节)

#### 四级标题 (细节说明)
```

**注意：** 一级标题 (`#`) 通常只在文章开头使用一次，主要内容结构从二级标题开始。

### 2. 段落和文本格式

```markdown
这是普通段落文本。段落之间用空行分隔。

**粗体文本** 用于强调重要内容。

*斜体文本* 用于突出特殊术语。

`行内代码` 用于标识代码片段、命令或技术术语。

~~删除线~~ 用于标识过时或错误的信息。
```

### 3. 列表格式

```markdown
## 无序列表
- 列表项1
- 列表项2
  - 嵌套列表项
  - 另一个嵌套项
- 列表项3

## 有序列表
1. 第一步
2. 第二步
   1. 子步骤A
   2. 子步骤B
3. 第三步

## 任务列表
- [x] 已完成的任务
- [ ] 待完成的任务
- [ ] 另一个待完成任务
```

### 4. 代码块

```markdown
## 行内代码
使用 `npm install` 命令安装依赖。

## 代码块 (无语法高亮)
```
console.log("Hello World");
```

## 代码块 (带语法高亮)
```javascript
// 这是JavaScript代码
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

## 代码块 (带标题)
```typescript title="src/utils/helper.ts"
export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN');
}
```
```

### 5. 引用和提示

```markdown
## 简单引用
> 这是一个引用块。
> 可以跨越多行。

## 嵌套引用
> 这是外层引用
> > 这是嵌套引用

## 提示框 (自定义样式)
> **💡 提示**：这是一个实用的小贴士。

> **⚠️ 注意**：这是需要注意的事项。

> **❌ 警告**：这是重要的警告信息。

> **✅ 成功**：这表示成功的操作。
```

### 6. 链接和图片

```markdown
## 链接
[链接文本](https://example.com)
[链接文本](https://example.com "鼠标悬停提示")

## 自动链接
https://example.com
<https://example.com>

## 邮箱链接
<email@example.com>

## 内部链接
[其他文章](/posts/other-article/)

## 图片
![图片描述](https://example.com/image.jpg)
![图片描述](https://example.com/image.jpg "图片标题")

## 本地图片
![图片描述](./image/article-name/screenshot.png)

## 图片与标题
<figure>
  <img src="https://example.com/image.jpg" alt="图片描述" />
  <figcaption>图片标题和说明</figcaption>
</figure>
```

### 7. 表格

```markdown
| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |

## 表格对齐
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容   |   内容   |   内容 |
| 内容   |   内容   |   内容 |
```

### 8. 特殊元素

```markdown
## 分割线
---

## Emoji 表情
使用标准 Unicode emoji: 🎉 📝 💡 ⚠️ ✅ ❌

## 数学公式 (如果启用了数学支持)
行内公式: $E = mc^2$

块级公式:
$$
\sum_{i=1}^n x_i = x_1 + x_2 + \cdots + x_n
$$

## 脚注
这是正文内容[^1]。

[^1]: 这是脚注内容。
```

## 📋 文章模板

### 基础文章模板

```markdown
---
title: "你的文章标题"
author: "Ciheb"
pubDatetime: 2025-01-01T10:00:00Z
description: "简短的文章描述，用于SEO和社交分享"
tags: ["技术", "教程", "前端"]
featured: false
draft: false
---

## 前言

简要介绍文章背景和目的。

## 主要内容

### 子标题1

详细内容...

### 子标题2

详细内容...

## 总结

总结文章要点和收获。

## 参考资料

- [参考链接1](https://example.com)
- [参考链接2](https://example.com)
```

### 技术教程模板

```markdown
---
title: "如何实现XXX功能"
author: "Ciheb"
pubDatetime: 2025-01-01T10:00:00Z
description: "详细介绍如何实现XXX功能的完整教程"
tags: ["教程", "技术", "开发"]
featured: true
draft: false
---

## 概述

- **目标**：实现什么功能
- **难度**：初级/中级/高级
- **所需时间**：约XX分钟
- **前置知识**：需要了解的技术

## 准备工作

### 环境要求

- Node.js 版本
- 其他依赖

### 安装步骤

```bash
npm install package-name
```

## 实现步骤

### 步骤1：创建基础结构

```javascript
// 代码示例
```

### 步骤2：添加功能

```javascript
// 代码示例
```

## 完整代码

```javascript
// 完整的可运行代码
```

## 测试和验证

如何测试功能是否正常工作。

## 总结

- 学会了什么
- 注意事项
- 进阶建议

## 扩展阅读

- [相关资料](https://example.com)
```

## 🎨 样式指南

### 1. 标题规范

- 使用清晰、描述性的标题
- 避免超过60个字符 (SEO优化)
- 使用动词和具体词汇
- 避免特殊字符和标点

### 2. 描述规范

- 控制在150-160个字符以内
- 包含核心关键词
- 简洁明了，吸引读者
- 避免重复和冗余

### 3. 标签规范

- 每篇文章3-8个标签
- 使用已有标签或创建新的必要标签
- 优先使用通用标签，再添加特定标签
- 标签名使用中文或英文，保持一致性

### 4. 内容结构

- 开头要有引人入胜的介绍
- 使用清晰的标题层次结构
- 适当使用列表和代码块
- 结尾要有总结或行动建议

## 🔍 SEO 优化建议

### 1. 关键词优化

- 在标题中包含主要关键词
- 在描述中自然地使用关键词
- 在正文中适度分布关键词
- 使用相关的长尾关键词

### 2. 内容质量

- 确保内容原创性和价值
- 保持适当的文章长度 (800-2000字)
- 使用清晰的段落结构
- 添加相关的内外部链接

### 3. 图片优化

- 使用描述性的alt文本
- 优化图片大小和格式
- 使用合适的图片尺寸
- 考虑图片的加载速度

## ✅ 发布检查清单

发布前请检查以下项目：

- [ ] Frontmatter信息完整且正确
- [ ] 标题和描述符合SEO规范
- [ ] 标签选择恰当
- [ ] 内容结构清晰，标题层次合理
- [ ] 代码块有适当的语法高亮
- [ ] 图片和链接正常工作
- [ ] 拼写和语法检查
- [ ] 本地预览效果良好
- [ ] draft 字段设置为 false

## 🛠️ 常用工具推荐

- **Markdown编辑器**：Typora、Mark Text、VS Code
- **图片处理**：TinyPNG (压缩)、Unsplash (免费图片)
- **代码格式化**：Prettier
- **语法检查**：Grammarly (英文)、讯飞写作 (中文)

遵循这个指南，你就能创建出高质量、结构清晰的博客文章了！🎉