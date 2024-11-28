import { test} from '@playwright/test';
const { LoginPage, DashboardPage} = require('../../pages/functions/index.js');
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

test('Home - Search Active Client', async() => {
    await dashboardPage.search(testData.search.client.active);
    await dashboardPage.checkValidSearchResult();
    await dashboardPage.viewSearchResult();
    await dashboardPage.verifyClient();
})

test('Home - Search End of Contract Client', async() => {
    await dashboardPage.search(testData.search.client.endOfContract);
    await dashboardPage.checkValidSearchResult();
    await dashboardPage.viewSearchResult();
    await dashboardPage.verifyClient();
})

test('Home - Search Active Employee', async() => {
    await dashboardPage.search(testData.search.employee.active);
    await dashboardPage.checkValidSearchResult();
    await dashboardPage.viewSearchResult();
    await dashboardPage.verifyTalent();
})

test('Home - Search Resigned Employee', async() => {
    await dashboardPage.search(testData.search.employee.resigned);
    await dashboardPage.checkSearchResultOfResignedEmployee();
})