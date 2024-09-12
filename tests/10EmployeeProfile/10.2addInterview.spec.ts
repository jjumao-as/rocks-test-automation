import { test } from '@playwright/test';
import { LoginPage, HomePage, QuickTasksPage, EmployeesPage, DashboardPage } from '../../pages/functions/index';
import { roles } from '../../testdata/rolesForParallel.ts';
import { employees } from '../../testdata/employee/clientInterview.json';
import { readJsonFile } from '../../utils/jsonReader.js'
 

let context;
let page;
let loginPage;
let homePage;
let quickTasksPage;
let employeesPage;
let dashboardPage;



const roleToEmp = [
    {roleKey: 'SUPERADMIN', role: roles.SUPERADMIN, emp: employees.employeeName.employee1},
    {roleKey: 'ADMIN', role: roles.ADMIN, emp: employees.employeeName.employee2 },
    {roleKey: 'HR', role: roles.HR, emp: employees.employeeName.employee3 },
    {roleKey: 'FLOOR', role: roles.FLOOR, emp: employees.employeeName.employee4 },
];


    const interviewDates = employees.interviewDate
    const dateKeys = Object.keys(interviewDates)
    const randomIndexDates = Math.floor(Math.random() * dateKeys.length)
    const randomDate = interviewDates[dateKeys[randomIndexDates]]

    const cFback = employees.clientFeedback
    const clientFeedbackKeys = Object.keys(cFback)
    const randomIndexClientFeedback = Math.floor(Math.random() * clientFeedbackKeys.length)
    const randomClientFeedback = cFback[clientFeedbackKeys[randomIndexClientFeedback]]


  
roleToEmp.forEach(({roleKey, role, emp}) => {

    test.describe.parallel('Add Interview to employee', () => {

        test.beforeEach(async ({browser}) =>{
            context = await browser.newContext()
            page = await context.newPage()
        
            loginPage = new LoginPage(page);
            homePage = new HomePage(page);
            quickTasksPage = new QuickTasksPage(page)
            employeesPage = new EmployeesPage(page)
            dashboardPage = new DashboardPage(page)
        
        })
        
       
        
        test(`${roleKey} adds interview for ${emp}`, async() => {

            await loginPage.login(role.username, role.password)
            await homePage.isInHomePage()
        
            // Search Employee
            await dashboardPage.search(emp);
            await dashboardPage.checkValidSearchResult();
            await dashboardPage.viewSearchResult();
            await dashboardPage.verifyTalent();

            // Navigate to Client Interviews
            await employeesPage.navigateToClientInterviews()
            await employeesPage.addInterviewModalIsPresent()
            await employeesPage.addInterview(randomDate, randomClientFeedback)
            await employeesPage.submitInterview()
            await employeesPage.isInterviewAdded()
            

          
        });

        test.afterEach(async ({}) => {
            await employeesPage.deleteInterview()
            await employeesPage.isInterviewDeleted()
            await context.close()
            await page.close()
        });
        
   
    })
      


})

