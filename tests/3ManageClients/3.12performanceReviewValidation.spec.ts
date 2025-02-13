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

    test.describe.parallel('Performance review page validations', () => {

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

        test(`${role} Performance review page validations`, async() => {
            const randomDigits = Math.floor(100 + Math.random() * 900); // Random number
            const baseClientName = 'ClientName_Test';
            const ClienWithRandomNumber = `${baseClientName}${randomDigits}`;
            await loginPage.login(username, password)
            await homePage.isInHomePage()
            await homePageFunc.navigateToClientList()
            await clientListFunc.searchCompanyFieldInput('full scale fast track');
            await clientListFunc.searchCompanyButtonClick();
            await clientListFunc.selectCompanySearchResultFSClick();
            await clientListFunc.checkCompanyProfileStatusActive();
            await clientProfileFunc.testPerformanceReviewViewDownloadClose();
            await clientProfileFunc.testPerformanceReviewSortingFiltering();

        });
    }) 
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})  