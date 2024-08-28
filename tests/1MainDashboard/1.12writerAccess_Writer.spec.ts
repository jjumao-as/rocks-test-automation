import { test } from '@playwright/test';
const { LoginPage, DashboardPage } = require('../../pages/functions/index.js');

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
    await loginPage.login(process.env.WRITER, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test('Home - Employee', async() => {
    await dashboardPage.checkDashboardSectionVisibility();
    await dashboardPage.checkWriterSidePanelVisibility();
})