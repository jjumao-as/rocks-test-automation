import { test } from '@playwright/test';
const { LoginPage, QuickTasksPage } = require('../../pages/functions/index.js');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let quickTasksPage;
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
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})

test('Create Daily Report Page', async() => {
    await quickTasksPage.navigateCreateDailyReport();
    await quickTasksPage.checkCreateReportElementsVisibility();
})