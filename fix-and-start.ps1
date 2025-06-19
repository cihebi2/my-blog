# AstroPaper 博客启动脚本
# 解决 npm 配置问题并启动开发服务器

Write-Host "=== AstroPaper 博客启动脚本 ===" -ForegroundColor Green
Write-Host ""

# 检查是否在正确的目录
if (!(Test-Path "astro.config.ts")) {
    Write-Host "错误：请在项目根目录运行此脚本" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

Write-Host "1. 正在清理过时的 npm 配置..." -ForegroundColor Yellow

# 创建新的 .npmrc 文件，只保留必要的配置
$npmrcContent = "registry=https://registry.npmmirror.com"

$npmrcPath = "$env:USERPROFILE\.npmrc"
Write-Host "正在备份原始 .npmrc 文件..." -ForegroundColor Blue
if (Test-Path $npmrcPath) {
    $backupName = "$npmrcPath.backup.$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    Copy-Item $npmrcPath $backupName
}

Write-Host "正在创建新的 .npmrc 配置..." -ForegroundColor Blue
$npmrcContent | Out-File -FilePath $npmrcPath -Encoding UTF8

Write-Host "2. 正在安装依赖..." -ForegroundColor Yellow

# 尝试安装依赖
npm install --legacy-peer-deps
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 依赖安装成功！" -ForegroundColor Green
    Write-Host "3. 正在启动开发服务器..." -ForegroundColor Yellow
    npm run dev
} else {
    Write-Host "⚠️ 使用 npm 安装失败，尝试使用 npx..." -ForegroundColor Yellow
    Write-Host "3. 正在启动开发服务器（无需本地安装）..." -ForegroundColor Yellow
    npx astro@latest dev
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 博客已启动！" -ForegroundColor Green
    Write-Host "📝 访问地址：http://localhost:4321" -ForegroundColor Cyan
    Write-Host "🛑 按 Ctrl+C 停止服务器" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ 启动失败，请手动执行以下命令：" -ForegroundColor Red
    Write-Host "npm install --legacy-peer-deps" -ForegroundColor White
    Write-Host "npm run dev" -ForegroundColor White
    Write-Host ""
    Read-Host "按回车键退出"
} 