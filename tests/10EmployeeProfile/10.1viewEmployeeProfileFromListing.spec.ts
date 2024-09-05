import { test } from '@playwright/test';
import { roles } from '../../testdata/rolesForParallel';
import { LoginPage, HomePage, QuickTasksPage, EmployeesPage, DashboardPage } from '../../pages/functions/index';

let context;
let page;
let loginPage;
let homePage;
let quickTasksPage;
let employeesPage;
let dashboardPage;

const rolesToTest = ['SUPERADMIN', 'ADMIN', 'HR', 'FLOOR']

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

        test.afterEach(async ({page}) => {
            await page.close()
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