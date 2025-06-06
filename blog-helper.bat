@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

if "%1"=="" goto help
if "%1"=="help" goto help
if "%1"=="dev" goto dev
if "%1"=="build" goto build
if "%1"=="push" goto push
if "%1"=="status" goto status
goto help

:help
echo.
echo === 博客管理助手 ===
echo.
echo 用法:
echo   blog-helper.bat dev      - 启动开发服务器
echo   blog-helper.bat build    - 构建生产版本
echo   blog-helper.bat push     - 添加、提交并推送更改
echo   blog-helper.bat status   - 查看Git状态
echo   blog-helper.bat help     - 显示帮助
echo.
echo 示例:
echo   blog-helper.bat dev
echo   blog-helper.bat push
echo.
goto end

:dev
echo 🚀 启动开发服务器...
echo 访问 http://localhost:4321 查看博客
echo 按 Ctrl+C 停止服务器
npm run dev
goto end

:build
echo 🔨 构建博客...
npm run build
echo ✅ 构建完成！
goto end

:status
echo 📊 Git 状态:
git status --porcelain
echo.
echo 📝 最近的提交:
git log --oneline -5
goto end

:push
echo 🔍 检查Git状态...

:: 检查是否有更改
git status --porcelain > temp_status.txt
set /p git_status=<temp_status.txt
del temp_status.txt

if "!git_status!"=="" (
    echo ✅ 没有需要提交的更改
    goto end
)

echo 📝 发现以下更改:
git status --short
echo.

:: 获取提交信息
set commit_msg=%2
if "!commit_msg!"=="" (
    for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set current_date=%%c-%%a-%%b
    for /f "tokens=1-2 delims=: " %%a in ('time /t') do set current_time=%%a:%%b
    set commit_msg=更新博客内容 - !current_date! !current_time!
)

echo 📥 添加所有更改...
git add .

echo 💾 提交更改...
git commit -m "!commit_msg!"

echo 🚀 推送到远程仓库...
git push

if !errorlevel! equ 0 (
    echo.
    echo ✅ 成功推送！
    echo 🌐 你的更改现在已经在线上了！
    echo.
    echo 💡 提示: 如果你已经设置了Vercel自动部署，网站将在几分钟内更新
) else (
    echo.
    echo ❌ 推送失败！请检查网络连接和Git配置
)

goto end

:end 