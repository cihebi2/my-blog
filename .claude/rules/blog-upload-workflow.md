# 博客上传工作流规则

## 概述

本文档定义了博客文章上传到GitHub的标准化流程，确保内容质量、提交规范和部署一致性。

## 🎯 目标

- 🔄 **标准化流程**：统一的上传步骤和检查清单
- 📝 **提交规范**：一致的提交信息格式
- ✅ **质量保证**：内容和技术质量检查
- 🔒 **安全检查**：避免敏感信息泄露
- 📊 **可追溯性**：清晰的变更记录和版本管理

## 📋 上传前检查清单

### 1. 内容质量检查

- [ ] **Frontmatter完整性**
  - [ ] `title`：清晰描述性标题
  - [ ] `author`：作者信息正确
  - [ ] `pubDatetime`：发布时间格式正确 (ISO 8601)
  - [ ] `description`：简洁准确的描述
  - [ ] `tags`：相关标签完整
  - [ ] `featured`：是否设为特色文章
  - [ ] `draft`：发布状态正确

- [ ] **内容结构检查**
  - [ ] 包含目录 (`## Table of contents`)
  - [ ] 标题层级合理 (H1-H6)
  - [ ] 代码块语法高亮正确
  - [ ] 图片链接有效
  - [ ] 内部链接正确

- [ ] **文本质量**
  - [ ] 无明显错字和语法错误
  - [ ] 技术术语使用准确
  - [ ] 知识点注释完整
  - [ ] 实例代码可运行

### 2. 技术规范检查

- [ ] **文件命名规范**
  ```
  格式：{主题}-{副标题}-{年份}.md
  示例：claude-code-complete-command-documentation-2025.md
  
  规则：
  - 使用小写字母
  - 单词间用连字符(-)分隔
  - 包含年份便于归档
  - 避免特殊字符和空格
  ```

- [ ] **文件位置正确**
  ```
  标准路径：src/data/blog/
  按年份组织：src/data/blog/2025/
  草稿目录：src/data/blog/_drafts/
  ```

- [ ] **Markdown格式规范**
  - [ ] 代码块使用正确的语言标识
  - [ ] 表格格式规范
  - [ ] 引用格式统一
  - [ ] 列表缩进正确

### 3. 安全检查

- [ ] **敏感信息检查**
  - [ ] 无API密钥或token
  - [ ] 无个人敏感信息
  - [ ] 无内部系统信息
  - [ ] 无密码或私钥

- [ ] **版权合规**
  - [ ] 引用内容标注来源
  - [ ] 图片使用权限合法
  - [ ] 代码示例原创或开源

## 🔄 标准上传流程

### 第一步：预检查
```bash
# 1. 检查文件状态
git status

# 2. 验证博客文件存在
ls -la src/data/blog/*.md | tail -1

# 3. 本地预览测试（可选）
npm run dev
```

### 第二步：内容验证
```bash
# 1. 检查Markdown语法
npx markdownlint src/data/blog/*.md

# 2. 检查链接有效性（如果配置了）
npx markdown-link-check src/data/blog/*.md

# 3. 拼写检查（如果需要）
npx cspell "src/data/blog/*.md"
```

### 第三步：Git操作
```bash
# 1. 添加新文件到暂存区
git add src/data/blog/[博客文件名].md

# 2. 检查暂存区状态
git status --staged

# 3. 提交更改（使用标准格式）
git commit -m "[提交类型]: [简短描述]

[详细描述]
- [主要功能点1]
- [主要功能点2]
- [主要功能点3]"

# 4. 推送到远程仓库
git push origin main
```

### 第四步：验证部署
```bash
# 1. 确认推送成功
git status

# 2. 检查远程仓库状态
git log --oneline -1

# 3. 访问网站验证文章显示（如果有自动部署）
```

## 📝 提交信息规范

### 提交类型 (Commit Types)

| 类型 | 描述 | 示例场景 |
|------|------|----------|
| `feat` | 新功能/新文章 | 新博客文章发布 |
| `fix` | 错误修复 | 修复文章中的错误 |
| `docs` | 文档更新 | 更新README或说明文档 |
| `style` | 格式调整 | Markdown格式优化 |
| `refactor` | 重构文章 | 重新组织文章结构 |
| `update` | 内容更新 | 更新过时信息 |
| `remove` | 删除内容 | 删除过时文章 |

### 提交信息模板

```
[类型]: [简短描述（50字符内）]

[详细描述（可选，72字符换行）]
- [变更点1]
- [变更点2]
- [变更点3]

[影响范围]
- 新增功能: [具体功能]
- 修复问题: [具体问题]
- 其他变更: [其他说明]
```

### 示例提交信息

```
feat: 添加Claude Code完整命令文档博客文章

全面解析Claude Code CLI工具的所有功能和使用方法
- 包含30+实用命令详解和最佳实践指南
- 涵盖基础斜杠命令到高级自定义功能
- 添加丰富的知识点注释和使用技巧
- 提供企业级应用案例和故障排除指南

新增功能: 技术工具类博客文章
文章字数: 约15000字
预计阅读时间: 30-45分钟
```

