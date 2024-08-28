const viewFeedbackLoc = require('../locators/employeeLoc');
const ActionDriver = require('../../utils/ActionDriver');

exports.EmployeesPage = class EmployeesPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async isInFeedbackListing(){
        await this.actionDriver.checkElementVisibility(viewFeedbackLoc.feedbackResponsesHeader)
    }

    async viewFeedbackAdded(){
        await this.actionDriver.checkElementVisibility(viewFeedbackLoc.topRow)
        await this.actionDriver.clickButton(viewFeedbackLoc.feedbackDetailsBtn)

        await this.actionDriver.checkElementVisibility(viewFeedbackLoc.feedbackResponseModalHeading)

        await this.actionDriver.clickButton(viewFeedbackLoc.closeButton)
    }

    
}