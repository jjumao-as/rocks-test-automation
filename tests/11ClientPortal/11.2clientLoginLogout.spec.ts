import { test } from '@playwright/test';
const { LoginPage, HomePage, FindTalentPage, ManageClientsPage, ClientsPage, EmployeesPage, DashboardPage, SettingsPage } = require('../../pages/functions/index');
const { readJsonFile, updateJsonData } = require('../../utils/jsonReader');
const { firstAndLastName } = require('../../utils/randomData');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let homePage;
let findTalentPage;
let manageClientsPage;
let employeePage;
let testDataPath;
let testData;
let msaEmpName;
let noMsaEmpName;
let dashboardPage;
let settingsPage;
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
    manageClientsPage = new ManageClientsPage(page);
    findTalentPage = await new FindTalentPage(page);
    employeePage = await new EmployeesPage(page);
    dashboardPage = await new DashboardPage(page);
    settingsPage = await new SettingsPage(page);
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

test('Create Client with MSA', async() => {
    msaEmpName = await firstAndLastName();
    noMsaEmpName = await firstAndLastName();
    updateJsonData('createClient', 'msa>employee', msaEmpName);
    updateJsonData('createClient', 'nomsa>employee', noMsaEmpName);

    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.checkClientExists(testData.msa, testData.employeeDetails, testData.emailDetails, testData.msa.email, process.env.PASSWORD);
});

test('Create Client without MSA', async() => {
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.checkClientExists(testData.nomsa, testData.employeeDetails, testData.emailDetails, testData.nomsa.email, process.env.PASSWORD);
});

test('Login as Client with MSA', async() => {
    await loginPage.login(testData.msa.email , process.env.PASSWORD);
    await clientPage.validateClientPage();
    await clientPage.logout();
});

test.fixme('Login as Client without MSA', async() => {
    await loginPage.login(testData.nomsa.email , process.env.CLIENTPASSWORD);
    await clientPage.validateClientPage();
    await clientPage.logout();
})




