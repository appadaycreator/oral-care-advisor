const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
  
  await page.goto('http://localhost:8888/index.html', { waitUntil: 'networkidle' });
  await page.click('button:has-text("診断スタート")');
  await page.waitForSelector('#quiz-area');
  
  // Answer all 7 questions
  for (let i = 0; i < 7; i++) {
    await page.click('.quiz-opt');
    await page.waitForTimeout(100);
  }
  
  await page.waitForSelector('.result.show');
  await page.screenshot({ path: '/tmp/result_screen.png' });
  
  // Scroll down to see full result
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/result_screen_bottom.png' });
  
  await browser.close();
  console.log('Result screenshots saved');
})();
