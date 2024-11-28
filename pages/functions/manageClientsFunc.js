const manageClientsocators = require('../locators/manageClientsLoc');
const dashboardLocators = require('../locators/dashboardLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { EmployeesPage } = require('../functions/employeeFunc');
const { ClientsPage } = require('../functions/clientFunc');
const { expect } = require('@playwright/test');

let updatedJson;
let newEmail;

exports.ManageClientsPage = class ManageClientsPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
        this.employeePage = new EmployeesPage(page);
        this.clientPage = new ClientsPage(page);
    }

    async navigateRecentlySignedUpClients() {
        await this.actionDriver.clickButton(manageClientsocators.recentlySignedUpClients);
    }

    async checkClientProspectsVisibility() {
        await this.actionDriver.checkElementVisibility(manageClientsocators.reviewClientProspects);
    }

    async navigateClientListing() {
        await this.actionDriver.waitElementUntilVisible(dashboardLocators.employeesSide);
        const visible = await this.actionDriver.elementVisible(dashboardLocators.collapseEmployees);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLocators.collapseEmployees);
        }
        await this.actionDriver.clickButton(manageClientsocators.clientListing);
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.loadingOverlay);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingOverlay);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
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
        await this.actionDriver.ElemetType(manageClientsocators.search, client.clientName);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.clientTableBody);
        await this.actionDriver.expectEquals(client.result, manageClientsocators.showingResult);
    }

    async searchExistingClient(client) {
        await this.actionDriver.setText(manageClientsocators.search, client);
        await this.actionDriver.keyboardPress('Enter');
        // await this.actionDriver.waitElementUntilVisible(manageClientsocators.loadingRecords);
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

    async addClients(testData, email) {
        await this.actionDriver.setText(manageClientsocators.search, testData.name);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        const contain = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
        if (contain.length === 0) {
            await this.clickAddClient();
            await this.AddClientName(testData.name);
            await this.NavigateContactTab();
            await this.AddContact();
            await this.addClientDefaultContact(testData, email);
        }
    }

    async addClientDefaultContact(testData, email) {
        await this.name(testData.contact);
        await this.email(email);
        await this.ClickCreateClientButton();
    }

    async addMSA(testData) {
        //navigate to msa
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.clientDefaultView);
        await this.navigateToMSA();
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        const contain = await this.actionDriver.getTextArray(manageClientsocators.completeStatus);
        if (contain.length === 0) {
            //upload file signed documents
            await this.actionDriver.clickButton(manageClientsocators.uploadSignedDocu);
            //verify added msa
            await this.actionDriver.waitElementUntilVisible(manageClientsocators.chooseFile);
            await this.actionDriver.fileUpload(testData.msapath, manageClientsocators.chooseFile);
            //date signed
            await this.actionDriver.clickButton(manageClientsocators.dateSigned);
            await this.actionDriver.clickButton(manageClientsocators.dateSignedToday);
            //signed by
            await this.actionDriver.setText(manageClientsocators.signedByName, testData.signedBy);
            //signed by title
            await this.actionDriver.setText(manageClientsocators.signedByTitle, testData.title);
            //save
            await this.actionDriver.waitElementUntilClickable(manageClientsocators.saveMSA);
            await this.actionDriver.clickButton(manageClientsocators.saveMSA);
            //
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
            await this.actionDriver.checkElementVisibility(manageClientsocators.completeStatus);
        }
    }

    async navigateToMSA() {
        await this.actionDriver.clickButton(manageClientsocators.msaTab);
    }

    async addTalent(employee) {
        const name = employee.firstName + " " + employee.lastName;
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.teamMembersTab);
        await this.navigateToTeamMembers();
        await this.actionDriver.waitElementUntilClickable(manageClientsocators.addTalent);
        await this.actionDriver.clickButton(manageClientsocators.addTalent);
        const exist = await this.paginationCheck(name, manageClientsocators.addTalentNameList);
        if (exist) {
            await this.actionDriver.selectDataFromText(name, manageClientsocators.addTalentNameList, manageClientsocators.addTalentList);
            await this.actionDriver.clickButton(manageClientsocators.addToTeam);
            await this.actionDriver.clickButton(manageClientsocators.confirmAdd);
            await this.actionDriver.waitElementUntilVisible(manageClientsocators.employeeAddedName);
        }
    }

    async paginationCheck(text, elements) {
        let blnResult = false;
        let el;
        let isVisible = await this.actionDriver.elementVisible(manageClientsocators.addTalentNextPage);
        let isLastPage = false;
        if (isVisible) {
            while (isVisible) {
                await this.actionDriver.waitElementUntilHidden(manageClientsocators.talentLoadingRecords);
                el = await this.actionDriver.getTextArray(elements);
                blnResult = await this.actionDriver.checkIfIncludesInArray(el, text);
                isLastPage = await this.actionDriver.elementVisible(manageClientsocators.addTalentNextPage);
                if (blnResult) {
                    return true;
                }
                if (!blnResult && !isLastPage) {
                    return false;
                }
                await this.actionDriver.waitElementUntilVisible(manageClientsocators.addTalentNextPage);
                isVisible = await this.actionDriver.elementVisible(manageClientsocators.addTalentNextPage);
                await this.actionDriver.clickButton(manageClientsocators.addTalentNextPage);
            }
        } else {
            await this.actionDriver.waitElementUntilHidden(manageClientsocators.talentLoadingRecords);
            el = await this.actionDriver.getTextArray(elements);
            blnResult = await this.actionDriver.checkIfIncludesInArray(el, text);
        }
        return blnResult;
    }

    async validateName(text, elements) {
        let blnResult = false;
        await this.actionDriver.waitElementUntilVisible(elements);
        const rows = this.page.locator(elements);
        await rows.first().waitFor();
        for (let j = 0; j < await rows.count(); j++) {
            const textContent = await rows.nth(j).textContent();
            if (textContent.trim() === text) {
                blnResult = true;
            }
        }
        return blnResult;
    }


    async navigateToTeamMembers() {
        await this.actionDriver.clickButton(manageClientsocators.teamMembersTab);
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.loadingRecords);
    }

    async checkClientExists(testData, testDetails, emailDetails, email, password) {
        await this.actionDriver.waitElementUntilClickable(manageClientsocators.exportCurrentRecordsBtn);
        await this.actionDriver.setText(manageClientsocators.search, testData.name);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilClickable(manageClientsocators.sortedClientName);
        const visible = await this.actionDriver.elementVisible(manageClientsocators.clientTableBody);
        if (visible) {
            const contain = await this.actionDriver.getTextArray(manageClientsocators.sortedClientName);
            if (contain.length > 0) {
                const include = await this.actionDriver.checkIfIncludesInArray(contain, testData.name);
                if (include) {
                    await this.actionDriver.selectDataFromText(testData.name, manageClientsocators.sortedClientName, manageClientsocators.sortedClientName);
                    await this.actionDriver.waitElementUntilVisible(manageClientsocators.teamMembersTab);
                    await this.navigateToTeamMembers();
                    await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
                    const talents = await this.actionDriver.getTextArray(manageClientsocators.employeeAddedName);
                    if (talents.length === 0) {
                        await this.employeePage.addMultipleEmployees(testData.employee, testDetails);
                        await this.navigateClientListing();
                        await this.searchExistingClient(testData.name);
                        await this.actionDriver.selectDataFromText(testData.name, manageClientsocators.sortedClientName, manageClientsocators.sortedClientName);
                        await this.addTalent(testData.employee);
                    }
                }
            } else {
               await this.createNewClient(testData, testDetails, emailDetails, email, password);
            }
        } else {
            await this.createNewClient(testData, testDetails, emailDetails, email, password);
        }
    }

    async createNewClient(testData, testDetails, emailDetails, email, password) {
        // await this.navigateClientListing();
        await this.addClients(testData, email);
        await this.searchExistingClient(testData.name);
        if (testData.type === 'msa') {
            await this.actionDriver.selectDataFromText(testData.name, manageClientsocators.sortedClientName, manageClientsocators.sortedClientName);
            await this.addMSA(testData);
        }
        await this.employeePage.addMultipleEmployees(testData.employee, testDetails);
        await this.navigateClientListing();
        await this.searchExistingClient(testData.name);
        await this.actionDriver.selectDataFromText(testData.name, manageClientsocators.sortedClientName, manageClientsocators.sortedClientName);
        await this.addTalent(testData.employee);
        await this.clientPage.validateZohoEmail(emailDetails.welcomeEmail, emailDetails.emailFrom);
        await this.clientPage.submitPassword(password);
        await this.clientPage.validateLogin();
    }

    async validateAddNewClientFields() {
        await this.actionDriver.checkElementVisibility(manageClientsocators.companyNameField);
        await this.actionDriver.checkElementVisibility(manageClientsocators.isHighGrowthField);
        await this.actionDriver.checkElementVisibility(manageClientsocators.countryField);
        await this.actionDriver.checkElementVisibility(manageClientsocators.stateRegionField);
        await this.actionDriver.checkElementVisibility(manageClientsocators.addressField);
        await this.actionDriver.checkElementVisibility(manageClientsocators.timezoneField);
        await this.actionDriver.checkElementVisibility(manageClientsocators.companyField);
        await this.actionDriver.checkElementVisibility(manageClientsocators.startDateField);
        await this.actionDriver.checkElementVisibility(manageClientsocators.endDataField);
    }

    async setStatus(status) {
        await this.actionDriver.clickButton(manageClientsocators.companyField);
        await this.actionDriver.selectFromList(status, manageClientsocators.clientDropdownOptions);
    }

    async setCountry(country) {
        await this.actionDriver.clickButton(manageClientsocators.countryField);
        await this.actionDriver.ElemetType(manageClientsocators.countryInput, country);
        await this.actionDriver.selectFromList(country, manageClientsocators.countryOptions);
    }

    async setRegion(region) {
        await this.actionDriver.clickButton(manageClientsocators.stateRegionField);
        await this.actionDriver.ElemetType(manageClientsocators.stateInput, region);
        await this.actionDriver.selectFromList(region, manageClientsocators.stateOptions);
    }

    async disableLogin(email) {
        const emailAdd = email.split('@');
        if (emailAdd[1].includes('fullscale')) {
            await this.actionDriver.waitElementUntilEnabled(manageClientsocators.enableLoginToggle);
            await this.changeStyle();
            await this.actionDriver.clickButton(manageClientsocators.enableLoginToggle);
        }
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

    async viewClient(name) {
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.selectDataFromText(name, manageClientsocators.sortedClientName, manageClientsocators.sortedClientName);
    }

    async navigateToContacts() {
        await this.actionDriver.waitElementUntilClickable(manageClientsocators.clientContacts);
        await this.actionDriver.clickButton(manageClientsocators.clientContacts);
    }

    async enableLogin(email) {
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.enableLogin);
        await this.actionDriver.selectDataFromTextwithNode(email, manageClientsocators.emailColumn, manageClientsocators.enableLogin);
        await this.actionDriver.waitElementUntilVisible(manageClientsocators.loginEnabled);
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loginEnabled);
    }

    async generateUnsignedMSA() {
        await this.actionDriver.waitElementUntilClickable(manageClientsocators.generateAgreement);
        await this.actionDriver.clickButton(manageClientsocators.generateAgreement);
        await this.actionDriver.waitElementUntilClickable(manageClientsocators.generateBtn);
        await this.actionDriver.clickButton(manageClientsocators.generateBtn);
    }

    async validateUnsignedMSA() {
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.checkElementVisibility(manageClientsocators.unsigned);
    }

    async validateProspectClient(testData) {
        await this.actionDriver.setText(manageClientsocators.search, testData.name);
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(manageClientsocators.loadingRecords);
        await this.actionDriver.waitElementUntilClickable(manageClientsocators.sortedClientName);
        await this.actionDriver.expectEquals(testData.status, `(${manageClientsocators.clientStatusList})[1]`);
        await this.actionDriver.expectEquals(testData.msaStatus, `(${manageClientsocators.clientMSAStatusList})[1]`);
        await this.actionDriver.checkElementVisibility(`(${manageClientsocators.viewMSALinkList})[1]`);
    }
}