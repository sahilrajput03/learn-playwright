import { test, expect } from '@playwright/test';

test('google test', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle('Google')
});
