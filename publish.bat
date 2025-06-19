@echo off
chcp 65001 >nul
echo ========================================
echo           AstroPaper 博客发布工具
echo ========================================
echo.

echo [1/3] 正在构建网站...
call npm run build
if errorlevel 1 (
    echo ❌ 构建失败！请检查错误信息。
    pause
    exit /b 1
)
echo ✅ 构建完成！
echo.

echo [2/3] 添加文件到 Git...
git add .
echo ✅ 文件已添加到暂存区
echo.

set /p commit_msg="请输入提交信息（直接回车使用默认信息）: "
if "%commit_msg%"=="" set commit_msg=更新博客内容

echo [3/3] 提交并推送到 GitHub...
git commit -m "%commit_msg%"
git push origin main

if errorlevel 1 (
    echo ❌ 推送失败！请检查网络连接和 Git 配置。
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ 发布完成！
echo 🌐 您的网站将在几分钟内更新
echo 📱 Vercel 部署状态: https://vercel.com/dashboard
echo ========================================
pause 