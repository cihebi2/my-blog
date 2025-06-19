param([string]$Title)

# Set UTF-8 encoding for console
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "=== Create New Article ===" -ForegroundColor Cyan

if (-not $Title) {
    $Title = Read-Host "Enter article title"
}

if (-not $Title.Trim()) {
    Write-Host "Error: Title cannot be empty" -ForegroundColor Red
    exit
}

# Generate safe filename
$FileName = $Title.Trim() -replace '[^\w\s-]', '' -replace '\s+', '-'
$FilePath = "src/data/blog/$FileName.md"

if (Test-Path $FilePath) {
    $Overwrite = Read-Host "File exists. Overwrite? (y/n)"
    if ($Overwrite.ToLower() -ne 'y') {
        Write-Host "Cancelled" -ForegroundColor Yellow
        exit
    }
}

$DateTime = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"

$Content = @"
---
title: "$Title"
pubDatetime: $DateTime
featured: false
draft: false
tags:
  - "blog"
description: "Description for $Title"
---

# $Title

## Introduction

Write your introduction here...

## Main Content

Write your main content here...

## Conclusion

Write your conclusion here...
"@

$Content | Out-File -FilePath $FilePath -Encoding UTF8 -NoNewline

Write-Host "Article created: $FilePath" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit the content" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to preview" -ForegroundColor White
Write-Host "3. Commit and push when ready" -ForegroundColor White

if (Get-Command code -ErrorAction SilentlyContinue) {
    $OpenVSCode = Read-Host "Open with VS Code? (y/n)"
    if ($OpenVSCode.ToLower() -eq 'y') {
        code $FilePath
    }
} 