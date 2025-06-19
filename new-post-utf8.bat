@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

if "%~1"=="" (
    echo.
    echo === Create New Article ===
    echo.
    set /p "post_title=Please enter article title: "
) else (
    set "post_title=%~1"
)

if "!post_title!"=="" (
    echo Error: Article title cannot be empty
    pause
    exit /b
)

:: Generate safe filename
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

:: Check if file exists
if exist "!file_path!" (
    echo Warning: File already exists !file_path!
    set /p "overwrite=Overwrite? (y/n): "
    if /i not "!overwrite!"=="y" (
        echo Cancelled
        pause
        exit /b
    )
)

:: Get current time in ISO format
for /f %%a in ('powershell -command "Get-Date -Format 'yyyy-MM-ddTHH:mm:ssZ'"') do set "datetime=%%a"

echo Creating file: !file_path!

:: Create article content
(
echo ---
echo title: "!post_title!"
echo author: Ciheb
echo pubDatetime: !datetime!
echo featured: false
echo draft: false
echo tags:
echo   - "未分类"
echo description: "!post_title! 的简介描述"
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
echo ✅ New article created: !file_path!
echo 📝 You can edit this file with any text editor
echo.
echo Next steps:
echo 1. Edit article content
echo 2. Run 'npm run dev' to preview
echo 3. Run 'git add . && git commit -m "new post" && git push' to publish
echo.

:: Ask if open with VS Code
where code >nul 2>&1
if !errorlevel! equ 0 (
    set /p "open_vscode=Open with VS Code? (y/n): "
    if /i "!open_vscode!"=="y" (
        code "!file_path!"
    )
)

pause 