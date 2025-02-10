import { test, expect } from '@playwright/test';

test.only('sample test', async ({ page }) => {
    console.log('hey... 1')
    await page.goto('https://sahilrajput.com');
    console.log('hello... 2')
    // await page.pause()
    await page.goto('https://blog.sahilrajput.com');
    console.log('world... 3')
    // throw new Error('123')
})