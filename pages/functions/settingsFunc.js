const settingsLocators = require('../locators/settingsLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { updateJsonData } = require('../../utils/jsonReader');
const { googleAPI } = require('../../utils/googleDriver');
const { getLatestEmail } = require('../../utils/zohoDriver');

let newSkill;
let expenseIds = [];

exports.SettingsPage = class SettingsPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async searchUser(text) {
        await this.actionDriver.setText(settingsLocators.searchUser, text);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(settingsLocators.loadingRecords);
    }

    async clickAssignRole() {
        await this.actionDriver.clickButton(settingsLocators.assignRole);
        await this.actionDriver.waitElementUntilVisible(settingsLocators.userRolesToggle);
    }

    async setRole(testData) {
        await this.actionDriver.toggleOff(settingsLocators.userRoleOnToggle, settingsLocators.userRolesToggle)
        await this.actionDriver.waitElementUntilHidden(settingsLocators.currentRole);
        const display = await this.actionDriver.checkDisplay(testData, settingsLocators.userRoles, settingsLocators.userRoleOnToggle);
        if (display !== 'inline-block') {
            await this.actionDriver.selectDataFromText(testData, settingsLocators.userRoles, settingsLocators.userRolesToggle);
            await this.actionDriver.waitElementUntilVisible(settingsLocators.currentRole);
        }
        await this.actionDriver.keyboardPress('Escape');
    }

    async editWorkFlow(data) {
        await this.actionDriver.waitElementUntilClickable(settingsLocators.workFlowActionButton);
        await this.actionDriver.selectDataFromText(data, settingsLocators.workFlowName, settingsLocators.workFlowActionButton);
        await this.actionDriver.selectDataFromText(data, settingsLocators.workFlowName, settingsLocators.editWorkFlow);
    }

    async saveEmailTo(testData) {
        await this.actionDriver.waitElementUntilVisible(settingsLocators.emailToField);
        let textVal = await this.actionDriver.getTextBoxValue(settingsLocators.emailToField);
        let included = textVal.includes(testData); 
        while(!included) {
            await this.actionDriver.clickButton(settingsLocators.emailToField);
            await this.actionDriver.keyboardPress('End');
            await this.actionDriver.typeText(", "+testData);
            await this.actionDriver.clickButton(settingsLocators.saveWorkFlow);
            await this.actionDriver.waitElementUntilVisible(settingsLocators.emailToField);
            textVal = await this.actionDriver.getTextBoxValue(settingsLocators.emailToField);
            included = textVal.includes(testData);
            await this.actionDriver.clickButton(settingsLocators.saveWorkFlow);
            if(included) {
                await this.actionDriver.waitElementUntilHidden(settingsLocators.savingChanges);
                await this.actionDriver.waitElementUntilVisible(settingsLocators.templateUpdated);
                await this.actionDriver.waitElementUntilHidden(settingsLocators.templateUpdated);
                await this.actionDriver.waitElementUntilEnabled(settingsLocators.saveWorkFlow);
                await this.actionDriver.expectTrue(included);
            }
        }
    }

    async revertEmailTo(testData) {
        await this.actionDriver.waitElementUntilVisible(settingsLocators.emailToField);
        let textVal = await this.actionDriver.getTextBoxValue(settingsLocators.emailToField);
        let included = textVal.includes(testData); 
        while(included) {
            let items = textVal.split(/\s*,\s*/);
            let filteredItems = items.filter(item => item !== testData);
            let result = filteredItems.join(', ');
            await this.actionDriver.clickButton(settingsLocators.emailToField);
            await this.actionDriver.keyboardPress('Control+A');
            await this.actionDriver.keyboardPress('Delete');
            await this.actionDriver.typeText(result);
            await this.actionDriver.clickButton(settingsLocators.saveWorkFlow);
            await this.actionDriver.waitElementUntilVisible(settingsLocators.emailToField);
            textVal = await this.actionDriver.getTextBoxValue(settingsLocators.emailToField);
            included = textVal.includes(testData);
            await this.actionDriver.clickButton(settingsLocators.saveWorkFlow);
            if(!included) {
                await this.actionDriver.waitElementUntilHidden(settingsLocators.savingChanges);
                await this.actionDriver.waitElementUntilVisible(settingsLocators.templateUpdated);
                await this.actionDriver.waitElementUntilHidden(settingsLocators.templateUpdated);
                await this.actionDriver.waitElementUntilEnabled(settingsLocators.saveWorkFlow);
                await this.actionDriver.expectFalse(included);
            }
        }
    }

    async navigateToSkills() {
        await this.actionDriver.clickButton(settingsLocators.skillsTab);
    }
    
    async addNewSkill(testData) {
        let exist = true;
        while(exist) {
            newSkill = testData + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
            updateJsonData('settings', 'skill', newSkill);
            await this.actionDriver.clickButton(settingsLocators.addNewSkillsBtn);
            await this.actionDriver.setText(settingsLocators.skillName, newSkill);
            await this.actionDriver.clickButton(settingsLocators.addNewSkillSave);
            exist = await this.actionDriver.elementVisible(settingsLocators.skillTaken);
        }
    }

    async validateAddedSkill() { 
        await this.actionDriver.waitElementUntilHidden(settingsLocators.skillName);
        await this.actionDriver.setText(settingsLocators.searchSkill, newSkill);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilVisible(settingsLocators.skillNameList);
        await this.actionDriver.findText(newSkill, settingsLocators.skillNameList);
    }

    async deleteSkill(testData) {
        let isVisible = false;
        await this.actionDriver.waitElementUntilHidden(settingsLocators.loadingBg);
        await this.actionDriver.waitElementUntilVisible(settingsLocators.searchSkill);
        await this.actionDriver.setText(settingsLocators.searchSkill, testData);
        while(!isVisible) {
            await this.actionDriver.keyboardPress('Enter');
            await this.actionDriver.waitElementUntilHidden(settingsLocators.loadingBg);
            await this.actionDriver.waitElementUntilClickable(settingsLocators.deleteSkillList);
            await this.actionDriver.selectDataFromText(testData, settingsLocators.skillNameList, settingsLocators.deleteSkillList);
            isVisible = await this.actionDriver.elementVisible(settingsLocators.confirmDelete);
        }
        await this.actionDriver.clickButton(settingsLocators.confirmDelete);
        await this.actionDriver.expectToHaveCount(settingsLocators.skillNameList, 0);
        
    }

    async navigateToExpenseReportSettings () {
        await this.actionDriver.clickButton(settingsLocators.expenseReportTab);
    }

    async addRecipient(testData) {
        await this.actionDriver.waitElementUntilClickable(settingsLocators.editGeneralSetting);
        await this.actionDriver.waitElementUntilVisible(settingsLocators.expenseReportRecipient);
        let texts = await this.actionDriver.getTextArray(settingsLocators.expenseReportRecipient);
        let included = await this.actionDriver.checkIfIncludesInArray(texts, testData);
        while(!included) {
            await this.actionDriver.clickButton(settingsLocators.editGeneralSetting);
            await this.actionDriver.clickButton(settingsLocators.expenseReportRecipientField);
            await this.actionDriver.typeText(testData);
            await this.actionDriver.keyboardPress('Enter');
            await this.actionDriver.clickButton(settingsLocators.saveGeneralSettings);
            await this.actionDriver.waitElementUntilVisible(settingsLocators.editGeneralSetting);
            texts = await this.actionDriver.getTextArray(settingsLocators.expenseReportRecipient);
            included = await this.actionDriver.checkIfIncludesInArray(texts, testData);
        }
        await this.actionDriver.expectTrue(included);
    }

    async removeRecipient(testData) {
        await this.actionDriver.waitElementUntilClickable(settingsLocators.editGeneralSetting);
        await this.actionDriver.waitElementUntilVisible(settingsLocators.expenseReportRecipient);
        let texts = await this.actionDriver.getTextArray(settingsLocators.expenseReportRecipient);
        let included = await this.actionDriver.checkIfIncludesInArray(texts, testData);
        while(included) {
            await this.actionDriver.clickButton(settingsLocators.editGeneralSetting);
            await this.actionDriver.selectDataFromText(testData, settingsLocators.expenseReportRecipient, settingsLocators.removeExpenseReportRecipient);
            await this.actionDriver.clickButton(settingsLocators.saveGeneralSettings);
            await this.actionDriver.waitElementUntilVisible(settingsLocators.editGeneralSetting);
            texts = await this.actionDriver.getTextArray(settingsLocators.expenseReportRecipient);
            included = await this.actionDriver.checkIfIncludesInArray(texts, testData);
        }
        await this.actionDriver.expectFalse(included);
    }

    async validateEmail(email) {
        for(let i=0 ; i<email.subjects.length ; i++) {
            const subject = email.subjects[i];
            let emailContent;
            for(let j=1 ; j<=3; j++) {
                emailContent = await googleAPI(subject, email.from);
                if(emailContent !== null) {
                    break;
                }
                await this.page.waitForTimeout(1000);
            }
            const empty = emailContent === null ? true : false;
            if(!empty) {
                const emailSubject = emailContent[0].subject;
                const match = emailSubject.match(/Expense ID: (\d+)/);
                if(match) {
                    const expenseId = match[1];
                    expenseIds.push(expenseId);
                }
                await this.actionDriver.checkInclude(subject, emailSubject)
            }
            await this.actionDriver.expectFalse(empty);
        }
    }

    async validateZohoEmail(email) {
        for(let i=0 ; i<email.subjects.length ; i++) {
            const subject = email.subjects[i];
            let emailContent;
            for(let j=1 ; j<=3; j++) {
                emailContent = await getLatestEmail(subject, email.from);
                if(emailContent !== null) {
                    break;
                }
                await this.page.waitForTimeout(1000);
            }
            const empty = emailContent === null ? true : false;
            if(!empty) {
                const emailSubject = emailContent.subject;
                const match = emailSubject.match(/Expense ID: (\d+)/);
                if(match) {
                    const expenseId = match[1];
                    expenseIds.push(expenseId);
                }
                await this.actionDriver.checkInclude(subject, emailSubject)
            }
            await this.actionDriver.expectFalse(empty);
        }
    }

    async validateExpenseReports() {
        await this.actionDriver.clickButton(settingsLocators.expenseReportsTab);
        await this.actionDriver.waitElementUntilHidden(settingsLocators.loadingRecords);
        await this.actionDriver.waitElementUntilHidden(settingsLocators.tableMask);
        for(let i=0 ; i<expenseIds.length ; i++) {
            const expenseId = expenseIds[i];
            await this.actionDriver.setText(settingsLocators.searchExpenseId, expenseId);
            await this.actionDriver.keyboardPress('Enter');
            await this.actionDriver.waitElementUntilHidden(settingsLocators.loadingRecords);
            await this.actionDriver.waitElementUntilHidden(settingsLocators.tableMask);
            await this.actionDriver.expectEquals(expenseId, settingsLocators.expenseId);
        }
    }

    async navigateWeeklyFloorReport() {
        await this.actionDriver.clickButton(settingsLocators.weeklyFloorReports);
        await this.actionDriver.waitElementUntilVisible(settingsLocators.reportRow);
    }

    async searchUser(name) {
        const firstName = name.split(" ");
        await this.actionDriver.setText(settingsLocators.searchReport, firstName[0]);
        await this.actionDriver.waitElementUntilHidden(settingsLocators.fetchingReport);
    }

    async validateReport(reportDetails, reportType) {
        const rows = await this.page.locator(settingsLocators.reportRow);
        const reporter = await this.page.locator(settingsLocators.reporterName);
        const project = await this.page.locator(settingsLocators.projectName);
        let pName = "";
        let flag = "";

        if(reportType === "green") {
            pName = reportDetails.greenClientName;
            flag = "flag-3";
        }
        if(reportType === "orange") {
            pName = reportDetails.orangeClientName;
            flag = "flag-2";
        }
        if(reportType === "red") {
            pName = reportDetails.redClientName;
            flag = "flag-1";
        }

        for(let i=0; i< await rows.count(); i++) {
            const reporterName = reporter.nth(i);
            const reporterNameText = await reporterName.textContent();
            const projectName = project.nth(i);
            const projectNameText = await projectName.textContent();
            if(reporterNameText.trim().toLowerCase() === reportDetails.name && 
            projectNameText.trim().toLowerCase() === pName) {
                const attr = await this.getClassValue(rows.nth(i));
                const isCorrect = await this.actionDriver.checkIfIncludesInArray(attr, flag);
                await this.actionDriver.expectTrue(isCorrect);
            }
        }
    }
    
    async getClassValue(element) {
        return await element.getAttribute('class');
    }

}