const myProfileLocators = require('../locators/myProfileLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { sleep } = require('../../utils/utility')

exports.MyProfilePage = class MyProfilePage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async checkElementsVisibility() {
        await this.actionDriver.checkElementVisibility(myProfileLocators.checkboxWebDevelopment);
        await this.actionDriver.checkElementVisibility(myProfileLocators.checkboxQATesting);
        await this.actionDriver.checkElementVisibility(myProfileLocators.checkboxMobileDevelopment);
    }

    async clickButton(element) {
        await this.actionDriver.clickButton(element);
    }

    async selectMultiple(data) {
        await this.actionDriver.selectMultipleElement(data);
    }

    async checkLabelsVisibility() {
        await this.actionDriver.clickButton(myProfileLocators.technicalProfile);
        await this.actionDriver.clickButton(myProfileLocators.helpWith);
        await this.actionDriver.clickButton(myProfileLocators.techUse);
        await this.actionDriver.clickButton(myProfileLocators.otherTech);
        await this.actionDriver.clickButton(myProfileLocators.currentlyOnTeam);
    }

    async untickAllCheckboxes() {
        // Create a locator for the elements matching the XPath
        const elementsLocator = this.page.locator(myProfileLocators.myProfileCheckboxes);

        // Ensure there are matching elements
        await elementsLocator.first().waitFor();

        // Get all matching elements
        const elementHandles = await elementsLocator.elementHandles();

        // Iterate over all element handles
        const checks = elementHandles.map(async (elementHandle) => {
            // Get the computed style of the ::after pseudo-element
            const afterContent = await this.page.evaluate(handle => {
                const computedStyle = window.getComputedStyle(handle, '::after');
                return computedStyle.getPropertyValue('display');
            }, elementHandle);

            // If the ::after pseudo-element has the 'flex' display, click the element
            if (afterContent === 'flex') {
                await this.page.evaluate(handle => handle.click(), elementHandle);
            }
        });

        // Wait for all checks to complete
         await Promise.all(checks);
    }
    async untickAllCheckboxesOnTeam() {
        // Create a locator for the elements matching the XPath
        const elementsLocator = this.page.locator(myProfileLocators.currentlyOnTeamCheckboxes);

        // Ensure there are matching elements
        await elementsLocator.first().waitFor();

        // Get all matching elements
        const elementHandles = await elementsLocator.elementHandles();

        // Iterate over all element handles
        const checks = elementHandles.map(async (elementHandle) => {
            // Get the computed style of the ::after pseudo-element
            const afterContent = await this.page.evaluate(handle => {
                const computedStyle = window.getComputedStyle(handle, '::after');
                return computedStyle.getPropertyValue('display');
            }, elementHandle);

            // If the ::after pseudo-element has the 'flex' display, click the element
            if (afterContent === 'flex') {
                await this.page.evaluate(handle => handle.click(), elementHandle);
            }
        });

        // Wait for all checks to complete
         await Promise.all(checks);
    }

    async checkElement(items) {
        for (const item of items) {
            const element = myProfileLocators.prefix + item + myProfileLocators.suffix;
            await this.actionDriver.clickButton(element);
        }
    }

    async inputTechUsed(data) {
        await this.actionDriver.clickButton(myProfileLocators.techUsedField);
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.type(data);
        await sleep(2000);
        await this.actionDriver.selectFromList(data, myProfileLocators.techUsedOptions);
        await this.actionDriver.clickButton(myProfileLocators.techUsedField);
    }

    async inputOtherTech(data) {
        await this.actionDriver.setText(myProfileLocators.otherTechField, data);
        await sleep(4000);
    }

    async saveUpdates() {
        await this.actionDriver.clickButton(myProfileLocators.profileSaveButton);
    }

    async navigateHome() {
        await this.actionDriver.clickButton(myProfileLocators.homePageButton);
    }

    async verifyTickedCheckboxes(items) {
        for (const item of items) {
            const element = myProfileLocators.prefix + String(item) + myProfileLocators.suffix + myProfileLocators.parentLabel;
            // Create a locator for the elements matching the XPath
            const elementsLocator = this.page.locator(element);

            // Get all matching elements
            const elementHandles = await elementsLocator.elementHandles();

            // Iterate over all element handles
            for (const elementHandle of elementHandles) {
                // Get the computed style of the ::after pseudo-element
                const afterContent = await this.page.evaluate(handle => {
                    const computedStyle = window.getComputedStyle(handle, '::after');
                    return computedStyle.getPropertyValue('display');
                }, elementHandle);

                expect(afterContent).toBe('flex');
            }
        }
    }
}