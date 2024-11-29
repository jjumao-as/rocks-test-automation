import { test } from '@playwright/test';
import { LoginPage, ManageClientsPage } from '../../pages/functions/index.js';
import { roles } from '../../testdata/rolesForParallel';
const { readJsonFile } = require('../../utils/jsonReader');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let manageClientsPage;
let testDataPath;
let testData;
let file;

const rolesToTest = ['SUPERADMIN','ADMIN','FLOOR']

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

rolesToTest.forEach(role => {
    const {username, password} = roles[role];

    test.describe.parallel('Client List - Validate Sorting of Records', () => {

        test.beforeEach(async () => {
            context = await browser.newContext();
            page = await context.newPage();
            loginPage = new LoginPage(page);
            manageClientsPage = new ManageClientsPage(page);
            testDataPath = 'ClientData';
            testData = await readJsonFile(testDataPath);
        });

        test.afterEach(async () => {
            await context.close();
        });

        test(`Client List - Validate Sorting as ${role}`, async() => {
            await loginPage.login(username,password);
            await manageClientsPage.navigateClientListing();
            await manageClientsPage.validateSortableColumns(testData.manageClient.columns);
            await manageClientsPage.sortAndValidate(testData.manageClient.columns.sort, testData.manageClient.asc);
            await manageClientsPage.sortAndValidate(testData.manageClient.columns.sort, testData.manageClient.desc);
        })
    })
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})