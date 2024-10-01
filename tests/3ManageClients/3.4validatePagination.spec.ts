import { test } from '@playwright/test';
import { LoginPage, ManageClientsPage } from '../../pages/functions/index.js';
import { roles } from '../../testdata/rolesForParallel';

let browser;
let context;
let page;
let loginPage;
let manageClientsPage;

const rolesToTest = ['SUPERADMIN','ADMIN','FLOOR']

rolesToTest.forEach(role => {
    const {username, password} = roles[role];

    test.describe.parallel('Client List - Validate Pagination', () => {
       
        test.beforeAll(async ({ browser : b}) =>{
            browser = b;
        })

        test.beforeEach(async () => {
            context = await browser.newContext();
            page = await context.newPage();
            loginPage = new LoginPage(page);
            manageClientsPage = new ManageClientsPage(page);
        });

        test.afterEach(async () => {
            await context.close();
        });

        test(`Client List - Validate Pagination as ${role}`, async() => {
            await loginPage.login(username,password);
            await manageClientsPage.navigateClientListing();
            await manageClientsPage.validateNextPage();
            await manageClientsPage.validatePreviousPage();
            await manageClientsPage.validateLastPage();
            await manageClientsPage.validateFirstPage();
        })
    })
})