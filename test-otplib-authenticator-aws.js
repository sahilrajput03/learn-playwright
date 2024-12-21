// https://www.npmjs.com/package/otplib
const { authenticator } = require('otplib');
require('dotenv').config();

const AWS_AUTHENTICATOR_SECRET = process.env.AWS_AUTHENTICATOR_SECRET;
if (!AWS_AUTHENTICATOR_SECRET) {
    console.error('AWS_AUTHENTICATOR_SECRET not defined in .env file');
    process.exit(1);
}

// *AWS*
// Similar example for github in file - `test-otplib-authenticator-github.js`

// Steps:
// 0. Login to aws
// 1. Click on top-rigth menu in AWS and click on "Security Credentials"
// 2. Click on assign MFA device
// 3. Click on "Authenticator app"

// I got this secret from aws in the process of adding authenticator app
const secret = AWS_AUTHENTICATOR_SECRET;
// 4. Generate two tokens by running this file twice and enter those when asked
console.log(authenticator.generate(secret));
