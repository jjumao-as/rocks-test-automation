import { test } from '@playwright/test';
import { roles } from '../../testdata/rolesForParallel';
import { LoginPage, HomePage, QuickTasksPage, EmployeesPage, DashboardPage } from '../../pages/functions/index';
const path = require('path');

let context;
let page;
let loginPage;
let homePage;
let quickTasksPage;
let employeesPage;
let dashboardPage;
let file;

const rolesToTest = ['SUPERADMIN', 'ADMIN', 'HR', 'FLOOR']

test.beforeAll(async () =>{
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

rolesToTest.forEach(role => {
    const {username, password} = roles[role];

    test.describe.parallel('View employee profile from Employee Listing', () => {

        test.beforeEach(async ({browser}) =>{
            context = await browser.newContext()
            page = await context.newPage()
        
            loginPage = new LoginPage(page);
            homePage = new HomePage(page);
            quickTasksPage = new QuickTasksPage(page)
            employeesPage = new EmployeesPage(page)
            dashboardPage = new DashboardPage(page)
        })

        test.afterEach(async () => {
            await context.close()
        });     

        test(`${role} views Employee Profile from Employee Listing`, async() => {
            await loginPage.login(username, password)
            await homePage.isInHomePage()
        
            await homePage.navigateToEmployeeList()
        
            await employeesPage.isInEmployeeList()
            await employeesPage.selectEmployee()
            await employeesPage.isInEmployeeProfile()
        });
    }) 
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})  