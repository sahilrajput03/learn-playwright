import { test, expect } from '@playwright/test';
import 'dotenv/config'
import { awsLoginUrl } from './utils';

// ❤️ Usage on "sahilrajput03/Learn Playwright @ YT: https://www.youtube.com/playlist?list=PLBfwD_NnDB3q5MaTqVNLpcVOFTbyjxQRN

// & Command to test this file alone:
//  npx playwright test --project=chromium ./tests/aws2.spec.ts --debug
//  alias for above command: ptd ./tests/aws2.spec.ts

const { chromium } = require('playwright');

// ********************************  ********************************
// * Using a single browser session to perform all tests --- We do this by sharing the context of
// *        a browser i.e, `context` below instead of destructuring `page` from the test callback.
let browser;
let context
// let page

test.beforeAll(async () => {
    // Launch the browser before running tests
    browser = await chromium.launch({ headless: false }); // Set headless to true/false as needed

    // Sahil: We use same browser so we share context between different tests
    context = await browser.newContext(); // Create a new browser context

    // & Sahil: Use below statement to perform all tests on the same page instead of opening a new page each time.
    // page = await context.newPage(); // open a new tab
});

test.afterAll(async () => {
    // Close the browser after all tests
    await browser.close();
});
// ********************************  ********************************

// * Enable disable sloMo mode for this file
test.use({
    launchOptions: {
        // headless: false,
        // slowMo: 3000, // (TESTED WORKS)
    },
});

const openS3service = async (page) => {
    await page.getByTestId('awsc-concierge-input').click();
    await page.getByTestId('awsc-concierge-input').fill('s3');
    await page.getByTestId('services-search-result-link-s3').click();
}

const BUCKET_NAME = 'sahilrajput03-bucket123'

test.describe('s3 bucket', () => {
    test('Verify aws login', async () => {
        const page = await context.newPage(); // open a new tab

        await page.goto(awsLoginUrl);
        // Assert "Console Home" on screen
        await page.getByTestId('unifiedConsoleHeader').getByText('Console Home').click();
        // await page.pause()
    })

    // This test is expected to be run alone using `test.only(..)`
    test('create s3 bucket in aws', async () => {
        const page = await context.newPage(); // open a new tab

        // await loginToAws(page) // moved to `tests/auth/auth-aws.setup.ts`
        await page.goto(awsLoginUrl);
        await openS3service(page)

        await page.getByTestId('s3-lamb-container__button__create').click();
        await page.getByPlaceholder('myawsbucket').click();
        await page.getByPlaceholder('myawsbucket').fill('bucket1');
        await page.getByPlaceholder('myawsbucket').fill(BUCKET_NAME);
        await page.getByText('Block all public access', { exact: true }).click();
        await page.getByText('I acknowledge that the').click();
        await page.getByTestId('buttonCreate').click();
        // NOTE: If you're getting error here that probabaly means the bucket is already created and you're getting error a bucket with same name alrady exists in aws page.
        await expect(page.getByRole('link', { name: BUCKET_NAME })).toBeVisible();
        // Assertion that bucket is listed on the page
        await expect(page.getByRole('link', { name: BUCKET_NAME })).toBeVisible();

        // await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
    });


    // This test is expected to be run alone using `test.only(..)`
    test('delete aws bucket', async () => {
        const page = await context.newPage(); // open a new tab

        // await loginToAws(page) // moved to `tests/auth/auth-aws.setup.ts`
        await page.goto(awsLoginUrl);
        await openS3service(page)

        // Assertion that bucket is listed on the page
        await expect(page.getByRole('link', { name: BUCKET_NAME })).toBeVisible();

        await page.getByRole('radio', { name: 'Table Selection Select sahilrajput03-bucket123' }).check();
        await page.getByRole('button', { name: 'Delete' }).click();
        await page.getByPlaceholder(BUCKET_NAME).click();
        await page.getByPlaceholder(BUCKET_NAME).fill(BUCKET_NAME);
        await page.getByRole('button', { name: 'Delete bucket', exact: true }).click();

        // await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
    });
})

