import { test } from '@playwright/test';
import { LoginPage, DashboardPage } from '../../pages/functions/index.js';
import { roles } from '../../testdata/rolesForParallel.js';
const { readJsonFile } = require('../../utils/jsonReader');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let dashboardPage;
let testDataPath;
let testData;
let file;

const rolesToTest = ['SUPERADMIN','ADMIN','FLOOR','HR','FINANCE','EMPLOYEE_DEV','WRITER']

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
    testDataPath = 'sideTab';
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})

rolesToTest.forEach(role => {
    const {username, password} = roles[role];

    test.describe.parallel('Main Dashboard Access Validation', () => {
    

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