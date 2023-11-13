import { test, expect, chromium } from '@playwright/test';

test('Assertiongs Demo', async ({ page }) => {
  await page.goto('https://kitchen.applitools.com/');
	// ASSERTIONS:
	// check element present or not
	await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveCount(1)
	const presentOnScreen = await page.$('text=The Kitchen');
	if (presentOnScreen) {
		page.getByRole('heading', { name: 'The Kitchen' }).click()
	} else {
		console.log('item is NOT present')
	}

	// await page.pause();
	// check element hidden or visible
	await expect.soft(page.locator('text=The Kitchen')).toBeVisible()
	await expect.soft(page.locator('text=The Kitchen')).toBeHidden()

	// check enabled or disabled
	await expect.soft(page.locator('text=The Kitchen')).toBeEnabled()
	await expect.soft(page.locator('text=The Kitchen')).toBeDisabled()

	// text match
	await expect.soft(page.locator('text=The Kitchen')).toHaveText('The Kitchen')
	await expect.soft(page.locator('text=The Kitchen')).not.toHaveText('ABCD')
	
	// await page.pause();

	// check attribute value
	await expect.soft(page.locator('text=The Kitchen')).toHaveAttribute('class', /.*css-dpmy2a/)
	await expect.soft(page.locator('text=The Kitchen')).toHaveClass(/.*css-dpmy2a/)

	// check page url and title
	await expect.soft(page).toHaveURL('https://kitchen.applitools.com/')
	await expect.soft(page).toHaveTitle(/.*Kitchen/)

	// visual validation with screenshot
	await expect.soft(page).toHaveScreenshot()

	await page.pause();
});
