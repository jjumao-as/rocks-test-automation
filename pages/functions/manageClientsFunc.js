const manageClientsocators = require('../locators/manageClientsLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { expect } = require('@playwright/test');
const { readJsonFile } = require('../../utils/jsonReader')

let updatedJson;

exports.ManageClientsPage = class ManageClientsPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async navigateRecentlySignedUpClients() {
        await this.actionDriver.clickButton(manageClientsocators.recentlySignedUpClients);
    }

    async checkClientProspectsVisibility() {
        await this.actionDriver.checkElementVisibility(manageClientsocators.reviewClientProspects);
    }

    async navigateClientListing(){
        await this.actionDriver.clickButton(manageClientsocators.clientListing);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingOverlay);
        await this.actionDriver.checkElementVisibility(manageClientsocators.exportCurrentRecordsBtn);
    }

    async downloadExportCurrentRecords(page) {
        function getCurrentDate() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
          
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click(manageClientsocators.exportCurrentRecordsBtn)
        ]);
        const currentDate = getCurrentDate();
        const downloadedFileName = download.suggestedFilename();
        const expectedStartName = `client_list_${currentDate}_`;
        const expectedEndName = '.csv';

        expect(downloadedFileName).toMatch(new RegExp(`^${expectedStartName}.*${expectedEndName}`));
    }

    async clickAddClient(){  
        await this.actionDriver.clickButton(manageClientsocators.addNewClientButton);
    }

    async removeClientIfExisting(name) {
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.clientTableBody);
        await this.actionDriver.setText(manageClientsocators.search, name);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        const exists = this.actionDriver.elementVisible(manageClientsocators.CreatedClient);
        if(exists) {
            await this.actionDriver.clickButton(manageClientsocators.firstElipsis);
            await this.actionDriver.clickButton(manageClientsocators.firstDelete);
            await this.actionDriver.clickButton(manageClientsocators.deleteYes);
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.deletionProgress);
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        }
    }

    async ClickstartDateField(){  
        await this.actionDriver.clickButton(manageClientsocators.startDateField);
    }

    async ClickendDateField(){  
        await this.actionDriver.clickButton(manageClientsocators.endDataField);
    }

    async SelectCurrentDateforStartdate(){  
        await this.actionDriver.clickButton(manageClientsocators.SelectCurrentDateforStartdate)
    }

    async SelectNextMonthDateforEnddate(){  
        await this.actionDriver.clickButton(manageClientsocators.SelectNextMonthDateforEnddate);
    }

    async AddClientName(data){   
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.companyNameField);
        await this.actionDriver.setText(manageClientsocators.companyNameField, data);
    }

    async ClickCreateClientButton(){ 
        await this.actionDriver.clickButton(manageClientsocators.CreateClientButton);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.addNewClientTitle);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
    } 

    async ClickFirstElipsis(){ 
        await this.actionDriver.clickButton(manageClientsocators.firstElipsis);
    } 

    async ClickfirstDelete(){ 
        await this.actionDriver.clickButton(manageClientsocators.firstDelete);
    } 

    async ClickYES(){ 
        await this.actionDriver.clickButton(manageClientsocators.deleteYes);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
    } 

    async ClickCreatedClient(){  
        await this.actionDriver.clickButton(manageClientsocators.CreatedClient);
    }

    async ClickEditClient(){  
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.EditClient);
        await this.actionDriver.clickButton(manageClientsocators.EditClient);
    }

    async VerifyCompanyName(text){
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.editClientName);
        await this.actionDriver.checkVisibility(text);
    }      
           
    async SelectCountry(text){   
        await this.actionDriver.ElemetType(manageClientsocators.SelectCountry, text);
        await this.actionDriver.keyboardPress('Enter');
        await this.page.waitForTimeout(1000);
    }

    async SelectStates(text){   
        await this.actionDriver.ElemetType(manageClientsocators.SelectStates, text);
        await this.actionDriver.keyboardPress('Enter');
        await this.page.waitForTimeout(1000);
    }

    async SelectCity(text){   
        await this.actionDriver.ElemetType(manageClientsocators.SelectCity, text);
        await this.actionDriver.keyboardPress('Enter');
        await this.page.waitForTimeout(1000);
    }

    async NavigateContactTab(){  
        await this.actionDriver.clickButton(manageClientsocators.ContactTab);
    }

    async AddContact(){  
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.AddContact);
        await this.actionDriver.clickButton(manageClientsocators.AddContact);
    }

    async name(data){   
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.name);
        await this.actionDriver.setText(manageClientsocators.name, data);
        await this.page.waitForTimeout(1000);
    }

    async email(data){   
        await this.actionDriver.setText(manageClientsocators.email, data);
        await this.page.waitForTimeout(1000);
    }

    async number(data){   
        await this.actionDriver.setText(manageClientsocators.number, data);
        await this.page.waitForTimeout(1000);
    }

    async VerifyContactname(text){
       await this.actionDriver.ExpectElementValue(manageClientsocators.name, text);
    }

    async VerifyContactemail(text){
        await this.actionDriver.ExpectElementValue(manageClientsocators.email, text);
    }

    async Clickclose(){  
        await this.actionDriver.clickButton(manageClientsocators.close);
    }

    async navigateToPerformanceReview() {
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.performanceEvaluation);
        await this.actionDriver.clickButton(manageClientsocators.performanceEvaluation);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.perfNameList);
    }

    async selectEmployee(data) {
        const empName = data.firstName + ' ' + data.lastName;
        await this.actionDriver.selectDataFromText(empName, manageClientsocators.perfNameList, manageClientsocators.perfEvalButton);
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.evalModal);
    }

    async evaluate(evalData) {
        const grades = evalData.grading;
        const overAll = evalData.overallrating;
        for(let i=0 ; i<grades.length; i++) {
            if(grades[i] === 1) {
                await this.actionDriver.clickButton(`(${manageClientsocators.needsImprovement})[${i+1}]`);
            }
            if(grades[i] === 2) {
                await this.actionDriver.clickButton(`(${manageClientsocators.meetsExpectations})[${i+1}]`);
            }
            if(grades[i] === 3) {
                await this.actionDriver.clickButton(`(${manageClientsocators.exceedsExpectations})[${i+1}]`);
            }
        }
        if(overAll === 1) {
            await this.actionDriver.clickButton(manageClientsocators.overAllNeedsImprovement);
        }
        if(overAll === 2) {
            await this.actionDriver.clickButton(manageClientsocators.overAllmeetsExpectations);
        }
        if(overAll === 3) {
            await this.actionDriver.clickButton(manageClientsocators.overAllexceedsExpectations);
        }
    }

    async overAllComments(comment) {
        const frameHandle = await this.page.waitForSelector(manageClientsocators.commentsIframe);
        const frame = await frameHandle.contentFrame();

        if(frame) {
            await frame.type(manageClientsocators.commentsBody, comment);
        }
    }

    async validatePerfEvalModal(data) {
        const title = 'Performance Evaluation - ' + data.firstName + ' ' + data.lastName;
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.perfEvalModalTitle);
        const pageTitle = await this.actionDriver.getText(manageClientsocators.perfEvalModalTitle)
        await this.actionDriver.checkInclude(pageTitle, title);
    }

    async submitPerfEval() {
        await this.actionDriver.waitElementUntilClickable(manageClientsocators.submitPerfEvalBtn);
        await this.actionDriver.clickButton(manageClientsocators.submitPerfEvalBtn);
        const isVisible = await this.actionDriver.elementVisible(manageClientsocators.evalModal); 
        if(!isVisible) {
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        }
        
    }

    async cancelPerfEval() {
        await this.actionDriver.clickButton(manageClientsocators.cancelPerfEvalBtn);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.evalModal);
    }

    async validateCancel() {
        const visible = await this.actionDriver.elementVisible(manageClientsocators.evalModal);
        await this.actionDriver.expectFalse(visible);
    }

    async validateEvaluation(data) {
        const empName = data.firstName + ' ' + data.lastName;
        const title = 'View Performance Evaluation - ' + empName;
        await this.actionDriver.selectDataFromText(empName, manageClientsocators.nameListWithSubmittedEval, manageClientsocators.viewSubmissionBtns);
        const pageTitle = await this.actionDriver.getText(manageClientsocators.perfEvalModalTitle)
        await this.actionDriver.checkInclude(pageTitle, title);
    }

    async validateSubmitDisabled() {
        await this.actionDriver.expectDisabled(manageClientsocators.submitPerfEvalBtn);
    }

    async validateSubmitEnabled() {
        await this.actionDriver.expectEnabled(manageClientsocators.submitPerfEvalBtn);
    }
}