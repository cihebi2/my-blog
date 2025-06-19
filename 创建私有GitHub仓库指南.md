# 🔒 创建私有 GitHub 仓库指南

## 🚀 第一步：创建私有仓库

### 在 GitHub 网站上创建

1. **访问 GitHub**
   - 打开 https://github.com
   - 登录您的 GitHub 账户

2. **创建新的私有仓库**
   - 点击右上角 `+` 号 → `New repository`
   - **仓库名称**：`my-astro-blog` (或您喜欢的名称)
   - **描述**：`My personal blog built with AstroPaper theme`
   - **重要：选择 `Private`** 🔒
   - **不要勾选** "Add a README file"、".gitignore" 或 "license"
   - 点击 `Create repository`

3. **复制仓库 URL**
   - 创建成功后，复制 HTTPS URL
   - 格式：`https://github.com/您的用户名/my-astro-blog.git`

## 📤 第二步：推送代码到私有仓库

在项目目录 `C:\Users\ciheb\Desktop\AA_web\my-blog` 运行：

```powershell
# 添加远程仓库（替换为您的实际 GitHub 用户名）
git remote add origin https://github.com/您的用户名/my-astro-blog.git

# 推送代码到 GitHub
git push -u origin main
```

**示例（替换 `您的用户名` 为实际用户名）：**
```powershell
git remote add origin https://github.com/ciheb/my-astro-blog.git
git push -u origin main
```

## 🌐 第三步：Vercel 部署私有仓库

**好消息：** Vercel 可以部署私有 GitHub 仓库！

### 1. 登录 Vercel
- 访问 https://vercel.com
- 使用 GitHub 账户登录

### 2. 导入私有项目
- 点击 `New Project`
- Vercel 会显示您的所有仓库（包括私有仓库）
- 找到 `my-astro-blog` 仓库
- 点击 `Import`

### 3. 配置部署
- **Framework Preset**: Astro
- **Root Directory**: `.`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- 点击 `Deploy`

## 🔐 私有仓库的优势

✅ **完全私密** - 只有您能看到代码和项目
✅ **安全** - 保护您的内容和配置
✅ **仍可公开访问网站** - 博客网站依然可以公开访问
✅ **团队协作** - 可以邀请特定人员协作
✅ **Vercel 支持** - 完全支持私有仓库部署

## 📝 权限说明

- **GitHub 仓库**: 私有（只有您能看到）
- **博客网站**: 公开（任何人都能访问您的博客）
- **源代码**: 私有（其他人看不到您的代码）

## 🎯 推送完成后

推送成功后，您可以：

1. **验证推送**：访问您的 GitHub 仓库页面
2. **继续部署**：在 Vercel 导入项目
3. **获得博客链接**：`https://您的项目名.vercel.app`

## ❗ 注意事项

- **GitHub 免费账户** 支持无限私有仓库
- **Vercel 免费计划** 支持私有仓库部署  
- **网站依然公开** - 只是源代码私有，网站本身还是可以公开访问

准备好推送了吗？请告诉我您的 GitHub 用户名，我可以为您提供具体的命令！" 