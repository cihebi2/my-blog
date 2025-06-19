# PowerShell版本的新文章创建脚本
param(
    [string]$Title
)

# 设置控制台编码为UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ""
Write-Host "=== 📝 创建新文章 ===" -ForegroundColor Cyan
Write-Host ""

# 获取文章标题
if (-not $Title) {
    $Title = Read-Host "请输入文章标题"
}

if (-not $Title.Trim()) {
    Write-Host "❌ 错误: 文章标题不能为空" -ForegroundColor Red
    Read-Host "按任意键退出"
    exit
}

# 生成安全的文件名
$FileName = $Title.Trim()
$FileName = $FileName -replace '[<>:"/\\|?*]', '-'
$FileName = $FileName -replace '\s+', '-'
$FileName = $FileName -replace '-+', '-'
$FileName = $FileName.Trim('-')

$FilePath = "src/data/blog/$FileName.md"

# 检查文件是否已存在
if (Test-Path $FilePath) {
    Write-Host "⚠️  警告: 文件已存在 $FilePath" -ForegroundColor Yellow
    $Overwrite = Read-Host "是否覆盖？(y/n)"
    if ($Overwrite.ToLower() -ne 'y') {
        Write-Host "❌ 取消创建" -ForegroundColor Yellow
        Read-Host "按任意键退出"
        exit
    }
}

# 获取当前时间 (ISO 8601格式)
$DateTime = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"

Write-Host "📁 创建文件: $FilePath" -ForegroundColor Green

# 创建文章内容
$Content = @"
---
title: "$Title"
author: Ciheb
pubDatetime: $DateTime
featured: false
draft: false
tags:
  - "未分类"
description: "$Title 的简介描述"
---

# $Title

## Table of contents

## 简介

在这里写文章的简介...

## 主要内容

在这里写主要内容...

### 子标题示例

您可以添加子标题来组织内容结构。

- 列表项 1
- 列表项 2
- 列表项 3

### 代码示例

```javascript
// 示例代码
function hello() {
    console.log('Hello, World!');
}
```

## 总结

在这里写总结...

---

**发布时间**: $DateTime
**作者**: Ciheb
**标签**: 未分类
"@

# 写入文件
$Content | Out-File -FilePath $FilePath -Encoding UTF8

Write-Host ""
Write-Host "✅ 新文章已创建: $FilePath" -ForegroundColor Green
Write-Host "📝 你可以使用任何文本编辑器编辑这个文件" -ForegroundColor Blue
Write-Host ""
Write-Host "接下来你可以:" -ForegroundColor Cyan
Write-Host "1. 编辑文章内容" -ForegroundColor White
Write-Host "2. 运行 'npm run dev' 预览效果" -ForegroundColor White
Write-Host "3. 提交并推送:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m `"add: $Title`"" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""

# 检查VS Code是否可用
if (Get-Command code -ErrorAction SilentlyContinue) {
    $OpenVSCode = Read-Host "是否用 VS Code 打开这个文件？(y/n)"
    if ($OpenVSCode.ToLower() -eq 'y') {
        Start-Process "code" -ArgumentList $FilePath
        Write-Host "🚀 正在用 VS Code 打开文件..." -ForegroundColor Green
    }
}

Write-Host ""
Read-Host "按任意键退出" 