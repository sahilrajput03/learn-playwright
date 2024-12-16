import { test, expect } from '@playwright/test';
import 'dotenv/config'

// & Command to test this file alone:
//  npx playwright test --project=chromium ./tests/aws.spec.ts --debug

const AWS_ACCOUNT_EMAIL: string | undefined = process.env.AWS_ACCOUNT_EMAIL;
const AWS_ACCOUNT_PASSWORD: string | undefined = process.env.AWS_ACCOUNT_PASSWORD;

if (!AWS_ACCOUNT_EMAIL || !AWS_ACCOUNT_PASSWORD) {
    console.error('Please defined these env values in .env file:', 'AWS_ACCOUNT_EMAIL, AWS_ACCOUNT_PASSWORD')
    process.exit(1)
}

const loginToAws = async (page) => {
    await page.goto('https://ap-south-1.console.aws.amazon.com/');
    await page.getByTestId('not-sign-in-with-iam').click();
    await page.getByPlaceholder('username@example.com').click();
    await page.getByPlaceholder('username@example.com').fill(AWS_ACCOUNT_EMAIL);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#password').click();
    await page.locator('#password').fill(AWS_ACCOUNT_PASSWORD);
    await page.locator('#password').press('Enter');
    await page.locator('#multi_mfa_swhw_radio_button_box div').first().click();
    await page.getByRole('button', { name: 'Next' }).click();
    // * Please enter your authenticator code from your mobiile app manually with hand
    // await page.pause(); // Sahil: no need to pause actually because playwright wait until the next selector is available.
}

const openS3service = async (page) => {
    await page.getByTestId('awsc-concierge-input').click();
    await page.getByTestId('awsc-concierge-input').fill('s3');
    await page.getByTestId('services-search-result-link-s3').click();
}

// This test is expected to be run alone using `test.only(..)`
test('create s3 bucket in aws', async ({ page }) => {
    await loginToAws(page)
    await openS3service(page)

    await page.getByTestId('s3-lamb-container__button__create').click();
    await page.getByPlaceholder('myawsbucket').click();
    await page.getByPlaceholder('myawsbucket').fill('bucket1');
    await page.getByPlaceholder('myawsbucket').fill('sahilrajput03-bucket123');
    await page.getByText('Block all public access', { exact: true }).click();
    await page.getByText('I acknowledge that the').click();
    await page.getByTestId('buttonCreate').click();
    // NOTE: If you're getting error here that probabaly means the bucket is already created and you're getting error a bucket with same name alrady exists in aws page.
    await expect(page.getByRole('link', { name: 'sahilrajput03-bucket123' })).toBeVisible();
    // Assertion that bucket is listed on the page
    await expect(page.getByRole('link', { name: 'sahilrajput03-bucket123' })).toBeVisible();


    await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
});


// This test is expected to be run alone using `test.only(..)`
test.only('delete aws bucket', async ({ page }) => {
    await loginToAws(page)
    await openS3service(page)

    // Assertion that bucket is listed on the page
    await expect(page.getByRole('link', { name: 'sahilrajput03-bucket123' })).toBeVisible();

    await page.getByRole('radio', { name: 'Table Selection Select sahilrajput03-bucket123' }).check();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByPlaceholder('sahilrajput03-bucket123').click();
    await page.getByPlaceholder('sahilrajput03-bucket123').fill('sahilrajput03-bucket123');
    await page.getByRole('button', { name: 'Delete bucket', exact: true }).click();


    await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
});
