import { test } from '@playwright/test';
const { LoginPage, DashboardPage, SettingsPage, HomePage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');

let browser;
let context;
let page;
let loginPage;
let dashboardPage;
let settingsPage;
let homePage;
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
    homePage = await new HomePage(page);
    settingsPage = await new SettingsPage(page);
    testDataPath = 'salesData';
    testData = await readJsonFile(testDataPath);
    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test.skip('Home - Sales', async() => {
    await dashboardPage.navigateToUsers();
    await settingsPage.searchUser(process.env.SALES);
    await settingsPage.clickAssignRole();
    await settingsPage.setRole(testData.role);
    await homePage.logout();
    await loginPage.login(process.env.SALES, process.env.PASSWORD);
    await dashboardPage.checkSalesTabsVisibility();
    await dashboardPage.checkSalesDashboardSectionVisibility();
    await dashboardPage.checkSalesSidePanelVisibility();
    await homePage.logout();
    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
    await dashboardPage.navigateToUsers();
    await settingsPage.searchUser(process.env.SALES);
    await settingsPage.clickAssignRole();
    await settingsPage.setRole(testData.revertRole);
})