import { test } from '@playwright/test';
import { read } from 'fs';
const { LoginPage, HomePage, FindTalentPage, ManageClientsPage, EmployeesPage } = require('../../pages/functions/index');
const { readJsonFile, updateJsonData } = require('../../utils/jsonReader');
const { firstAndLastName } = require('../../utils/randomData');

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

test.beforeAll(async ({browser : b}) => {
    browser = b;
    msaEmpName = await firstAndLastName();
    noMsaEmpName = await firstAndLastName();
    updateJsonData('createClient', 'msa>employee', msaEmpName);
    updateJsonData('createClient', 'nomsa>employee', noMsaEmpName);
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
    testData = await readJsonFile(testDataPath);
});

test.afterEach(async () => {
    await context.close();
});

test('Create Client with MSA', async() => {
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.checkClientExists(testData.msa, testData.employeeDetails, process.env.CLIENTMSA);
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.checkClientExists(testData.nomsa, testData.employeeDetails, process.env.CLIENTNOMSA);
});

// test('Create Client with no MSA', async() => {

// });

// test('Login using ', async() => {
//     await loginPage.login(process.env.CLIENTFORBOOKACALL, process.env.PASSWORDBOOKACALL);
// })

// test('Logout using', async() => {
    
// })





