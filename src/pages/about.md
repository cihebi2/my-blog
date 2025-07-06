---
layout: ../layouts/AboutLayout.astro
title: "About"
---

<div class="intro-section">

## 👋 你好，我是"此和彼"

<div class="intro-card">

**一名主攻 AI for Science 方向的研究生，一个热衷于探索技术与自我边界的行动派。**

我的日常，是在代码、文献和现实世界的"摩擦力" 之间寻找一种动态平衡。我着迷于研究如何利用计算和智能解决复杂的交叉学科问题，例如**蛋白质性质预测**和**抗体筛选**；也对**大模型微调**、**自动化流程搭建**等能撬动效率的工程实践抱有极大热情。

</div>

</div>

---

<div class="life-section">

## 🌟 工作和研究之外，我也是一个

<div class="hobby-grid">

<div class="hobby-card">
<div class="hobby-icon">🖥️</div>
<div class="hobby-content">
<h3>服务器和网络工具的折腾者</h3>
<p>享受从零开始搭建、部署、排错并最终让一个想法变成可运行应用的过程。</p>
</div>
</div>

<div class="hobby-card">
<div class="hobby-icon">🏃‍♂️</div>
<div class="hobby-content">
<h3>长跑爱好者</h3>
<p>相信身体的耐力和精神的耐力，同样需要日复一日的锻炼来维持。</p>
</div>
</div>

<div class="hobby-card">
<div class="hobby-icon">📚</div>
<div class="hobby-content">
<h3>电子书阅读者</h3>
<p>习惯在Kindle和各类阅读App中寻找答案与慰藉。</p>
</div>
</div>

</div>

</div>

---

<div class="blog-section">

## 🌱 关于这个博客

<div class="blog-description">

这个博客是我的**"数字花园"**和**"公开实验室"**。

在这里，你会看到我的技术笔记、代码实践、踩坑记录，以及对各类AI工具的评测与思考。

但这里不只有代码。更重要的，是关于一个普通人如何学习、如何面对挫败、以及如何在信息的洪流中保持专注与前行的真实记录。我曾花费大量时间与"技术瓶颈"和"精力黑洞"缠斗，也曾因"比较焦虑"和"无力感"而陷入困境。这个博客，会毫无保留地分享我从这些挣扎中提炼出的思考与方法。

<div class="highlight-text">
我坚信，解决一个技术难题与优化个人精力系统，背后遵循着相通的底层逻辑。
</div>

</div>

</div>

---

<div class="beliefs-section">

## 💭 我的一些个人信条

<div class="belief-list">

<div class="belief-item">
<div class="belief-title">⚡ 行动优于焦虑</div>
<div class="belief-content">
与其陷入漫长的精神内耗，不如启动一个"最小化闭环"——无论是写一行能运行的代码，还是完成一次3公里的跑步。用微小的、确定的胜利，来驱散巨大的、不确定的焦虑。
</div>
</div>

<div class="belief-item">
<div class="belief-title">🌊 坦然面对"摩擦力"</div>
<div class="belief-content">
我相信现实世界充满了"摩擦力"。无论是代码报错，还是生活琐事，它们都是系统正常运行的成本。预知并承认它的存在，能让我们在面对不顺时，少一些烦躁，多一些平静。
</div>
</div>

<div class="belief-item">
<div class="belief-title">📝 记录是最好的"复利"工具</div>
<div class="belief-content">
我坚持数年记录自己的每日所思所行，包括成功与失败。它不仅是我的外部记忆体，更是我进行自我迭代、发现盲点、对抗遗忘的最强工具。我相信，对过程的复盘，比对结果的执着更有价值。
</div>
</div>

</div>

</div>

---

<div class="closing-section">

## 🤝 很高兴能在这里与你相遇

<div class="closing-text">
期待我们都能在探索的路上，成为更好的自己。
</div>

</div>

<style>
  /* 整体布局样式 */
  .intro-section,
  .life-section,
  .blog-section,
  .beliefs-section,
  .closing-section {
    margin: 2.5rem 0;
  }

  /* 介绍卡片 */
  .intro-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    margin: 1.5rem 0;
    line-height: 1.8;
  }

  html[data-theme="dark"] .intro-card {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* 爱好网格布局 */
  .hobby-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .hobby-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: transform 0.3s ease, background 0.3s ease;
  }

  .hobby-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.12);
  }

  html[data-theme="dark"] .hobby-card {
    background: rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  html[data-theme="dark"] .hobby-card:hover {
    background: rgba(0, 0, 0, 0.25);
  }

  .hobby-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .hobby-content h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-accent);
  }

  .hobby-content p {
    margin: 0;
    line-height: 1.6;
    opacity: 0.9;
  }

  /* 博客描述 */
  .blog-description {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    line-height: 1.8;
  }

  html[data-theme="dark"] .blog-description {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .highlight-text {
    background: linear-gradient(90deg, var(--color-accent), var(--color-foreground));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
    font-size: 1.1rem;
    text-align: center;
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 0.05);
  }

  /* 信条列表 */
  .belief-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .belief-item {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: transform 0.3s ease;
  }

  .belief-item:hover {
    transform: translateX(8px);
  }

  html[data-theme="dark"] .belief-item {
    background: rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .belief-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-accent);
    margin-bottom: 0.8rem;
  }

  .belief-content {
    line-height: 1.7;
    opacity: 0.9;
  }

  /* 结尾部分 */
  .closing-section {
    text-align: center;
    margin: 3rem 0;
  }

  .closing-text {
    font-size: 1.2rem;
    font-weight: 500;
    background: linear-gradient(45deg, var(--color-accent), var(--color-foreground));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding: 1rem;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .hobby-grid {
      grid-template-columns: 1fr;
    }
    
    .intro-card,
    .blog-description {
      padding: 1.5rem;
    }
    
    .hobby-card,
    .belief-item {
      padding: 1.2rem;
    }
    
    .belief-item:hover {
      transform: translateY(-2px);
    }
  }
</style>