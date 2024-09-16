import { test } from '@playwright/test';
const { LoginPage, QuickTasksPage, DashboardPage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');

let browser;
let context;
let page;
let loginPage;
let quickTasksPage;
let testDataPath;
let testData;
let dashboardPage;

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = await new LoginPage(page);
    quickTasksPage = await new QuickTasksPage(page);
    dashboardPage = await new DashboardPage(page);
    testDataPath = 'adminData';
    testData = await readJsonFile(testDataPath);
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test('Create Daily Report - Send', async() => {
    await dashboardPage.search(testData.project);
    await dashboardPage.checkValidSearchResult();
    await dashboardPage.viewSearchResult();
    await dashboardPage.deleteFloorManager();
    await quickTasksPage.navigateCreateDailyReport();
    await quickTasksPage.clickComposeMessage();
    await quickTasksPage.selectProject(testData.project);
    await quickTasksPage.setWhatIdid(testData.update);
    await quickTasksPage.setWhatWillBeDoing(testData.update);
    await quickTasksPage.sendReport();
    await quickTasksPage.validateEmail();
})
