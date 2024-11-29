import { test } from '@playwright/test';
const { LoginPage, DashboardPage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let dashboardPage;
let testDataPath;
let testData;
let file;

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
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

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})

test('Home - Validate Profile options', async() => {
    await dashboardPage.clickAvatar();
    await dashboardPage.validateProfileOptions(testData.profileOptions);
})