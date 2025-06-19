# TinaCMS 集成完成指南

## 🎯 已完成的配置

✅ **安装依赖包**
- `@tinacms/cli ^1.9.0`
- `tinacms ^2.4.0`

✅ **创建配置文件**
- `tina/config.ts` - TinaCMS 主配置
- `src/pages/admin/index.astro` - 管理员页面

✅ **更新项目脚本**
- `npm run dev` - 同时启动 TinaCMS 和 Astro
- `npm run build` - 构建时包含 TinaCMS

## 🚀 下一步操作

### 1. 获取 TinaCMS 凭证
1. 访问 [https://app.tina.io](https://app.tina.io)
2. 注册/登录账户
3. 创建新项目
4. 获取 `Client ID` 和 `Token`

### 2. 配置环境变量
1. 复制 `.env.example` 为 `.env.local`
2. 填入你的 TinaCMS 凭证：
```env
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_token_here
GITHUB_BRANCH=main
```

### 3. 配置 Vercel 环境变量
在 Vercel 项目设置中添加：
- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_TOKEN`
- `GITHUB_BRANCH`

### 4. 启动开发服务器
```bash
npm run dev
```

### 5. 访问管理界面
- 开发环境：`http://localhost:4321/admin`
- 生产环境：`https://cihebi.top/admin`

## 📝 功能特性

- ✅ 可视化编辑器支持
- ✅ 实时预览
- ✅ 媒体文件管理
- ✅ 中文界面
- ✅ 自动生成文件名
- ✅ 支持草稿和发布状态
- ✅ 标签管理
- ✅ 富文本编辑

## 🛠️ 故障排除

如果遇到问题：
1. 确保环境变量正确设置
2. 检查 GitHub 仓库权限
3. 确认 TinaCMS 项目配置正确
4. 查看浏览器控制台错误信息

## 📚 相关链接

- [TinaCMS 文档](https://tina.io/docs/)
- [TinaCMS GitHub](https://github.com/tinacms/tinacms)