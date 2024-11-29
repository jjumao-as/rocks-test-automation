import { test } from '@playwright/test';
const { LoginPage, QuickTasksPage, DashboardPage, HomePage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let quickTasksPage;
let testDataPath;
let testData;
let homePage;
let dashboardPage;
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
    dashboardPage = await new DashboardPage(page);
    homePage = await new HomePage(page);
    testDataPath = 'adminData';
    testData = await readJsonFile(testDataPath);
});

test.afterEach(async () => {
    await context.close();
});

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})

test('Create Daily Report - Send', async() => {
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
    await dashboardPage.search(testData.project);
    await dashboardPage.checkValidSearchResult();
    await dashboardPage.viewSearchResult();
    await dashboardPage.deleteFloorManager();
    await homePage.logout();
    await loginPage.login(process.env.SALES, process.env.PASSWORD);
    await quickTasksPage.navigateCreateDailyReport();
    await quickTasksPage.clickComposeMessage();
    await quickTasksPage.selectProject(testData.project);
    await quickTasksPage.setWhatIdid(testData.update);
    await quickTasksPage.setWhatWillBeDoing(testData.update);
    await quickTasksPage.sendReport();
    await quickTasksPage.validateEmail();
})
