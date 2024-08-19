const findTalentLocators = require('../locators/findTalentLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { sleep } = require('../../utils/utility')

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
        await sleep(4000);
        await this.actionDriver.setText(findTalentLocators.enterSkillField, data);
        await this.actionDriver.expectToHaveCount(findTalentLocators.searchingLabel, 0);
        await this.actionDriver.clickButton(findTalentLocators.searchButton);
        await this.actionDriver.clickButton(findTalentLocators.enterSkillField);
        await this.actionDriver.selectFromList(data, findTalentLocators.searchItems);
        await this.actionDriver.expectToHaveCount(findTalentLocators.searchingLabel, 0);
    }

    async validateTalentFound() {
        const totalFound = await this.actionDriver.getText(findTalentLocators.weFoundCount);
        await this.actionDriver.expectToHaveCount(findTalentLocators.searchResult, Number(totalFound));
    }

    async selectFirstTalent() {
        await this.actionDriver.clickButton(findTalentLocators.firstTalent);
    }

    async validateProfileName() {
        await this.actionDriver.checkElementVisibility(findTalentLocators.profileName);
    }

    async addToTeam() {
        await this.actionDriver.clickButton(findTalentLocators.addToTeam);
        await this.page.waitForLoadState();
    }

    async showTalentDrawer() {
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
}