@echo off
echo 启动 AstroPaper 开发服务器...
echo.

echo 检查依赖是否已安装...
if not exist "node_modules" (
    echo 依赖未安装，正在安装...
    call setup.bat
)

echo.
echo 启动开发服务器...
echo 服务器将在 http://localhost:4321 启动
echo 按 Ctrl+C 停止服务器
echo.

npm run dev

pause 