import { test } from '@playwright/test';
import { LoginPage, HomePage, QuickTasksPage, EmployeesPage, DashboardPage } from '../../pages/functions/index';
import { roles } from '../../testdata/rolesForParallel.ts';
import { readJsonFile } from '../../utils/jsonReader.js'

let context;
let page;
let loginPage;
let homePage;
let quickTasksPage;
let employeesPage;
let dashboardPage;
let testData;
let testDataPath;

const roleToTest = ['SUPERADMIN', 'ADMIN', 'FLOOR']

roleToTest.forEach(role => {
    const {username, password} = roles[role]

    test.describe.parallel('Client Page redirection', () => {

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

            await loginPage.login(username, password)
            await homePage.isInHomePage()

            // Search Employee
            await dashboardPage.search(testData[role].employee);
            await dashboardPage.checkValidSearchResult();
            await dashboardPage.viewSearchResult();
            await dashboardPage.verifyTalent();

            // Navigate to Client Interviews
            await employeesPage.navigateToClientInterviews()
            await employeesPage.addInterviewModalIsPresent()

            // Add Client Interview
            await employeesPage.addInterview()
            await employeesPage.submitInterview()
            await employeesPage.isInterviewAdded()

         
        
        });

        test(`${role} is redirected to Client page`, async() => {

            await employeesPage.clickClientNameLink()
            await employeesPage.isInClientPage()
            await employeesPage.navigateToClientInterviews()

        })


        test.afterEach(async () => {
            await employeesPage.deleteInterview()
            await employeesPage.isInterviewDeleted()
            await context.close()
            await page.close()
        });







    })

    



})
