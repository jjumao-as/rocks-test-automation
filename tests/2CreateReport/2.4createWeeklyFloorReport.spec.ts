import { test } from '@playwright/test';
import { HomePage, LoginPage, QuickTasksPage, SettingsPage } from '../../pages/functions/index.js';
import { roles } from '../../testdata/rolesForParallel.js';
const { readJsonFile } = require('../../utils/jsonReader');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let quickTaskPage;
let settingsPage;
let homePage;
let testDataPath;
let testData;
let file;

const rolesToTest = ['ADMIN', 'FLOOR']

test.beforeAll(async ({ browser: b }) => {
    browser = b;
    testDataPath = 'floorReport';
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

rolesToTest.forEach(role => {
    const { username, password } = roles[role];

    test.describe('Submit Weekly Floor Report', () => {


        test.beforeEach(async () => {
            context = await browser.newContext();
            page = await context.newPage();
            loginPage = new LoginPage(page);
            quickTaskPage = new QuickTasksPage(page);
            settingsPage = new SettingsPage(page);
            homePage = new HomePage(page);
            testData = await readJsonFile(testDataPath);
            await loginPage.login(username, password);
        });

        test(`Create floor report using ${role} role - Green`, async () => {
            await quickTaskPage.navigateWeeklyFloorReport();
            await quickTaskPage.selectClient();
            await quickTaskPage.saveGreenFloorReport(testData.green, role);
        });

        test(`Create floor report using ${role} role - Orange`, async () => {
            await quickTaskPage.navigateWeeklyFloorReport();
            await quickTaskPage.selectClient();
            await quickTaskPage.saveOrangeFloorReport(testData.orange, role);
        });

        test(`Create floor report using ${role} role - Red`, async () => {
            await quickTaskPage.navigateWeeklyFloorReport();
            await quickTaskPage.selectClient();
            await quickTaskPage.saveRedFloorReport(testData.red, role);
        });

        test(`Validate Created Floor Report by ${role}`, async () => {
            if (role !== 'SUPERADMIN') {
                await homePage.logout();
                await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
            }
            //navigate floor report settings
            await settingsPage.navigateWeeklyFloorReport();
            //search name
            await settingsPage.searchUser(testData.users[role].name);
            //validate row if equal to project and reportedname
            await settingsPage.validateReport(testData.users[role], "green");
            //Check if contains flag 1 for red
            await settingsPage.validateReport(testData.users[role], "orange");
            //Check if contains flag 2 for orange
            await settingsPage.validateReport(testData.users[role], "red");
            //Check if contains flag 3 for green
        });

        test.afterEach(async () => {
            await context.close();
        })
    });
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})