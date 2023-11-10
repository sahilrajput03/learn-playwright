import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

// LEARN: This file was generated and then edited.
// LEARN: Check `Readme.md` to get the command used.

test('record demo 2', async ({ page }) => {
	const browser = await chromium.launch({
		headless: false
	});
	const context = await browser.newContext();
	
	// ? LEARN: This is very helpful to debug any test in simple way!
	// await page.pause();
	
	await page.goto('https://www.saucedemo.com/');
	await page.locator('[data-test="username"]').click();
	await page.locator('[data-test="username"]').fill('standard_user');
	await page.locator('[data-test="username"]').press('Tab');
	await page.locator('[data-test="password"]').fill('secret_sauce');
	await page.locator('[data-test="login-button"]').click();
	await page.getByRole('button', { name: 'Open Menu' }).click();
	await page.getByRole('link', { name: 'Logout' }).click();

	// ---------------------
	await context.close();
	await browser.close();
});
