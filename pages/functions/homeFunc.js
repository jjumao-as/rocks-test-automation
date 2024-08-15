const homeLocators = require('../locators/homeLoc');
const myProfileLocators = require('../locators/myProfileLoc');
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

}