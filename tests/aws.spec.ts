import { test, expect } from '@playwright/test';
import 'dotenv/config'
import { awsLoginUrl } from './utils';

// ❤️ Usage on "sahilrajput03/Learn Playwright @ YT: https://www.youtube.com/playlist?list=PLBfwD_NnDB3q5MaTqVNLpcVOFTbyjxQRN

// & Command to test this file alone:
//  npx playwright test --project=chromium ./tests/aws.spec.ts --debug
//  alias for above command: ptd ./tests/aws.spec.ts

const { chromium } = require('playwright');

// ********************************  ********************************
// * Using a single browser session to perform all tests --- We do this by sharing the context of
// *        a browser i.e, `context` below instead of destructuring `page` from the test callback.
let browser;
let context
// let page

test.beforeAll(async () => {
    // Launch the browser before running tests
    browser = await chromium.launch({ headless: false }); // Set headless to true/false as needed

    // Sahil: We use same browser so we share context between different tests
    context = await browser.newContext(); // Create a new browser context

    // & Sahil: Use below statement to perform all tests on the same page instead of opening a new page each time.
    // page = await context.newPage(); // open a new tab
});

test.afterAll(async () => {
    // Close the browser after all tests
    await browser.close();
});
// ********************************  ********************************

// * Enable disable slowMo mode for this file
test.use({
    launchOptions: {
        // headless: false,
        // slowMo: 3000, // (TESTED WORKS)
    },
});

const openS3service = async (page) => {
    await page.getByTestId('awsc-concierge-input').click();
    await page.getByTestId('awsc-concierge-input').fill('s3');
    await page.getByTestId('services-search-result-link-s3').click();
}

const BUCKET_NAME = 'sahilrajput03-bucket123'

test.beforeEach(async () => {
    const page = await context.newPage(); // open a new tab

    // Verify aws login
    await page.goto(awsLoginUrl);
    // Assert "Console Home" on screen
    await expect(page.getByTestId('unifiedConsoleHeader').getByText('Console Home')).toBeVisible();
    // await page.pause()
})

test.describe.skip('s3 bucket', () => {
    // This test is expected to be run alone using `test.only(..)`
    test('create s3 bucket in aws', async () => {
        const page = await context.newPage(); // open a new tab

        // await loginToAws(page) // moved to `tests/auth/auth-aws.setup.ts`
        await page.goto(awsLoginUrl);
        await openS3service(page)

        await page.getByTestId('s3-lamb-container__button__create').click();
        await page.getByPlaceholder('myawsbucket').click();
        await page.getByPlaceholder('myawsbucket').fill('bucket1');
        await page.getByPlaceholder('myawsbucket').fill(BUCKET_NAME);
        await page.getByText('Block all public access', { exact: true }).click();
        await page.getByText('I acknowledge that the').click();
        await page.getByTestId('buttonCreate').click();
        // NOTE: If you're getting error here that probabaly means the bucket is already created and you're getting error a bucket with same name alrady exists in aws page.
        await expect(page.getByRole('link', { name: BUCKET_NAME })).toBeVisible();
        // Assertion that bucket is listed on the page
        await expect(page.getByRole('link', { name: BUCKET_NAME })).toBeVisible();

        // await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
    });


    // This test is expected to be run alone using `test.only(..)`
    test('delete aws bucket', async () => {
        const page = await context.newPage(); // open a new tab

        // await loginToAws(page) // moved to `tests/auth/auth-aws.setup.ts`
        await page.goto(awsLoginUrl);
        await openS3service(page)

        // Assertion that bucket is listed on the page
        await expect(page.getByRole('link', { name: BUCKET_NAME })).toBeVisible();

        await page.getByRole('radio', { name: 'Table Selection Select sahilrajput03-bucket123' }).check();
        await page.getByRole('button', { name: 'Delete' }).click();
        await page.getByPlaceholder(BUCKET_NAME).click();
        await page.getByPlaceholder(BUCKET_NAME).fill(BUCKET_NAME);
        await page.getByRole('button', { name: 'Delete bucket', exact: true }).click();

        // await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
    });
})

