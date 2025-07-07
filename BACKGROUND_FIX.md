# 背景图片滚动修复方案

## 问题描述
当页面向下滚动时，封面背景图片会消失，影响视觉效果。

## 修复方案

### 1. 背景容器优化
- **增加背景高度**: 将 `.hero-container` 高度从 `100vh` 增加到 `120vh`
- **移动设备适配**: 在移动设备上使用 `150vh` 高度
- **背景定位**: 确保 `background-position: center center`
- **GPU加速**: 添加 `transform: translateZ(0)` 和 `will-change: transform`

### 2. 内容区域调整
- **渐变背景**: 为 `.main-content-wrapper` 添加从透明到不透明的渐变背景
- **最小高度**: 确保内容区域 `min-height: 100vh`，完全覆盖背景
- **上边距优化**: 调整 `margin-top` 确保平滑过渡

### 3. 视差滚动效果
- **平滑视差**: 实现背景的视差滚动效果
- **内容淡出**: 滚动时英雄区域内容逐渐淡出
- **性能优化**: 使用 `requestAnimationFrame` 优化滚动性能

### 4. 移动设备优化
- **禁用fixed背景**: 移动设备使用 `background-attachment: scroll`
- **减少视差**: 移动设备上减少或禁用视差效果
- **性能优先**: 优化移动设备的滚动性能

### 5. 响应式适配
- **断点适配**: 不同屏幕尺寸的优化设置
- **高分辨率屏幕**: 适配Retina屏幕的背景显示
- **减少动画偏好**: 尊重用户的减少动画设置

## 技术实现

### CSS关键修改
```css
.hero-container {
  position: fixed;
  height: 120vh; /* 增加高度确保滚动时不露白 */
  background-attachment: fixed;
  transform: translateZ(0); /* GPU加速 */
}

.main-content-wrapper {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(var(--color-background), 0.1) 20%,
    rgba(var(--color-background), 0.5) 40%,
    rgba(var(--color-background), 0.8) 70%,
    rgb(var(--color-background)) 100%
  );
  min-height: 100vh; /* 确保完全覆盖 */
}
```

### JavaScript视差效果
```javascript
function setupParallaxEffect() {
  // 视差移动背景
  // 淡出英雄内容
  // 性能优化的滚动监听
}
```

## 效果说明

### 桌面端效果
- 背景图片固定显示，不会在滚动时消失
- 平滑的视差滚动效果
- 内容区域渐进式覆盖背景

### 移动端效果
- 优化的滚动性能
- 简化的视觉效果
- 保持背景连续性

### 兼容性
- 现代浏览器: 完整的视差和动画效果
- 较旧浏览器: 基础的背景显示
- 移动设备: 性能优化的简化效果

## 测试建议

1. **滚动测试**: 在不同设备上测试滚动时背景的连续性
2. **性能测试**: 检查滚动时的帧率和CPU使用率
3. **兼容性测试**: 在不同浏览器中验证效果
4. **响应式测试**: 测试不同屏幕尺寸的显示效果

## 进一步优化

如果还有问题，可以考虑：
1. 调整背景高度到 `150vh` 或更高
2. 修改渐变开始位置
3. 调整视差滚动速率
4. 添加背景图片预加载

通过这些修复，背景图片应该在整个滚动过程中保持可见，提供更好的视觉体验。