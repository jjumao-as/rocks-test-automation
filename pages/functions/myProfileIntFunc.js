import { expect } from 'playwright/test';
const MyProfileIntLocators = require('../locators/myProfileIntLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { sleep } = require('../../utils/utility')

exports.MyProfileIntPage = class MyProfileIntPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async navigateEmployeeProfile() {
        await sleep(10000);
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
        await sleep(10000);
        const textArray = await this.actionDriver.getTextArray(elements);
        const visibleElements = data.visible.every(item => textArray.includes(item));
        const hiddenElements = data.hidden.every(item => textArray.includes(item));
        console.log("Visible Elements");
        console.log(data.visible);
        console.log("Hidden Elements");
        console.log(data.hidden);
        await this.actionDriver.expectTrue(visibleElements);
        await this.actionDriver.expectFalse(hiddenElements);
    }

    async checkClientsIcon() {
        await this.actionDriver.checkEnabledElement(MyProfileIntLocators.clientsEditIcon);
    }

    async checkClientsIconHidden() {
        await this.actionDriver.checkHiddenElement(MyProfileIntLocators.clientsEditIcon);
    }

    async checkClientInterviewsIcon() {
        await this.actionDriver.checkEnabledElement(MyProfileIntLocators.clientInterviewsIcon);
    }

    async checkSkillsAndProficienciesIcon() {
        await this.actionDriver.checkEnabledElement(MyProfileIntLocators.skillsAndProfEditIcon);
    }

    async checkSkillsAndProficienciesIconHidden() {
        await this.actionDriver.checkHiddenElement(MyProfileIntLocators.skillsAndProfEditIcon);
    }

    async checkTalentProfileIconsHidden() {
        await this.actionDriver.checkHiddenElement(MyProfileIntLocators.talentProfileEditIcons);
    }

    async checkAllVisibleElements() {
        await this.actionDriver.checkAllElementsVisibility(MyProfileIntLocators.talentProfileEditIcons);
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
}