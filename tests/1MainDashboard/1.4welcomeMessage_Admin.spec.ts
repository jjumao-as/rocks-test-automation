import { test } from '@playwright/test';
const { LoginPage, DashboardPage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');

let browser;
let context;
let page;
let loginPage;
let dashboardPage;
let testDataPath;
let testData;

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = await new LoginPage(page);
    dashboardPage = await new DashboardPage(page);
    testDataPath = 'adminData';
    testData = await readJsonFile(testDataPath);
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test('Home - Validate Welcome Message', async() => {
    await dashboardPage.checkWelcomeMessage();
})
