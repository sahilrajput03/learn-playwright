# Learn Playwright

**Quick Links:**
- **❤️Learn Playwright (Google Doc):** [Click here](https://docs.google.com/document/d/1wEsteSlYXM0nbCwucnXijWbqLDwEWjKIHgOdxhqSa3k/edit?usp=sharing)
- Implemented in:
    - `slas***`
    - `qr-solution` Repo: [Click here](https://github.com/sahilrajput03/qr-solution-frontend)
    - (will be done in learn-multer as well)
- _Probably (todo: checkout):_
    - We can install only single browser too like that: `npm i playwright-chromium` (source: [Click here](https://github.com/microsoft/playwright/issues/812#issuecomment-581501050))
    - Course Playlist: [Click here](https://www.youtube.com/playlist?list=PLhW3qG5bs-L9sJKoT1LC5grGT77sfW0Z8)

**Note:**

I have **disabled** `webkit` browser in `playwright.config.ts` file because my manjaro (arch based) linux does not yet able to run webkit brower. Though chromium and firefox runs quite well.

## Installation [Tested on Macos and Linux]

*Note: I used these steps to install recentely in `learn-multer` project on 8 Feb, 2025.*

1. `npm init playwright@latest` (and say no to install browsers when prompted)
2. `npx playwright install chromium` (install chromium only)

To install all browsers you can run `npx playwright install`. In my case it installed --- `Chromium 119.0.6045.9`, `Firefox 118.0.1 ` and `Webkit 17.4`.

**Linux:** You might need to install Playwright operating system dependencies (requires sudo / root): `sudo npx playwright install-deps`

## My bash Aliases

```bash
# Playwright Aliases
alias pt='npx playwright test --project=chromium'
alias pth='npx playwright test --headed --project=chromium'
# ❤️ 🚀  LEARN: Open `Playwright Inspector` (helpful in debugging & step by step execution)
alias ptd='npx playwright test --project=chromium --debug'
# ❤️ 🚀🚀  To run single test file
ptd ./path/to/file.spec.ts

##### Watch scripts #####
# ❤️  Native way (source: https://github.com/microsoft/playwright/issues/21960#issuecomment-1483604692)
alias ptwNative='PWTEST_WATCH=1 npx playwright test --project=chromium'
# ❤️  With UI mode
alias ptui='npx playwright test --project=chromium --ui'
# ❤️  Nodemon (My custom way)
alias ptw="nodemon -e spec.ts -x 'npx playwright test --project=chromium'"
# ❤️ ❤️ ❤️  (Headed mode) Nodemon (My custom way)
alias ptwh="nodemon -e spec.ts -x 'npx playwright test --headed --project=chromium' -w tests"
```

Inside that directory, you can run several commands:

`npx playwright test`
`*` Runs the end-to-end tests.

`npx playwright test --headed`
`*` Run test in headed mode

`npx playwright test --ui`
`❤️` Starts the interactive UI mode.

`npx playwright test --project=chromium`
`*` Runs the tests only on Desktop Chrome.

`npx playwright test --project=chromium --project=firefox`
`*` Runs the tests only on Desktop Chrome and Firefox.
`*` Available options: `chromium`, `firefox`, `webkit`

`npx playwright test exampleFileNameHere`
Runs the tests in a specific file.

`npx playwright test exampleFileNameHere1 exampleFileNameHere2`
Runs multiple test files.

`npx playwright test -g textInTestTitle`
Runs test with title.
Eg., `npx playwright test -g "get started link"`

`npx playwright test --debug`
Runs the tests in debug mode.
`*` LEARN: By default debug mode will run in `headed` mode.

`npx playwright test exampleFileNameHere --debug`
Run a file with debug mode.

`npx playwright test example.spec.ts:10 --debug`
Run a file with debug mode and only break on particular test.

<!-- CAREFUL: The line number must be one i.e, where you have test(..) line only. -->

`npx playwright show-trace PATH-TO-FILE___trace.zip`
`npx playwright show-trace ./test-results/record1_demo-record-demo-test-chromium-retry1/trace.zip`
Open `Trace Viewer` and open the last trace reports.
NOTE: Traces are recorded only on retries (so make sure the value of `retries` is a non-zero value in `playwright.config.ts` file)

We suggest that you begin by typing:

    `npx playwright test`

And check out the following files:

- ./tests/example.spec.ts - Example end-to-end test
- ./tests-examples/demo-todo-app.spec.ts - Demo Todo App end-to-end tests
- ./playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information.

## Installation via vscode pallete

From pallete select: `Test: Install Playwright`

## Playwright help command

```bash
$ npx playwright -h
# Usage: npx playwright [options] [command]
#
# Options:
#   -V, --version                          output the version number
#   -h, --help                             display help for command
#
# Commands:
#   open [options] [url]                   open page in browser specified via -b,
#                                          --browser
#   codegen [options] [url]                open page and generate code for user
#                                          actions
#   install [options] [browser...]         ensure browsers necessary for this
#                                          version of Playwright are installed
#   uninstall [options]                    Removes browsers used by this
#                                          installation of Playwright from the
#                                          system (chromium, firefox, webkit,
#                                          ffmpeg). This does not include branded
#                                          channels.
#   install-deps [options] [browser...]    install dependencies necessary to run
#                                          browsers (will ask for sudo
#                                          permissions)
#   cr [options] [url]                     open page in Chromium
#   ff [options] [url]                     open page in Firefox
#   wk [options] [url]                     open page in WebKit
#   screenshot [options] <url> <filename>  capture a page screenshot
#   pdf [options] <url> <filename>         save page as pdf
#   show-trace [options] [trace...]        show trace viewer
#   test [options] [test-filter...]        run tests with Playwright Test
#   show-report [options] [report]         show HTML report
#   help [command]                         display help for command
```

## Possible things to try if your playwright browsers does not work

```bash
# From aur (this is not needed for me though, webkit does not work but chrome and firefox does, YAY!!)
yay -S playwright

# Another thing to try with manjaro
# https://github.com/microsoft/playwright/issues/2621#issuecomment-931530175
```

# Codegen help text

`npx playwright codegen -h`: You can get all the options for codegen.

`npx playwright codegen`: Auto generate tests (record tests) with Codegen.

`npx playwright codegen --browser=firefox`: For using firefox for codegen

`npx playwright codegen --target javascript -o ./tests/record2_demo.spec.ts`

<!-- Learn: For below size to work I must add below entry to my i3config file:
  # Make playwright browser float
  for_window [instance="code-url-handler .*"] floating enable
  for_window [instance="chromium-browser\ \(\/tmp\/playwright_.*"] floating enable
  for_window [title="Playwright Test"] floating enable
 -->

Learn: Here `400` is width and `600` is height.

`npx playwright codegen --target javascript -o ./tests/record4_demo.spec.ts  --viewport-size=400,600`

Open browser in dark mode enabled (this will only work if the target website supports the dark mode, for e.g., playwright.dev, the official website does support this option).

**Way 1:** (original way works as well, i.e, if you now go to `playwright.dev` site in browser that will open in dark mode enabled)
`npx playwright codegen --target javascript -o ./tests/record4_demo.spec.ts --color-scheme=dark`

**Way 2:** If you directly specify the url as argument to codegen command that will work too: `npx playwright codegen --target javascript -o ./tests/record4_demo.spec.ts --color-scheme=dark playwright.dev`

-- ISSUE WITH `--device` command on my manjaro currently; TODO: FIX ---

Learn: You this command to get list of available devices you can use for `--device` option: `npx playwright codegen --target javascript -o ./tests/record4_demo.spec.ts --device=1`

Learn: Below command throws error currently (please check my google doc file for follow up).
`npx playwright codegen --target javascript -o ./tests/record4_demo.spec.ts --device="iPhone 11"`

Some **curated options** of codegen help output:

```bash
#   -o, --output <file name>             saves the generated script to a file
#   -b, --browser <browserType>          browser to use, one of cr, chromium, ff, firefox, wk, webkit (default: "chromium")
#   --channel <channel>                  Chromium distribution channel, "chrome", "chrome-beta", "msedge-dev", etc
#   --color-scheme <scheme>              emulate preferred color scheme, "light" or "dark"
#   --device <deviceName>                emulate device, for example  "iPhone 11"
#   --geolocation <coordinates>          specify geolocation coordinates, for example "37.819722,-122.478611"
#   --load-storage <filename>            load context storage state from the file, previously saved with --save-storage
#   --proxy-server <proxy>               specify proxy server, for example "http://myproxy:3128" or "socks5://myproxy:8080"
#   --proxy-bypass <bypass>              comma-separated domains to bypass proxy, for example ".com,chromium.org,.domain.com"
#   --timezone <time zone>               time zone to emulate, for example "Europe/Rome"
#   --user-agent <ua string>             specify user agent string
#   --viewport-size <size>               specify browser viewport size in pixels, for example "1280, 720"
```

All help text:

```bash
$ npx playwright codegen -h
# Usage: npx playwright codegen [options] [url]
#
# open page and generate code for user actions
#
# Options:
# ### NOTE: ~Sahil: I have removed options that I have selected above in **curated list**
#   --target <language>                  language to generate, one of javascript, playwright-test, python, python-async, python-pytest, csharp, csharp-mstest, csharp-nunit, java (default: "playwright-test")
#   --save-trace <filename>              record a trace for the session and save it to a file
#   --test-id-attribute <attributeName>  use the specified attribute to generate data test ID selectors
#   --block-service-workers              block service workers
#   --ignore-https-errors                ignore https errors
#   --lang <language>                    specify language / locale, for example "en-GB"
#   --save-har <filename>                save HAR file with all network activity at the end
#   --save-har-glob <glob pattern>       filter entries in the HAR by matching url against this glob pattern
#   --save-storage <filename>            save context storage state at the end, for later use with --load-storage
#   --timeout <timeout>                  timeout for Playwright actions in milliseconds, no timeout by default
#   -h, --help                           display help for command
#
# Examples:
#
#   $ codegen
#   $ codegen --target=python
#   $ codegen -b webkit https://example.com
```

## Bad things about playwright

- Why is running playwright test --debug pausing on page.goto: https://github.com/microsoft/playwright/issues/19425
