const { chromium } = require('playwright');

// If you run this file via `nodemon --inspect simple-script.js` you can use your own vscode debugger to debug this script. This is really awesome.

(async () => {
    const browser = await chromium.launch({ headless: false }); // Set to true if you don't want a visible browser
    const page = await browser.newPage();

    await page.goto('https://example.com'); // Replace with your target URL
    await page.goto('https://sahilrajput.com'); // Replace with your target URL
    await page.goto('https://twitter.com'); // Replace with your target URL
    await page.goto('https://youtube.com'); // Replace with your target URL
    await browser.close();
})();