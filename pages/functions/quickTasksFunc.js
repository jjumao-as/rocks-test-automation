const quickTasksLocators = require('../locators/quickTasksLoc');
const ActionDriver = require('../../utils/ActionDriver');
const dashboardLocators = require('../locators/dashboardLoc');
const employeePageLoc = require('../locators/employeeLoc');
const { updateJsonData } = require('../../utils/jsonReader');
const { getLatestEmail } = require('../../utils/zohoDriver');

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
        await this.actionDriver.checkElementVisibility(quickTasksLocators.submitExpenseButton);
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

    async addPerformanceObjectives(empName, role, performanceReviewData){

        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.performanceEvaluationBanner)
        const talentName = await this.actionDriver.getText(quickTasksLocators.employeeNameToReview)
        
        /** compares the empName from testData to the Employee Name text in the page */
        await this.actionDriver.checkInclude(talentName, empName)

        const isClientDropdownVisible = await this.actionDriver.elementVisible(quickTasksLocators.searchClientDropdown);

        /** counts the collapseButton + textarea and then fills it with testdata  */
        const collapseButtonCount = await this.actionDriver.elementCount(quickTasksLocators.managerFeedbackCollapseButton)

        /** counts Manager rating dropdown */
        const managerRatingDropdownCount = await this.actionDriver.elementCount(quickTasksLocators.managerRatingDropdown)

        const selectedPerfObjFeedback = {}
        const selectedPerfObjRating = {}


        /** If automation can't find dropdown in > 5 seconds, it skips it entirely */
        if (isClientDropdownVisible) {
            await this.actionDriver.clickButton(quickTasksLocators.searchClientDropdown)
            await this.actionDriver.typeText(performanceReviewData.client)
            await this.actionDriver.keyboardPress('Enter')
        }

        
     
        // If employee role is developer, it will compare dev objectives from testData against the content on the web page
        if (role === "developer") {
            /** Get all the dev objective text in the webPage and stored it on devObjText variable */
            const devObjText = await this.actionDriver.getTextArray(quickTasksLocators.topicHeader)
            /** Gets all the dev objective from the testData and stored it on devObjData variable */
            const devObjData = performanceReviewData.devObjectives
            for (let i = 0; i < devObjData.length; i++) {
                /** compares dev objective testData if it matches with the dev objective/topic in the webPage */
                await this.actionDriver.checkInclude(devObjText[i], devObjData[i])    
            }  


        }

        // If employee role is qa, it will compare qa objectives from testData against the content on the web page
        else if(role === "qa"){
            /** Get all the qa objective topic in the webPage and stored it on qaObjText variable */
            const qaObjText = await this.actionDriver.getTextArray(quickTasksLocators.topicHeader)
            /** Gets all the qa objective from the testData and stored it on qaObjData variable */
            const qaObjData = performanceReviewData.qaObjectives

            for (let i = 0; i < qaObjData.length; i++) {
                /** compares qa objective testData if it matches with the qa objective/topic in the webPage */
                await this.actionDriver.checkInclude(qaObjText[i], qaObjData[i])    
            }  


        }
        else{
            console.log("Error adding manager review")
        }

        
        /** since xpath is indexed-1 base, started the loop from 1 */
        for (let i = 1; i <= collapseButtonCount; i++) {
            /** This variable handles every found collapedButton of [i] */
            const collapsedButton = `(${quickTasksLocators.managerFeedbackCollapseButton})[${i}]`

            /** This generates random JSON item from managerPerformanceReview['managerFeedback'] */
            const randomFeedback = await this.actionDriver.getRandomJsonItem(performanceReviewData, 'managerFeedback')

            await this.actionDriver.waitElementUntilVisible(collapsedButton)
            /** Clicks the collapse button and fills in randomFeedback testdata to the texarea afterwards */
            await this.actionDriver.clickButton(collapsedButton)
            await this.actionDriver.typeText(randomFeedback)
            /**
             * Every randomFeedback is stored on selectedPerfObjFeedback{} for later use especially on View Feedback tests
             * Output Format : selectedPerfObjFeedback{"feeback1" : "Test Feedback 1"}
             */
            selectedPerfObjFeedback[`feedback${i}`] = randomFeedback
        }

     
        /** Loop through each managerRatingDropdown for DEV/QA employee  */
        for (let i = 1; i <= managerRatingDropdownCount; i++) {
            /** selects random manager rating from the dropdown */
            const managerRatingDropdown = `(${quickTasksLocators.managerRatingDropdown})[${i}]`
            const dropdownOptionsInRow = `${managerRatingDropdown}${quickTasksLocators.managerRatingDropdownOptions}`

            const randomIndex = await this.actionDriver.selectRandomIndexFromList(dropdownOptionsInRow)
            const mgrRating = await this.actionDriver.getText(`${dropdownOptionsInRow}[${randomIndex}]`)

            await this.actionDriver.clickButton(managerRatingDropdown)
            await this.actionDriver.typeText(mgrRating)
            await this.actionDriver.keyboardPress('Enter')
           
            /**
             * Every randomFeedback is stored on selectedPerfObjRating{} for later use especially on View Feedback tests
            */
            selectedPerfObjRating[`perfObjRating${i}`] = mgrRating
         
        }

        const performanceObjectives = {selectedPerfObjFeedback, selectedPerfObjRating}

        await this.actionDriver.waitElementUntilClickable(quickTasksLocators.nextButton)
        await this.actionDriver.clickButton(quickTasksLocators.nextButton)

        return performanceObjectives


    }

    async addPerformanceCompetencies(empName, performanceReviewData){

        const selectedPerfCompRating = {}

        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.performanceEvaluationBanner)
        const talentName = await this.actionDriver.getText(quickTasksLocators.employeeNameToReview)
        
        /** compares the empName from testData to the Employee Name text in the page */
        await this.actionDriver.checkInclude(talentName, empName)
        const isClientDropdownVisible = await this.actionDriver.elementVisible(quickTasksLocators.searchClientDropdown);
        const isClientPlaceholderVisible = await this.actionDriver.elementVisible(quickTasksLocators.searchClientPlaceholder)

        /** Checks if client dropdown is successfully filled up in prevous page
          * If not, it will fillup the Client dropdown this time and select "EmployeeDB" 
        */
        if (isClientDropdownVisible && isClientPlaceholderVisible) {
            await this.actionDriver.clickButton(quickTasksLocators.searchClientDropdown)
            await this.actionDriver.typeText(performanceReviewData.client)
            await this.actionDriver.keyboardPress('Enter')

        }

        // Counts the number of rows in the table
        const radioGroupRows = await this.actionDriver.elementCount(quickTasksLocators.ratingRadioGroup)

        // Iterates the entire row of [i]
        for (let i = 1; i <= radioGroupRows; i++) {
            // This points to the current row
            const row = `(${quickTasksLocators.ratingRadioGroup})[${i}]`
            /** Since radioButton options don't have text associated, we created testdata for options => ["below", "meet", "exceed"]
            *   Randomized the object and assigned to variable "rating"
            */ 
            const rating = await this.actionDriver.getRandomJsonItem(performanceReviewData, "perfCompOptions")
           
            // This now selects option in current row. Random selected option is appended in => //i[@class='rating-icon-svg ${rating}
            const selectedOption = `${row}//i[@class='rating-icon-svg ${rating}']`
            
            // Clicks the selected radio option
            await this.actionDriver.clickButton(selectedOption)
            // Assigned the "rating" to selectedPerfCompRating[] object for future use (View Manager Peformance review)
            selectedPerfCompRating[`perfObjComp${i}`] = rating
           
        }


        const performanceCompetencies = {selectedPerfCompRating}
        
        await this.actionDriver.waitElementUntilClickable(quickTasksLocators.nextButton)
        await this.actionDriver.clickButton(quickTasksLocators.nextButton)

        return performanceCompetencies
        
    }

    async addPerformanceSummary(empName, performanceReviewData){

        const selectedPerfSummary = {}
       
        const talentName = await this.actionDriver.getText(quickTasksLocators.employeeNameToReview)
        
        /** compares the empName from testData to the Employee Name text in the page */
        await this.actionDriver.checkInclude(talentName, empName)

        // Overall Rating
        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.overallRatingOptions)
        const overAllRating = await this.actionDriver.getRandomJsonItem(performanceReviewData, "perfCompOptions")
        const selectedOption = `${quickTasksLocators.overallRatingOptions}//i[@class='rating-icon-svg ${overAllRating}']`
        await this.actionDriver.clickButton(selectedOption)
        selectedPerfSummary[`overAllRating`] = overAllRating

        // Overall Comment
        await this.actionDriver.clickButton(quickTasksLocators.additionalCommentTextarea)
        const overAllFeedback = await this.actionDriver.getRandomJsonItem(performanceReviewData, 'overAllManagerFeedback')
        await this.actionDriver.ElemetType(quickTasksLocators.additionalCommentTextarea, overAllFeedback)
        selectedPerfSummary[`overAllFeedback`] = overAllFeedback

        const performanceSummary = {selectedPerfSummary}

        await this.actionDriver.waitElementUntilClickable(quickTasksLocators.submitButton)
        await this.actionDriver.clickButton(quickTasksLocators.submitButton)


        return performanceSummary
    }

    async isManagerReviewSubmitted(){

        await this.actionDriver.waitElementUntilHidden(quickTasksLocators.savingInfoLoader)
        await this.actionDriver.waitElementUntilVisible(quickTasksLocators.thankYouEvaluationNotif)

        return true
    }

    async validateZohoEmail(subject, from) {
        let emailContent;
        for (let i = 1; i <= 3; i++) {
            emailContent = await getLatestEmail(subject, from);
            if (emailContent !== null) {
                break;
            }
        }
        const empty = emailContent === null ? true : false;
        if (!empty) {
            await this.page.setContent(emailContent.content);
            const emailSubject = emailContent.subject;
            if (subject.includes('Welcome')) {
                const hrefValue = await this.page.evaluate(() => {
                    const links = Array.from(document.querySelectorAll('a'));
                    const link = links.find(link => link.textContent.includes('Go To My Account'));
                    return link ? link.href : null;
                });
                await this.page.goto(hrefValue);
            } else {
                await this.actionDriver.checkInclude(subject, emailSubject)
            }
        }
        await this.actionDriver.expectFalse(empty);
    }


    
    


    

    /** Feeback Listing */

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
        await this.actionDriver.clickButton(quickTasksLocators.submitExpenseButton);
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