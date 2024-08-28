const loginLocators = require('../locators/loginLoc');
const homeLocators = require('../locators/homeLoc');
const myProfileLocators = require('../locators/myProfileLoc');
const myContactsLocators = require('../locators/myContactsLoc');
const ActionDriver = require('../../utils/ActionDriver');

exports.HomePage = class HomePage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async checkElementVisibility(element) {
        await this.actionDriver.checkElementVisibility(element);
    }

    async navigateMyProfile() {
        await this.actionDriver.clickButton(homeLocators.myProfileButton);
        await this.actionDriver.checkElementVisibility(myProfileLocators.technicalProfile);
    }

    async navigateMyContacts() {
        await this.actionDriver.clickButton(homeLocators.myContactButton);
        await this.actionDriver.checkElementVisibility(myContactsLocators.myContacts);
    }

    async checkSectionsVisibility(){
        await this.actionDriver.checkElementVisibility(homeLocators.dashboard);
        await this.actionDriver.checkElementVisibility(homeLocators.myTeam);
        await this.actionDriver.checkElementVisibility(homeLocators.eventsHoliday);
        await this.actionDriver.checkElementVisibility(homeLocators.savedSuggestedTalent);
    }

    async checkRightSidePanelsVisibility(){
        await this.actionDriver.checkElementVisibility(homeLocators.myProfileButton);
        await this.actionDriver.checkElementVisibility(homeLocators.myContactButton);
        await this.actionDriver.checkElementVisibility(homeLocators.findTalentButton);
        await this.actionDriver.checkElementVisibility(homeLocators.documentsAgreementButton);
        await this.actionDriver.checkElementVisibility(homeLocators.manageTeamButton);
        await this.actionDriver.checkElementVisibility(homeLocators.reportingButton);
        await this.actionDriver.checkElementVisibility(homeLocators.needHelpButton);
    }

    async openChangeTimeZone(){
        await this.actionDriver.clickButton(homeLocators.profileDropdown);
        await this.actionDriver.clickButton(homeLocators.changeTimeZone);
    }

    async updateTimeZone(timeZoneData){
        await this.actionDriver.clickButton(homeLocators.timeZoneSelection);
        await this.actionDriver.typeText(timeZoneData);
        await this.actionDriver.keyboardPress('Enter');
    }

    async closeTimeZoneModal(){
        await this.actionDriver.clickButton(homeLocators.closeTimeZoneModal);
    }

    async setTimeZone(){
        await this.actionDriver.clickButton(homeLocators.setTimeZoneButton);
    }

    async verifyTimeZone(timeZoneData){
        await this.actionDriver.expectEquals(timeZoneData, homeLocators.timeZoneField);
    }

    async navigateFindTalent(){
        await this.actionDriver.clickButton(homeLocators.findTalentButton);
        await this.page.waitForLoadState();
    }

    async navigateToSubmitFeedback(){
        await this.actionDriver.checkElementVisibility(homeLocators.submitFeedback)
        await this.actionDriver.clickButton(homeLocators.submitFeedback)
    }

    async navigateToFeedbackList(){
        await this.actionDriver.checkElementVisibility(homeLocators.feedbackList)
        await this.actionDriver.clickButton(homeLocators.feedbackList)

    }

    async isInHomePage(){
        await this.actionDriver.checkElementVisibility(homeLocators.homeButton)
    }

    async logout() {
        await this.actionDriver.checkElementVisibility(homeLocators.topDropdown)

        await this.actionDriver.clickButton(homeLocators.topDropdown)
        await this.actionDriver.clickButton(homeLocators.logoutLink)

        await this.actionDriver.checkElementVisibility(loginLocators.email)

    }
}