#!/bin/bash

# 博客上传自动化脚本
# 遵循 .claude/rules/blog-upload-workflow.md 中定义的流程

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 显示使用说明
show_usage() {
    echo "📝 博客上传工具 v1.0"
    echo ""
    echo "用法: $0 <博客文件路径> [提交类型] [简短描述]"
    echo ""
    echo "参数:"
    echo "  博客文件路径     博客Markdown文件的路径"
    echo "  提交类型         可选，默认为 'feat'"
    echo "  简短描述         可选，从文件名自动生成"
    echo ""
    echo "提交类型选项:"
    echo "  feat      新功能/新文章"
    echo "  fix       错误修复"
    echo "  docs      文档更新"
    echo "  style     格式调整"
    echo "  refactor  重构文章"
    echo "  update    内容更新"
    echo ""
    echo "示例:"
    echo "  $0 src/data/blog/my-new-post-2025.md"
    echo "  $0 src/data/blog/my-new-post-2025.md feat \"添加新的技术教程\""
    echo ""
}

# 检查参数
if [ $# -lt 1 ]; then
    show_usage
    exit 1
fi

BLOG_FILE="$1"
COMMIT_TYPE="${2:-feat}"
SHORT_DESC="$3"

# 检查文件是否存在
if [ ! -f "$BLOG_FILE" ]; then
    print_error "文件不存在: $BLOG_FILE"
    exit 1
fi

print_status "🚀 开始博客上传流程..."
echo "📄 文件: $BLOG_FILE"
echo "🏷️ 提交类型: $COMMIT_TYPE"

# 第一步：预检查
print_status "📋 第一步：预检查"

print_status "检查Git状态..."
git status --short

print_status "验证博客文件..."
if [ -f "$BLOG_FILE" ]; then
    file_size=$(wc -l < "$BLOG_FILE")
    print_success "✅ 文件存在，共 $file_size 行"
else
    print_error "❌ 文件不存在"
    exit 1
fi

# 第二步：内容验证
print_status "🔍 第二步：内容验证"

print_status "检查Frontmatter..."
if head -20 "$BLOG_FILE" | grep -q "^---$"; then
    if head -20 "$BLOG_FILE" | grep -E "^title:|^author:|^pubDatetime:|^description:" > /dev/null; then
        print_success "✅ Frontmatter 基本格式正确"
    else
        print_warning "⚠️ Frontmatter 可能缺少必要字段"
    fi
else
    print_error "❌ 未找到 Frontmatter"
    exit 1
fi

# 检查文件命名规范
print_status "检查文件命名规范..."
filename=$(basename "$BLOG_FILE")
if [[ "$filename" =~ ^[a-z0-9-]+-[0-9]{4}\.md$ ]]; then
    print_success "✅ 文件命名符合规范"
else
    print_warning "⚠️ 文件命名可能不符合规范 (推荐格式: topic-year.md)"
fi

# 第三步：Git操作
print_status "📤 第三步：Git操作"

# 生成简短描述（如果未提供）
if [ -z "$SHORT_DESC" ]; then
    # 从文件名生成描述
    base_name=$(basename "$BLOG_FILE" .md)
    SHORT_DESC="添加${base_name}博客文章"
fi

# 从文件中提取标题作为详细描述
print_status "提取文章信息..."
ARTICLE_TITLE=$(grep "^title:" "$BLOG_FILE" | sed 's/title: *"\?\([^"]*\)"\?/\1/' | head -1)
ARTICLE_DESC=$(grep "^description:" "$BLOG_FILE" | sed 's/description: *"\?\([^"]*\)"\?/\1/' | head -1)

if [ -n "$ARTICLE_TITLE" ]; then
    print_success "✅ 文章标题: $ARTICLE_TITLE"
fi

# 添加文件到暂存区
print_status "添加文件到暂存区..."
git add "$BLOG_FILE"

# 检查暂存区状态
print_status "检查暂存区状态..."
git status --staged

# 生成提交信息
COMMIT_MSG="$COMMIT_TYPE: $SHORT_DESC"

if [ -n "$ARTICLE_TITLE" ]; then
    COMMIT_MSG="$COMMIT_MSG

$ARTICLE_TITLE"
fi

if [ -n "$ARTICLE_DESC" ]; then
    COMMIT_MSG="$COMMIT_MSG

- $ARTICLE_DESC"
fi

# 确认提交
echo ""
print_status "📝 准备提交信息:"
echo "----------------------------------------"
echo "$COMMIT_MSG"
echo "----------------------------------------"
echo ""

read -p "确认提交? (y/N): " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    print_warning "❌ 用户取消操作"
    git reset HEAD "$BLOG_FILE"  # 取消暂存
    exit 0
fi

# 提交更改
print_status "提交更改..."
git commit -m "$COMMIT_MSG"

# 推送到远程仓库
print_status "推送到远程仓库..."
if git push origin main; then
    print_success "✅ 推送成功"
else
    print_error "❌ 推送失败，可能需要先拉取远程更改"
    echo "尝试运行: git pull origin main --rebase && git push origin main"
    exit 1
fi

# 第四步：验证部署
print_status "🎯 第四步：验证部署"

print_status "确认推送成功..."
git status

print_status "显示最新提交..."
git log --oneline -1

# 提供有用的后续信息
echo ""
print_success "🎉 博客上传完成!"
echo ""
echo "📊 上传摘要:"
echo "  📄 文件: $BLOG_FILE"
echo "  🏷️ 类型: $COMMIT_TYPE"
echo "  📝 标题: $ARTICLE_TITLE"
echo "  🔗 提交: $(git log --oneline -1 | cut -d' ' -f1)"
echo ""
echo "🔗 下一步:"
echo "  • 访问你的网站查看文章"
echo "  • 检查自动部署状态"
echo "  • 分享文章链接"
echo ""

# 提供快速命令
print_status "📋 快速命令:"
echo "  本地预览: npm run dev"
echo "  检查状态: git status"
echo "  查看历史: git log --oneline -5"
echo ""

print_success "✨ 感谢使用博客上传工具!" 