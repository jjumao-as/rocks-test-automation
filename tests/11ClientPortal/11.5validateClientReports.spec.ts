import { test } from '@playwright/test';
const { LoginPage, HomePage, ClientsPage } = require('../../pages/functions/index');
const { readJsonFile } = require('../../utils/jsonReader');

let browser;
let context;
let page;
let loginPage;
let homePage;
let testDataPath;
let testData;
let clientPage;
let testDataPathClient;
let testDataClient;

const rolesToTest = ["msa", "nomsa"];
test.describe.parallel(`Validate Client Portal Pages for active client`, () => {

    test.beforeAll(async ({ browser: b }) => {
        browser = b;
    })
    test.beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
        testDataPath = 'ClientData'
        testDataPathClient = 'createClient'
        loginPage = await new LoginPage(page);
        homePage = await new HomePage(page);
        clientPage = await new ClientsPage(page);
        testData = await readJsonFile(testDataPath);
        testDataClient = await readJsonFile(testDataPathClient);
        await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
    });

    test.afterEach(async () => {
        await context.close();
    });

    test('Validate Daily Status Report', async() => {
        await clientPage.navigateToPage(testData.activeClientPages[6]);
        //Verify Report display in latest date
        await clientPage.validateSortedDate();
    });

    test('Validate Daily Time Clock Reports', async() => {
        await clientPage.navigateToPage(testData.activeClientPages[7]);
        //Validate Talent Latest Time Clock is displayed on top
        //Validate time in and out is displayed
        await clientPage.validateLatestReport();
    });

    test('Validate Weekly Time Clock Reports', async() => {
        await clientPage.navigateToPage(testData.activeClientPages[8]);
        //Validate user can expand weekly time clock report
        //Recent weekly report is displayed
        //Validate Employee Names are displayed
        await clientPage.validateTimeClockReport();
    });

    test('Validate Time Clock Summary Reports', async() => {
        await clientPage.navigateToPage(testData.activeClientPages[9]);
        //Validate user can export current records
        await clientPage.validateTimeClockSummaryReport(testData.exportType);
    });

});


