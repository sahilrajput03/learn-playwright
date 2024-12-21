import { test, expect } from '@playwright/test';
import 'dotenv/config'

// & Command to test this file alone:
//  npx playwright test --project=chromium ./tests/github.spec.ts --debug
// alias for above command: ptd ./tests/github.spec.ts

// We use 
test.only('Verify login', async ({ page }) => {
    await page.goto('https://github.com/login');
    await page.waitForURL('https://github.com/');

    await page.getByLabel('Open user navigation menu').click();
    await expect(page.getByTitle('sahilrajput03')).toBeVisible();
    // await page.pause()
})