const AWS_ACCOUNT_ID = "234149371321"
const AWS_REGION = "ap-south-1"
const AWS_REPO_NAME = "sahilrajput-ecr-repo"
const AWS_CLUSTER_NAME = "cosmos-cluster"

const taskDefinitionName = 'dev-backend-app-task'
const AWS_IMAGE_NAME_WITH_TAG = `${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${AWS_REPO_NAME}:latest`
// '234149371321.dkr.ecr.ap-south-1.amazonaws.com/sahilrajput-ecr-repo:latest'

const createTaskDefinition = async ({ page }) => {
    await page.getByTestId('awsc-concierge-input').click();
    await page.getByTestId('awsc-concierge-input').fill('ecs');
    await page.getByTestId('services-search-result-link-ecs').click();
    await page.getByRole('link', { name: 'Task definitions' }).click();
    await page.getByRole('button', { name: 'Create new task definition' }).click();
    await page.getByTestId('create-new').getByRole('menuitem', { name: 'Create new task definition' }).click();
    await page.getByPlaceholder('Task definition family name').click();
    await page.getByPlaceholder('Task definition family name').fill(taskDefinitionName);

    await page.getByRole('button', { name: 'OS, Architecture, Network mode Operating system/Architecture Linux/X86_64' }).click();
    await page.getByText('Linux/ARM64').first().click();
    await page.getByRole('button', { name: 'Task size CPU CPU 1 vCPU' }).click();
    await page.getByText('.5 vCPU', { exact: true }).click();
    await page.getByRole('button', { name: 'Task size Memory Memory 3 GB' }).click();
    await page.getByText('1 GB', { exact: true }).click();
    await page.getByPlaceholder('wordpress').click();
    await page.getByPlaceholder('wordpress').fill('container1');
    await page.getByPlaceholder('repository-uri/image:tag').click();
    await page.getByPlaceholder('repository-uri/image:tag').fill(AWS_IMAGE_NAME_WITH_TAG);
    await page.getByPlaceholder('80').click();
    await page.getByPlaceholder('80').press('ControlOrMeta+a');
    await page.getByPlaceholder('80').fill('3000');
    await page.getByRole('button', { name: 'HealthCheck - optional' }).click();
    await page.getByPlaceholder('CMD-SHELL, curl -f http://').click();
    await page.getByPlaceholder('CMD-SHELL, curl -f http://').fill('CMD-SHELL, curl -f http://localhost:3000/health || exit 1');
    await page.getByRole('button', { name: 'Create', exact: true }).click();
    // Assert sucess message
    await expect(page.getByTestId('TaskDefDetail').getByText('Task definition successfully')).toBeVisible();
}

const deleteTaskDefinition = async ({ page }) => {
    await page.getByTestId('awsc-concierge-input').click();
    await page.getByTestId('awsc-concierge-input').fill('ecs');
    await page.getByTestId('services-search-result-link-ecs').click();
    await page.getByRole('link', { name: 'Task definitions' }).click();
    await page.getByRole('link', { name: 'dev-backend-app-task' }).click();

    // Delete all task definitions
    await page.getByLabel('Tasks selection 0 task').first().click();

    await page.getByRole('button', { name: 'Actions' }).click();
    await page.getByRole('menuitem', { name: 'Deregister' }).click();
    await page.getByRole('button', { name: 'Deregister' }).click();

    // await page.pause() // & for debugging only

    // Assert for deregister
    await expect(
        page
            .getByTestId('TaskDefFamilyDetail')
            .getByText(/dev-backend-app-task.+been successfully deregistered\./)
    ).toBeVisible();
}

