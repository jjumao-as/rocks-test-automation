const manageClientsocators = require('../locators/manageClientsLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { expect } = require('@playwright/test');
const { readJsonFile } = require('../../utils/jsonReader')

let updatedJson;

exports.ManageClientsPage = class ManageClientsPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async navigateRecentlySignedUpClients() {
        await this.actionDriver.clickButton(manageClientsocators.recentlySignedUpClients);
    }

    async checkClientProspectsVisibility() {
        await this.actionDriver.checkElementVisibility(manageClientsocators.reviewClientProspects);
    }

    async navigateClientListing() {
        await this.actionDriver.clickButton(manageClientsocators.clientListing);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingOverlay);
        await this.actionDriver.checkElementVisibility(manageClientsocators.exportCurrentRecordsBtn);
    }

    async downloadExportCurrentRecords(page) {
        function getCurrentDate() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click(manageClientsocators.exportCurrentRecordsBtn)
        ]);
        const currentDate = getCurrentDate();
        const downloadedFileName = download.suggestedFilename();
        const expectedStartName = `client_list_${currentDate}_`;
        const expectedEndName = '.csv';

        expect(downloadedFileName).toMatch(new RegExp(`^${expectedStartName}.*${expectedEndName}`));
    }

    async clickAddClient() {
        await this.actionDriver.clickButton(manageClientsocators.addNewClientButton);
    }

    async removeClientIfExisting(name) {
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.clientTableBody);
        await this.actionDriver.setText(manageClientsocators.search, name);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        const exists = this.actionDriver.elementVisible(manageClientsocators.CreatedClient);
        if (exists) {
            await this.actionDriver.clickButton(manageClientsocators.firstElipsis);
            await this.actionDriver.clickButton(manageClientsocators.firstDelete);
            await this.actionDriver.clickButton(manageClientsocators.deleteYes);
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.deletionProgress);
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        }
    }

    async ClickstartDateField() {
        await this.actionDriver.clickButton(manageClientsocators.startDateField);
    }

    async ClickendDateField() {
        await this.actionDriver.clickButton(manageClientsocators.endDataField);
    }

    async SelectCurrentDateforStartdate() {
        await this.actionDriver.clickButton(manageClientsocators.SelectCurrentDateforStartdate)
    }

    async SelectNextMonthDateforEnddate() {
        await this.actionDriver.clickButton(manageClientsocators.SelectNextMonthDateforEnddate);
    }

    async AddClientName(data) {
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.companyNameField);
        await this.actionDriver.setText(manageClientsocators.companyNameField, data);
    }

    async ClickCreateClientButton() {
        await this.actionDriver.clickButton(manageClientsocators.CreateClientButton);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.addNewClientTitle);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
    }

    async ClickFirstElipsis() {
        await this.actionDriver.clickButton(manageClientsocators.firstElipsis);
    }

    async ClickfirstDelete() {
        await this.actionDriver.clickButton(manageClientsocators.firstDelete);
    }

    async ClickYES() {
        await this.actionDriver.clickButton(manageClientsocators.deleteYes);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
    }

    async ClickCreatedClient() {
        await this.actionDriver.clickButton(manageClientsocators.CreatedClient);
    }

    async ClickEditClient() {
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.EditClient);
        await this.actionDriver.clickButton(manageClientsocators.EditClient);
    }

    async VerifyCompanyName(text) {
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.editClientName);
        await this.actionDriver.checkVisibility(text);
    }

    async SelectCountry(text) {
        await this.actionDriver.ElemetType(manageClientsocators.SelectCountry, text);
        await this.actionDriver.keyboardPress('Enter');
        await this.page.waitForTimeout(1000);
    }

    async SelectStates(text) {
        await this.actionDriver.ElemetType(manageClientsocators.SelectStates, text);
        await this.actionDriver.keyboardPress('Enter');
        await this.page.waitForTimeout(1000);
    }

    async SelectCity(text) {
        await this.actionDriver.ElemetType(manageClientsocators.SelectCity, text);
        await this.actionDriver.keyboardPress('Enter');
        await this.page.waitForTimeout(1000);
    }

    async NavigateContactTab() {
        await this.actionDriver.clickButton(manageClientsocators.ContactTab);
    }

    async AddContact() {
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.AddContact);
        await this.actionDriver.clickButton(manageClientsocators.AddContact);
    }

    async name(data) {
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.name);
        await this.actionDriver.setText(manageClientsocators.name, data);
        await this.page.waitForTimeout(1000);
    }

    async email(data) {
        await this.actionDriver.setText(manageClientsocators.email, data);
        await this.page.waitForTimeout(1000);
    }

    async number(data) {
        await this.actionDriver.setText(manageClientsocators.number, data);
        await this.page.waitForTimeout(1000);
    }

    async VerifyContactname(text) {
        await this.actionDriver.ExpectElementValue(manageClientsocators.name, text);
    }

    async VerifyContactemail(text) {
        await this.actionDriver.ExpectElementValue(manageClientsocators.email, text);
    }

    async Clickclose() {
        await this.actionDriver.clickButton(manageClientsocators.close);
    }

    async navigateToPerformanceReview() {
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.performanceEvaluation);
        await this.actionDriver.clickButton(manageClientsocators.performanceEvaluation);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.perfNameList);
    }

    async selectEmployee(data) {
        const empName = data.firstName + ' ' + data.lastName;
        await this.actionDriver.selectDataFromText(empName, manageClientsocators.perfNameList, manageClientsocators.perfEvalButton);
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.evalModal);
    }

    async evaluate(evalData) {
        const grades = evalData.grading;
        const overAll = evalData.overallrating;
        for (let i = 0; i < grades.length; i++) {
            if (grades[i] === 1) {
                await this.actionDriver.clickButton(`(${manageClientsocators.needsImprovement})[${i + 1}]`);
            }
            if (grades[i] === 2) {
                await this.actionDriver.clickButton(`(${manageClientsocators.meetsExpectations})[${i + 1}]`);
            }
            if (grades[i] === 3) {
                await this.actionDriver.clickButton(`(${manageClientsocators.exceedsExpectations})[${i + 1}]`);
            }
        }
        if (overAll === 1) {
            await this.actionDriver.clickButton(manageClientsocators.overAllNeedsImprovement);
        }
        if (overAll === 2) {
            await this.actionDriver.clickButton(manageClientsocators.overAllmeetsExpectations);
        }
        if (overAll === 3) {
            await this.actionDriver.clickButton(manageClientsocators.overAllexceedsExpectations);
        }
    }

    async overAllComments(comment) {
        const frameHandle = await this.page.waitForSelector(manageClientsocators.commentsIframe);
        const frame = await frameHandle.contentFrame();

        if (frame) {
            await frame.type(manageClientsocators.commentsBody, comment);
        }
    }

    async validatePerfEvalModal(data) {
        const title = 'Performance Evaluation - ' + data.firstName + ' ' + data.lastName;
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.perfEvalModalTitle);
        const pageTitle = await this.actionDriver.getText(manageClientsocators.perfEvalModalTitle)
        await this.actionDriver.checkInclude(pageTitle, title);
    }

    async submitPerfEval() {
        await this.actionDriver.waitElementUntilClickable(manageClientsocators.submitPerfEvalBtn);
        await this.actionDriver.clickButton(manageClientsocators.submitPerfEvalBtn);
        const isVisible = await this.actionDriver.elementVisible(manageClientsocators.evalModal);
        if (!isVisible) {
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        }

    }

    async cancelPerfEval() {
        await this.actionDriver.clickButton(manageClientsocators.cancelPerfEvalBtn);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.evalModal);
    }

    async validateCancel() {
        const visible = await this.actionDriver.elementVisible(manageClientsocators.evalModal);
        await this.actionDriver.expectFalse(visible);
    }

    async validateEvaluation(data) {
        const empName = data.firstName + ' ' + data.lastName;
        const title = 'View Performance Evaluation - ' + empName;
        await this.actionDriver.selectDataFromText(empName, manageClientsocators.nameListWithSubmittedEval, manageClientsocators.viewSubmissionBtns);
        const pageTitle = await this.actionDriver.getText(manageClientsocators.perfEvalModalTitle)
        await this.actionDriver.checkInclude(pageTitle, title);
    }

    async validateSubmitDisabled() {
        await this.actionDriver.expectDisabled(manageClientsocators.submitPerfEvalBtn);
    }

    async validateSubmitEnabled() {
        await this.actionDriver.expectEnabled(manageClientsocators.submitPerfEvalBtn);
    }

    async validateSortableColumns(columns) {
        const sortable = await this.actionDriver.getTextArray(manageClientsocators.clientTableSortableCols);
        const unsortable = await this.actionDriver.getTextArray(manageClientsocators.clientTableCols);
        const sortableElements = columns.sort.every(item => sortable.includes(item));
        const unsortableElements = columns.notSort.every(item => unsortable.includes(item));
        await this.actionDriver.expectTrue(sortableElements);
        await this.actionDriver.expectTrue(unsortableElements);
    }

    async isColumnSortedWithSpecialCharacters(arr, sortType) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (sortType === 'asc') {
                if (typeof arr[i] === 'number') {
                    if (arr[i] > arr[i + 1]) {
                        return false; // Array is not sorted
                    }
                } else {
                    if (arr[i].toLowerCase() > arr[i + 1].toLowerCase()) {
                        return false; // Array is not sorted
                    }
                }
            } else {
                if (typeof arr[i] === 'number') {
                    if (arr[i] < arr[i + 1]) {
                        return false; // Array is not sorted
                    }
                } else {
                    if (arr[i].toLowerCase() < arr[i + 1].toLowerCase()) {
                        return false; // Array is not sorted
                    }
                }
            }
        }
        return true; // Array is sorted
    }

    async isColumnSortedWithDate(arr, sortType) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (sortType === 'asc') {
                if (new Date(arr[i]) > new Date(arr[i + 1])) {
                    return false; // Array is not sorted
                }
            } else {
                if (new Date(arr[i]) < new Date(arr[i + 1])) {
                    return false; // Array is not sorted
                }
            }
        }
        return true; // Array is sorted
    }

    async sortAndValidate(sortColumn, sortType) {
        for (let i = 0; i < sortColumn.length; i++) {
            await this.actionDriver.clickButton(`(${manageClientsocators.clientTableSortableCols})[${i + 1}]`);
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            if (sortColumn[i] === 'Client Name') {
                const columnData = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
                if (columnData.length > 0) {
                    const sorted = await this.isColumnSortedWithSpecialCharacters(columnData, sortType);
                    await this.actionDriver.expectTrue(sorted);
                }
            }
            if (sortColumn[i] === 'Status') {
                const columnData = await this.actionDriver.removeChildElement(manageClientsocators.sortedStatus);
                if (columnData.length > 0) {
                    const sorted = await this.isColumnSortedWithSpecialCharacters(columnData, sortType);
                    await this.actionDriver.expectTrue(sorted);
                }
            }
            if (sortColumn[i] === 'Start Date') {
                const columnData = await this.actionDriver.removeChildElement(manageClientsocators.sortedStartDate);
                if (columnData.length > 0) {
                    const sorted = await this.isColumnSortedWithSpecialCharacters(columnData, sortType);
                    await this.actionDriver.expectTrue(sorted);
                }
            }
            if (sortColumn[i] === 'Source') {
                const columnData = await this.actionDriver.removeChildElement(manageClientsocators.sortedSource);
                if (columnData.length > 0) {
                    const sorted = await this.isColumnSortedWithSpecialCharacters(columnData, sortType);
                    await this.actionDriver.expectTrue(sorted);
                }
            }
            if (sortColumn[i] === 'Location') {
                const columnData = await this.actionDriver.removeChildElement(manageClientsocators.sortedLoc);
                if (columnData.length > 0 && columnData.every(element => element !== sortColumn[i])) {
                    const sorted = await this.isColumnSortedWithSpecialCharacters(columnData, sortType);
                    await this.actionDriver.expectTrue(sorted);
                }
            }
            if (sortColumn[i] === 'Services Needed') {
                const columnData = await this.actionDriver.removeChildElement(manageClientsocators.sortedServicesNeeded);
                if (columnData.length > 0 && columnData.every(element => element !== sortColumn[i])) {
                    const sorted = await this.isColumnSortedWithSpecialCharacters(columnData, sortType);
                    await this.actionDriver.expectTrue(sorted);
                }
            }
            if (sortColumn[i] === 'No. of Talent') {
                let columnData = await this.actionDriver.removeChildElement(manageClientsocators.sortedNumberOfTalent);
                if (columnData.length > 0) {
                    columnData = columnData.map(Number);
                    const sorted = await this.isColumnSortedWithSpecialCharacters(columnData, sortType);
                    await this.actionDriver.expectTrue(sorted);
                }
            }
            if (sortColumn[i] === 'Date Added') {
                let columnData = await this.actionDriver.removeChildElement(manageClientsocators.sortedDateAdded);
                if (columnData.length > 0) {
                    const sorted = await this.isColumnSortedWithDate(columnData, sortType);
                    await this.actionDriver.expectTrue(sorted);
                }
            }
            if (sortColumn[i] === 'Last Updated') {
                let columnData = await this.actionDriver.removeChildElement(manageClientsocators.sortedLastUpdated);
                if (columnData.length > 0) {
                    const sorted = await this.isColumnSortedWithDate(columnData, sortType);
                    await this.actionDriver.expectTrue(sorted);
                }
            }
        }
    }

    async validateNextPage() {
        for (let i = 1; i <= 5; i++) {
            const previousPage = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
            await this.actionDriver.clickButton(manageClientsocators.paginationNextPage);
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            const currentPage = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
            const different = await this.compareArrayValues(previousPage, currentPage);
            await this.actionDriver.expectTrue(different);
        }
    }

    async validatePreviousPage() {
        for (let i = 1; i <= 5; i++) {
            const previousPage = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
            await this.actionDriver.clickButton(manageClientsocators.paginationPrevPage);
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            const currentPage = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
            const different = await this.compareArrayValues(previousPage, currentPage);
            await this.actionDriver.expectTrue(different);
        }
    }

    async validateLastPage() {
        const previousPage = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
        await this.actionDriver.clickButton(manageClientsocators.paginationLastPage);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        const currentPage = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
        const different = await this.compareArrayValues(previousPage, currentPage);
        await this.actionDriver.expectTrue(different);
    }

    async validateFirstPage() {
        const previousPage = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
        await this.actionDriver.clickButton(manageClientsocators.paginationFirstPage);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        const currentPage = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
        const different = await this.compareArrayValues(previousPage, currentPage);
        await this.actionDriver.expectTrue(different);
    }

    async compareArrayValues(arr1, arr2) {
        for (let i = 0; i < arr2.length; i++) {
            if (arr1[i] === arr2[i]) {
                return false;
            }
        }
        return true;
    }

    async searchNonExistingClient(client) {
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingOverlay);
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.clientTableBody);
        await this.actionDriver.setText(manageClientsocators.search, client.clientName);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.clientTableBody);
        await this.actionDriver.expectEquals(client.result, manageClientsocators.showingResult);
    }

    async searchExistingClient(client) {
        await this.actionDriver.setText(manageClientsocators.search, client);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.clientTableBody);
        const contain = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
        const number = await contain.length > 0 ? true : false;
        await this.actionDriver.expectTrue(number);
    }

    async setFilters(filters) {
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingOverlay);
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.clientTableBody);
        if (filters.location !== null) {
            await this.actionDriver.clickButton(manageClientsocators.filterLocationFld);
            await this.actionDriver.selectFromList(filters.location, manageClientsocators.filterLocationSelections);
        }
        if (filters.servicesNeeded !== null) {
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            await this.actionDriver.clickButton(manageClientsocators.filterServicesNeededFld);
            await this.actionDriver.selectFromList(filters.servicesNeeded, manageClientsocators.filterServicesNeededSelections);
        }
        if (filters.techStack !== null) {
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            await this.actionDriver.clickButton(manageClientsocators.filterTechStacksFld);
            await this.actionDriver.selectFromList(filters.techStack, manageClientsocators.filterTechStacksSelections);
        }
        if (filters.status !== null) {
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            await this.actionDriver.clickButton(manageClientsocators.filterStatusFld);
            await this.actionDriver.selectFromList(filters.status, manageClientsocators.filterStatusSelections);
        }
        if (filters.highGrowth !== null) {
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            await this.actionDriver.clickButton(manageClientsocators.filterHighGrowthFld);
            await this.actionDriver.selectFromList(filters.highGrowth, manageClientsocators.filterHighGrowthSelections);
        }
        if (filters.timeline !== null) {
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            await this.actionDriver.clickButton(manageClientsocators.filterTimeLineFld);
            await this.actionDriver.selectFromList(filters.timeline, manageClientsocators.filterTimeLineSelections);
        }
        if (filters.msaStatus !== null) {
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            await this.actionDriver.clickButton(manageClientsocators.filterMSAFld);
            await this.actionDriver.selectFromList(filters.msaStatus, manageClientsocators.filterMSASelections);
        }
        if (filters.source !== null) {
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            await this.actionDriver.clickButton(manageClientsocators.filterSourceFld);
            await this.actionDriver.selectFromList(filters.source, manageClientsocators.filterSourceSelections);
            await this.actionDriver.clickButton(manageClientsocators.thead);
        }
    }

    async validateFilters(filters) {
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        const location = await this.actionDriver.removeChildElement(manageClientsocators.sortedLoc);
        const servicesNeeded = await this.actionDriver.removeChildElement(manageClientsocators.sortedServicesNeeded);
        const techStack = await this.actionDriver.removeChildElement(manageClientsocators.sortedTechStack);
        const status = await this.actionDriver.removeChildElement(manageClientsocators.sortedStatus);
        const msaStatus = await this.actionDriver.removeChildElement(manageClientsocators.msaStatusCol);
        const source = await this.actionDriver.removeChildElement(manageClientsocators.sortedSource);
        
        const isEqualToLocation = location.every(element => element === filters.location);
        const isEqualTostatus = status.every(element => element === filters.status);
        const isEqualTomsaStatus = msaStatus.every(element => element === filters.msaStatus);
        const isEqualTosource = source.every(element => element === filters.source);

        await this.actionDriver.expectTrue(isEqualToLocation);
        await this.actionDriver.checkIfIncludesInArray(servicesNeeded, filters.servicesNeeded);
        await this.actionDriver.checkIfIncludesInArray(techStack, filters.techStack);
        await this.actionDriver.expectTrue(isEqualTostatus);
        await this.actionDriver.expectTrue(isEqualTomsaStatus);
        await this.actionDriver.expectTrue(isEqualTosource);
    }
}