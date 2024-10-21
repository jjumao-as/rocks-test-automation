const clientPageLoc = require('../locators/clientLoc');
const ActionDriver = require('../../utils/ActionDriver');
const loginLocators = require('../locators/loginLoc');
const { updateJsonData } = require('../../utils/jsonReader');
const { googleAPI } = require('../../utils/googleDriver');
const { getLatestEmail } = require('../../utils/zohoDriver');

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
        if(!emailAdd[1].includes('fullscale')){
            await this.actionDriver.waitElementUntilEnabled(clientPageLoc.enableLoginToggle);
            await this.changeStyle();
            await this.actionDriver.clickButton(clientPageLoc.enableLoginToggle);
        }
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

    async validateEmail(subject, from) {
        let emailContent;
        for(let i=1; i<=3; i++){
            emailContent = await googleAPI(subject, from);
            if(emailContent !== null) {
                break;
            }
        }
        const empty = emailContent === null ? true : false;
        if(!empty) {
            await this.page.setContent(emailContent[0].body.html);
            const emailSubject = emailContent[0].subject;
            if (subject.includes('Welcome')) {
                const hrefValue = await this.page.evaluate(() => {
                    const links = Array.from(document.querySelectorAll('a'));
                    const link = links.find(link => link.textContent.includes('Go To My Account'));
                    return link ? link.href : null;
                });
                await this.page.goto(hrefValue);
            } else {
                await this.actionDriver.checkInclude(subject, emailSubject)
            }
        }
        await this.actionDriver.expectFalse(empty);
    }

    async validateZohoEmail(subject, from) {
        let emailContent;
        for(let i=1; i<=3; i++){
            emailContent = await getLatestEmail(subject, from);
            if(emailContent !== null) {
                break;
            }
        }
        const empty = emailContent === null ? true : false;
        if(!empty) {
            await this.page.setContent(emailContent.content);
            const emailSubject = emailContent.subject;
            if (subject.includes('Welcome')) {
                const hrefValue = await this.page.evaluate(() => {
                    const links = Array.from(document.querySelectorAll('a'));
                    const link = links.find(link => link.textContent.includes('Go To My Account'));
                    return link ? link.href : null;
                });
                await this.page.goto(hrefValue);
            } else {
                await this.actionDriver.checkInclude(subject, emailSubject)
            }
        }
        await this.actionDriver.expectFalse(empty);
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

    async validateUser(testData, status) {
        const name = testData.firstName + " " + testData.lastName
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.requestEmployeeName);
        await this.actionDriver.findText(name, clientPageLoc.requestEmployeeName);
        const rows = this.page.locator(clientPageLoc.requestEmployeeName);
        await rows.first().waitFor();
        for (let j = 0; j < await rows.count(); j++) {
            const textContent = await rows.nth(j).textContent();
            const correctedContent = textContent.trim();
            if (correctedContent === name) {
                await this.actionDriver.expectEquals(status, `(${clientPageLoc.requestStatus})[${j+1}]`);
            }
        }
    }

    async validateUserFromTeamRequest(testData, status) {
        const name = testData.firstName + " " + testData.lastName
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.teamRequestListName);
        await this.actionDriver.findText(name, clientPageLoc.teamRequestListName);
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.teamRequestListStatus);
        const rows = this.page.locator(clientPageLoc.teamRequestListName);
        await rows.first().waitFor();
        for (let j = 0; j < await rows.count(); j++) {
            const textContent = await rows.nth(j).textContent();
            const correctedContent = textContent.replace(/Name\s*/g, '').trim();
            if (correctedContent === name) {
                await this.actionDriver.expectEquals(status, `(${clientPageLoc.teamRequestListStatus})[${j+1}]`);
            }
        }
    }

    async deleteRequest(testData) {
        const name = testData.firstName + " " + testData.lastName
        await this.actionDriver.waitElementUntilClickable(clientPageLoc.actionButton);
        await this.actionDriver.selectDataFromText(name, clientPageLoc.teamRequestListName, clientPageLoc.actionButton);
        await this.actionDriver.selectDataFromText(name, clientPageLoc.teamRequestListName, clientPageLoc.deleteRequest);
        await this.actionDriver.clickButton(clientPageLoc.confirmDeletion);
        await this.searchTeamRequestTalent(name);
        await this.actionDriver.compareFromList(name, clientPageLoc.teamRequestListName);
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
                if (!blnResult && !isLastPage) {
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

    async validateClientPage() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.dashboard);
        await this.actionDriver.checkElementVisibility(clientPageLoc.maleAvatar);
        await this.actionDriver.checkElementVisibility(clientPageLoc.eventsHoliday);
    }

    async logout() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.clientTopDropdown)

        await this.actionDriver.clickButton(clientPageLoc.clientTopDropdown)
        await this.actionDriver.clickButton(clientPageLoc.clientLogout)

        await this.actionDriver.checkElementVisibility(loginLocators.email)
    }
}