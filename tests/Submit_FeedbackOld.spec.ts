import { test, expect, Page } from '@playwright/test';
const { LoginPage, HomePage, SubmitFeedbackPage, FeedbackListPage } = require('./pages/index.js');


let page
let loginPage
let homePage
let submitFeedbackPage
let feedbackListPage


test.beforeAll('Setup', async ({ browser }) => {

    page = await browser.newPage()

    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    submitFeedbackPage = new SubmitFeedbackPage(page)
    feedbackListPage = new FeedbackListPage(page)
})

test.afterEach(async ({ page }) => {
    await page.close();
    
})


test('Employee submits feedback with text only', async () => {

    // EMPLOYEE submits feedback
    await loginPage.login(process.env.EMPLOYEE, process.env.PASSWORD)
    await homePage.isInHomePage()

    await homePage.goToSubmitFeedback()

    await submitFeedbackPage.isInFeedbackFormPage()
    await submitFeedbackPage.selectCategory()
    await submitFeedbackPage.enterTextFeedback()
    await submitFeedbackPage.submitFeedback()
    await submitFeedbackPage.isFeedbackSubmitted()

    await loginPage.logout()


    // SuperAdmin checks the submitted feedack
    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD)
    await homePage.isInHomePage()

    await homePage.goToFeedbackList()
    await feedbackListPage.isInFeedbackListing()

    await feedbackListPage.viewFeedbackAdded()

    await loginPage.logout()





})

test('Employee submits feedback with Image', async () => {
    await loginPage.login(process.env.EMPLOYEE, process.env.PASSWORD)
    await homePage.isInHomePage()

    await homePage.goToSubmitFeedback()

    await submitFeedbackPage.isInFeedbackFormPage()
    await submitFeedbackPage.selectCategory()
    await submitFeedbackPage.enterTextAndImageFeedback()
    await submitFeedbackPage.submitFeedback()
    await submitFeedbackPage.isFeedbackSubmitted()

    await loginPage.logout()


    await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD)
    await homePage.isInHomePage()

    await homePage.goToFeedbackList()
    await feedbackListPage.isInFeedbackListing()

    await feedbackListPage.viewFeedbackAdded()

    await loginPage.logout()

})



