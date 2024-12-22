import path from 'path';

export const githubStorageStateFile = path.join(__dirname, './storage-state/.auth/github-user.json');
export const awsStorageStateFile = path.join(__dirname, './storage-state/.auth/aws-user.json');

export const awsLoginUrl = 'https://ap-south-1.console.aws.amazon.com'
export const githubLoginUrl = 'https://github.com/login'