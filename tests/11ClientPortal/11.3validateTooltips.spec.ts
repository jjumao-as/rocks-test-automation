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

test.beforeAll(async ({browser : b}) => {
    browser = b;
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

test('Validate Tooltip as Client with MSA', async() => {
    await loginPage.login(testData.msa.email , process.env.CLIENTPASSWORD);
    await clientPage.hoverMyProfile();
    await clientPage.hoverMyContacts();
    await clientPage.hoverFindTalent();
    await clientPage.hoverDocumentsAgreements();
    await clientPage.hoverManageTeam();
    await clientPage.hoverPerformanceReview();
    await clientPage.hoverNeedHelp();
});

test('Login as Client without MSA', async() => {
    await loginPage.login(testData.nomsa.email , process.env.CLIENTPASSWORD);
    await clientPage.hoverMyProfile();
    await clientPage.hoverMyContacts();
    await clientPage.hoverFindTalent();
    await clientPage.hoverDocumentsAgreements();
    await clientPage.hoverManageTeam();
    await clientPage.hoverPerformanceReview();
    await clientPage.hoverNeedHelp();
})




