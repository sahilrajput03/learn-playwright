import { test, expect, chromium } from '@playwright/test';

test.only('login - https://admin-demo.nopcommerce.com/login', async () => {
	const browser = await chromium.launch({
		headless: false,
		// This option adds a delay to every instruction
		slowMo: 1000,
	});
	const context = await browser.newContext({
		// NOTE-SAHIL: video recording still doesn't work with my manjaro-linux as on 13 Nov, 2023 even
		// when I use below way to enable record video.
		recordVideo: {
			dir: 'my-test-videos',
			// size: { width: 800, height: 600 }
		}
	});
	const page = await context.newPage();
	await page.pause();


	await page.goto('https://admin-demo.nopcommerce.com/login', { timeout: 10_000 });
	await page.getByLabel('Email:').click();
	await page.getByLabel('Email:').press('Control+a');
	await page.getByLabel('Email:').fill('admin@yourstore.com');
	await page.getByLabel('Password:').click();
	await page.getByLabel('Password:').press('Control+a');
	await page.getByLabel('Password:').fill('admin');
	await page.getByRole('button', { name: 'Log in' }).click();
	await page.getByRole('link', { name: 'Logout' }).click();
	// await page.pause()
})