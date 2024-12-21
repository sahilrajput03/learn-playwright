import { defineConfig, devices } from '@playwright/test';
import { awsStorageStateFile, githubStorageStateFile } from './tests/utils';

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
  reporter: [['html', { open: 'never' }]],

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

    // *********************
    // * Authentication    *
    // *********************
    // src: https://playwright.dev/docs/auth
    // Setup project (Sahil: We can use this project as a dependency for multiple browsers by
    // adding 'setup' in dependencies property of each browser specified below.
    // { name: 'setup', testMatch: /.*\.setup\.ts/ },

    //  * MAGIC *
    // Login to github and save storage to file in `githubStorageStateFile`
    { name: 'setup-github-login', testMatch: "tests/auth/auth-github.setup.ts" },
    // Login to aws and save storage to file in `awsStorageStateFile`
    { name: 'setup-aws-login', testMatch: "tests/auth/auth-aws.setup.ts" },



    // ***************
    // * Browsers    *
    // ***************
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Note to Sahil: Only use one of below `storageState` as per your need of automation testing
        storageState: githubStorageStateFile, // Use prepared auth state.
        // storageState: awsStorageStateFile, // Use prepared auth state.
      },
      //  * MAGIC *
      // Note 1: Dependencies are run before any tests are run
      // Note 2 to Sahil:  Toggle comment/uncomment one of below dependencies as per need to login once
      //                   and then any further test runs via `ptd ./tests/aws.spec.ts` or
      //                   `ptd ./tests/github.spec.ts`
      dependencies: ['setup-github-login'], // if we use this then tests specified in `setup-github` are run first.
      // dependencies: ['setup-aws-login'], // if we use this then tests specified in `setup-github` are run first.
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
