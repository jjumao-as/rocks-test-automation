import { test } from '@playwright/test';
const { LoginPage, DashboardPage, ManageClientsPage, EmployeesPage, QuickTasksPage, SettingsPage, HomePage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');
const { savedContact } = require('../../utils/randomData.js');

let page;
let context;
let loginPage;
let dashboardPage;
let manageClientPage;
let employeePage;
let quickTaskPage;
let settingsPage
let homePage
let testDataPath;
let testData;

test.describe('Floor Manager performance review', async () => {
    test.beforeAll(async () => {
        testDataPath = 'performanceReview';  
    });
    
    test.beforeEach(async ({browser}) => {
        context = await browser.newContext();
        page = await context.newPage();

        testData = await readJsonFile(testDataPath);
        loginPage = await new LoginPage(page);
        dashboardPage = await new DashboardPage(page);
        manageClientPage = await new ManageClientsPage(page);
        employeePage = await new EmployeesPage(page);
        quickTaskPage = await new QuickTasksPage(page)
        settingsPage = await new SettingsPage(page)
        homePage = await new HomePage(page)

    });

  
    test('Floor Manager Submits Performance Evaluation for employee', async () => {

        /** Superadmin checks if test manager "Ronna Nahid" is added as Team Manager */
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD)
        const newManager = testData.managerPerformanceReview.newManager
        await settingsPage.navigateToEmployeeManagement()
        const isManager = await settingsPage.checkIfIsManager(newManager)
        await homePage.logout();


        /** Logs in as manager "Ronna Nahid" */
        await loginPage.login(process.env.SPROJECT, process.env.PASSWORD)

        /** Loops through rocksEmployee dev and qa testData
         * Employee name is passed via emp, and
         * Employee role for role
        */
        for(const[role, emp] of Object.entries(testData.managerPerformanceReview.rocksEmployee)){
                 /** Search Employee */
                await dashboardPage.search(emp);
                await dashboardPage.checkValidSearchResult();
                await dashboardPage.viewSearchResult();
                await dashboardPage.verifyTalent();
                
                /** update employee manager to "Ronna Nahid" */ 
                await employeePage.updateEmployeeManager(newManager)

                /** Submit Performance Evalaution to employee */
                await quickTaskPage.navigateManagerPerfEval()
                await quickTaskPage.checkManagerPerfEvalElementsVisibility()
                await quickTaskPage.searchEmployeeToReview(emp)
                await quickTaskPage.addPerformanceReview(emp, role, testData.managerPerformanceReview)
                
        
        } 
            
    })

    test.afterEach(async () => {
        await context.close()
        await page.close()


    });

});