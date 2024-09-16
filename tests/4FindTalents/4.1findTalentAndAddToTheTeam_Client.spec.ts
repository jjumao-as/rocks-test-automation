import { test } from '@playwright/test';
const { LoginPage, HomePage, DashboardPage, SettingsPage, ClientsPage, EmployeesPage, FindTalentPage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');
const { savedContact } = require('../../utils/randomData.js');
const { refresh_access_token } = require('../../utils/googleDriver');


let browser;
let context;
let page;
let loginPage;
let dashboardPage;
let settingsPage;
let clientPage;
let employeePage;
let findTalentPage;
let homePage;
let testDataPath;
let testData;


test.describe('Test Script for adding talent to the team', async () => {
    test.beforeAll(async ({ browser: b }) => {
        browser = b;  
        testDataPath = 'settings';  
    });
    
    test.beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
        testData = await readJsonFile(testDataPath);
        loginPage = await new LoginPage(page);
        dashboardPage = await new DashboardPage(page);
        settingsPage = await new SettingsPage(page);
        clientPage = await new ClientsPage(page);
        homePage = await new HomePage(page);
        employeePage = await new EmployeesPage(page);
        findTalentPage = await new FindTalentPage(page);
    });

    test.afterEach(async () => {
        await context.close();
    });

    test('Preparing data...', async() => {
        await refresh_access_token();
        await savedContact(testDataPath);
    })

    test('Edit Workflows', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await dashboardPage.navigateProcessWorkFlow();
        await settingsPage.editWorkFlow(testData.clientEnabledAccess);
        await settingsPage.saveEmailTo(process.env.GOOGLE_EMAIL);
        await dashboardPage.navigateProcessWorkFlow();
        await settingsPage.editWorkFlow(testData.addToTeamClients);
        await settingsPage.saveEmailTo(process.env.GOOGLE_EMAIL);
        await dashboardPage.navigateProcessWorkFlow();
        await settingsPage.editWorkFlow(testData.addToTeamSales);
        await settingsPage.saveEmailTo(process.env.GOOGLE_EMAIL);

    });

    test('Create Contacts for EmployeeDB', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await dashboardPage.search(testData.client);
        await dashboardPage.checkValidSearchResult();
        await dashboardPage.viewSearchResult();
        await dashboardPage.verifyClient();
        await clientPage.navigateToContacts();
        await clientPage.addContact(testData.contacts, process.env.GOOGLE_EMAIL);
        await clientPage.verifyContactAdded();
    });

    test('Add Skill', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await settingsPage.navigateToSkills();
        await settingsPage.addNewSkill(testData.originalSkill);
        await settingsPage.validateAddedSkill();
    });

    test('Add Employee', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await employeePage.navigateToEmployeeList();
        await employeePage.addEmployee(testData.employeeName);
        await employeePage.validateAddedEmployee(testData.employeeName);
        await employeePage.updatePosition(testData.employeeDetails.role);
        await employeePage.validatePostion(testData.employeeDetails);
        await employeePage.updateSkills();
        await employeePage.validateSkill();
        await employeePage.updateClient(testData.employeeDetails.client);
        await employeePage.validateClient(testData.employeeDetails.client);
    });

    test('Navigate on email link sent for enable login', async () => {
        await clientPage.validateEmail(testData.welcomeEmail, testData.emailFrom);
        await clientPage.submitPassword(testData.clientPassword);
        await clientPage.validateLogin();
    });

    test('Find Talent - Add to the team and submit', async () => {
        await loginPage.login(testData.contacts.email, testData.clientPassword);
        await homePage.navigateFindTalent();
        await findTalentPage.searchTalent(testData.skill)
        await findTalentPage.selectTalent();
        await findTalentPage.validateProfileName();
        await findTalentPage.addToTeam();
        await findTalentPage.showTalentDrawer();
        await findTalentPage.validateAddedToTeam();
        await findTalentPage.finishRequest();
        await findTalentPage.validateFinishingRequest();
    });

    test('Validate Employee added to Team Request - Client', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await dashboardPage.search(testData.client);
        await dashboardPage.checkValidSearchResult();
        await dashboardPage.viewSearchResult();
        await dashboardPage.verifyClient();
        await clientPage.navigateTeamRequest();
        await clientPage.searchUser(testData.employeeName.firstName);
        await clientPage.validateUser(testData.employeeName);
    });

    test('Validate Employee added to Team Request - Listing', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await clientPage.navigateTeamRequestSideTab();
        await clientPage.searchTalent(testData.employeeName.firstName);
        await clientPage.validateUserFromTeamRequest(testData.employeeName);
    });

    test('Validate Employee Client', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await dashboardPage.search(testData.employeeName.lastName + ', ' + testData.employeeName.firstName);
        await dashboardPage.checkValidSearchResult();
        await dashboardPage.viewSearchResult();
        await dashboardPage.verifyTalent();
        await employeePage.validateClientRemoved(testData.employeeDetails.client);
    });

    test('Validate Client and Sales Email - Add to team', async() => {
        await clientPage.validateEmail(testData.salesEmailAddToTeam, testData.emailFrom);
        await clientPage.validateEmail(testData.clientEmailAddToTeam, testData.emailFrom);
    });

    test('Delete Employee', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await clientPage.navigateTeamRequestSideTab();
        await clientPage.searchTeamRequestTalent(testData.employeeName.firstName);
        await clientPage.deleteRequest(testData.employeeName);
        await employeePage.navigateToEmployeeList();
        await employeePage.searchEmployee(testData.employeeName);
        await employeePage.deleteEmployee(testData.employeeName);
    });

    test('Delete Skill', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await settingsPage.navigateToSkills();
        await settingsPage.deleteSkill(testData.skill);
    });

    test('Delete Contacts', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await dashboardPage.search(testData.client);
        await dashboardPage.checkValidSearchResult();
        await dashboardPage.viewSearchResult();
        await dashboardPage.verifyClient();
        await clientPage.navigateToContacts();
        await clientPage.deleteContact(testData.contacts.email);
    });

    test('Remove changes in workflow', async() => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await dashboardPage.navigateProcessWorkFlow();
        await settingsPage.editWorkFlow(testData.clientEnabledAccess);
        await settingsPage.revertEmailTo(process.env.GOOGLE_EMAIL);
        await dashboardPage.navigateProcessWorkFlow();
        await settingsPage.editWorkFlow(testData.addToTeamClients);
        await settingsPage.revertEmailTo(process.env.GOOGLE_EMAIL);
        await dashboardPage.navigateProcessWorkFlow();
        await settingsPage.editWorkFlow(testData.addToTeamSales);
        await settingsPage.revertEmailTo(process.env.GOOGLE_EMAIL);
        await dashboardPage.navigateProcessWorkFlow();
    })
});
