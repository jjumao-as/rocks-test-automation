import { test } from '@playwright/test';
const { LoginPage, ClientPortalPage, DashboardPage, SettingsPage, ClientsPage } = require('../../pages/functions/index.js');
import { readJsonFile } from '../../utils/jsonReader';

let browser;
let context;
let page;
let loginPage;
let clientPortalPage;
let clientPage;
let dashboardPage;
let settingsPage
let name;
let testDataPath;
let testData;

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
    testDataPath = 'settings'
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = await new LoginPage(page);
    clientPortalPage = await new ClientPortalPage(page);
    clientPage = await new ClientsPage(page)
    dashboardPage = await new DashboardPage(page)
    settingsPage = await new SettingsPage(page) 
    testData = await readJsonFile(testDataPath);

});

test.afterEach(async () => {
    await context.close();
});


test('Edit Workflow', async() => {
    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD)
    await dashboardPage.navigateProcessWorkFlow()
    await settingsPage.editWorkFlow(testData.dropRequestClient)
    await settingsPage.saveEmailTo(process.env.ZOHO_EMAIL)
    await dashboardPage.navigateProcessWorkFlow()
    await settingsPage.editWorkFlow(testData.dropRequestSales)
    await settingsPage.saveEmailTo(process.env.ZOHO_EMAIL)
    await dashboardPage.navigateProcessWorkFlow()
    await settingsPage.editWorkFlow(testData.cancelDropRequestSales)
    await settingsPage.saveEmailTo(process.env.ZOHO_EMAIL)
    
})


test('Client Portal - Manage Team', async() => {    
    await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
    await clientPortalPage.checkManageTeamMenuVisibility();
    await clientPortalPage.navigateManageTeam();
    await clientPortalPage.checkMyTeamTableVisibility();
    name = await clientPortalPage.dropTalentName();
    await clientPortalPage.dropFromMyTeam();   
    await clientPortalPage.dropTalentNameConfirmed(name);
    
});

test('Admin: Client Profile - Team Requests', async() => {    
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
    await clientPortalPage.dropTalentNameConfirmedAdmin();
    await clientPortalPage.dropTalentStatusCheck();
});

test('Revert Drop', async() => {
    await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
    await clientPortalPage.checkManageTeamMenuVisibility();
    await clientPortalPage.navigateManageTeam();
    await clientPortalPage.checkMyTeamTableVisibility();
    await clientPortalPage.cancelDropTalentNameConfirmed(name);
})


test('Confirm Revert Drop in Admin', async() => {
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
    await clientPortalPage.dropTalentNameConfirmedAdmin();
    await clientPortalPage.cancelDropTalentStatusCheck()

   
})


test('Validate Email for Drop and Cancel Drop', async() => {
    await clientPage.validateZohoEmail(testData.subject.dropRequestClient, testData.emailFrom)
    await clientPage.validateZohoEmail(testData.subject.dropRequestSales, testData.emailFrom)
    await clientPage.validateZohoEmail(testData.subject.cancelDropRequestSales, testData.emailFrom)

})

