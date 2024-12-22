import { test, expect } from '@playwright/test';
import 'dotenv/config'
import fs from 'fs';
import { awsLoginUrl } from './utils';

// ❤️ Usage on "sahilrajput03/Learn Playwright @ YT: https://www.youtube.com/playlist?list=PLBfwD_NnDB3q5MaTqVNLpcVOFTbyjxQRN

// & Command to test this file alone:
//  npx playwright test --project=chromium ./tests/aws.spec.ts --debug
//  alias for above command: ptd ./tests/aws.spec.ts

test('Verify aws login', async ({ page, context }) => {
    await page.goto(awsLoginUrl);
    // Assert "Console Home" on screen
    await page.getByTestId('unifiedConsoleHeader').getByText('Console Home').click();
    // await page.pause()
})

const openS3service = async (page) => {
    await page.getByTestId('awsc-concierge-input').click();
    await page.getByTestId('awsc-concierge-input').fill('s3');
    await page.getByTestId('services-search-result-link-s3').click();
}

const BUCKET_NAME = 'sahilrajput03-bucket123'

// test.describe("s3 bucket tests", () => {

// })

// This test is expected to be run alone using `test.only(..)`
test('create s3 bucket in aws', async ({ page }) => {
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

    await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
});


// This test is expected to be run alone using `test.only(..)`
test('delete aws bucket', async ({ page }) => {
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

    await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
});
