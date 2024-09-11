const clientPageLoc = require('../locators/clientLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { updateJsonData } = require('../../utils/jsonReader');
const { googleAPI } = require('../../utils/googleDriver');

let newEmail;

exports.ClientsPage = class ClientsPage {

    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async navigateToContacts() {
        await this.actionDriver.clickButton(clientPageLoc.clientContactsTab);
    }

    async addContact(testData, email) {
        const emailAdd = email.split('@');
        const randomNumber = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
        newEmail = emailAdd[0] + '+' + randomNumber + '@' + emailAdd[1];
        updateJsonData('settings', 'contacts>email', newEmail);
        await this.actionDriver.clickButton(clientPageLoc.addContactBtn);
        await this.actionDriver.setText(clientPageLoc.contactName, testData.firstName + " " + testData.lastName);
        await this.actionDriver.setText(clientPageLoc.contactEmail, newEmail);
        await this.actionDriver.waitElementUntilEnabled(clientPageLoc.enableLoginToggle);
        await this.changeStyle();
        await this.actionDriver.clickButton(clientPageLoc.enableLoginToggle);
        await this.actionDriver.clickButton(clientPageLoc.saveContact);
        await this.actionDriver.waitElementUntilHidden(clientPageLoc.contactName);
        await this.actionDriver.waitElementUntilHidden(clientPageLoc.loadingRecords);
    }

    async verifyContactAdded() {
        const result = await this.paginationCheck(newEmail, clientPageLoc.contactEmailColumnList);
        await this.actionDriver.expectTrue(result);
    }

    async changeStyle() {
        await this.page.evaluate(() => {
            const style = document.createElement('style');
            style.textContent = `
                    label.custom-control-label {
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                    }
                `;
            document.head.appendChild(style);
        });
    }

    async validateEmail() {
        const emailContent = await googleAPI(this.page);
        await this.page.setContent(emailContent[0].body.html);
        const hrefValue = await this.page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a'));
            const link = links.find(link => link.textContent.includes('Go To My Account'));
            return link ? link.href : null;
        });
        await this.page.goto(hrefValue);
    }

    async submitPassword(testData) {
        await this.actionDriver.setText(clientPageLoc.clientPass, testData);
        await this.actionDriver.setText(clientPageLoc.clientConfirmPass, testData);
        await this.actionDriver.clickButton(clientPageLoc.clientSignIn);
    }

    async validateLogin() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.dashboard);
    }

    async navigateTeamRequest() {
        await this.actionDriver.clickButton(clientPageLoc.teamRequestsTab);
    }

    async navigateTeamRequestSideTab() {
        await this.actionDriver.clickButton(clientPageLoc.teamRequestSideTab);
    }

    async searchTeamRequestTalent(testData) {
        await this.actionDriver.setText(clientPageLoc.searchByTalentFld, testData);
        await this.actionDriver.keyboardPress('Enter');
    }

    async searchUser(testData) {
        await this.actionDriver.setText(clientPageLoc.searchRequest, testData);
        await this.actionDriver.keyboardPress('Enter');
    }

    async searchTalent(testData) {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.searchByTalentFld);
        await this.actionDriver.setText(clientPageLoc.searchByTalentFld, testData);
        await this.actionDriver.keyboardPress('Enter');
    }

    async validateUser(testData) {
        const name = testData.firstName + " " + testData.lastName
        await this.actionDriver.findText(name, clientPageLoc.requestEmployeeName);
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.requestStatus);
        const rows = this.page.locator(clientPageLoc.requestStatus);
        await rows.first().waitFor();
        for (let j = 0; j < await rows.count(); j++) {
            const textContent = await rows.nth(j).textContent();
            const correctedContent = textContent.trim();
            if (correctedContent === newEmail) {
                await this.actionDriver.expectEquals(testData.status, rows.nth(j));
            }
        }
    }

    async validateUserFromTeamRequest(testData) {
        const name = testData.firstName + " " + testData.lastName
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.requestEmployeeName);
        await this.actionDriver.findText(name, clientPageLoc.requestEmployeeName);
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.teamRequestListStatus);
        const rows = this.page.locator(clientPageLoc.teamRequestListStatus);
        await rows.first().waitFor();
        for (let j = 0; j < await rows.count(); j++) {
            const textContent = await rows.nth(j).textContent();
            const correctedContent = textContent.replace(/Name\s*/g, '').trim();
            if (correctedContent === newEmail) {
                await this.actionDriver.expectEquals(testData.status, rows.nth(j));
            }
        }
    }

    async deleteRequest(testData) {
        const name = testData.firstName + " " + testData.lastName
        await this.actionDriver.waitElementUntilClickable(clientPageLoc.actionButton);
        await this.actionDriver.selectDataFromText(name, clientPageLoc.requestEmployeeName, clientPageLoc.actionButton);
        await this.actionDriver.selectDataFromText(name, clientPageLoc.requestEmployeeName, clientPageLoc.deleteRequest);
        await this.actionDriver.clickButton(clientPageLoc.confirmDeletion);
        this.searchTeamRequestTalent(name);
        await this.actionDriver.compareFromList(name, clientPageLoc.requestEmployeeName);
    }

    async deleteContact(testData) {
        await this.actionDriver.waitElementUntilHidden(clientPageLoc.loadingRecords);
        let existing = await this.paginationCheck(testData, clientPageLoc.contactEmailColumnList);
        if (existing) {
            await this.actionDriver.waitElementUntilClickable(clientPageLoc.contactActionColumnList);
            await this.actionDriver.selectDataFromTextwithNode(testData, clientPageLoc.contactEmailColumnList, clientPageLoc.contactActionColumnList);
            await this.actionDriver.selectDataFromTextwithNode(testData, clientPageLoc.contactEmailColumnList, clientPageLoc.contactDeleteList);
            await this.actionDriver.clickButton(clientPageLoc.confirmDeletion);
            await this.actionDriver.waitElementUntilHidden(clientPageLoc.deletionProgress);
            await this.actionDriver.waitElementUntilHidden(clientPageLoc.loadingRecords);
        }
        existing = await this.paginationCheck(testData, clientPageLoc.contactEmailColumnList);
        await this.actionDriver.expectFalse(existing);
    }

    async paginationCheck(text, elements) {
        let blnResult = false;
        let el;
        let isVisible = await this.actionDriver.elementVisible(clientPageLoc.paginationNextPage);
        let isLastPage = false;
        if (isVisible) {
            while (isVisible) {
                await this.actionDriver.waitElementUntilHidden(clientPageLoc.loadingRecords);
                el = await this.actionDriver.removeChildElement(elements);
                blnResult = await this.actionDriver.checkIfIncludesInArray(el, text);
                isLastPage = await this.actionDriver.elementVisible(clientPageLoc.paginationNextPage);
                if (blnResult) {
                    return true;
                }
                if(!blnResult && !isLastPage) {
                    return false;
                }
                await this.actionDriver.waitElementUntilVisible(clientPageLoc.paginationNextPage);
                isVisible = await this.actionDriver.elementVisible(clientPageLoc.paginationNextPage);
                await this.actionDriver.clickButton(clientPageLoc.paginationNextPage);
            }
        } else {
            await this.actionDriver.waitElementUntilHidden(clientPageLoc.loadingRecords);
            el = await this.actionDriver.removeChildElement(elements);
            blnResult = await this.actionDriver.checkIfIncludesInArray(el, text);
        }
        return blnResult;
    }
}