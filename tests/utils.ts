import path from 'path';

export const githubStorageStateFile = path.join(__dirname, './storage-state/.auth/github-user.json');
// console.log("🚀 ~ githubStorageStateFile:", githubStorageStateFile)
// OUTPUT: "/Users/apple/Documents/learn-playwright/tests/storage-state/.auth/user.json"

export const awsStorageStateFile = path.join(__dirname, './storage-state/.auth/aws-user.json');
// console.log("🚀 ~ awsStorageStateFile:", awsStorageStateFile)
// OUTPUT: "/Users/apple/Documents/learn-playwright/tests/storage-state/.auth/aws-user.json"

export const awsLoginUrl = 'https://ap-south-1.console.aws.amazon.com'
export const githubLoginUrl = 'https://github.com/login'