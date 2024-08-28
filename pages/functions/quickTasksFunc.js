const quickTasksLocators = require('../locators/quickTasksLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { sleep } = require('../../utils/utility')
let emailSubject;

exports.QuickTasksPage = class QuickTasksPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
        
    }

    async isInFeedbackFormPage() {
        await this.actionDriver.checkElementVisibility(quickTasksLocators.categoryDropdown)
    }

    async selectCategory() {
        await this.actionDriver.selectOptionRandom(quickTasksLocators.categoryDropdown)
    }

    async enterTextFeedback(textFeedback){
        await this.actionDriver.setText(quickTasksLocators.feedback, textFeedback)
    }

    async enterTextWithImageFeedback(textFeedback){
        await this.actionDriver.setText(quickTasksLocators.feedback, textFeedback)
        try {
            const fileChooserPromise = this.page.waitForEvent('filechooser')

            await this.actionDriver.clickButton(quickTasksLocators.imagePickerBtn)
            await this.actionDriver.clickButton(quickTasksLocators.clickToUploadBtn)

            const fileChooser = await fileChooserPromise;
            const path = require('path')
    
            const imgPath = path.resolve('./testdata/playwright.png')
    
            await fileChooser.setFiles(imgPath);
    
            await this.actionDriver.checkElementVisibility(quickTasksLocators.previewImage)
        } catch (error) {
            console.log("FAILED UPLOADING IMAGE : " + error)
        }
    }

    async submitFeedback(){
        await this.actionDriver.clickButton(quickTasksLocators.sendBtn)
    }

    async isFeedbackSubmitted(){
        await this.actionDriver.checkElementVisibility(quickTasksLocators.notification)
    }

    async navigateCreateDailyReport(){
        await this.actionDriver.clickButton(quickTasksLocators.createDailyReport);
    }

    async checkCreateReportElementsVisibility() {
        await this.actionDriver.checkElementVisibility(quickTasksLocators.dailyReports);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.composeNewMessage);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.paginationBar);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.nextPage);
    }

    async navigateExpenseReport() {
        await this.actionDriver.clickButton(quickTasksLocators.createExpenseReport);
    }

    async checkExpenseReportElementsVisibility(){
        await this.actionDriver.checkElementVisibility(quickTasksLocators.submitExpenseReportModal);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.expenseType);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.recieptAmount);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.cashAdvanceAmount);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.reimbursableAmount);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.justification);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.receiptMissing);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.uploadReceipt);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.submitButton);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.closeButton);
    }

    async navigateCreateWeeklyFloorReport(){
        await this.actionDriver.clickButton(quickTasksLocators.createWeeklyReport);
    }

    async checkWeeklyFloorReportElementsVisibility(){
        await this.actionDriver.checkElementVisibility(quickTasksLocators.createWeeklyFloorReportModal);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.selectClients);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.goalsOrDeadline);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.makingProgress);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.needMoreTalent);
    }

    async navigateSelfPerfEval(){
        await this.actionDriver.clickButton(quickTasksLocators.submitSelfPerformanceReview);
    }

    async checkSelfPerfEvalElementsVisibility(){
        await this.actionDriver.checkElementVisibility(quickTasksLocators.performanceEvaluationReview);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.evaluationPeriodStep);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.performanceCompetencies);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.performanceSummary);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.startDate);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.endDate);
    }

    async navigateManagerPerfEval(){
        await this.actionDriver.clickButton(quickTasksLocators.managerPerformanceReviewTab);
    }

    async checkManagerPerfEvalElementsVisibility(){
        await this.actionDriver.checkElementVisibility(quickTasksLocators.managerPerformanceReview);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.managerReviewstartDate);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.managerReviewendDate);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.selectTalent);
    }

    async navigateSubmitFeedback() {
        await this.actionDriver.clickButton(quickTasksLocators.submitFeedback);
    }

    async checkSubmitFeedbackElementsVisibility(){
        await this.actionDriver.checkElementVisibility(quickTasksLocators.category);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.feedback);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.sendButton);
    }

    async clickComposeMessage(){
        await this.actionDriver.clickButton(quickTasksLocators.composeNewMessage);
        await sleep(2000);
    }

    async selectProject(testData) {
        await this.actionDriver.clickButton(quickTasksLocators.projectField);
        await sleep(2000);
        await this.actionDriver.selectOption(testData, quickTasksLocators.projectField);
        emailSubject = await this.actionDriver.getText(quickTasksLocators.subjectField);
    }

    async setWhatIdid(testData){
        await this.actionDriver.clickButton(quickTasksLocators.whatIDidField);
        await this.actionDriver.typeText(testData, quickTasksLocators.whatIDidField);
    }

    async setWhatWillBeDoing(testData){
        await this.actionDriver.clickButton(quickTasksLocators.whatIWillbeDoingField);
        await this.actionDriver.typeText(testData, quickTasksLocators.whatIWillbeDoingField);
    }

    async sendReport() {
        await this.actionDriver.clickButton(quickTasksLocators.sendReportButton);
        await sleep(5000);
    }

    async validateEmail(){
        await this.actionDriver.expectEquals(emailSubject, quickTasksLocators.subjectList);
    }
}