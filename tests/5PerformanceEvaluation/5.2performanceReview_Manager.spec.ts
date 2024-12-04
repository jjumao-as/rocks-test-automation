import { test } from '@playwright/test';
const { LoginPage, DashboardPage, ManageClientsPage, EmployeesPage, QuickTasksPage, SettingsPage, HomePage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');

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
let newManager

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

        newManager = testData.managerPerformanceReview.newManager


    });



    test('Check if "Ronna Nahid" is set as manager', async () => {

        /** Superadmin checks if test manager "Ronna Nahid" is added as Team Manager  */
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD)
        await settingsPage.navigateToEmployeeManagement()
        await settingsPage.checkIfIsManager(newManager)
        await homePage.logout();
        
    })

  
    test('Floor Manager Submits Performance Evaluation to employee', async () => {

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

            // Call in separate testBlock when getting returned object of addPerformanceObjectives function
            await quickTaskPage.addPerformanceObjectives(emp, role, testData.managerPerformanceReview)
               
            // Call in separate testBlock when getting returned object of addPerformanceCompetencies function
            await quickTaskPage.addPerformanceCompetencies(emp, testData.managerPerformanceReview)
                
            // Call in separate testBlock when getting returned object of addPerformanceSummary function
            await quickTaskPage.addPerformanceSummary(emp, testData.managerPerformanceReview)
            
            await quickTaskPage.isManagerReviewSubmitted()

            /** Verify if employee review is added in the Performance Reviews table */
            await employeePage.navigateToPerformanceReviews()
            await employeePage.isInPerformanceReview()
            await employeePage.isEmployeeAddedInPerformanceReview(emp, testData.managerPerformanceReview)
            await employeePage.clearEmployeeSearch()

        } 
            
    })

    
    test('Check if email is received by Employee and Manager', async () => {
        await quickTaskPage.validateZohoEmail(testData.managerPerformanceReview.subject.performanceReviewManager, testData.managerPerformanceReview.emailFrom)
 
    })


    test.afterEach(async () => {
        await context.close()
        await page.close()
    });

});