// source - https://playwright.dev/docs/auth

import { test as setup, expect } from '@playwright/test';
import { awsLoginUrl, awsStorageStateFile } from '../utils';
import { authenticator } from 'otplib';

const AWS_ACCOUNT_EMAIL: string | undefined = process.env.AWS_ACCOUNT_EMAIL;
const AWS_ACCOUNT_PASSWORD: string | undefined = process.env.AWS_ACCOUNT_PASSWORD;
const AWS_AUTHENTICATOR_SECRET: string | undefined = process.env.AWS_AUTHENTICATOR_SECRET;


if (!AWS_ACCOUNT_EMAIL || !AWS_ACCOUNT_PASSWORD || !AWS_AUTHENTICATOR_SECRET) {
    console.error('Please defined these env values in .env file:', 'AWS_ACCOUNT_EMAIL, AWS_ACCOUNT_PASSWORD, AWS_AUTHENTICATOR_SECRET')
    process.exit(1)
}
const loginToAws = async (page) => {
    await page.goto(awsLoginUrl);
    await page.getByTestId('not-sign-in-with-iam').click();
    await page.getByPlaceholder('username@example.com').click();
    await page.getByPlaceholder('username@example.com').fill(AWS_ACCOUNT_EMAIL);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#password').click();
    await page.locator('#password').fill(AWS_ACCOUNT_PASSWORD);
    await page.locator('#password').press('Enter');
    // await page.pause()
    await page.locator('#multi_mfa_swhw_radio_button_box div').first().click();
    await page.getByRole('button', { name: 'Next' }).click();

    const token = authenticator.generate(AWS_AUTHENTICATOR_SECRET)
    await page.locator('#mfaCode').click();
    await page.locator('#mfaCode').fill(token); // authenticator token is put automatically here!
    await page.getByRole('button', { name: 'Submit' }).click();

    // ---- NOTE ---- >>>> Since now I'm generating the token via this libraray using my secret of the authenticator app I do not need to enter the token from my google authenticator app manually now.
    //// Please enter your authenticator code from your mobiile app manually with hand

    // * Wait until the page receives the cookies
    // Assert "Console Home" on screen
    await page.getByTestId('unifiedConsoleHeader').getByText('Console Home').click();
    // (^ This is important that we test assert "Console Home" after successful login is shown
    // because some cookies take a while to be set in window)
}

// Sahil: For usage of this refer file playwright.config.ts file (config.proejcts[0].name[='setup'])
setup('authenticate', async ({ page }) => {
    await loginToAws(page)
    await page.context().storageState({ path: awsStorageStateFile });
    // await page.pause()
});

/**
    // 😇 Note to Sahil: I didn't need `sessionStorage` to be saved in used in tests atleast for aws login for now.
    // Get session storage and store as env variable (src: https://playwright.dev/docs/auth#session-storage)
    const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
    fs.writeFileSync('./tests/session-storage/.auth/aws-session-storage.json', sessionStorage, 'utf-8');

    // Set session storage in a new context
    const sessionStorage = JSON.parse(fs.readFileSync('./tests/session-storage/.auth/aws-session-storage.json', 'utf-8'));
    // await context.addInitScript(storage => {
    //     if (window.location.hostname === awsLoginUrl) {
    //         for (const [key, value] of Object.entries(storage))
    //             window.sessionStorage.setItem(key, value as any);
    //     }
    // }, sessionStorage);
 */