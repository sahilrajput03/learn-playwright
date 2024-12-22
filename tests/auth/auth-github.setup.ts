// source - https://playwright.dev/docs/auth

import { test as setup, expect } from '@playwright/test';
import { githubLoginUrl, githubStorageStateFile } from '../utils';
import { authenticator } from 'otplib';
import 'dotenv/config'

const GITHUB_ACCOUNT_EMAIL: string | undefined = process.env.GITHUB_ACCOUNT_EMAIL;
const GITHUB_ACCOUNT_PASSWORD: string | undefined = process.env.GITHUB_ACCOUNT_PASSWORD;
const GITHUB_AUTHENTICATOR_SECRET: string | undefined = process.env.GITHUB_AUTHENTICATOR_SECRET;

if (!GITHUB_ACCOUNT_EMAIL || !GITHUB_ACCOUNT_PASSWORD || !GITHUB_AUTHENTICATOR_SECRET) {
    console.error('Please defined these env values in .env file:', 'GITHUB_ACCOUNT_EMAIL, GITHUB_ACCOUNT_PASSWORD, GITHUB_AUTHENTICATOR_SECRET')
    process.exit(1)
}

const loginToGithub = async (page) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto(githubLoginUrl);
    await page.getByLabel('Username or email address').fill(GITHUB_ACCOUNT_EMAIL);
    await page.getByLabel('Password').fill(GITHUB_ACCOUNT_PASSWORD);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    // Wait until the page receives the cookies.


    const token = authenticator.generate(GITHUB_AUTHENTICATOR_SECRET)
    await page.getByRole('link', { name: 'Use your authenticator app' }).click();
    await page.getByPlaceholder('XXXXXX').fill(token);


    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('https://github.com/');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    //  Sahil: This statement throws error btw => // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

    // Open user profile ~ Sahil
    await page.getByLabel('Open user navigation menu').click();
    await page.getByLabel('Your profile').click();

    // End of authentication steps.
}

// Sahil: For usage of this refer file playwright.config.ts file (config.proejcts[0].name[='setup'])
setup('authenticate', async ({ page }) => {
    await loginToGithub(page)
    // * Save the current state of the browser's storage (including
    // cookies and local storage) to a file specified by authFile.
    // This can be useful for reusing the authenticated state in
    // future sessions.
    await page.context().storageState({ path: githubStorageStateFile });
    // await page.pause()
});