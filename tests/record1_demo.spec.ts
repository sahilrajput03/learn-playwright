import { test, expect } from '@playwright/test';

// LEARN: Run with my alias: pth record1_demo

test('record demo test', async ({ page }) => {
  // const k = await new Promise(res => setTimeout(res, 10_000))
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});