const settingsLocators = require('../locators/settingsLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { sleep } = require('../../utils/utility');
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

    async editWorkFlow() {
        await this.actionDriver.clickButton(settingsLocators.clientEnableAccessDropdown);
        await this.actionDriver.clickButton(settingsLocators.clientEnableAccessEditWorkFlow);
    }

    async saveEmailTo(testData) {
        await this.actionDriver.waitElementUntilVisible(settingsLocators.clientEnableAccessEmailTo);
        // Retrieve the content directly from the textbox using XPath
        let textVal = await this.actionDriver.getTextBoxValue(settingsLocators.clientEnableAccessEmailTo);

        let included = textVal.includes(testData); 

        while(!included) {
            await this.actionDriver.clickButton(settingsLocators.clientEnableAccessEmailTo);
            await this.actionDriver.keyboardPress('End');
            await this.actionDriver.typeText(", "+testData);
            await this.actionDriver.clickButton(settingsLocators.saveWorkFlow);
            await this.actionDriver.clickButton(settingsLocators.saveWorkFlow);
            await this.actionDriver.waitElementUntilVisible(settingsLocators.clientEnableAccessEmailTo);
            textVal = await this.actionDriver.getTextBoxValue(settingsLocators.clientEnableAccessEmailTo);
            included = textVal.includes(testData);
        }
    }

    async navigateToSkills() {
        await this.actionDriver.clickButton(settingsLocators.skillsTab);
    }
    
    async addNewSkill(testData) {
        newSkill = testData + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
        updateJsonData('settings', 'skill', newSkill);
        await this.actionDriver.clickButton(settingsLocators.addNewSkillsBtn);
        await this.actionDriver.setText(settingsLocators.skillName, newSkill);
        await this.actionDriver.clickButton(settingsLocators.addNewSkillSave);
    }

    async validateAddedSkill() { 
        await this.actionDriver.waitElementUntilHidden(settingsLocators.skillName);
        await this.actionDriver.setText(settingsLocators.searchSkill, newSkill);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilVisible(settingsLocators.skillNameList);
        await this.actionDriver.findText(newSkill, settingsLocators.skillNameList);
    }

    async deleteSkill(testData) {
        await this.actionDriver.waitElementUntilHidden(settingsLocators.skillName);
        await this.actionDriver.setText(settingsLocators.searchSkill, newSkill);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(settingsLocators.loadingRecords);
        await this.actionDriver.selectDataFromText(testData, settingsLocators.skillNameList, settingsLocators.deleteSkillList);
        await this.actionDriver.clickButton(settingsLocators.confirmDelete);
        await this.actionDriver.expectToHaveCount(settingsLocators.skillNameList, 0);
        
    }

}