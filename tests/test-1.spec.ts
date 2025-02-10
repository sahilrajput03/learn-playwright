import { test, expect } from '@playwright/test';

// This test is recorded via vscode extension.
test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('hello world');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByLabel('Toggle Todo').check();
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('bye world');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
});