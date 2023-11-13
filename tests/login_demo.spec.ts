import { test, expect, chromium } from '@playwright/test';

test('login - applitools.com', async ({ page }) => {
  await page.goto('https://demo.applitools.com/');

	await page.getByPlaceholder('Enter your username').fill('Sahil')

	// LEARN: We can *also* locate by placeholder text as well:
	// await page.locator('[placeholder="Enter your username"]').fill('tabb7')

	await page.getByPlaceholder('Enter your password').fill('1234')

	// LEARN: Assetions like `waitForSelector()`, `toHaveCount()`, etc are run by
	// playwright behind the scenes before perfoming any actions like `.click()`
	// before locating any element.

	// LEARN: Explicitly using these assertions can help to make exceptional checking while locating
	// particular elements as per your usecase.

	// LEARN: Setting `timeout` in below assertiongs is completely optional. (default = `config.expect.timeout`)
	
	await page.waitForSelector('text=Sign in', { timeout: 1000 })
	await (await page.waitForSelector('text=Sign in')).isVisible()
	await expect(page.locator('text=Sign in')).toHaveCount(1, { timeout: 1000 });

	// Click signin button
	await page.getByRole('link', { name: 'Sign in' }).click()
	// await page.pause()
});

test('login - opensource-demo.orangehrmlive.com', async ({ page}) => {
	// We want to use a long timeout for this page because generally the page loads a lot of time.
  await page.goto('https://opensource-demo.orangehrmlive.com/', { timeout: 10_000});
	await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('PaulSamiSamiSamiSamiSamiSami CollingsAsadAsadAsadAsadAsad').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
	// await page.pause()
})

test.only('login - https://admin-demo.nopcommerce.com/login', async ({ page}) => {
  await page.goto('https://admin-demo.nopcommerce.com/login', { timeout: 10_000});
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