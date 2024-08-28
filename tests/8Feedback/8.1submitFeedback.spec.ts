import { test } from '@playwright/test';
const { LoginPage, HomePage, QuickTasksPage, EmployeesPage } = require ('../../pages/functions/index.js');
import { readJsonFile } from '../../utils/jsonReader.js'

let loginPage;
let homePage;
let submitFeedbackPage;
let viewFeedBackPage;
let testDataPath;
let testData;


test.beforeEach(async ({page}) =>{
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    submitFeedbackPage = new QuickTasksPage(page)
    viewFeedBackPage = new EmployeesPage(page)
    testDataPath = 'feedback';
    testData = await readJsonFile(testDataPath);
})


test.afterEach(async ({page}) => {
    await page.close()
    
});



test('Employee submits text feedback and viewed by SuperAdmin', async () => {
    
    await loginPage.login(process.env.EMPLOYEE, process.env.PASSWORD);

    await homePage.isInHomePage()
    await homePage.navigateToSubmitFeedback()
   
    await submitFeedbackPage.isInFeedbackFormPage()
    await submitFeedbackPage.selectCategory()
    await submitFeedbackPage.enterTextFeedback(testData.submitFeedback.feedbackNote[0])
    await submitFeedbackPage.submitFeedback()
    await submitFeedbackPage.isFeedbackSubmitted()

    await homePage.logout()

    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);

    await homePage.isInHomePage()
    await homePage.navigateToFeedbackList()

    await viewFeedBackPage.isInFeedbackListing()
    await viewFeedBackPage.viewFeedbackAdded()



});


test('Employee submits feedback with image attachment and viewed by SuperAdmin', async () => {
   
    await loginPage.login(process.env.EMPLOYEE, process.env.PASSWORD);

    await homePage.isInHomePage()
    await homePage.navigateToSubmitFeedback()

    await submitFeedbackPage.isInFeedbackFormPage()
    await submitFeedbackPage.selectCategory()
    await submitFeedbackPage.enterTextWithImageFeedback(testData.submitFeedback.feedbackNote[3])
    await submitFeedbackPage.submitFeedback()
    await submitFeedbackPage.isFeedbackSubmitted()

    await homePage.logout()

    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);

    await homePage.isInHomePage()
    await homePage.navigateToFeedbackList()

    await viewFeedBackPage.isInFeedbackListing()
    await viewFeedBackPage.viewFeedbackAdded()

});

