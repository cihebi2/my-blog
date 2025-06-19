@echo off
setlocal enabledelayedexpansion

if "%~1"=="" (
    echo.
    echo === 创建新文章 ===
    echo.
    set /p "post_title=请输入文章标题: "
) else (
    set "post_title=%~1"
)

if "!post_title!"=="" (
    echo 错误: 文章标题不能为空
    pause
    exit /b
)

:: 生成安全的文件名
set "file_name=!post_title!"
set "file_name=!file_name: =-!"
set "file_name=!file_name::=-!"
set "file_name=!file_name:?=!"
set "file_name=!file_name:*=!"
set "file_name=!file_name:/=-!"
set "file_name=!file_name:\=-!"
set "file_name=!file_name:<=!"
set "file_name=!file_name:>=!"
set "file_name=!file_name:|=-!"

set "file_path=src\data\blog\!file_name!.md"

:: 检查文件是否已存在
if exist "!file_path!" (
    echo 警告: 文件已存在 !file_path!
    set /p "overwrite=是否覆盖？(y/n): "
    if /i not "!overwrite!"=="y" (
        echo 取消创建
        pause
        exit /b
    )
)

:: 获取当前时间 - 使用ISO格式
for /f %%a in ('powershell -command "Get-Date -Format 'yyyy-MM-ddTHH:mm:ssZ'"') do set "datetime=%%a"

echo 创建文件：!file_path!

:: 创建文章内容
(
echo ---
echo title: !post_title!
echo author: Ciheb
echo pubDatetime: !datetime!
echo featured: false
echo draft: false
echo tags:
echo   - 未分类
echo description: !post_title! 的简介描述
echo ---
echo.
echo # !post_title!
echo.
echo ## Table of contents
echo.
echo ## 简介
echo.
echo 在这里写文章的简介...
echo.
echo ## 主要内容
echo.
echo 在这里写主要内容...
echo.
echo ## 总结
echo.
echo 在这里写总结...
echo.
echo ---
echo.
echo 发布时间：!datetime!
) > "!file_path!"

echo.
echo ✅ 新文章已创建：!file_path!
echo 📝 你可以使用任何文本编辑器编辑这个文件
echo.
echo 接下来你可以：
echo 1. 编辑文章内容
echo 2. 运行 'blog-helper.bat dev' 预览效果
echo 3. 运行 'blog-helper.bat push' 推送到Git
echo.

:: 询问是否用VS Code打开
where code >nul 2>&1
if !errorlevel! equ 0 (
    set /p "open_vscode=是否用 VS Code 打开这个文件？(y/n): "
    if /i "!open_vscode!"=="y" (
        code "!file_path!"
    )
)

pause 