const createService = async ({ page }) => {
    await page.getByTestId('awsc-concierge-input').click();
    await page.getByTestId('awsc-concierge-input').fill('ecs');
    await page.getByTestId('services-search-result-link-ecs').click();
    await page.getByRole('link', { name: 'cosmos-cluster' }).click();
    await page.getByRole('row', { name: 'No services No services to' }).getByTestId('createServiceButton').click();

    // await page.getByLabel('Capacity provider strategy').check(); // no need because this is selected by default

    await page.getByLabel('Use custom (Advanced)').check();
    await page.getByLabel('Family', { exact: true }).click();
    await page.getByText('dev-backend-app-task').first().click();
    await page.getByLabel('Service name').click();
    await page.getByLabel('Service name').fill('my-api-service');
    await page.getByLabel('Desired tasks').click();
    await page.getByLabel('Desired tasks').press('ControlOrMeta+a');
    await page.getByLabel('Desired tasks').fill('2');
    await page.getByRole('button', { name: 'Load balancing - optional' }).click();
    await page.getByRole('button', { name: 'Load balancer type None' }).click();
    await page.getByText('Application Load Balancer', { exact: true }).click();
    await page.getByLabel('Load balancer name').click();
    await page.getByLabel('Load balancer name').fill('my-lb');
    await page.getByRole('button', { name: 'Service auto scaling -' }).click();
    await page.getByText('Use service auto scaling').click();
    await page.getByLabel('Minimum number of tasks').click();
    await page.getByLabel('Minimum number of tasks').fill('2');
    await page.getByLabel('Maximum number of tasks').click();
    await page.getByLabel('Maximum number of tasks').fill('4');
    await page.getByPlaceholder('Policy name').click();
    await page.getByPlaceholder('Policy name').fill('my-autoscaling-policy-1');

    await page.getByLabel('ECS service metric').click();
    await page.getByText('ECSServiceAverageCPUUtilization').first().click();

    await page.getByPlaceholder('70').click();
    await page.getByPlaceholder('70').fill('70');
    await page.getByRole('button', { name: 'Create', exact: true }).click();

    // click refresh button every 5 seconds
    const timer = setInterval(() => {
        page.getByLabel('Refresh services').click();
    }, 5_000)

    // Creating service can take upto 5 mins of time so we have set timeout accordingly.
    // Sahil: In my experience it takes around 3 mins of time.
    const timeout = 300_000 // Timeout in milliseconds (5 minutes = 300,000 ms)
    await expect(page.getByRole('link', { name: 'my-api-service' })).toBeVisible({ timeout });
    clearInterval(timer)
}

const deleteService = async ({ page }) => {
    await page.getByTestId('awsc-concierge-input').click();
    await page.getByTestId('awsc-concierge-input').fill('ecs');
    await page.getByTestId('services-search-result-link-ecs').click();
    await page.getByRole('link', { name: 'cosmos-cluster' }).click();

    await page.getByRole('link', { name: 'my-api-service' }).click();
    await page.getByRole('button', { name: 'Delete service' }).click();
    await page.getByText('Force delete', { exact: true }).click();
    await page.getByPlaceholder('delete').click();
    await page.getByPlaceholder('delete').fill('delete');
    await page.getByRole('button', { name: 'Delete', exact: true }).click();
    const timeout = 300_000 // Timeout in milliseconds (5 minutes = 300,000 ms)
    await expect(page.getByTestId('ClusterDetail').getByText('Successfully deleted my-api-')).toBeVisible({ timeout });
}

// & You can:
// & 1. create ECR repo with your aws bash script: `express-app-1/scripts/aws/repo-create.sh`
test.describe.skip('ecs', () => {
    test.describe('create task definition and service', async () => {
        // This test is expected to be run alone using `test.only(..)`
        test('create a task definition in ecs in aws', async () => {
            const page = await context.newPage(); // open a new tab
            await page.goto(awsLoginUrl);

            await createTaskDefinition({ page })

            // await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
        });

        test('create a service in ecs in aws', async () => {
            const page = await context.newPage(); // open a new tab
            await page.goto(awsLoginUrl);

            await createService({ page })

            // await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
        });
    })

    test.describe.only('delete task definition and service', async () => {
        test('delete a task definition in ecs in aws', async () => {
            const page = await context.newPage(); // open a new tab
            await page.goto(awsLoginUrl);

            await deleteTaskDefinition({ page })

            // await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
        });

        test('delete a service in ecs in aws', async () => {
            const page = await context.newPage(); // open a new tab
            await page.goto(awsLoginUrl);

            await deleteService({ page })

            // await page.pause(); // always keep it here so i can see the final results in browser otherwise browser is closed as soon as test is complete.
        });
    })
})
