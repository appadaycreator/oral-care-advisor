const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
  
  await page.goto('http://localhost:8888/index.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/desktop_start.png' });
  
  // Click start button
  await page.click('button:has-text("診断スタート")');
  await page.waitForSelector('#quiz-area');
  await page.screenshot({ path: '/tmp/desktop_q1.png' });
  
  // Answer Q1
  await page.click('.quiz-opt');
  await page.screenshot({ path: '/tmp/desktop_q2.png' });
  
  // Verify mobile viewport
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto('http://localhost:8888/index.html', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: '/tmp/mobile_start.png' });
  
  await browser.close();
  console.log('Screenshots saved');
})();
