const employeePageLoc = require('../locators/employeeLoc');
const ActionDriver = require('../../utils/ActionDriver');
const dashboardLoc = require('../locators/dashboardLoc');
const { readJsonFile } = require('../../utils/jsonReader');

let empName;
let jsonData;

exports.EmployeesPage = class EmployeesPage {

    constructor(page) {

        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }


    // Employee Feedback Listing functions

    async isInFeedbackListing() {
        await this.actionDriver.checkElementVisibility(employeePageLoc.feedbackResponsesHeader)
    }

    async viewFeedbackAdded() {
        await this.actionDriver.checkElementVisibility(employeePageLoc.topRow)
        await this.actionDriver.clickButton(employeePageLoc.feedbackDetailsBtn)

        await this.actionDriver.checkElementVisibility(employeePageLoc.feedbackResponseModalHeading)

        await this.actionDriver.clickButton(employeePageLoc.closeButton)
    }

    // Employee Listing functions

    async isInEmployeeList() {
        await this.actionDriver.checkElementVisibility(employeePageLoc.employeeListHeader)
    }

    async selectEmployee() {

        await this.actionDriver.hoverElement(employeePageLoc.employeeTable)

        const rowCount = await this.actionDriver.elementCount(employeePageLoc.employeeNameLink)
        const randomIndex = Math.floor(Math.random() * rowCount)

        empName = await this.actionDriver.getText(`(${employeePageLoc.employeeNameLink})[${randomIndex}]`)

        await this.actionDriver.clickButton(`(${employeePageLoc.employeeNameLink})[${randomIndex}]`)

    }

    async isInEmployeeProfile() {

        await this.actionDriver.checkElementVisibility(dashboardLoc.talentName)
        const tname = await this.actionDriver.getText(dashboardLoc.talentName)

        const subStringEmpName = empName.substring(0, 5)
        const matchedEmpName = tname.includes(subStringEmpName)

        await this.actionDriver.expectTrue(matchedEmpName)

    }

    async addEmployee(testData) {
        await this.actionDriver.clickButton(employeePageLoc.addNewEmployeeButton);
        await this.actionDriver.clickButton(employeePageLoc.startDate);
        await this.actionDriver.clickButton(employeePageLoc.dateToday);
        await this.actionDriver.setText(employeePageLoc.firstNameField, testData.firstName);
        await this.actionDriver.setText(employeePageLoc.lastNameField, testData.lastName);
        await this.actionDriver.waitElementUntilEnabled(employeePageLoc.createEmployeeBtn);
        await this.actionDriver.clickButton(employeePageLoc.createEmployeeBtn);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.firstNameField);
    }

    async validateAddedEmployee(testData) {
        const employeeName = testData.lastName+', '+testData.firstName;
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.editEmployeeClients)
        await this.actionDriver.clickButton(employeePageLoc.employeeListTab);
        await this.actionDriver.setText(employeePageLoc.searchEmployee, employeeName);
        await this.actionDriver.clickButton(employeePageLoc.searchEmployeeBtn);
        await this.actionDriver.findText(employeeName, employeePageLoc.employeeNameList);
        await this.actionDriver.selectDataFromText(employeeName, employeePageLoc.employeeNameList, employeePageLoc.employeeNameList);
    }

    async searchEmployee(testData) {
        const employeeName = testData.lastName+', '+testData.firstName;
        await this.actionDriver.clickButton(employeePageLoc.employeeListTab);
        await this.actionDriver.setText(employeePageLoc.searchEmployee, employeeName);
        await this.actionDriver.clickButton(employeePageLoc.searchEmployeeBtn);
    }

    async updatePosition(testData) {
        await this.actionDriver.clickButton(employeePageLoc.employmentTab);
        await this.actionDriver.clickButton(employeePageLoc.editWorkDetail);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.positionField);
        await this.actionDriver.clickButton(employeePageLoc.positionField);
        await this.actionDriver.typeText(testData);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.selectFromList(testData, employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.clickButton(employeePageLoc.selectDeveloperType);
        await this.actionDriver.clickButton(employeePageLoc.fullStackOption);
        await this.actionDriver.clickButton(employeePageLoc.currentPositionField);
        await this.actionDriver.clickButton(employeePageLoc.seniorOption);
        await this.actionDriver.clickButton(employeePageLoc.savePosition);
    }

    async validatePostion(testData){
        const position = testData.position+" "+testData.role;
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.modalTitle);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.currentPosition);
        await this.actionDriver.expectEquals(position, employeePageLoc.currentPosition);
    }

    async updateSkills() {
        jsonData = await readJsonFile('settings');
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.editSkills);
        await this.actionDriver.clickButton(employeePageLoc.enterSkillField);
        await this.actionDriver.typeText(jsonData.skill);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.selectFromList(jsonData.skill, employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.clickButton(employeePageLoc.searchbleCheckbox);
        await this.actionDriver.clickButton(employeePageLoc.saveSkills);
    }

    async validateSkill() {
        await this.actionDriver.findText(jsonData.skill, employeePageLoc.skillsListInProfile);
    }

    async updateClient(testData) {
        await this.actionDriver.clickButton(employeePageLoc.editEmployeeClients);
        await this.actionDriver.waitElementUntilEnabled(employeePageLoc.enterProjectField);
        await this.actionDriver.clickButton(employeePageLoc.enterProjectField);
        await this.actionDriver.typeText(testData);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.selectFromList(testData, employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.clickButton(employeePageLoc.saveProject);
    }

    async validateClient(testData) {
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.manageProjectTitle);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.clientList);
        await this.actionDriver.findText(testData, employeePageLoc.clientList);
    }

    async navigateToEmployeeList(){
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.employeeListTab);
        await this.actionDriver.clickButton(employeePageLoc.employeeListTab)
    }

    async validateClientRemoved(testData) {
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.clientList);
        await this.actionDriver.compareFromList(testData, employeePageLoc.clientList);
    }

    async deleteEmployee(testData) {
        const employeeName = testData.lastName+', '+testData.firstName;
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        await this.actionDriver.selectDataFromText(employeeName, employeePageLoc.employeeNameList, employeePageLoc.employeeActionButton);
        await this.actionDriver.selectDataFromText(employeeName, employeePageLoc.employeeNameList, employeePageLoc.deleteRequest);
        await this.actionDriver.clickButton(employeePageLoc.confirmDeletion);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.deletionProgress); 
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        await this.actionDriver.setText(employeePageLoc.searchEmployee, employeeName);
        await this.actionDriver.clickButton(employeePageLoc.searchEmployeeBtn);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        await this.actionDriver.compareFromList(employeeName, employeePageLoc.employeeNameList);
    }
}