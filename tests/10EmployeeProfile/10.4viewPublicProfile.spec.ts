import { test } from '@playwright/test';
import { LoginPage, HomePage, QuickTasksPage, EmployeesPage, DashboardPage } from '../../pages/functions/index';
import { roles } from '../../testdata/rolesForParallel.ts';
import { readJsonFile } from '../../utils/jsonReader.js'
const ActionDriver = require('../../utils/ActionDriver.js');

let context;
let page;
let newPage;
let actionDriver;
let loginPage;
let homePage;
let quickTasksPage;
let employeesPage;
let dashboardPage;
let testData;
let testDataPath;


const roleToTest = ['SUPERADMIN', 'ADMIN', 'HR', 'FLOOR']

roleToTest.forEach(role => {

    const {username, password} = roles[role]

    test.describe.parallel('Client Interview Management', () => {

        test.beforeEach(async ({browser}) =>{
            context = await browser.newContext()
            page = await context.newPage()

            testDataPath = 'clientInterview'
            testData = await readJsonFile(testDataPath)
        
            loginPage = new LoginPage(page);
            homePage = new HomePage(page);
            quickTasksPage = new QuickTasksPage(page)
            employeesPage = new EmployeesPage(page)
            dashboardPage = new DashboardPage(page)
            actionDriver = new ActionDriver(page)
    
        })

      
        test(`${role} views Employee public profile`, async() => {

            await loginPage.login(username, password)
            await homePage.isInHomePage()

            // Search Employee
            await dashboardPage.search(testData[role].employee);
            await dashboardPage.checkValidSearchResult();
            await dashboardPage.viewSearchResult();
            await dashboardPage.verifyTalent();

            // Click on the Public Profile link, and it opens to new tab
            newPage = await actionDriver.openNewTab(context, async () => {
                await employeesPage.viewPublicProfile()
            });

            // verify if successfully opens new tab and is in new page
            await employeesPage.isInPublicProfile(newPage)
        })

      


        test.afterEach(async ({}) => {
            await context.close()
            await page.close()
        });
        
   
    })
      


})

