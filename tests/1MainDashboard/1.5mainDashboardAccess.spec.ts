import { test } from '@playwright/test';
import { LoginPage, DashboardPage } from '../../pages/functions/index.js';
import { roles } from '../../testdata/rolesForParallel.js';
const { readJsonFile } = require('../../utils/jsonReader');

let browser;
let context;
let page;
let loginPage;
let dashboardPage;
let testDataPath;
let testData;

const rolesToTest = ['SUPERADMIN','ADMIN','FLOOR','HR','FINANCE','EMPLOYEE','WRITER']

rolesToTest.forEach(role => {
    const {username, password} = roles[role];

    test.describe.parallel('Main Dashboard Access Validation', () => {
       
        test.beforeAll(async ({ browser : b}) =>{
            browser = b;
            testDataPath = 'sideTab';
        })

        test.beforeEach(async () => {
            context = await browser.newContext();
            page = await context.newPage();
            loginPage = new LoginPage(page);
            dashboardPage = new DashboardPage(page);
            testData = await readJsonFile(testDataPath);
        });

        test.afterEach(async () => {
            await context.close();
        });

        test(`Validate ${role} access`, async() => {
            await loginPage.login(username,password);
            await dashboardPage.validateSideTabs(testData[role]);
        })
    })
})