import { test } from '@playwright/test';
const { LoginPage, MyProfileIntPage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');

let browser;
let context;
let page;
let myProfileIntPage;
let loginPage;
let testDataPath;
let testData;

test.beforeAll(async ({ browser: b }) => {
    browser = b;
});
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    myProfileIntPage = new MyProfileIntPage(page);
    testDataPath = 'myProfileInt';
    testData = await readJsonFile(testDataPath);
});
test.afterEach(async () => {
    await page.close();
});
test('Check all available tabs for Super Admin > My Profile', async () => {
    // Go to Rocks website and login as Super Admin
    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
    // Navigating to Employee Profile
    await myProfileIntPage.navigateEmployeeProfile();
    // Checking available elements on header
    await myProfileIntPage.checkAvailableHeader(testData.allHeaderElements);
    // Checking available tabs below header
    await myProfileIntPage.checkAvailableTabs(testData.allSideTabs);
    // Checking visible and enabled icon(s) on header
    await myProfileIntPage.checkClientsIcon();
    await myProfileIntPage.checkClientInterviewsIcon();
    await myProfileIntPage.checkSkillsAndProficienciesIcon();
});
test('Check all available tabs for Admin > My Profile', async () => {
    // Go to Rocks website and login as Super Admin
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
    // Navigating to Employee Profile
    await myProfileIntPage.navigateEmployeeProfile();
    // Checking available elements on header
    await myProfileIntPage.checkAvailableHeader(testData.allHeaderElements);
    // Checking available tabs below header
    await myProfileIntPage.checkAvailableTabs(testData.allSideTabs);
    // Checking visible and enabled icon(s) on header
    await myProfileIntPage.checkClientsIcon();
    await myProfileIntPage.checkClientInterviewsIcon();
    await myProfileIntPage.checkSkillsAndProficienciesIcon();
});
test('Check all available tabs for Floor Manager > My Profile', async () => {
    // Go to Rocks website and login as Super Admin
    await loginPage.login(process.env.FLOOR, process.env.PASSWORD);
    // Navigating to Employee Profile
    await myProfileIntPage.navigateEmployeeProfile();
    // Checking available elements on header
    await myProfileIntPage.checkAvailableHeader(testData.allHeaderElements);
    // Checking available tabs below header
    await myProfileIntPage.checkAvailableTabs(testData.floorManagerTabs);
    // Checking visible and enabled icon(s) on header
    await myProfileIntPage.checkClientsIcon();
    await myProfileIntPage.checkClientInterviewsIcon();
    await myProfileIntPage.checkSkillsAndProficienciesIcon();
});
test('Check all available tabs for Sales > My Profile', async () => {
    // Go to Rocks website and login as Super Admin
    await loginPage.login(process.env.SALES, process.env.PASSWORD);
    // Navigating to Employee Profile
    await myProfileIntPage.navigateEmployeeProfile();
    // Checking available elements on header
    await myProfileIntPage.checkAvailableHeader(testData.allHeaderElements);
    // Checking available tabs below header
    await myProfileIntPage.checkAvailableTabs(testData.allSideTabs);
    // Checking visible and enabled icon(s) on header
    await myProfileIntPage.checkClientInterviewsIcon();
    // Checking hidden elements
    await myProfileIntPage.checkClientsIconHidden();
    await myProfileIntPage.checkSkillsAndProficienciesIconHidden();
    await myProfileIntPage.checkTalentProfileIconsHidden();
    await myProfileIntPage.checkSpotLightSelectIconHidden();
    await myProfileIntPage.checkFilesAndAssetsSectionHidden();
});
test('Check all available tabs for HR > My Profile', async () => {
    // Go to Rocks website and login as Super Admin
    await loginPage.login(process.env.HR, process.env.PASSWORD);
    // Navigating to Employee Profile
    await myProfileIntPage.navigateEmployeeProfile();
    // Checking available elements on header
    await myProfileIntPage.checkAvailableHeader(testData.allHeaderElements);
    // Checking available tabs below header
    await myProfileIntPage.checkAvailableTabs(testData.allSideTabs);
    // Checking visible and enabled icon(s) on header
    await myProfileIntPage.checkClientsIcon();
    await myProfileIntPage.checkClientInterviewsIcon();
    await myProfileIntPage.checkSkillsAndProficienciesIcon();
    // Checking hidden elements and links on Clients Tab
    await myProfileIntPage.checkClientsTabEditIconsHidden();
    await myProfileIntPage.checkClientsNameLinksHidden();
});
test('Check all available tabs for Finance > My Profile', async () => {
    // Go to Rocks website and login as Super Admin
    await loginPage.login(process.env.FINANCE, process.env.PASSWORD);
    // Navigating to Employee Profile
    await myProfileIntPage.navigateEmployeeProfile();
    // Checking available elements on header
    await myProfileIntPage.checkAvailableHeader(testData.roleWithHiddenElements);
    // Checking available tabs below header
    await myProfileIntPage.checkAvailableTabs(testData.financeTabs);
    // Checking visible and enabled icon(s) on header
    await myProfileIntPage.checkClientsIcon();
    await myProfileIntPage.checkSkillsAndProficienciesIcon();
    // Checking hidden elements and links on Clients Tab
    await myProfileIntPage.checkClientsTabEditIconsHidden();
    await myProfileIntPage.checkClientsNameLinksHidden();
});
test('Check all available tabs for Content Writer > My Profile', async () => {
    // Go to Rocks website and login as Super Admin
    await loginPage.login(process.env.FINANCE, process.env.PASSWORD);
    // Navigating to Employee Profile
    await myProfileIntPage.navigateEmployeeProfile();
    // Checking available elements on header
    await myProfileIntPage.checkAvailableHeader(testData.roleWithHiddenElements);
    // Checking available tabs below header
    await myProfileIntPage.checkAvailableTabs(testData.contentWriterTabs);
    // Checking visible and enabled icon(s) on header
    await myProfileIntPage.checkClientsIcon();
    await myProfileIntPage.checkSkillsAndProficienciesIcon();
    // Checking hidden elements and links on Clients Tab
    await myProfileIntPage.checkFilesAndAssetsSectionHidden();
    await myProfileIntPage.checkClientsTabEditIconsHidden();
    await myProfileIntPage.checkClientsNameLinksHidden();
});
test('Check all available tabs for Employee > My Profile', async () => {
    // Go to Rocks website and login as Super Admin
    await loginPage.login(process.env.EMPLOYEE, process.env.PASSWORD);
    // Navigating to Employee Profile
    await myProfileIntPage.navigateEmployeeProfile();
    // Checking available elements on header
    await myProfileIntPage.checkAvailableHeader(testData.roleWithHiddenElements);
    // Checking available tabs below header
    await myProfileIntPage.checkAvailableTabs(testData.employeeTabs);
    // Checking hidden elements and links
    await myProfileIntPage.checkClientsIconHidden();
    await myProfileIntPage.checkSkillsAndProficienciesIconHidden();
    await myProfileIntPage.checkTalentProfileIconsHidden();
    await myProfileIntPage.checkSpotLightSelectIconHidden();
    await myProfileIntPage.checkFilesAndAssetsSectionHidden();
    await myProfileIntPage.checkClientsTabEditIconsHidden();
    await myProfileIntPage.checkClientsNameLinksHidden();
});