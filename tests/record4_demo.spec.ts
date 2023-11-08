const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    colorScheme: 'dark'
  });
  const page = await context.newPage();
  await page.goto('https://playwright.dev/');
  await page.getByText('Auto-wait. Playwright waits for elements to be actionable prior to performing ac').click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();