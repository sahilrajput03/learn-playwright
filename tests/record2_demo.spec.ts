import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

// LEARN: The code of this file is geneated using `codegen` command and-
// then copy pasted in this file manually by hand.
// LEARN: Check `Readme.md` to get the command used.

test('record demo 2', async ({ page }) => {
	const browser = await chromium.launch({
		headless: false
	});
	const context = await browser.newContext();
	
	// ? LEARN: Open `Playwright Inspector` ((helpful in debugging & step by step execution))
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
