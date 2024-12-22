import { test, expect } from '@playwright/test';
import 'dotenv/config'
import { githubLoginUrl } from './utils';

// & Command to test this file alone:
//  npx playwright test --project=chromium ./tests/github.spec.ts --debug
//  alias for above command: ptd ./tests/github.spec.ts

test.only('Verify github login', async ({ page }) => {
    await page.goto(githubLoginUrl);
    await page.waitForURL('https://github.com/');

    await page.getByLabel('Open user navigation menu').click();
    await expect(page.getByTitle('sahilrajput03')).toBeVisible();
    // await page.pause()
})
