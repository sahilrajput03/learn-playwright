// https://www.npmjs.com/package/otplib
const { authenticator } = require('otplib');

// Login to AWS then do below steps:
// 1. Click on top-rigth menu in AWS and click on "Security Credentials"
// 2. Click on assign MFA device
// 3. Click on "Authenticator app"

// I got this secret from aws in the process of adding authenticator app
const secret = '<secret_from_aws_while_adding_authenticator_app>';

// 4. Generate two tokens by running this file twice and enter those when asked
console.log(authenticator.generate(secret));