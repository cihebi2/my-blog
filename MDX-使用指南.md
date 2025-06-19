# MDX 使用指南

## 概述

您的博客现在已经完全支持 MDX 格式文章！MDX 是 Markdown 的扩展，允许您在文章中使用 HTML 元素和更丰富的内容。

## ✅ 已完成的配置

### 1. 依赖安装
- ✅ `@astrojs/mdx` - MDX 集成
- ✅ 语法高亮和插件配置

### 2. 内容集合配置
- ✅ `src/content.config.ts` - 新增 `mdxBlog` 集合
- ✅ 与现有 `blog` 集合使用相同的 schema

### 3. 类型系统
- ✅ `src/utils/getAllPosts.ts` - 统一处理 MD 和 MDX 文章
- ✅ `BlogPost` 类型 - 支持两种格式的联合类型
- ✅ 所有相关组件已更新支持 MDX

### 4. 页面和组件
- ✅ 首页、文章列表、文章详情页
- ✅ 标签页、归档页、RSS 订阅
- ✅ 所有组件完全兼容 MD 和 MDX

## 📝 如何创建 MDX 文章

### 1. 文件位置
在 `src/data/blog/` 目录下创建 `.mdx` 文件

### 2. 基本格式
```mdx
---
author: Ciheb
pubDatetime: 2024-01-15T10:30:00.000Z
title: "你的文章标题"
featured: false
draft: false
tags:
  - mdx
  - demo
description: "文章描述"
---

# 文章标题

你的文章内容...
```

### 3. MDX 特性

#### 标准 Markdown
所有标准 Markdown 语法都支持：
- 标题、列表、链接
- 代码块、引用
- 表格、图片

#### HTML 元素
可以直接使用 HTML 标签：

```mdx
<div style="background: #f0f0f0; padding: 20px; border-radius: 8px;">
  <h3>自定义样式盒子</h3>
  <p>使用 HTML 和内联 CSS</p>
</div>
```

#### 样式化内容
创建美丽的渐变卡片：

```mdx
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 12px; text-align: center;">
  <h2>渐变卡片</h2>
  <p>现代化的视觉效果</p>
</div>
```

## 📂 示例文件

项目中已包含两个示例 MDX 文章：

1. **`simple-mdx-demo.mdx`** - 简单演示
   - 基本 Markdown 语法
   - HTML 元素使用
   - 样式化内容

2. **`mdx-test.mdx`** - 测试文章
   - 验证 MDX 功能
   - 简单的 HTML 示例

## 🚀 使用建议

### 适合使用 MDX 的场景
- 需要自定义样式的内容
- 创建信息卡片、警告框
- 添加特殊的视觉效果
- 嵌入 HTML 组件

### 继续使用 Markdown 的场景
- 纯文本内容
- 快速写作
- 简单的技术文档

## 🛠️ 开发和构建

### 开发模式
```bash
npm run dev
```

### 构建项目
```bash
npm run build
```

### 验证状态
✅ 构建成功 - 0 errors, 0 warnings
✅ 所有 MDX 文章正常生成
✅ OG 图片自动生成
✅ 搜索索引包含 MDX 内容

## 📋 文件结构

```
src/
├── data/blog/          # 文章目录
│   ├── *.md           # Markdown 文章
│   └── *.mdx          # MDX 文章
├── content.config.ts   # 内容集合配置
├── utils/
│   └── getAllPosts.ts  # 统一文章处理
└── components/         # 所有组件已支持 MDX
```

## 🎯 下一步

1. **创建您的第一篇 MDX 文章**
   - 复制 `simple-mdx-demo.mdx` 作为模板
   - 修改 frontmatter 和内容
   - 保存后即可在网站看到

2. **探索更多可能性**
   - 自定义 CSS 样式
   - 创建复杂的布局
   - 添加交互式元素

3. **保持向下兼容**
   - 现有的 `.md` 文章继续正常工作
   - 可以逐步迁移到 MDX
   - 两种格式可以混合使用

恭喜！您现在拥有了一个功能完整的 MDX 支持博客系统！🎉 