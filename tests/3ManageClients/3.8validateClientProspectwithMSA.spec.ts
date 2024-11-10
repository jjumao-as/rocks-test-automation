import { test } from '@playwright/test';
const { LoginPage, ClientPortalPage, DashboardPage, SettingsPage, ManageClientsPage } = require('../../pages/functions/index.js');
import { readJsonFile } from '../../utils/jsonReader';

let browser;
let context;
let page;
let loginPage;
let clientPortalPage;
let manageClientsPage;
let dashboardPage;
let settingsPage
let name;
let testDataPath;
let testData;

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
    testDataPath = 'createClient'
});

test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = await new LoginPage(page);
    clientPortalPage = await new ClientPortalPage(page);
    manageClientsPage = await new ManageClientsPage(page)
    dashboardPage = await new DashboardPage(page)
    settingsPage = await new SettingsPage(page) 
    testData = await readJsonFile(testDataPath);
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});


test('Add Prospect Client with MSA', async() => {
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.clickAddClient();
    //Validate the fields are displayed Company Name, IsHighGrowth, Country, State/Region, Address, TimeZone, Company Status, Start Date, End of Contract Date, City, Zip Code
    await manageClientsPage.validateAddNewClientFields();
    //Add Company Name
    await manageClientsPage.AddClientName(testData.prospect.name);
    //Set Status
    await manageClientsPage.setStatus(testData.prospect.status);
    //Set Country
    await manageClientsPage.setCountry(testData.prospect.country);
    //Set Region
    await manageClientsPage.setRegion(testData.prospect.region);
    //Add contact (do not enable login)
    await manageClientsPage.NavigateContactTab();
    await manageClientsPage.AddContact();
    //Create
    await manageClientsPage.addClientDefaultContact(testData.prospect, testData.prospect.email); 
    //Search Created
    await manageClientsPage.searchExistingClient(testData.prospect.name);
    await manageClientsPage.viewClient(testData.prospect.name);
    //Enable Contact
    await manageClientsPage.navigateToContacts();
    await manageClientsPage.enableLogin(testData.prospect.email)
    //Add Unsigned MSA
    await manageClientsPage.navigateToMSA();
    await manageClientsPage.generateUnsignedMSA();
    await manageClientsPage.validateUnsignedMSA();
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.validateProspectClient(testData.prospect);
});

test('Delete Client Prospect with MSA', async() => {
    await manageClientsPage.navigateClientListing();
    await manageClientsPage.searchExistingClient(testData.prospect.name);
    await manageClientsPage.removeClientIfExisting(testData.prospect.name);
})
