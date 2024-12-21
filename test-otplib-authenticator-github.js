// https://www.npmjs.com/package/otplib
const { authenticator } = require('otplib');
require('dotenv').config();

const GITHUB_AUTHENTICATOR_SECRET = process.env.GITHUB_AUTHENTICATOR_SECRET;
if (!GITHUB_AUTHENTICATOR_SECRET) {
    console.error('GITHUB_AUTHENTICATOR_SECRET not defined in .env file');
    process.exit(1);
}

// *GitHub*
// Similar example for aws in file - `test-otplib-authenticator-aws.js`

// Steps:
// 1. Go to https://github.com and click on top-right profile icon and select "Settings"
// 2. In the left-side menu click on "Password and authentication"
// 3. Under "Two-factor authentication" > Two-factor methods > Authenticator app", click on "Edit" button.
// 4. Now click on "setup key" link to get the `secret` and use that below:
const secret = GITHUB_AUTHENTICATOR_SECRET;
// 5. And put one generated token there to activate the secret key in there
console.log(authenticator.generate(secret));


// ! On generating the secret key by above method my tokens from from mobile app
// (which was registered a year back probabaly) "Google Authenticator" stopped working.
// This happened because github only allow to have one "Authenticator app" entry. :(
// *Solution*: From mobile app ("Google Authenticator") I deleted existing authenticator entry of
// *           `sahilrajpt03` & I again created a secret key then:
// *            1. saved the secret in my .env of this project as `GITHUB_AUTHENTICATOR_SECRET`
// *            2. scanned the qr code in mobile app ("Google Authenticator")
// *  So this way now both tokens generated above and authenticator app tokens work together.