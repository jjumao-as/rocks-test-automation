import { test } from '@playwright/test';
import { LoginPage, ManageClientsPage } from '../../pages/functions/index.js';
import { roles } from '../../testdata/rolesForParallel';
//import { savedContact } from '../../utils/randomData.js';
const path = require('path');
const { readJsonFile } = require('../../utils/jsonReader');

let browser;
let context;
let page;
let loginPage;
let manageClientsPage;
let testDataPath;
let testData;
let file;

test.beforeAll(async ({ browser: b }) => {
    browser = b;
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    manageClientsPage = new ManageClientsPage(page);
    testDataPath = 'ClientData';
    testData = await readJsonFile(testDataPath);
    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test.afterAll(async () => {
    console.log();
    console.log('Execution ended.. ', file);
})

test(`Client List - Addclient`, async () => {
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.clickAddClient();
    await manageClientsPage.AddClientName(testData.newClient.general.companyName);
    await manageClientsPage.SelectCountry(testData.newClient.general.country);
    await manageClientsPage.SelectStates(testData.newClient.general.state);
    await manageClientsPage.SelectCity(testData.newClient.general.city);
    await manageClientsPage.ClickstartDateField();
    await manageClientsPage.SelectCurrentDateforStartdate();
    await manageClientsPage.ClickendDateField();
    await manageClientsPage.SelectNextMonthDateforEnddate();
    await manageClientsPage.NavigateContactTab();
    await manageClientsPage.AddContact();
    await manageClientsPage.name(testData.newClient.contacts.name);
    await manageClientsPage.email(testData.newClient.contacts.email);
    await manageClientsPage.ClickCreateClientButton();
    await manageClientsPage.ClickCreatedClient();
    await manageClientsPage.ClickEditClient();
    await manageClientsPage.VerifyCompanyName(testData.newClient.general.companyName);
    await manageClientsPage.NavigateContactTab();
    await manageClientsPage.VerifyContactname(testData.newClient.contacts.name);
    await manageClientsPage.VerifyContactemail(testData.newClient.contacts.email);
    await manageClientsPage.Clickclose();
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.removeClientIfExisting(testData.newClient.general.companyName);
})
