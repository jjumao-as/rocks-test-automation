import { test } from '@playwright/test';
const { LoginPage, HomePage, ClientsPage } = require('../../pages/functions/index');
const { readJsonFile } = require('../../utils/jsonReader');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let homePage;
let testDataPath;
let testData;
let clientPage;
let file;

test.beforeAll(async ({browser : b}) => {
    browser = b;
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    testDataPath='createClient'
    loginPage = await new LoginPage(page);
    homePage = await new HomePage(page);
    clientPage = await new ClientsPage(page);
    testData = await readJsonFile(testDataPath);
});

test.afterEach(async () => {
    await context.close();
});

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})

/** Commenting the hoverPerformanceReview, hoverReports, and hoverNeedHelp for possible future reuse */
test('Validate Tooltip as Client with MSA', async() => {
    await loginPage.login(testData.msa.email , process.env.PASSWORD);
    await clientPage.hoverMyProfile();
    await clientPage.hoverMyContacts();
    await clientPage.hoverFindTalent();
    await clientPage.hoverDocumentsAgreements();
    await clientPage.hoverManageTeam();
    /**
     * await clientPage.hoverPerformanceReview();
     * await clientPage.hoverReports();
     * await clientPage.hoverNeedHelp();
     */
    
});

test('Validate Tooltip as Client without MSA', async() => {
    await loginPage.login(testData.nomsa.email , process.env.PASSWORD);
    await clientPage.hoverMyProfile();
    await clientPage.hoverMyContacts();
    await clientPage.hoverFindTalent();
    await clientPage.hoverDocumentsAgreements();
    await clientPage.hoverManageTeam();
    /**
     * await clientPage.hoverPerformanceReview();
     * await clientPage.hoverReports();
     * await clientPage.hoverNeedHelp();
     */
    
})




