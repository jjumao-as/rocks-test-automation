const MyProfileIntLocators = require('../locators/myProfileIntLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { sleep } = require('../../utils/utility')

exports.MyProfileIntPage = class MyProfileIntPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async navigateEmployeeProfile() {
        const visible = await this.actionDriver.elementVisible(MyProfileIntLocators.clientSalesDashboard);
        if(visible) {
            await this.actionDriver.clickButton(MyProfileIntLocators.clientSalesDashboard);
        }
        await this.actionDriver.waitElementUntilVisible(MyProfileIntLocators.chart);
        await this.actionDriver.clickButton(MyProfileIntLocators.superAdminAvatar);
        await this.actionDriver.clickButton(MyProfileIntLocators.selectMyProfileOption);
    }

    async checkAvailableHeader(data) {
        await this.checkAvailableElements(MyProfileIntLocators.myHeaderElements, data);
    }

    async checkAvailableTabs(data) {
        await this.checkAvailableElements(MyProfileIntLocators.myProfileTabs, data);
    }

    async checkAvailableElements(elements, data) {
        await this.actionDriver.waitElementUntilVisible(elements);
        const textArray = await this.actionDriver.getTextArray(elements);
        const visibleElements = data.visible.every(item => textArray.includes(item));
        const hiddenElements = data.hidden.every(item => textArray.includes(item));
        await this.actionDriver.expectTrue(visibleElements);
        await this.actionDriver.expectFalse(hiddenElements);
    }

    async checkClientsIcon() {
        await this.actionDriver.expectEnabled(MyProfileIntLocators.clientsEditIcon);
    }

    async checkClientsIconHidden() {
        await this.actionDriver.checkHiddenElement(MyProfileIntLocators.clientsEditIcon);
    }

    async checkClientInterviewsIcon() {
        await this.actionDriver.expectEnabled(MyProfileIntLocators.clientInterviewsIcon);
    }

    async checkSkillsAndProficienciesIcon() {
        await this.actionDriver.expectEnabled(MyProfileIntLocators.skillsAndProfEditIcon);
    }

    async checkSkillsAndProficienciesIconHidden() {
        await this.actionDriver.checkHiddenElement(MyProfileIntLocators.skillsAndProfEditIcon);
    }

    async checkTalentProfileIconsHidden() {
        await this.actionDriver.checkHiddenElement(MyProfileIntLocators.talentProfileEditIcons);
    }

    async checkSpotLightSelectIconHidden() {
        await this.actionDriver.checkHiddenElement(MyProfileIntLocators.clientSpotLightSelectIcon);
    }

    async checkFilesAndAssetsSectionHidden() {
        await this.actionDriver.checkHiddenElement(MyProfileIntLocators.filesAndAssets);
    }

    async checkClientsTabEditIconsHidden() {
        await this.actionDriver.clickButton(MyProfileIntLocators.clientsTab);
        await this.actionDriver.checkHiddenElement(MyProfileIntLocators.clientsTabEditIcon);
    }

    async checkClientsNameLinksHidden() {
        await this.actionDriver.checkHiddenElement(MyProfileIntLocators.clientsNameLinks);
    }
}