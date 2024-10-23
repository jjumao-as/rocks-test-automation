const dashboardLocators = require('../locators/dashboardLoc');
const settingsLocators = require('../locators/settingsLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { text } = require('stream/consumers');

exports.DashboardPage = class DashboardPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async checkWelcomeMessage(){
        await this.actionDriver.checkElementVisibility(dashboardLocators.whatWouldYouLike);
    }

    async search(data){
        await this.actionDriver.setText(dashboardLocators.searchRocks, data);
    }

    async viewSearchResult(){
        await this.actionDriver.clickButton(dashboardLocators.searchFirstRow);
    }

    async clickNotification() {
        await this.actionDriver.clickButton(dashboardLocators.notificationButton);
    }

    async viewNotification() {
        await this.actionDriver.clickButton(dashboardLocators.viewNotification);
    }

    async clickAvatar() { 
        await this.actionDriver.clickButton(dashboardLocators.avatar);
    }

    async validateProfileOptions(testData) {
        await this.actionDriver.validateEachTextFromList(testData, dashboardLocators.profileOptions);
    }

    async navigateAnnouncementFaqs() {
        await this.actionDriver.clickButton(dashboardLocators.announcements);
    }

    async navigateFindTalent() {
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.employeesSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseEmployees);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseEmployees);
        }
        await this.actionDriver.clickButton(dashboardLocators.findTalents);
    }

    async checkElementAnnouncementVisibility(){
        await this.actionDriver.checkElementVisibility(dashboardLocators.employeeResources);
        await this.actionDriver.checkAllElementsVisibility(dashboardLocators.announcements);
    }

    async checkSearchResultOfResignedEmployee(){
        const result = await this.actionDriver.elementVisible(dashboardLocators.searchFirstRow);
        await this.actionDriver.expectFalse(result);
    }

    async checkValidSearchResult(){
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.searchFirstRow);
        const result = await this.actionDriver.elementVisible(dashboardLocators.searchFirstRow);
        await this.actionDriver.expectTrue(result);
    }

    async verifyClient(){
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.clientName);
        const result = await this.actionDriver.elementVisible(dashboardLocators.clientName);
        await this.actionDriver.expectTrue(result);
    }

    async verifyTalent(){
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.talentName);
        const result = await this.actionDriver.elementVisible(dashboardLocators.talentName);
        await this.actionDriver.expectTrue(result);
    }

    async deleteFloorManager(){
        await this.actionDriver.clickButton(dashboardLocators.floorManager);
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.emptyFloorManager);
        await this.actionDriver.clickButton(dashboardLocators.emptyFloorManager);
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.saveSuccessfully);
    }

    async navigateToUsers(){
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.settingsSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseSettings);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseSettings);
        }
        await this.actionDriver.clickButton(dashboardLocators.users);
        await this.actionDriver.waitElementUntilVisible(settingsLocators.searchUser);
    }

    async navigateProcessWorkFlow(){
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.settingsSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseSettings);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseSettings);
        }
        await this.actionDriver.clickButton(dashboardLocators.processWorkflow);
    }

    async validateSideTabs(data) {
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.home);
        const textArray = await this.actionDriver.getTextArray(dashboardLocators.allSideTabs);
        const removeTrailingNumbers = (str) => str.replace(/\s*\(\d+\)\s*/, '');
        const transformedTextArray = textArray.map(removeTrailingNumbers);
        const visibleText = await data.visible.every(item => transformedTextArray.includes(item));
        const hiddenText = await data.hidden.every(item => transformedTextArray.includes(item));
        await this.actionDriver.expectTrue(visibleText);
        await this.actionDriver.expectFalse(hiddenText);
    }   
}