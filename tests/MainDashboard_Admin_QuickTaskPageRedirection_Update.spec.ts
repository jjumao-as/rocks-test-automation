import { test, expect, chromium } from '@playwright/test';
const { LoginPage, AdminDashboardPage, QuickTasksPage, ManageClientsPage, FindTalentPage } = require('../pages/functions/index.js');
const { readJsonFile } = require('../utils/jsonReader');

let browser;
let context;
let page;
let loginPage;
let adminDashboardPage;
let quickTasksPage;
let manageClientsPage;
let testDataPath;
let testData;
let clientTestData;
let clientTestDataPath;
let findTalentPage;

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = await new LoginPage(page);
    adminDashboardPage = await new AdminDashboardPage(page);
    quickTasksPage = await new QuickTasksPage(page);
    findTalentPage = new FindTalentPage(page);
    manageClientsPage = await new ManageClientsPage(page);
    testDataPath = 'adminData';
    clientTestDataPath = 'myProfile';
    testData = await readJsonFile(testDataPath);
    clientTestData = await readJsonFile(clientTestDataPath);
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test('Home - Admin', async() => {
    await adminDashboardPage.checkTabsVisibility();
    await adminDashboardPage.checkDashboardSectionVisibility();
    await adminDashboardPage.navigateClientDashboard();
    await adminDashboardPage.checkClientDashboardSectionVisibility();
    await adminDashboardPage.navigateEmployeeDashboard();
    await adminDashboardPage.checkEmployeeDashboardSectionVisibility();
})

test('Home - Search Active Client', async() => {
    await adminDashboardPage.search(testData.client.active);
    await adminDashboardPage.viewSearchResult();
    await adminDashboardPage.checkValidSearchResult();
})

test('Home - Search End of Contract Client', async() => {
    await adminDashboardPage.search(testData.client.endOfContract);
    await adminDashboardPage.viewSearchResult();
    await adminDashboardPage.checkValidSearchResult();
})

test('Home - Search Active Employee', async() => {
    await adminDashboardPage.search(testData.employee.active);
    await adminDashboardPage.viewSearchResult();
    await adminDashboardPage.checkValidSearchResult();
})

test('Home - Search Resigned Employee', async() => {
    await adminDashboardPage.search(testData.employee.resigned);
    await adminDashboardPage.checkSearchResultOfResignedEmployee();
})

test('Home - Validate Notification', async() => {
    await adminDashboardPage.clickNotification();
    await adminDashboardPage.viewNotification();
    await adminDashboardPage.checkElementAnnouncementVisibility();
})

test('Home - Validate Profile options', async() => {
    await adminDashboardPage.clickAvatar();
    await adminDashboardPage.validateProfileOptions(testData.profileOptions);
})

test('Announcements & FAQs', async() => {
    await adminDashboardPage.navigateAnnouncementFaqs();
    await adminDashboardPage.checkElementAnnouncementVisibility();
})

test('Find Talent', async()=> {
    await adminDashboardPage.navigateFindTalent();
    await findTalentPage.checkElementsVisibility();
    await findTalentPage.searchTalent(clientTestData.talent.skill)
    await findTalentPage.validateTalentFound();
})


test('Create Daily Report Page', async() => {
    await quickTasksPage.navigateCreateDailyReport();
    await quickTasksPage.checkCreateReportElementsVisibility();
})

test('Create Daily Report - Send', async() => {
    await quickTasksPage.navigateCreateDailyReport();
    await quickTasksPage.clickComposeMessage();
    await quickTasksPage.selectProject(testData.project);
    await quickTasksPage.setWhatIdid(testData.update);
    await quickTasksPage.setWhatWillBeDoing(testData.update);
    await quickTasksPage.sendReport();
    await quickTasksPage.validateEmail();
})

test('Expense Report Page', async() => {
    await quickTasksPage.navigateExpenseReport();
    await quickTasksPage.checkExpenseReportElementsVisibility();
})

test('Weekly Floor Report Page', async() => {
    await quickTasksPage.navigateCreateWeeklyFloorReport();
    await quickTasksPage.checkWeeklyFloorReportElementsVisibility();
})

test('Self Performance Eval Page', async() => {
    await quickTasksPage.navigateSelfPerfEval();
    await quickTasksPage.checkSelfPerfEvalElementsVisibility();
})

test('Manager Performance Review Page', async() => {
    await quickTasksPage.navigateManagerPerfEval();
    await quickTasksPage.checkManagerPerfEvalElementsVisibility();
})

test('Submit Feedback', async() => {
    await quickTasksPage.navigateSubmitFeedback();
    await quickTasksPage.checkSubmitFeedbackElementsVisibility();
})

test('Client Listing', async() => {
    await manageClientsPage.navigateClientListing();
})