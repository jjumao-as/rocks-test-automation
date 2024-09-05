import { test } from '@playwright/test';
const { LoginPage, ManageClientsPage } = require('../../pages/functions/index.js');

let browser;
let context;
let page;
let loginPage;
let manageClientsPage;

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = await new LoginPage(page);
    manageClientsPage = await new ManageClientsPage(page);
    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test('Client List - Validate Export Current Records Download', async() => {
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.downloadExportCurrentRecords(page);
})