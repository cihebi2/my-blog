@echo off
chcp 65001 >nul
echo ========================================
echo           Git 配置修复工具
echo ========================================
echo.

echo 正在配置 Git 用户信息...
git config user.name "cihebi2"
git config user.email "cihebi2@users.noreply.github.com"

echo ✅ Git 配置已更新：
echo 用户名: cihebi2
echo 邮箱: cihebi2@users.noreply.github.com
echo.

echo 📝 这个邮箱地址与您的 GitHub 账户匹配，
echo    Vercel 部署现在应该可以正常工作了。
echo.

echo ========================================
echo ✅ 配置完成！
echo ========================================
pause 