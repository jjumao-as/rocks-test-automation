const employeePageLoc = require('../locators/employeeLoc');
const ActionDriver = require('../../utils/ActionDriver');
const dashboardLoc = require('../locators/dashboardLoc');
const { sleep } = require('../../utils/utility')

let empName;

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

}