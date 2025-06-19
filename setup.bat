@echo off
echo 正在设置 AstroPaper 博客项目...
echo.

echo 1. 清理 npm 缓存...
npm config set cache %TEMP%\npm-cache --global
npm cache clean --force

echo.
echo 2. 设置 npm 镜像源为淘宝镜像...
npm config set registry https://registry.npmmirror.com

echo.
echo 3. 尝试安装依赖包...
npm install --no-optional --legacy-peer-deps

echo.
echo 4. 如果上述安装失败，请手动以管理员身份运行此脚本
echo.

pause 