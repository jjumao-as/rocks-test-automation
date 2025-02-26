import { test } from '@playwright/test';
import { LoginPage, MyProfileIntPage } from '../../pages/functions/index.js';
import { roles } from '../../testdata/rolesForParallel';
const { readJsonFile } = require('../../utils/jsonReader');
const path = require('path');

let browser;
let context;
let page;
let myProfileIntPage;
let loginPage;
let testDataPath;
let testData;
let file;

const rolesToTest = ['SUPERADMIN', 'ADMIN', 'FLOOR', 'SALES', 'HR', 'FINANCE', 'EMPLOYEE_DEV', 'WRITER']

test.beforeAll(async ({ browser: b }) => {
    browser = b;
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

rolesToTest.forEach(role => {
    const { username, password } = roles[role];

    test.describe.parallel('Checking the Employee Profile Access Control for all internal roles', () => {

        test.beforeEach(async () => {
            context = await browser.newContext();
            page = await context.newPage();
            loginPage = new LoginPage(page);
            myProfileIntPage = new MyProfileIntPage(page);
            testDataPath = 'myProfileInt';
            testData = await readJsonFile(testDataPath);
        });

        test.afterEach(async () => {
            await context.close();
        });

        test(`Check all available tabs for each ${role}`, async () => {
            await loginPage.login(username, password);
            // Navigating to Employee Profile
            await myProfileIntPage.navigateEmployeeProfile();

            if (role === "SUPERADMIN" || role === "ADMIN" || role === "HR") {
                // Checking available elements on header
                await myProfileIntPage.checkAvailableHeader(testData.allHeaderElements);
                // Checking available tabs below header
                await myProfileIntPage.checkAvailableTabs(testData.allSideTabs);
                // Checking visible and enabled icon(s) on header SuperAdmin, Admin, HR
                await myProfileIntPage.checkClientsIcon();
                await myProfileIntPage.checkClientInterviewsIcon();
                await myProfileIntPage.checkSkillsAndProficienciesIcon();
                if (role === "HR") {
                    // Additional checking for hidden elements and links on Clients Tab
                    await myProfileIntPage.checkClientsTabEditIconsHidden();
                    await myProfileIntPage.checkClientsNameLinksHidden();
                };
            };
            if (role === "FLOOR") {
                // Checking available elements on header
                await myProfileIntPage.checkAvailableHeader(testData.allHeaderElements);
                // Checking available tabs below header
                await myProfileIntPage.checkAvailableTabs(testData.floorManagerTabs);
                // Checking visible and enabled icon(s) on header
                await myProfileIntPage.checkClientsIcon();
                await myProfileIntPage.checkClientInterviewsIcon();
                await myProfileIntPage.checkSkillsAndProficienciesIcon();
            };
            if (role === "SALES") {
                // Checking available elements on header
                await myProfileIntPage.checkAvailableHeader(testData.roleWithHiddenElements);
                // Checking available tabs below header
                await myProfileIntPage.checkAvailableTabs(testData.salesTabs);
                /** Client Interviews icon hidden in SALES role. Code is commented for possible future changes */
                // await myProfileIntPage.checkClientInterviewsIcon();
                // Checking hidden elements
                await myProfileIntPage.checkClientsIconHidden();
                await myProfileIntPage.checkSkillsAndProficienciesIconHidden();
                await myProfileIntPage.checkTalentProfileIconsHidden();
                await myProfileIntPage.checkSpotLightSelectIconHidden();
                await myProfileIntPage.checkFilesAndAssetsSectionHidden();
            };
            if (role === "FINANCE") {
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
            };
            if (role === "WRITER") {
                // Checking visible and enabled icon(s) on header
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
            };
            if (role === "EMPLOYEE") {
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
            };
        });
    });
});

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})