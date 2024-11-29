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
let newSpotlightData;
let updatedSpotlightData;


const roleToTest = ['SUPERADMIN', 'ADMIN', 'HR', 'FLOOR']

test.beforeAll(async () =>{
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

roleToTest.forEach(role => {

    const {username, password} = roles[role]

    test.describe.parallel('Employee Client Spotlight', () => {

        test.beforeEach(async ({browser}) =>{
            context = await browser.newContext({
                permissions: ['clipboard-read', 'clipboard-write'], // Grant clipboard permissions
            })
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

            /** Add Client Spotlight / Review */
            newSpotlightData = await employeesPage.addClientSpotlight(testData.clientSpotlight)
            await employeesPage.isClientSpotlightSaved(newSpotlightData)

           
        })

        test.afterEach(async () => {

            /** Delete Client Spotlight / Review */
            await employeesPage.deleteClientSpotlight()
            await employeesPage.isClientSpotlightDeleted()
        
            await context.close()
            await page.close()
        });

        test.describe(`Update Client Spotlight / Review`, async() => {
            test(`${role} edits client spotlight`, async() => {
                updatedSpotlightData = await employeesPage.editClientSpotlight(newSpotlightData, testData.clientSpotlight)
                await employeesPage.isClientSpotlightSaved(updatedSpotlightData)
                
            })

        })
    
    })
      
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})