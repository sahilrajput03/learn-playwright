import { defineConfig, devices } from '@playwright/test';

// Read environment variables from file: https://github.com/motdotla/dotenv
// require('dotenv').config();

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testDir: './tests',

  // Maximum time one test can run for
  // ? LERAN: Originally it was 30 seconds (ie., 30 * 1_000)
  timeout: 25 * 1_000,

  expect: {
    timeout: 5 * 1_000
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  // ? LEARN: Setting as 1 for tutorial-video-6
  // retries: 1,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  // reporter: 'html',
  // ? LEARN: To disable opening of report on test failure
  // reporter: [['html', { open: 'on-failure' }] ],
  reporter: [['html', { open: 'never' }] ],

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  // LEARN: This feature does not work well in linux - 13 Nov, 2023
  use: {
    // video: 'on',
    launchOptions: {
      // This option adds a delay to every instruction
      // slowMo: 1000
    },
    
    // Base URL to use in actions like `await page.goto('/')`.
    // baseURL: 'http://127.0.0.1:3000',

    // ? LEARN: This is useful ~ Video 6
    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // ! Sahil: Disabled webkit browser for my manjaro because webkit is not able to run at all.
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // Test against mobile viewports.
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // Test against branded browsers.
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // Run your local dev server before starting the tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
