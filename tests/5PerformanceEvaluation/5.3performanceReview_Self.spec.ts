import { test } from '@playwright/test';
import { roles } from '../../testdata/rolesForParallel.ts';
const { LoginPage, DashboardPage, ManageClientsPage, EmployeesPage, QuickTasksPage, SettingsPage, HomePage, ClientsPage } = require('../../pages/functions/index.js');
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
let clientsPage
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
        clientsPage = await new ClientsPage(page)

        newManager = testData.performanceReview.newManager


    });



    test('Check if "Ronna Nahid" is set as manager', async () => {

        /** Superadmin checks if test manager "Ronna Nahid" is added as Team Manager  */
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD)
        await settingsPage.navigateToEmployeeManagement()
        await settingsPage.checkIfIsManager(newManager)
        await homePage.logout();
        
    })

  
    test('Employee Manager is set to Ronna Nahid', async () => {

        /** Logs in as manager "Ronna Nahid" */
        await loginPage.login(process.env.SPROJECT, process.env.PASSWORD)

        /** Loops through rocksEmployee dev and qa testData
         * Employee name is passed via emp, and
         * Employee role for role
        */
        for(const[role, emp] of Object.entries(testData.performanceReview.rocksEmployee)){
                 
            /** Search Employee */
            await dashboardPage.search(emp);
            await dashboardPage.checkValidSearchResult();
            await dashboardPage.viewSearchResult();
            await dashboardPage.verifyTalent();
                
            /** update employee manager to "Ronna Nahid" */ 
            await employeePage.updateEmployeeManager(newManager)
            
            await quickTaskPage.navigateSelfPerfEval()
            await quickTaskPage.checkSelfPerfEvalElementsVisibility()
            await employeePage.clearEmployeeSearch()


          
        } 
            
    })

    test('Employee logs in and submit self evaluation', async () => {

        const rolesToTest = ['EMPLOYEE_DEV', 'EMPLOYEE_QA']
        const rocksEmployee = testData.performanceReview.rocksEmployee

        for(let i=0; i<rolesToTest.length; i++){
            const selectedRole = rolesToTest[i]
            const {username, password} = roles[selectedRole]
            const empRole = Object.keys(rocksEmployee)[i]
            const emp = rocksEmployee[empRole]

            await loginPage.login(username, password)
            await homePage.isInHomePage()

            await quickTaskPage.navigateSelfPerfEval()
            await quickTaskPage.checkSelfPerfEvalElementsVisibility()
            
            await quickTaskPage.goToPerformanceObjectives()

            // Call in separate testBlock when getting returned object of addPerformanceObjectives function
            await quickTaskPage.addPerformanceObjectives(emp, empRole, testData.performanceReview)
            // Call in separate testBlock when getting returned object of addPerformanceCompetencies function
            await quickTaskPage.addPerformanceCompetencies(emp, testData.performanceReview)
            // Call in separate testBlock when getting returned object of addPerformanceSummary function
            await quickTaskPage.addPerformanceSummary(emp, testData.performanceReview)

            await quickTaskPage.isManagerReviewSubmitted()

            await homePage.logout()

            // Admin / Manager logs in and check if employee self evalution is added on Performance Review table
            await loginPage.login(process.env.SPROJECT, process.env.PASSWORD)
            await employeePage.navigateToPerformanceReviews()
            await employeePage.isInPerformanceReview()
            await employeePage.isEmployeeAddedInPerformanceReview(emp, testData.performanceReview)
            await homePage.logout()


        }

    
    })

    
    test('Check if email is received by Employee and Manager', async () => {
        await quickTaskPage.validateZohoEmail(testData.performanceReview.subject.performanceReviewSelf, testData.performanceReview.emailFrom)
 
    })


    test.afterEach(async () => {
        await context.close()
        await page.close()
    });

});