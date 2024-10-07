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


const roleToTest = ['SUPERADMIN', 'ADMIN', 'HR', 'FLOOR']

roleToTest.forEach(role => {

    const {username, password} = roles[role]

    test.describe('Client Interview Management', () => {

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

            // Navigate to Client Interviews
            await employeesPage.addInterviewModalIsPresent()
            await employeesPage.addInterview()
            await employeesPage.submitInterview()
            await employeesPage.isInterviewAdded()
  
            // Navigate to Client page
            if(role !== 'HR'){
                await employeesPage.clickClientNameLink()
                await employeesPage.isInClientPage()
                await employeesPage.navigateToClientInterviews()
            }

        
        })

      
        test(`${role} updates interview for employee`, async() => {
            await employeesPage.updateInterview()
            await employeesPage.isInterviewAdded()

        })

        test(`${role} deletes interview for employee`, async() => {
            await employeesPage.deleteInterview()
            await employeesPage.isInterviewDeleted()

        })


        test.afterEach(async ({}) => {
            await context.close()
            await page.close()
        });
        
   
    })
      


})

