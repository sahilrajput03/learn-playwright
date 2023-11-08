import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

// LEARN: This file was generated and then edited.
// LEARN: Check `Readme.md` to get the command used.

test('record demo 3', async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://googe.com/');
  await page.goto('https://googe.com/v3/s?c=&s=poet&d=&k=&r=&t=1&u=&v=&x=&y=&z=&pz=&f=1&tk=60f7c6e9e966b6698f27f56f7a627874&q=general.india.q00_age_gender');
  await page.getByText('Male', { exact: true }).click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByText('Female').click({
    clickCount: 3
  });
  await page.getByText('Female').click();
  await page.locator('html').click();
  await page.locator('body').click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
});