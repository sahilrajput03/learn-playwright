import { test, expect, chromium } from '@playwright/test';
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

// Gives a random number from `0` to `n-1`
function getRandomValue(n) {
	return Math.floor(Math.random() * n);
}

const TWITTER_EMAIL_OR_USERNAME: string | undefined = process.env.TWITTER_EMAIL_OR_USERNAME;
const TWITTER_PASSWORD: string | undefined = process.env.TWITTER_PASSWORD;

if (!TWITTER_EMAIL_OR_USERNAME || !TWITTER_PASSWORD) {
	console.error('Please defined these env values in .env file:', 'TWITTER_EMAIL_OR_USERNAME, TWITTER_PASSWORD')
	process.exit(1)
}

const thoughts = 'https://raw.githubusercontent.com/sahilrajput03/sahilrajput03/master/thoughts-principles.md'
test('Test One', async ({ page }) => {
	// await page.pause()

	const res = await axios.get(thoughts)
	const thoughtList = res.data.split(`\n`).filter(t => !!t);
	const randomThought = thoughtList[getRandomValue(thoughtList.length)];
	// console.log('randomThough?', randomThought)

	// Login to twitter.com
	await page.goto('https://twitter.com/')
	await page.getByTestId('loginButton').click();
	await page.locator('label div').nth(3).click();
	await page.getByLabel('Phone, email, or username').fill(TWITTER_EMAIL_OR_USERNAME);
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel('Password', { exact: true }).fill(TWITTER_PASSWORD);
	await page.getByTestId('LoginForm_Login_Button').click();

	// Make tweet
	await page.getByTestId('tweetTextarea_0').fill(randomThought);
	await page.getByTestId('tweetButtonInline').click();
})