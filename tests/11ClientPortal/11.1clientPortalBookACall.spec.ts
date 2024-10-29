import { test } from '@playwright/test';
const { LoginPage, HomePage, FindTalentPage, SettingsPage, ManageClientsPage, EmployeesPage, DashboardPage } = require('../../pages/functions/index');
const { readJsonFile, updateJsonData } = require('../../utils/jsonReader');
const { firstAndLastName } = require('../../utils/randomData');

let browser;
let context;
let page;
let loginPage;
let homePage;
let testDataPath;
let testData;
let testDataClientPath;
let testDataClient;
let findTalentPage;
let msaEmpName;
let manageClientsPage;
let employeePage;
let dashboardPage;
let settingsPage;

test.beforeAll(async ({ browser: b }) => {
    browser = b;
    msaEmpName = await firstAndLastName();
    updateJsonData('createClient', 'msa>employee', msaEmpName);
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = await new LoginPage(page);
    homePage = await new HomePage(page);
    findTalentPage = await new FindTalentPage(page);
    manageClientsPage = new ManageClientsPage(page);
    employeePage = new EmployeesPage(page);
    settingsPage = new SettingsPage(page);
    dashboardPage = new DashboardPage(page);
    testDataPath = 'rocksTalent';
    testData = await readJsonFile(testDataPath);
    testDataClientPath = 'createClient';
    testDataClient = await readJsonFile(testDataClientPath);
});

test.afterEach(async () => {
    await context.close();
});

test('Edit Workflows', async () => {
    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
    await dashboardPage.navigateProcessWorkFlow();
    await settingsPage.editWorkFlow(testDataClient.emailDetails.clientEnabledAccess);
    await settingsPage.saveEmailTo(process.env.ZOHO_EMAIL);
});

test('Create MSA Client', async () => {
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.checkClientExists(testDataClient.msa, testDataClient.employeeDetails, testDataClient.emailDetails, process.env.ZOHO_EMAIL, process.env.CLIENTPASSWORD);
})

test('Assign Client', async() => {
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
    await dashboardPage.search(testData.search);
    await dashboardPage.checkValidSearchResult();
    await dashboardPage.viewSearchResult();
    await dashboardPage.verifyTalent();
    await employeePage.removeAllClients(testData.client);
})

test('Find Talent - Book a call', async () => {
    await loginPage.login(testDataClient.msa.email, process.env.CLIENTPASSWORD);
    await homePage.navigateFindTalent();
    await findTalentPage.compareList(testData.talents);
    await findTalentPage.clickBookACall();
    await findTalentPage.selectTimeSlot();
    await findTalentPage.verifySchedule();
    await findTalentPage.clickBookSchedule();
    await findTalentPage.clickBookACall();
    await findTalentPage.verifyBooking();
    await findTalentPage.verifyTimeSlot();
});





