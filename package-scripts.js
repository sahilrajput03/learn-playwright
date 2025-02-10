
// [Disadvantage of Playwright Inspector (Debugger): Stops on first line with debugger and you need to play via playwright inspector's Play button]

module.exports = {
  scripts: {
    test: {
      default: 'npx playwright test --project=chromium',
      headed: "npx playwright test --headed --project=chromium",

      // 🚀  LEARN: Open `Playwright Inspector` (helpful in debugging & step by step execution)
      // 🚀🚀  To run single test file use --- `nps "t.d ./tests/example2.spec.ts"`
      debug: 'npx playwright test --project=chromium --debug',


      // -------- Watch scripts --------
      // Playwright Native way (source: https://github.com/microsoft/playwright/issues/21960#issuecomment-1483604692)
      pn: 'PWTEST_WATCH=1 npx playwright test --project=chromium',

      // With UI mode
      ui: 'npx playwright test --project=chromium --ui',

      // 👌🏻 Nodemon (My custom way)
      n: {
        default: "nodemon -e spec.ts -x 'npx playwright test --project=chromium'",
        // 👌🏻 (Headed mode) Nodemon (My custom way)
        headed: "nodemon -e spec.ts -x 'npx playwright test --headed --project=chromium' -w tests"
      }
    }
  }
};


