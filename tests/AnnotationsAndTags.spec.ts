import { test, expect, chromium } from '@playwright/test';

// Annotations: https://playwright.dev/docs/test-annotations

test.skip('Test One', async ({ page }) => {
// 
})

test('Test Two', async ({ page }) => {
	test.fail()
})

// Declares a test to be fixed (This test will also fail)
test.fixme('not ready yet', async ({ page }) => {
	// 
})

test('slow test', async ({ page }) => {
	// ❤️ Make the test slow and triples the test TIMEOUT
	test.slow()
})

// LEARN: If you uncomment below test then all above tests will be skipped because of `.only()`
// test.only('run desired number of tests only', async ({ page }) => {
// 	test.slow()
// })

// Conditionally skip a test. Source: https://playwright.dev/docs/test-annotations#conditionally-skip-a-test
test('skip this test on firefox', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');
});

// ❤️ LEARN: We can run any test which contains the text `@smoke` by using this command:
// pth Annotations --grep  @smoke
// ^ that is my bash function `headed` test command with nodmeon 
test('my test is fun @smoke', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');
});

// ❤️ LEARN: To invert match i.e, run all test except the matching grep pattern we can use below command:
// npx playwright test --grep-invert "@smoke"
