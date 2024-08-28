import { test } from '@playwright/test';
const { LoginPage, DashboardPage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');

let browser;
let context;
let page;
let loginPage;
let dashboardPage;

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = await new LoginPage(page);
    dashboardPage = await new DashboardPage(page);
    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test('Home - Super Admin', async() => {
    await dashboardPage.checkSuperAdminTabsVisibility();
    await dashboardPage.checkClientDashboardSectionVisibility();
    await dashboardPage.navigateEmployeeDashboard();
    await dashboardPage.checkEmployeeDashboardSectionVisibility();
    await dashboardPage.checkSuperAdminSidePanelVisibility();
})