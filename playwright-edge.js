import { chromium } from 'playwright';

async function openEdge() {
  // 启动 Edge 浏览器（使用 Chromium 引擎）
  const browser = await chromium.launch({
    headless: false, // 设置为 false 以显示浏览器窗口
    channel: 'msedge', // 指定使用 Microsoft Edge
    args: ['--start-maximized'] // 最大化窗口
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // 导航到一个网页
  await page.goto('https://www.bing.com');
  
  console.log('Edge 浏览器已打开，正在访问 Bing 首页');
  
  // 等待 5 秒钟让你看到浏览器
  await page.waitForTimeout(5000);
  
  // 可以添加更多操作，比如截图
  await page.screenshot({ path: 'edge-screenshot.png' });
  console.log('已保存截图到 edge-screenshot.png');
  
  // 保持浏览器打开（注释掉下面这行）
  // await browser.close();
  
  console.log('浏览器将保持打开状态...');
}

openEdge().catch(console.error);