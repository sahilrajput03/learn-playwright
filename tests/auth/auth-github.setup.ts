// source - https://playwright.dev/docs/auth

import { test as setup, expect } from '@playwright/test';
import { githubStorageStateFile } from '../utils';

// Sahil: For usage of this refer file playwright.config.ts file (config.proejcts[0].name[='setup'])
setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://github.com/login');
    await page.getByLabel('Username or email address').fill('sahilrajput03');
    await page.getByLabel('Password').fill('Philips@@786');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('https://github.com/');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    //  Sahil: This statement throws error btw => // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

    // Open user profile ~ Sahil
    await page.getByLabel('Open user navigation menu').click();
    await page.getByLabel('Your profile').click();

    // End of authentication steps.

    // * Save the current state of the browser's storage (including
    // cookies and local storage) to a file specified by authFile.
    // This can be useful for reusing the authenticated state in
    // future sessions.
    await page.context().storageState({ path: githubStorageStateFile });
    // await page.pause()
});