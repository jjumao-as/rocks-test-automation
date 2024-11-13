const quickTasksLocators = require('../locators/quickTasksLoc');
const ActionDriver = require('../../utils/ActionDriver');
const dashboardLocators = require('../locators/dashboardLoc');
const employeePageLoc = require('../locators/employeeLoc');
const { updateJsonData } = require('../../utils/jsonReader');
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
            await this.actionDriver.waitElementUntilClickable(quickTasksLocators.imagePickerBtn);
            await this.actionDriver.clickButton(quickTasksLocators.imagePickerBtn)

            await this.actionDriver.fileUpload('../testdata/images/playwright.png', quickTasksLocators.clickToUploadBtn);
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
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.quickTasksSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseQuickTasks);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseQuickTasks);
        }
        await this.actionDriver.clickButton(quickTasksLocators.createDailyReport);
    }

    async checkCreateReportElementsVisibility() {
        await this.actionDriver.checkElementVisibility(quickTasksLocators.dailyReports);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.composeNewMessage);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.paginationBar);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.nextPage);
    }

    async navigateExpenseReport() {
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.quickTasksSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseQuickTasks);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseQuickTasks);
        }
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
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.quickTasksSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseQuickTasks);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseQuickTasks);
        }
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
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.quickTasksSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseQuickTasks);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseQuickTasks);
        }
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

    /** Submit Manager Performance Review */

    async navigateManagerPerfEval(){
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.quickTasksSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseQuickTasks);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseQuickTasks);
        }
        await this.actionDriver.clickButton(quickTasksLocators.managerPerformanceReviewTab);
    }

    async checkManagerPerfEvalElementsVisibility(){
        await this.actionDriver.checkElementVisibility(quickTasksLocators.managerPerformanceReview);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.managerReviewstartDate);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.managerReviewendDate);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.selectTalent);
    }

   
    async searchEmployeeToReview(employeeName){
        await this.actionDriver.setText(quickTasksLocators.searchTalentTextbox, employeeName)
        await this.actionDriver.keyboardPress('Enter')
        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.talentName)
        await this.actionDriver.clickButton(quickTasksLocators.talentName)
        const toReviewTalent = await this.actionDriver.getText(quickTasksLocators.talentName)
        await this.actionDriver.checkInclude(toReviewTalent, employeeName)
        await this.actionDriver.waitElementUntilClickable(quickTasksLocators.nextButton)
        await this.actionDriver.clickButton(quickTasksLocators.nextButton)
        return toReviewTalent

    }

    async addPerformanceReview(empName, role, performanceReviewData){

        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.performanceEvaluationBanner)
        const talentName = await this.actionDriver.getText(quickTasksLocators.employeeNameToReview)
        // compares the empName from testData to the Employee Name text in the page
        await this.actionDriver.checkInclude(talentName, empName)

        const isClientDropdownVisible = await this.actionDriver.elementVisible(quickTasksLocators.searchClientDropdown);

        /** Skips the dropdown on automation run because it appears > 5 secs. */
        if (isClientDropdownVisible) {
            // await this.actionDriver.waitElementUntilVisible(quickTasksLocators.searchClientDropdown)
            await this.actionDriver.clickButton(quickTasksLocators.searchClientDropdown)
            await this.actionDriver.typeText(performanceReviewData.client)
            await this.actionDriver.keyboardPress('Enter')
        }
      
        // If employee role is developer, It will proceed filling up DEV specific BUSINESS SPECIFIC OBJECTIVES 
        if (role === "developer") {
            addManagerFeedback()
        }

        // If employee role is developer, It will proceed filling up QA specific BUSINESS SPECIFIC OBJECTIVES 
        else if(role === "qa"){
            addManagerRating()
        }

        // ignore this for now
        function addManagerFeedback(){
            console.log(`1st run : ${performanceReviewData.rocksEmployee.developer}`)

        }

        // ignore this for now
        function addManagerRating(){
            console.log(`2nd run : ${performanceReviewData.rocksEmployee.qa}`)

        }
        
       
        await this.actionDriver.clickButton(dashboardLocators.xIcon);

       


    
    }


    async navigateSubmitFeedback() {
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.quickTasksSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseQuickTasks);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseQuickTasks);
        }
        await this.actionDriver.clickButton(quickTasksLocators.submitFeedback);
    }

    async checkSubmitFeedbackElementsVisibility(){
        await this.actionDriver.checkElementVisibility(quickTasksLocators.category);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.feedbackTab);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.sendButton);
    }

    async clickComposeMessage(){
        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.composeNewMessage);
        await this.actionDriver.clickButton(quickTasksLocators.composeNewMessage);
        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.whatIDidField);
    }

    async selectProject(testData) {
        await this.actionDriver.clickButton(quickTasksLocators.projectField);
        await this.actionDriver.selectOption(testData, quickTasksLocators.projectField);
    }

    async setWhatIdid(testData){
        emailSubject = await this.actionDriver.getText(quickTasksLocators.subjectField);
        await this.actionDriver.clickButton(quickTasksLocators.whatIDidField);
        await this.actionDriver.typeText(testData, quickTasksLocators.whatIDidField);
    }

    async setWhatWillBeDoing(testData){
        await this.actionDriver.clickButton(quickTasksLocators.whatIWillbeDoingField);
        await this.actionDriver.typeText(testData, quickTasksLocators.whatIWillbeDoingField);
    }

    async sendReport() {
        await this.actionDriver.clickButton(quickTasksLocators.sendReportButton);
        const alreadyExists = await this.actionDriver.elementVisible(quickTasksLocators.reportAlreadyExist);
        if(alreadyExists) {
            await this.actionDriver.clickButton(quickTasksLocators.reportExistConfirmButton);
            await this.actionDriver.keyboardPress('Escape');
            await this.actionDriver.clickButton(quickTasksLocators.reportExistConfirmButton);
        } else {
            await this.actionDriver.waitElementUntilClickable(quickTasksLocators.syncMail);
            await this.actionDriver.clickButton(quickTasksLocators.syncMail);
            await this.actionDriver.waitElementUntilHidden(quickTasksLocators.syncSpinner);
        }
    }

    async validateEmail(){
        await this.actionDriver.expectEquals(emailSubject, quickTasksLocators.subjectList);
    }

    async navigateToCreateExpenseReport() {
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.quickTasksSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseQuickTasks);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseQuickTasks);
        }
        await this.actionDriver.clickButton(quickTasksLocators.createExpenseReport);
    }

    async setExpenseType(testData) {
        await this.actionDriver.clickButton(quickTasksLocators.expenseTypeFld);
        await this.actionDriver.selectOption(testData, quickTasksLocators.expenseTypeFld);
    }

    async setDate() { 
        await this.actionDriver.clickButton(quickTasksLocators.dateField);
        await this.actionDriver.clickButton(quickTasksLocators.currentDate);
    }

    async setAmount(testData) {
        if(testData.recieptAmount !== "") {
            await this.actionDriver.setText(quickTasksLocators.receiptAmountFld, testData.recieptAmount);
        }
        if(testData.cashAdvanceAmount !== "") {
            await this.actionDriver.setText(quickTasksLocators.cashAdvanceAmountFld, testData.cashAdvanceAmount);
        }
        if(testData.reimbursableAmount !== "") {
            await this.actionDriver.setText(quickTasksLocators.reimbursableAmountFld, testData.reimbursableAmount);
        }
    }

    async setJustification(testData) {
        await this.actionDriver.setText(quickTasksLocators.justificationFld, testData);
    }

    async uploadReceipt(testData) {
        if(testData.missing === "false" || !testData.missing) {
            await this.actionDriver.fileUpload('../testdata/images/receipt.png', quickTasksLocators.uploadReceipt);
            await this.actionDriver.waitElementUntilVisible(quickTasksLocators.uploadedReceipt);
            await this.actionDriver.checkElementVisibility(quickTasksLocators.uploadedReceipt);
        } else {
            await this.actionDriver.clickButton(quickTasksLocators.receiptMissingToggle);
        }
    }

    async saveExpenseReport() {
        await this.actionDriver.clickButton(quickTasksLocators.submitButton);
        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.confirmationMsg);
        await this.actionDriver.checkElementVisibility(quickTasksLocators.confirmationMsg);
        await this.actionDriver.clickButton(quickTasksLocators.okBtn);
    }

    async navigateWeeklyFloorReport() {
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.quickTasksSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseQuickTasks);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseQuickTasks);
        }
        await this.actionDriver.clickButton(quickTasksLocators.createWeeklyReport);
        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.createWeeklyFloorReportModal);
    }

    async selectClient() {
        await this.actionDriver.clickButton(quickTasksLocators.selectClientsFld);
        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.clientOptions);
        const index = await this.actionDriver.selectRandomIndexFromList(quickTasksLocators.clientOptions);
        const text = await this.actionDriver.getText(`(${quickTasksLocators.clientNameList})[${index}]`);
        await this.actionDriver.typeText(text);
        await this.actionDriver.selectDataFromText(text, quickTasksLocators.clientNameList, quickTasksLocators.clientOptions);
        await this.actionDriver.clickButton(quickTasksLocators.questionList);
    }
    
    async saveGreenFloorReport(data, role) {
        const clientName = await this.actionDriver.getText(quickTasksLocators.selectedClientName);
        updateJsonData('floorReport', `users>${role}>greenClientName`, clientName);
        await this.actionDriver.waitElementUntilClickable(quickTasksLocators.goalsOrDeadlineOpt);
        await this.actionDriver.selectFromList(data.goals, quickTasksLocators.goalsOrDeadlineOpt);
        await this.actionDriver.selectFromList(data.track, quickTasksLocators.onTrackOpt);
        await this.actionDriver.selectFromList(data.progress, quickTasksLocators.makingProgressOpt);
        await this.actionDriver.selectFromList(data.talent, quickTasksLocators.needMoreTalentOpt);
        await this.actionDriver.clickButton(quickTasksLocators.saveFlrReport);
        await this.actionDriver.waitElementUntilHidden(quickTasksLocators.createWeeklyFloorReportModal);
    }

    async saveOrangeFloorReport(data, role) {
        const clientName = await this.actionDriver.getText(quickTasksLocators.selectedClientName);
        updateJsonData('floorReport', `users>${role}>orangeClientName`, clientName);
        await this.actionDriver.waitElementUntilClickable(quickTasksLocators.goalsOrDeadlineOpt);
        await this.actionDriver.selectFromList(data.goals, quickTasksLocators.goalsOrDeadlineOpt);
        await this.actionDriver.selectFromList(data.track, quickTasksLocators.onTrackOpt);
        await this.actionDriver.selectFromList(data.progress, quickTasksLocators.makingProgressOpt);
        await this.actionDriver.selectFromList(data.blocker, quickTasksLocators.blockersOpt);
        await this.actionDriver.selectFromList(data.communicated, quickTasksLocators.problemCommunicatedOpt);
        await this.actionDriver.selectFromList(data.subq, quickTasksLocators.probCommunicatedSubOpt);
        await this.actionDriver.selectFromList(data.talent, quickTasksLocators.needMoreTalentOpt);
        await this.actionDriver.clickButton(quickTasksLocators.saveFlrReport);
        await this.actionDriver.waitElementUntilHidden(quickTasksLocators.createWeeklyFloorReportModal);
    }

    async saveRedFloorReport(data, role) {
        const clientName = await this.actionDriver.getText(quickTasksLocators.selectedClientName);
        updateJsonData('floorReport', `users>${role}>redClientName`, clientName);
        await this.actionDriver.waitElementUntilClickable(quickTasksLocators.goalsOrDeadlineOpt);
        await this.actionDriver.selectFromList(data.goals, quickTasksLocators.goalsOrDeadlineOpt);
        await this.actionDriver.selectFromList(data.track, quickTasksLocators.onTrackOpt);
        await this.actionDriver.selectFromList(data.progress, quickTasksLocators.makingProgressOpt);
        await this.actionDriver.selectFromList(data.talent, quickTasksLocators.needMoreTalentOpt);
        await this.actionDriver.clickButton(quickTasksLocators.saveFlrReport);
        await this.actionDriver.waitElementUntilHidden(quickTasksLocators.createWeeklyFloorReportModal);
    }

    
}