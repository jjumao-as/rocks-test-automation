import { test } from '@playwright/test';
import { LoginPage, HomePage, QuickTasksPage, EmployeesPage, DashboardPage } from '../../pages/functions/index';
import { roles } from '../../testdata/rolesForParallel.ts';
import { readJsonFile } from '../../utils/jsonReader.js'
const path = require('path');

let context;
let page;
let loginPage;
let homePage;
let quickTasksPage;
let employeesPage;
let dashboardPage;
let testData;
let testDataPath;
let file;

const roleToTest = ['SUPERADMIN']


test.beforeAll(async () =>{
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

roleToTest.forEach(role => {

    const {username, password} = roles[role]

    test.describe.parallel('Employee Peformance Competencies', () => {

        test.beforeEach(async ({browser}) =>{
            context = await browser.newContext()
            page = await context.newPage()

            testDataPath = 'employee'
            testData = await readJsonFile(testDataPath)
        
            loginPage = new LoginPage(page);
            homePage = new HomePage(page);
            quickTasksPage = new QuickTasksPage(page)
            employeesPage = new EmployeesPage(page)
            dashboardPage = new DashboardPage(page)

            await loginPage.login(username, password)
            await homePage.isInHomePage()

            await dashboardPage.search(testData[role].employee);
            await dashboardPage.checkValidSearchResult();
            await dashboardPage.viewSearchResult();
            await dashboardPage.verifyTalent();
            // Navigate to Talent Profile tab
            await employeesPage.navigateToTalentProfile()


        })

        test(`${role} adds Performance Competencies to Employee`, async () => {
            // Passing "false" parameter means selectPerformanceCompetencies() performs ADD
            const addedPerfComp = await employeesPage.selectPerformanceCompetencies(testData.performanceCompetencies, false)
            await employeesPage.verifyPerformanceCompetencies(addedPerfComp)

        }) 
        
        test(`${role} updates Performance Competencies to Employee`, async () => {
            // Passing "true" parameter means selectPerformanceCompetencies() performs EDIT
            const updatedPerfComp = await employeesPage.selectPerformanceCompetencies(testData.performanceCompetencies, true)
            await employeesPage.verifyPerformanceCompetencies(updatedPerfComp)

        })

        test(`${role} deletes Performance Competencies to Employee`, async () => {
           await employeesPage.unselectPerformanceCompetencies()

        })
        
        
            
        

        test.afterEach(async () => {
            await context.close()
            await page.close()
        });
    
    })
      
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})