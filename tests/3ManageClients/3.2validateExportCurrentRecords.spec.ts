import { test } from '@playwright/test';
import { LoginPage, ManageClientsPage } from '../../pages/functions/index.js';
import { roles } from '../../testdata/rolesForParallel';
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let manageClientsPage;
let file;

const rolesToTest = ['SUPERADMIN','ADMIN','FLOOR']

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

rolesToTest.forEach(role => {
    const {username, password} = roles[role];

    test.describe.parallel('Client List - Validate Export Current Records', () => {

        test.beforeEach(async () => {
            context = await browser.newContext();
            page = await context.newPage();
            loginPage = new LoginPage(page);
            manageClientsPage = new ManageClientsPage(page);
        });

        test.afterEach(async () => {
            await context.close();
        });

        test(`Client List - Validate Export Current Records Download as ${role}`, async() => {
            await loginPage.login(username,password);
            await manageClientsPage.navigateClientListing();
            await manageClientsPage.downloadExportCurrentRecords(page);
        })
    })
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})