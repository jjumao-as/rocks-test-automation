const settingsLocators = require('../locators/settingsLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { sleep } = require('../../utils/utility')

exports.SettingsPage = class SettingsPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async searchUser(text){
        await this.actionDriver.setText(settingsLocators.searchUser, text);
        await this.actionDriver.keyboardPress('Enter');
        await sleep (5000);
    }

    async clickAssignRole(){
        await this.actionDriver.clickButton(settingsLocators.assignRole);
        await sleep (5000);
    }

    async setRole(testData){
        await this.actionDriver.toggleOff(settingsLocators.userRoleOnToggle, settingsLocators.userRolesToggle)
        await sleep(5000);
        const display = await this.actionDriver.checkDisplay(testData, settingsLocators.userRoles,  settingsLocators.userRoleOnToggle);
        if(display !== 'inline-block'){
            await this.actionDriver.selectDataFromText(testData, settingsLocators.userRoles, settingsLocators.userRolesToggle);
            await sleep (5000);
        }
        await this.actionDriver.keyboardPress('Escape');
    }

}