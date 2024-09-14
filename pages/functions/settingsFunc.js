const settingsLocators = require('../locators/settingsLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { updateJsonData } = require('../../utils/jsonReader');

let newSkill;

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
        await this.actionDriver.waitElementUntilHidden(settingsLocators.loadingRecords);
        await this.actionDriver.waitElementUntilVisible(settingsLocators.searchSkill);
        await this.actionDriver.setText(settingsLocators.searchSkill, testData);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(settingsLocators.loadingRecords);
        await this.actionDriver.waitElementUntilClickable(settingsLocators.deleteSkillList);
        await this.actionDriver.selectDataFromText(testData, settingsLocators.skillNameList, settingsLocators.deleteSkillList);
        await this.actionDriver.clickButton(settingsLocators.confirmDelete);
        await this.actionDriver.expectToHaveCount(settingsLocators.skillNameList, 0);
        
    }

}