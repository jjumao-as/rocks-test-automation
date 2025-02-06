import { test, expect } from '@playwright/test';
import { roles } from '../../testdata/rolesForParallel';
import { LoginPage, HomePage, HomePageFunc, ClientListFunc, ClientProfileFunc } from '../../pages/functions/index';
const path = require('path');

let context;
let page;
let loginPage;
let homePage;
let file;
let homePageFunc;
let clientListFunc;
let clientProfileFunc;

const rolesToTest = ['SUPERADMIN', 'ADMIN']

test.beforeAll(async () =>{
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

rolesToTest.forEach(role => {
    const {username, password} = roles[role];

    test.describe.parallel('Weekly floor report for client profile', () => {

        test.beforeEach(async ({browser}) =>{
            context = await browser.newContext()
            page = await context.newPage()
        
            loginPage = new LoginPage(page);
            homePage = new HomePage(page);
            homePageFunc = new HomePageFunc(page);
            clientListFunc = new ClientListFunc(page);
            clientProfileFunc = new ClientProfileFunc(page);
        })

        test.afterEach(async () => {
            await context.close()
        });     

        test(`${role} Weekly floor report for client profile`, async() => {
            await loginPage.login(username, password)
            await homePage.isInHomePage()
            await homePageFunc.navigateToClientList()
            await clientListFunc.searchCompanyFieldInput('full scale fast track');
            await clientListFunc.searchCompanyButtonClick();
            await clientListFunc.selectCompanySearchResultFSClick();
            await clientListFunc.checkCompanyProfileStatusActive();
            await clientListFunc.checkClientWeeklyFloorReportTab();
            await clientListFunc.clientWeeklyFloorReportTabClick();
            await clientProfileFunc.testcheckAddWeeklyReportEntry();
            await clientProfileFunc.testcheckEditWeeklyReportSaved();
            await clientProfileFunc.testcheckCancelDeleteWeeklyReport();
            await clientProfileFunc.testcheckSucessfulDeleteWeeklyReport();
        });
    }) 
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})
