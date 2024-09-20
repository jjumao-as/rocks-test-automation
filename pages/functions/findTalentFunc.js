const findTalentLocators = require('../locators/findTalentLoc');
const ActionDriver = require('../../utils/ActionDriver');

exports.FindTalentPage = class FindTalentPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async checkElementsVisibility() {
        await this.actionDriver.checkElementVisibility(findTalentLocators.findTalentLabel);
        await this.actionDriver.checkElementVisibility(findTalentLocators.enterSkillField);
        await this.actionDriver.checkElementVisibility(findTalentLocators.talentDrawerButton);
    }

    async searchTalent(data) {
        await this.actionDriver.waitElementUntilHidden(findTalentLocators.loadingOverlay);
        await this.actionDriver.waitElementUntilHidden(findTalentLocators.searchingLabel);
        await this.actionDriver.clickButton(findTalentLocators.enterSkillField);
        await this.actionDriver.typeText(data);
        await this.actionDriver.selectFromList(data, findTalentLocators.searchItems);
        await this.actionDriver.waitElementUntilHidden(findTalentLocators.searchingLabel);
    }

    async validateTalentFound() {
        const totalFound = await this.actionDriver.getText(findTalentLocators.weFoundCount);
        await this.actionDriver.expectToHaveCount(findTalentLocators.searchResult, Number(totalFound));
    }

    async selectTalent() {
        await this.actionDriver.clickButton(findTalentLocators.firstTalent);
    }

    async validateProfileName() {
        await this.actionDriver.waitElementUntilVisible(findTalentLocators.profileName);
        await this.actionDriver.checkElementVisibility(findTalentLocators.profileName);
    }

    async addToTeam() {
        await this.actionDriver.waitElementUntilVisible(findTalentLocators.addToTeam);
        await this.actionDriver.clickButton(findTalentLocators.addToTeam);
        await this.page.waitForLoadState();
    }

    async showTalentDrawer() {
        await this.actionDriver.waitElementUntilClickable(findTalentLocators.talentDrawerButton);
        await this.actionDriver.clickButton(findTalentLocators.talentDrawerButton);
    }

    async validateAddedToTeam() {
        const profileFirstName = await this.actionDriver.getText(findTalentLocators.profileFirstName);
        const profileLastName = await this.actionDriver.getText(findTalentLocators.profileLastName);
        await this.actionDriver.findText(profileFirstName + ' ' + profileLastName.replace(/\./g, ''), findTalentLocators.pendingLists);
    }

    async removeToTeam() {
        await this.checkAttribure(findTalentLocators.sidePanel, "is-open", findTalentLocators.removeTalent);
    }

    async validateTalentRemoved() {
        await this.actionDriver.expectToHaveCount(findTalentLocators.removeTalent, 0);
    }

    async checkAttribure(sidepanel, additionalClass, removeItem) {
        const isDialogOpen = await this.page.evaluate(({selector, classname}) => {
            const dialog = document.querySelector(selector);
            return dialog && dialog.classList.contains(classname);
        }, {selector: sidepanel, classname: additionalClass});
        if(isDialogOpen){
            await this.page.evaluate(() => {
                const style = document.createElement('style');
                style.textContent = `
                    i.fs-x-btn {
                        width: 100px;
                        height: 100px;
                        display: inline-block;
                    }
                `;
                document.head.appendChild(style);
            });
            const elements = await this.page.$$(removeItem);
            for (const element of elements) {
                await element.click();
                await this.page.waitForTimeout(1000);
            }
        }
    }

    async compareList(testData){
        await this.actionDriver.waitElementUntilVisible(findTalentLocators.nameList);
        await this.actionDriver.scrollToBottom(findTalentLocators.noMoreRecords);
        await this.actionDriver.compareAndSelectList(testData, findTalentLocators.nameList, findTalentLocators.viewProfileButtonList);
        await this.actionDriver.waitElementUntilVisible(findTalentLocators.bookingSchedule);
    }

    async clickBookACall() { 
        await this.actionDriver.clickButton(findTalentLocators.bookaCall);
    }

    async selectTimeSlot(){
        await this.actionDriver.clickButton(findTalentLocators.firstTimeSlot);
    }

    async clickBookSchedule() {
        await this.actionDriver.clickButton(findTalentLocators.bookScheduleModalButton);
    }

    async verifyBooking() {
        await this.actionDriver.checkAllElementsVisibility(findTalentLocators.yourBookings);
    }

    async verifyTimeSlot(){
        await this.actionDriver.waitElementUntilVisible(findTalentLocators.bookingSchedule);
        const text = await this.actionDriver.getTextofLastElement(findTalentLocators.bookingSchedule);
        const splitText = await this.actionDriver.splitTextComma(text);
        await this.actionDriver.compareFromList(splitText[splitText.length - 1], findTalentLocators.timeSlots);
    }

    async verifySchedule(){
        const timeSlotSelected = await this.actionDriver.getText(findTalentLocators.firstTimeSlot);
        const bookingTimeSlot = await this.actionDriver.getText(findTalentLocators.bookingFooter);
        await this.actionDriver.checkInclude(timeSlotSelected, bookingTimeSlot);
    }

    async finishRequest() {
        await this.actionDriver.clickButton(findTalentLocators.finishRequest);
        await this.actionDriver.clickButton(findTalentLocators.submitAddToTeam);
    }

    async validateFinishingRequest() {
        await this.actionDriver.checkElementVisibility(findTalentLocators.successMessage);
        await this.actionDriver.clickButton(findTalentLocators.confirmSuccess);
    }
}