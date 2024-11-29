import { test } from '@playwright/test';
const { LoginPage, HomePage, QuickTasksPage, EmployeesPage } = require ('../../pages/functions/index.js');
import { readJsonFile } from '../../utils/jsonReader.js'
const path = require('path');

let loginPage;
let homePage;
let quickTasksPage;
let employeesPage;
let testDataPath;
let testData;
let file;

test.beforeAll(async () =>{
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

test.beforeEach(async ({page}) =>{
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    quickTasksPage = new QuickTasksPage(page)
    employeesPage = new EmployeesPage(page)
    testDataPath = 'feedback';
    testData = await readJsonFile(testDataPath);
})


test.afterEach(async ({page}) => {
    await page.close()
    
});

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})


test('Employee submits text feedback and viewed by SuperAdmin', async () => {
    
    await loginPage.login(process.env.EMPLOYEE, process.env.PASSWORD);

    await homePage.isInHomePage()
    await homePage.navigateToSubmitFeedback()
   
    await quickTasksPage.isInFeedbackFormPage()
    await quickTasksPage.selectCategory()
    await quickTasksPage.enterTextFeedback(testData.submitFeedback.feedbackNote[0])
    await quickTasksPage.submitFeedback()
    await quickTasksPage.isFeedbackSubmitted()

    await homePage.logout()

    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);

    await homePage.isInHomePage()
    await homePage.navigateToFeedbackList()

    await employeesPage.isInFeedbackListing()
    await employeesPage.viewFeedbackAdded()



});


test('Employee submits feedback with image attachment and viewed by SuperAdmin', async () => {
   
    await loginPage.login(process.env.EMPLOYEE, process.env.PASSWORD);

    await homePage.isInHomePage()
    await homePage.navigateToSubmitFeedback()

    await quickTasksPage.isInFeedbackFormPage()
    await quickTasksPage.selectCategory()
    await quickTasksPage.enterTextWithImageFeedback(testData.submitFeedback.feedbackNote[3])
    await quickTasksPage.submitFeedback()
    await quickTasksPage.isFeedbackSubmitted()

    await homePage.logout()

    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);

    await homePage.isInHomePage()
    await homePage.navigateToFeedbackList()

    await employeesPage.isInFeedbackListing()
    await employeesPage.viewFeedbackAdded()

});

