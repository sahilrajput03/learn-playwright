import { test, expect } from '@playwright/test';
import 'dotenv/config'
import { githubLoginUrl } from './utils';

// ❤️ Usage on "sahilrajput03/Learn Playwright @ YT: https://www.youtube.com/playlist?list=PLBfwD_NnDB3q5MaTqVNLpcVOFTbyjxQRN

// & Command to test this file alone:
//  npx playwright test --project=chromium ./tests/github.spec.ts --debug
//  alias for above command: ptd ./tests/github.spec.ts

// * Enable disable sloMo mode for this file
test.use({
    launchOptions: {
        // headless: false,
        // slowMo: 3000, // (TESTED WORKS)
    },
});

test.only('Verify github login', async ({ page }) => {
    await page.goto(githubLoginUrl);
    await page.waitForURL('https://github.com/');

    await page.getByLabel('Open user navigation menu').click();
    await expect(page.getByTitle('sahilrajput03')).toBeVisible();
    await page.pause()
})