## 🏷️ 文件命名规范

### 命名规则

```
格式：{主要关键词}-{次要关键词}-{年份}.md

构成要素：
- 主要关键词：文章核心主题（2-3个单词）
- 次要关键词：补充说明（1-2个单词）
- 年份：发布年份（4位数字）
- 扩展名：.md

示例：
✅ claude-code-complete-command-documentation-2025.md
✅ react-hooks-best-practices-guide-2025.md
✅ kubernetes-deployment-strategy-analysis-2025.md

❌ Claude Code文档.md (包含空格和中文)
❌ blog-post-1.md (不够描述性)
❌ very-long-title-that-exceeds-reasonable-length-limits.md (过长)
```

### 分类建议

```
技术教程类：
{技术栈}-{具体主题}-tutorial-{年份}.md
示例：nextjs-authentication-tutorial-2025.md

工具介绍类：
{工具名}-{功能类型}-guide-{年份}.md
示例：docker-container-optimization-guide-2025.md

经验分享类：
{领域}-{主题}-experience-{年份}.md
示例：fullstack-development-experience-2025.md

技术分析类：
{技术}-{方面}-analysis-{年份}.md
示例：microservices-architecture-analysis-2025.md
```

## 🔍 质量保证检查

### 自动化检查脚本

```bash
#!/bin/bash
# blog-quality-check.sh

echo "🔍 开始博客质量检查..."

# 检查文件是否存在
if [ ! -f "$1" ]; then
    echo "❌ 文件不存在: $1"
    exit 1
fi

echo "📝 检查Markdown语法..."
npx markdownlint "$1"

echo "🔗 检查链接有效性..."
npx markdown-link-check "$1"

echo "📖 检查拼写..."
npx cspell "$1"

echo "🏷️ 检查Frontmatter..."
head -20 "$1" | grep -E "^title:|^author:|^pubDatetime:|^description:|^tags:"

echo "✅ 质量检查完成"
```

### 手动检查清单

- [ ] **可读性检查**
  - [ ] 段落长度适中
  - [ ] 代码示例清晰
  - [ ] 图表说明充分
  - [ ] 逻辑结构清晰

- [ ] **SEO优化**
  - [ ] 标题包含关键词
  - [ ] 描述吸引人且准确
  - [ ] 标签相关性强
  - [ ] 内容长度适中

- [ ] **用户体验**
  - [ ] 目录结构清晰
  - [ ] 关键信息突出
  - [ ] 示例实用易懂
  - [ ] 总结回顾到位

## 🚨 常见问题处理

### 推送失败

```bash
# 问题：推送被拒绝
# 解决：先拉取远程更改
git pull origin main --rebase
git push origin main
```

### 提交信息错误

```bash
# 问题：提交信息格式错误
# 解决：修改最后一次提交
git commit --amend -m "正确的提交信息"
git push origin main --force-with-lease
```

### 文件冲突

```bash
# 问题：文件冲突
# 解决：手动解决冲突
git status
# 编辑冲突文件
git add [冲突文件]
git commit -m "resolve: 解决文件冲突"
```

### 敏感信息泄露

```bash
# 问题：意外提交敏感信息
# 解决：移除敏感信息并强制推送
git reset --soft HEAD~1
# 修改文件，移除敏感信息
git add .
git commit -m "fix: 移除敏感信息"
git push origin main --force-with-lease
```

## 📊 流程优化建议

### 自动化改进

1. **Pre-commit钩子**
   ```bash
   # .git/hooks/pre-commit
   #!/bin/bash
   ./scripts/blog-quality-check.sh
   ```

2. **GitHub Actions**
   ```yaml
   # .github/workflows/blog-check.yml
   name: Blog Quality Check
   on: [push, pull_request]
   jobs:
     check:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Check blog quality
           run: ./scripts/blog-quality-check.sh
   ```

3. **自动部署**
   - 配置Vercel/Netlify自动部署
   - 设置域名和SSL证书
   - 配置CDN加速

### 团队协作

1. **代码审查**
   - 新文章提交PR进行审查
   - 至少一人审查后合并
   - 使用模板进行审查

2. **标准化**
   - 团队共享此规则文档
   - 定期更新流程规范
   - 培训新成员使用流程

## 📈 成功指标

### 质量指标
- [ ] 提交信息规范性 > 95%
- [ ] 文件命名正确性 = 100%
- [ ] 内容质量检查通过 = 100%
- [ ] 零安全问题发生

### 效率指标
- [ ] 上传流程平均耗时 < 5分钟
- [ ] 一次性成功率 > 90%
- [ ] 返工修复率 < 5%

### 维护指标
- [ ] 文档及时更新
- [ ] 流程持续优化
- [ ] 团队采用率 = 100%

---

## 📚 相关资源

- [Markdown语法指南](https://www.markdownguide.org/)
- [Git提交信息规范](https://www.conventionalcommits.org/)
- [博客SEO最佳实践](https://moz.com/blog/seo-best-practices)
- [技术写作指南](https://developers.google.com/tech-writing)

---

*最后更新时间：2025-01-02*
*版本：v1.0*
*维护者：Ciheb* 