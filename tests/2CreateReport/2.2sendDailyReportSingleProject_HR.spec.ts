import { test } from '@playwright/test';
const { LoginPage, QuickTasksPage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let quickTasksPage;
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
    quickTasksPage = await new QuickTasksPage(page);
    testDataPath = 'adminData';
    testData = await readJsonFile(testDataPath);
    await loginPage.login(process.env.SPROJECT, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})

test('Create Daily Report - Single Project', async() => {
    await quickTasksPage.navigateCreateDailyReport();
    await quickTasksPage.clickComposeMessage();
    await quickTasksPage.setWhatIdid(testData.update);
    await quickTasksPage.setWhatWillBeDoing(testData.update);
    await quickTasksPage.sendReport();
    await quickTasksPage.validateEmail();
})
