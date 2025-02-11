import { expect } from '@playwright/test';
const clientPageLoc = require('../locators/clientLoc');
const ActionDriver = require('../../utils/ActionDriver');
const loginLocators = require('../locators/loginLoc');
const { updateJsonData } = require('../../utils/jsonReader');
const { getLatestEmail } = require('../../utils/zohoDriver');
const dashboardLoc = require('../locators/dashboardLoc');

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
        if (!emailAdd[1].includes('fullscale')) {
            await this.actionDriver.waitElementUntilEnabled(clientPageLoc.enableLoginToggle);
            await this.changeStyle();
            await this.actionDriver.clickButton(clientPageLoc.enableLoginToggle);
        }
        await this.actionDriver.clickButton(clientPageLoc.saveContact);
        await this.actionDriver.waitElementUntilHidden(clientPageLoc.contactName);
        await this.actionDriver.waitElementUntilHidden(clientPageLoc.loadingRecords);
        await this.actionDriver.waitElementUntilHidden(clientPageLoc.contactSavedNotification)

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

    async validateZohoEmail(subject, from) {
        let emailContent;
        for (let i = 1; i <= 3; i++) {
            emailContent = await getLatestEmail(subject, from);
            if (emailContent !== null) {
                break;
            }
        }
        const empty = emailContent === null ? true : false;
        if (!empty) {
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
                await this.actionDriver.expectEquals(status, `(${clientPageLoc.requestStatus})[${j + 1}]`);
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
                await this.actionDriver.expectEquals(status, `(${clientPageLoc.teamRequestListStatus})[${j + 1}]`);
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
            await this.actionDriver.waitElementUntilClickable(clientPageLoc.contactDeleteList);
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
                await this.page.waitForTimeout(5000);
                // await this.actionDriver.waitElementUntilHidden(clientPageLoc.loadingRecords);
                await this.actionDriver.waitElementUntilVisible(elements);
                el = await this.actionDriver.getTextArray(elements);
                el = el.map(e => e.trim())
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
            // await this.actionDriver.waitElementUntilHidden(clientPageLoc.loadingRecords);
            await this.actionDriver.waitElementUntilVisible(elements);
            await this.page.waitForTimeout(5000);
            el = await this.actionDriver.getTextArray(elements);
            el = el.map(e => e.trim())
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

    async validateTooltip() {
        const visible = await this.actionDriver.elementVisible(clientPageLoc.tooltip);
        await this.actionDriver.expectTrue(visible);
    }

    async validateNoTooltip() {
        const visible = await this.actionDriver.elementVisible(clientPageLoc.tooltip);
        await this.actionDriver.expectFalse(visible);
    }

    async hoverMyProfile() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.myProfile);
        await this.actionDriver.hoverElement(clientPageLoc.myProfile);
        await this.validateTooltip();
    }

    async hoverMyContacts() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.myContacts);
        await this.actionDriver.hoverElement(clientPageLoc.myContacts);
        await this.validateTooltip();
    }

    async hoverFindTalent() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.findTalent);
        await this.actionDriver.hoverElement(clientPageLoc.findTalent);
        await this.validateTooltip();
    }

    async hoverDocumentsAgreements() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.docsandAgreements);
        await this.actionDriver.hoverElement(clientPageLoc.docsandAgreements);
        await this.validateTooltip();
    }

    async hoverManageTeam() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.manageTeam);
        await this.actionDriver.hoverElement(clientPageLoc.manageTeam);
        await this.validateTooltip();
    }

    async hoverPerformanceReview() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.performanceReview);
        await this.actionDriver.hoverElement(clientPageLoc.performanceReview);
        await this.validateTooltip();
    }

    async hoverNeedHelp() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.needHelp);
        await this.actionDriver.hoverElement(clientPageLoc.needHelp);
        await this.validateTooltip();
    }

    async hoverReports() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.dailyStatusReport);
        await this.actionDriver.hoverElement(clientPageLoc.dailyStatusReport);
        await this.validateNoTooltip();
        await this.actionDriver.hoverElement(clientPageLoc.dailyTimeClockReport);
        await this.validateNoTooltip();
        await this.actionDriver.hoverElement(clientPageLoc.weeklyTimeClockReport);
        await this.validateNoTooltip();
        await this.actionDriver.hoverElement(clientPageLoc.timeClockSummaryReport);
        await this.validateNoTooltip();
    }

    async navigateToPage(pageName) {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.clientPagesName);
        await this.actionDriver.selectDataFromText(pageName, clientPageLoc.clientPagesName, clientPageLoc.clientPagesName);
    }

    async verifyURL(expectedURL) {
        const currentURL = await this.page.url();
        const url = new URL(currentURL);
        const result = url.pathname + url.search === expectedURL ? true : false;
        await this.actionDriver.expectTrue(result);
    }

    async validateMyProfilePage() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.technicalProfile);
        await this.actionDriver.checkElementVisibility(clientPageLoc.technicalProfile);
    }

    async validateMyContactPage() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.myContactsHeader);
        await this.actionDriver.checkElementVisibility(clientPageLoc.myContactsHeader);
    }

    async validateFindTalentPage() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.findTalentHeader);
        await this.actionDriver.checkElementVisibility(clientPageLoc.findTalentHeader);
    }

    async validateDocumentsPage() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.clientDocumentsAgreementsHeader);
        await this.actionDriver.checkElementVisibility(clientPageLoc.clientDocumentsAgreementsHeader);
    }

    async validateManageTeamPage() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.manageTeamHeader);
        await this.actionDriver.checkElementVisibility(clientPageLoc.manageTeamHeader);
    }

    async validatePerformanceReviewPage() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.performanceReviewHeader);
        await this.actionDriver.checkElementVisibility(clientPageLoc.performanceReviewHeader);
    }

    async validateDailyStatusPage() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.dailyStatusReportHeader);
        await this.actionDriver.checkElementVisibility(clientPageLoc.dailyStatusReportHeader);
    }

    async validateDailyTimePage() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.dailyTimeClockReportHeader);
        await this.actionDriver.checkElementVisibility(clientPageLoc.dailyTimeClockReportHeader);
    }

    async validateWeeklyTimePage() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.weeklyTimeReportHeader);
        await this.actionDriver.checkElementVisibility(clientPageLoc.weeklyTimeReportHeader);
    }

    async validateTimeClockSummaryPage() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.timeClockSummaryHeader);
        await this.actionDriver.checkElementVisibility(clientPageLoc.timeClockSummaryHeader);
    }

    async navigateToHome() {
        await this.actionDriver.waitElementUntilClickable(clientPageLoc.homePageButton);
        await this.actionDriver.clickButton(clientPageLoc.homePageButton);
    }

    async validateSideTabs(data) {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.clientPagesName);
        const textArray = await this.actionDriver.getTextArray(clientPageLoc.clientPagesName);
        const visibleText = await data.every(item => textArray.includes(item));
        await this.actionDriver.expectTrue(visibleText);
    }

    async validateFindAddTalent() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.findAddTalentBtn);
        await this.actionDriver.checkElementVisibility(clientPageLoc.findAddTalentBtn);
        await this.actionDriver.clickButton(clientPageLoc.findAddTalentBtn);
    }

    async validateBackToManageTeam() {
        await this.actionDriver.checkElementVisibility(clientPageLoc.manageTeamBtn);
        await this.actionDriver.clickButton(clientPageLoc.manageTeamBtn);
    }

    async validateTalentCount() {
        await this.actionDriver.scrollToBottom(clientPageLoc.noMoreRecords);
        const number = await this.actionDriver.getText(clientPageLoc.talentCount);
        const formattedNumber = Number(number);
        await this.actionDriver.expectToHaveCount(clientPageLoc.nameList, formattedNumber);
    }

    async validateAvailableTalentButtons() {
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.saveSelectedProfile);
        await this.actionDriver.checkElementVisibility(clientPageLoc.saveSelectedProfile);
        await this.actionDriver.checkElementVisibility(clientPageLoc.bookaCall);
        await this.actionDriver.checkElementVisibility(clientPageLoc.addToTeam);
        await this.actionDriver.clickButton(clientPageLoc.closeModal);
    }

    async validateSavedSuggested(title) {
        await this.actionDriver.scrollToBottom(clientPageLoc.heartBtn);
        await this.actionDriver.waitElementUntilClickable(clientPageLoc.heartBtn);
        const firstElement = await this.page.$(clientPageLoc.heartBtn);
        if (firstElement) {
            let attributeValue = await firstElement.getAttribute('title');
            let containsWord = attributeValue && attributeValue.includes(title);
            if(!containsWord) {
                await this.actionDriver.clickButton(clientPageLoc.saveTalent);
                await this.page.waitForTimeout(5000);
                attributeValue = await firstElement.getAttribute('title');
                containsWord = attributeValue && attributeValue.includes(title);
            }
            await this.actionDriver.expectTrue(containsWord);
        }
    }

    async sortDate(dateList) {
        const trimmedDates = dateList.map(date => date.trim());
        const sortedDates = trimmedDates.sort((a, b) => {
            return new Date(b) - new Date(a);
        })
        return sortedDates;
    }

    async sortDateRange(dateRange) {

        const currentYear = new Date().getFullYear();

        const parseDateRange = (range) => {
            const [start, end] = range.split(' - ').map(date => new Date(`${date.trim()}, ${currentYear}`)); // Add year for parsing
            return { start, end, range };
        };

        const sortedDateRanges = dateRange
            .map(parseDateRange) // Convert ranges to objects
            .sort((a, b) => a.start - b.start) // Sort by start date
            .map(item => item.range); // Return back to original range format


        return sortedDateRanges;
    }

    async validateSortedDate() {
        const textArray = await this.actionDriver.getTextArray(clientPageLoc.dailyDate);
        const sortedDates = await this.sortDate(textArray);

        const areDatesEqual = textArray.length === sortedDates.length && textArray.every((date, index) => {
            return new Date(date.trim()).getTime() === new Date(sortedDates[index].trim()).getTime();
        });

        await this.actionDriver.expectTrue(areDatesEqual);
    }

    async validateLatestReport() {
        await this.actionDriver.waitElementUntilHidden(clientPageLoc.loadingRecords);
        await this.actionDriver.waitElementUntilVisible(clientPageLoc.latestTimeClockDate);
        const textArray = await this.actionDriver.getTextArray(clientPageLoc.timeClockDate);
        const sortedDates = await this.sortDate(textArray);
        await this.actionDriver.expectEquals(sortedDates[0], clientPageLoc.latestTimeClockDate);
        await this.actionDriver.expectElementNotToBeEmpty(clientPageLoc.latestTimeIn);
        await this.actionDriver.expectElementNotToBeEmpty(clientPageLoc.latestTimeOut);
    }

    async validateTimeClockReport() {
        const el = await this.actionDriver.elementVisible(clientPageLoc.noReportsAvailable);
        if(el) {
            await this.actionDriver.clickButton(clientPageLoc.monthField);
            await this.actionDriver.clickButton(clientPageLoc.monthSelection);
        }

        await this.actionDriver.waitElementUntilVisible(clientPageLoc.latestWeeklyTimeDate);
        const textArray = await this.actionDriver.getTextArray(clientPageLoc.weeklyTimeDates);
        const sortedDateRanges = await this.sortDateRange(textArray);
        await this.actionDriver.expectEquals(sortedDateRanges[0], clientPageLoc.latestWeeklyTimeDate);
        await this.actionDriver.clickButton(clientPageLoc.latestWeeklyTimeDate);
        await this.actionDriver.checkAllElementsVisibility(clientPageLoc.employeeNameList);
    }

    async validateTimeClockSummaryReport(type) {
        for(const t of type) {
            await this.actionDriver.clickButton(clientPageLoc.exportCurrentRecordReportBtn);
            if(t === 'csv') {
                await this.actionDriver.clickButton(clientPageLoc.csvBtn);
            } else {
                await this.actionDriver.clickButton(clientPageLoc.xlsxBtn);
            }

            await this.downloadExportCurrentRecords(t);
        }
    }

    async downloadExportCurrentRecords(type) {
        function getCurrentDate() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.click(clientPageLoc.exportBtn)
        ]);
        const currentDate = getCurrentDate();
        const downloadedFileName = download.suggestedFilename();
        const expectedStartName = `monthly_tsheets_${currentDate}_`;
        const expectedEndName = `.${type}`;

        expect(downloadedFileName).toMatch(new RegExp(`^${expectedStartName}.*${expectedEndName}`));
    }
}