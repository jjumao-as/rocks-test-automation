import { test } from '@playwright/test';
import { HomePage, LoginPage, QuickTasksPage, SettingsPage } from '../../pages/functions/index.js';
import { roles } from '../../testdata/rolesForParallel.js';
const { readJsonFile } = require('../../utils/jsonReader');
const { refresh_access_token } = require('../../utils/googleDriver');

let browser;
let context;
let page;
let loginPage;
let quickTaskPage;
let settingsPage;
let homePage;
let testDataPath;
let testData;

const rolesToTest = ['SUPERADMIN','ADMIN','FLOOR','HR','FINANCE','EMPLOYEE','WRITER']

rolesToTest.forEach(role => {
    const {username, password} = roles[role];

    test.describe.parallel('Submit Expense Report', () => {
       
        test.beforeAll(async ({ browser : b}) =>{
            browser = b;
            testDataPath = 'quickTasks';
        })

        test.beforeEach(async () => {
            context = await browser.newContext();
            page = await context.newPage();
            loginPage = new LoginPage(page);
            quickTaskPage = new QuickTasksPage(page);
            settingsPage = new SettingsPage(page);
            homePage = new HomePage(page);
            testData = await readJsonFile(testDataPath);
            await loginPage.login(username,password);
        });

        test.afterEach(async () => {
            await context.close();
        });

        if(role === "SUPERADMIN") {
            test('Preparing data using SUPERADMIN role', async() => {
                await settingsPage.navigateToExpenseReportSettings();
                await settingsPage.addRecipient(process.env.GOOGLE_EMAIL);
            });
        }

        test(`Create expense report using ${role} role.`, async() => {
            await quickTaskPage.navigateToCreateExpenseReport();
            await quickTaskPage.setExpenseType(testData.expenseReport[role].type);
            await quickTaskPage.setDate();
            await quickTaskPage.setAmount(testData.expenseReport[role].amount);
            await quickTaskPage.setJustification(testData.expenseReport[role].justification);
            await quickTaskPage.uploadReceipt(testData.expenseReport[role].receipt);
            await quickTaskPage.saveExpenseReport();
        });

        if(role === "WRITER") {
            test('Reverting data using SUPERADMIN role', async() => {
                await homePage.logout();
                await loginPage.login(process.env.SUPERADMIN,process.env.PASSWORD);
                await settingsPage.navigateToExpenseReportSettings();
                await settingsPage.removeRecipient(process.env.GOOGLE_EMAIL);
            });

            test(`Validate emails for approval`, async() => {
                await refresh_access_token();
                await settingsPage.validateEmail(testData.expenseReport.email);
            });

            test('Validate expense reports log', async() => {
                await loginPage.login(process.env.SUPERADMIN,process.env.PASSWORD);
                await settingsPage.validateExpenseReports();
            })
        }
    })
})