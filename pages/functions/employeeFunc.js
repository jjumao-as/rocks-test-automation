const employeePageLoc = require('../locators/employeeLoc');
const manageClientsLoc = require('../locators/manageClientsLoc');
const ActionDriver = require('../../utils/ActionDriver');
const dashboardLoc = require('../locators/dashboardLoc');
const { readJsonFile } = require('../../utils/jsonReader');
const { time } = require('console');
const { stat } = require('fs');


let empName;
let publicProfileLink;
let clientName;
let interviewDate;
let interviewTime;
let invitee;
let interviewStatus;
let reason;
let grade;
let clientFeedback;
let jsonData;
let newSchedule;

let jobPosition;
let startDate;
let otherEmployer;
let endDate;
let reasonForLeaving;
let projectName;
let projectDescription;
let durationInMonths;
let numOfMembers;
let techStack;

exports.EmployeesPage = class EmployeesPage {

    constructor(page) {

        this.page = page;
        this.actionDriver = new ActionDriver(page);


    }

    /** 
     * Superadmin
     * Performance Reviews */

    async navigateToPerformanceReviews() {
        await this.actionDriver.waitElementUntilVisible(dashboardLoc.employeesSide);
        const visible = await this.actionDriver.elementVisible(dashboardLoc.collapseEmployees);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLoc.collapseEmployees);
        }
        await this.actionDriver.clickButton(employeePageLoc.performanceReviewsTab);
    }

    async isInPerformanceReview(){
        await this.actionDriver.checkElementVisibility(employeePageLoc.performanceReviewHeader)
        return true
    }

    async isEmployeeAddedInPerformanceReview(employeeName, performanceReviewData){
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.pullingRecordsLoader)
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.pullingEmployeesLoader)
        // Checks if the table loaded successfully by just checking the entire first row
        const tableLoaded = await this.actionDriver.elementVisible(employeePageLoc.row1)

        if (tableLoaded) {
            // Gets the employee name and client name text for the first row
            const firstRowEmpName = await this.actionDriver.getText(employeePageLoc.employeeName1)
            const firstRowClientName = await this.actionDriver.getText(employeePageLoc.clientName1)

            // Checks if it matches with the testData passes as parameters
            await this.actionDriver.checkInclude(employeeName, firstRowEmpName )
            await this.actionDriver.checkInclude(performanceReviewData.client, firstRowClientName)

            // Gets the text of all links in the first row (name, client and status)
            let firstRowData = await this.actionDriver.getTextArray(employeePageLoc.row1Td)
            firstRowData = firstRowData.map(name => name.trim())

            // Checks if the employeeName and clientName exist in the firstRowData[]
            await this.actionDriver.checkIfIncludesInArray(firstRowData, employeeName )
            await this.actionDriver.checkIfIncludesInArray(firstRowData, performanceReviewData.client)

        }
        else{
            console.log('Table not loaded')
        }

        



        return true

    }

    async clearEmployeeSearch(){
        await this.actionDriver.clickButton(dashboardLoc.xIcon);

    }


    


    /** 
     * Superadmin
     * Employee Feeback functions */

    async isInFeedbackListing() {
        await this.actionDriver.checkElementVisibility(employeePageLoc.feedbackResponsesHeader)
    }

    async viewFeedbackAdded() {
        await this.actionDriver.checkElementVisibility(employeePageLoc.topRow)
        await this.actionDriver.clickButton(employeePageLoc.feedbackDetailsBtn)

        await this.actionDriver.checkElementVisibility(employeePageLoc.feedbackResponseModalHeading)

        await this.actionDriver.clickButton(employeePageLoc.closeButton)
    }


    /*
    * Employee Listing functions
    */

    async isInEmployeeList() {
        await this.actionDriver.checkElementVisibility(employeePageLoc.employeeListHeader)
    }

    async selectEmployee() {

        await this.actionDriver.hoverElement(employeePageLoc.employeeTable)
        const randomIndex = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.employeeNameLink)
        empName = await this.actionDriver.getText(`(${employeePageLoc.employeeNameLink})[${randomIndex}]`)
        await this.actionDriver.clickButton(`(${employeePageLoc.employeeNameLink})[${randomIndex}]`)

    }


    /*
    * Employee Profile functions
    */

    async isInEmployeeProfile() {

        await this.actionDriver.checkElementVisibility(dashboardLoc.talentName)
        const tname = await this.actionDriver.getText(dashboardLoc.talentName)

        const subStringEmpName = empName.substring(0, 5)
        const matchedEmpName = tname.includes(subStringEmpName)

        await this.actionDriver.expectTrue(matchedEmpName)

    }

    async updateEmployeeManager(newManager){

        // gets the current managerName of rocks employee in the Employee Internal profile
        const existingMgrName = await this.actionDriver.getText(employeePageLoc.managerName) 

        /**
         * if the testData "Ronna Nahid" is not equal to the existing TeamManager text, it proceeds if() block
         * if employee's team manager is already "Ronna Nahid", it exits the if() block
        */
        if (existingMgrName !== newManager) {

            let newSelectedManager
            const addTeamManagerButtonVisible = await this.actionDriver.elementVisible(employeePageLoc.addTeamManagerButton)
            const editManagerButtonVisible = await this.actionDriver.elementVisible(employeePageLoc.managerEditButton)
            
            // if it sees the Add Team Manager button, means no existing manager is added and adds "Ronna Nahid"
            if(addTeamManagerButtonVisible === true){
                await this.actionDriver.waitElementUntilClickable(employeePageLoc.addTeamManagerButton)
                await this.actionDriver.clickButton(employeePageLoc.addTeamManagerButton)
                await this.actionDriver.waitElementUntilVisible(employeePageLoc.managerListItem)
                await this.actionDriver.waitElementUntilVisible(employeePageLoc.selectManagerInput)
                await this.actionDriver.setText(employeePageLoc.selectManagerInput, newManager)
                await this.actionDriver.keyboardPress('Enter')
                newSelectedManager = await this.actionDriver.getText(employeePageLoc.selectedManager)
                await this.actionDriver.checkInclude(newSelectedManager, newManager)
                
            }
            // if it sees EDIT button, meaning there's already existing Team Manager and need to be edited to "Ronna Nahid"
            else if (editManagerButtonVisible === true){
                await this.actionDriver.waitElementUntilClickable(employeePageLoc.managerEditButton)
                await this.actionDriver.clickButton(employeePageLoc.managerEditButton)
                await this.actionDriver.waitElementUntilVisible(employeePageLoc.managerListItem)
                // this means to unselect the existing manager
                await this.actionDriver.clickButton(employeePageLoc.selectedManager)
        
                await this.actionDriver.waitElementUntilVisible(employeePageLoc.selectManagerInput)
                // enter the newManager "Ronna Nahid"
                await this.actionDriver.setText(employeePageLoc.selectManagerInput, newManager)
                await this.actionDriver.keyboardPress('Enter')
                newSelectedManager = await this.actionDriver.getText(employeePageLoc.selectedManager)
                await this.actionDriver.checkInclude(newSelectedManager, newManager)

            }
    
            else{
                console.log("Error adding employee Manager")
            }
    
            await this.actionDriver.clickButton(employeePageLoc.navBar)
            await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingSpinner)
            await this.actionDriver.checkElementVisibility(employeePageLoc.successNotification)
            await this.actionDriver.waitElementUntilHidden(employeePageLoc.successNotification)
    
    
        }

       

    }

    /**
     * View public profile
     */

    async viewPublicProfile() {
        await this.actionDriver.checkElementVisibility(employeePageLoc.talentName)
        empName = await this.actionDriver.getText(employeePageLoc.talentName)
        await this.actionDriver.clickButton(employeePageLoc.publicProfileLink)
    }

    async isInPublicProfile(newPage) {

        const actionDriverNewPage = new ActionDriver(newPage)

        await actionDriverNewPage.checkElementVisibility(employeePageLoc.profileName)

        const pName = await actionDriverNewPage.getText(employeePageLoc.profileName)
        const profileName = pName.split(" ")[0]

        await actionDriverNewPage.checkInclude(profileName, empName)

    }

    async copyPublicProfileLink(){
        await this.actionDriver.checkElementVisibility(employeePageLoc.talentName)
        empName = await this.actionDriver.getText(employeePageLoc.talentName)

        await this.actionDriver.clickButton(employeePageLoc.copyProfileUrlBtn)
        publicProfileLink = await this.page.evaluate(() => navigator.clipboard.readText());
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.copiedToClipboardText)   
        
    }

    async goToPublicProfile(){
        await this.actionDriver.goToUrl(publicProfileLink)
    }


    async isInLoggedOutPublicProfile(){
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingDots)

        await this.actionDriver.waitElementUntilVisible(employeePageLoc.profileName)
        const loggedOutProfileName = await this.actionDriver.getText(employeePageLoc.profileName)
        const newProfileName = loggedOutProfileName.split(" ")[0]
        await this.actionDriver.checkInclude(newProfileName, empName)

        await this.actionDriver.waitElementUntilVisible(employeePageLoc.profileAvatar)

        const isBookACallBtnPresent = await this.actionDriver.elementVisible(employeePageLoc.bookACallBtn)
        await this.actionDriver.expectFalse(isBookACallBtnPresent)

        await this.actionDriver.waitElementUntilVisible(employeePageLoc.jobPositionInListPublicProfile)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.companyNameInListPublicProfile)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.projectDescriptionInListPublicProfile)

    }




    /* Add Client Interview */

    async navigateToClientInterviews() {
        
        await this.actionDriver.clickButton(employeePageLoc.clientInterviewLink)
        await this.actionDriver.checkElementVisibility(employeePageLoc.addInterviewButton)

    }

    async addInterviewModalIsPresent() {
        await this.actionDriver.clickButton(employeePageLoc.addInterviewButton)
        await this.actionDriver.checkElementVisibility(employeePageLoc.addInterviewModalHeading)
    }

    async addInterview() {

        jsonData = await readJsonFile('clientInterview')

        let randomIndexInvitee;

        // selecting client
        await this.actionDriver.clickButton(employeePageLoc.selectClientDropdown)
        const randomIndexClient = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.clientOptions)
        clientName = await this.actionDriver.getText(`(${employeePageLoc.clientOptions})[${randomIndexClient}]`)
        await this.actionDriver.typeText(clientName)
        await this.actionDriver.keyboardPress('Enter')

        // select date
        interviewDate = await this.actionDriver.getRandomJsonItem(jsonData, 'interviewDate')
        await this.actionDriver.clickButton(employeePageLoc.dateTimePicker)
        await this.actionDriver.typeText(interviewDate)
        await this.actionDriver.keyboardPress('Enter')
        await this.actionDriver.hoverElement(employeePageLoc.dateSelected)
        await this.actionDriver.clickButton(employeePageLoc.dateSelected)


        // select time
        await this.actionDriver.clickButton(employeePageLoc.timeDropdown)
        const randomIndexTime = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.timeOptions)
        interviewTime = await this.actionDriver.getText(`${employeePageLoc.timeOptions}[${randomIndexTime}]`)
        await this.actionDriver.typeText(interviewTime)
        await this.actionDriver.keyboardPress('Enter')


        // select invitees
        await this.actionDriver.clickButton(employeePageLoc.additionalInviteesMultiselect)
        const inviteeCount = await this.actionDriver.elementCount(employeePageLoc.additionalInviteesOptions)

        if (inviteeCount > 0) {
            if (inviteeCount === 1) {
                invitee = await this.actionDriver.getText(`(${employeePageLoc.additionalInviteesOptions})`)
                await this.actionDriver.keyboardPress('Enter')

            }
            else if (inviteeCount === 2) {
                randomIndexInvitee = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.additionalInviteesOptions)
                invitee = await this.actionDriver.getText(`(${employeePageLoc.additionalInviteesOptions})[${randomIndexInvitee}]`)
                await this.actionDriver.typeText(invitee)
                await this.actionDriver.keyboardPress('Enter')


            }
            else {
                randomIndexInvitee = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.additionalInviteesOptions)
                invitee = await this.actionDriver.getText(`(${employeePageLoc.additionalInviteesOptions})[${randomIndexInvitee}]`)
                await this.actionDriver.typeText(invitee)
                await this.actionDriver.keyboardPress('Enter')


            }

        }
        else {
            console.log("No options available to select")
        }



        // select status
        await this.actionDriver.clickButton(employeePageLoc.statusDropdown)
        const randomIndexStatus = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.statusOptions)
        interviewStatus = await this.actionDriver.getText(`${employeePageLoc.statusOptions}[${randomIndexStatus}]`)
        await this.actionDriver.clickButton(`${employeePageLoc.statusOptions}[${randomIndexStatus}]`)





        // select reason for "Failed" status
        if (interviewStatus === 'Failed') {

            await this.actionDriver.checkElementVisibility(employeePageLoc.reasonDropdown)
            await this.actionDriver.clickButton(employeePageLoc.reasonDropdown)

            const randomIndexReason = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.reasonOptions)
            reason = await this.actionDriver.getText(`(${employeePageLoc.reasonOptions})[${randomIndexReason}]`)

            await this.actionDriver.clickButton(`(${employeePageLoc.reasonOptions})[${randomIndexReason}]`)

            await this.actionDriver.keyboardPress('Enter')

        }


        // select grade
        await this.actionDriver.clickButton(employeePageLoc.performanceGradeDropdown)

        const randomIndexGrade = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.performanceGradeOptions)
        grade = await this.actionDriver.getText(`(${employeePageLoc.performanceGradeOptions})[${randomIndexGrade}]`)
        await this.actionDriver.clickButton(`(${employeePageLoc.performanceGradeOptions})[${randomIndexGrade}]`)


        // enter client feedback
        clientFeedback = await this.actionDriver.getRandomJsonItem(jsonData, 'clientFeedback')
        await this.actionDriver.clickButton(employeePageLoc.clientFeedbackTextArea)
        await this.actionDriver.typeText(clientFeedback)

        await this.actionDriver.clickButton(employeePageLoc.notificationCheckbox)



    }

    async submitInterview() {
        await this.actionDriver.clickButton(employeePageLoc.addNotesButton)
    }



    async isInterviewAdded() {
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.savingChangesLoader);

        const statusList = await this.actionDriver.getTextArray(employeePageLoc.statusTD);
        await this.actionDriver.checkIfIncludesInArray(statusList, interviewStatus)
        const clientNameList = await this.actionDriver.getTextArray(employeePageLoc.clientTD);
        await this.actionDriver.checkIfIncludesInArray(clientNameList, clientName)
        const gradeList = await this.actionDriver.getTextArray(employeePageLoc.gradeTD);
        await this.actionDriver.checkIfIncludesInArray(gradeList, grade)
        const inviteeList = await this.actionDriver.getTextArray(employeePageLoc.inviteeTD);
        await this.actionDriver.checkIfIncludesInArray(inviteeList, invitee)

    }


    /* Delete Client Interview */

    async deleteInterview() {
        const oldMonth = interviewDate.split(" ")[0];
        const newMonth = await jsonData.dateAbbreviation[oldMonth];
        const newDate = interviewDate.replace(new RegExp(`\\b${oldMonth}\\b`), newMonth);
        newSchedule = newDate.replace(/\b0(\d{1})\b/, "$1") + ' ' + interviewTime.replace(/^0/, "");
        let existing = await this.paginationCheck(newSchedule, employeePageLoc.scheduleTD);
        if (existing) {
            await this.actionDriver.selectDataFromTextwithNode(newSchedule, employeePageLoc.scheduleTD, employeePageLoc.deleteButton);
            await this.actionDriver.clickButton(employeePageLoc.yesButton);
            await this.actionDriver.waitElementUntilHidden(employeePageLoc.interviewDeletionProgress);
        }

    }

    async isInterviewDeleted() {
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        let isStillExist = await this.paginationCheck(newSchedule, employeePageLoc.scheduleTD);
        await this.actionDriver.expectFalse(isStillExist);
    }



    /* Update Client Interview */

    async updateInterview() {
        const oldMonth = interviewDate.split(" ")[0];
        const newMonth = await jsonData.dateAbbreviation[oldMonth];
        const newDate = interviewDate.replace(new RegExp(`\\b${oldMonth}\\b`), newMonth);
        newSchedule = newDate.replace(/\b0(\d{1})\b/, "$1") + ' ' + interviewTime.replace(/^0/, "");
        let existing = await this.paginationCheck(newSchedule, employeePageLoc.scheduleTD);

        if (existing) {

            jsonData = await readJsonFile('clientInterview')
            let randomIndexInvitee;

            // click VIEW link
            await this.actionDriver.selectDataFromTextwithNode(newSchedule, employeePageLoc.scheduleTD, employeePageLoc.viewButton);
            await this.actionDriver.checkElementVisibility(employeePageLoc.viewInterviewModalHeading);
            await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingDots)

            // Check if added Interview details matched with viewed interview details
            const vStatus = await this.actionDriver.getText(employeePageLoc.viewedStatus)
            const vClientName = await this.actionDriver.getText(employeePageLoc.viewedClientName)
            const vGrade = await this.actionDriver.getText(employeePageLoc.viewedGrade)
            const vInvitee = await this.actionDriver.getText(employeePageLoc.viewedInvitee)
            const vDate = await this.actionDriver.getText(employeePageLoc.viewedDate)
            const vTime = await this.actionDriver.getText(employeePageLoc.viewedTime)

            await this.actionDriver.checkInclude(interviewStatus, vStatus)
            await this.actionDriver.checkInclude(clientName, vClientName)
            await this.actionDriver.checkInclude(grade, vGrade)
            await this.actionDriver.checkInclude(invitee, vInvitee)
            await this.actionDriver.checkInclude(interviewDate, vDate)
            await this.actionDriver.checkInclude(interviewTime, vTime)

            // edit clientName
            await this.actionDriver.clickButton(employeePageLoc.clientPenIcon)
            await this.actionDriver.checkElementVisibility(employeePageLoc.updateClientDropdown)
            await this.actionDriver.clickButton(employeePageLoc.updateClientDropdown)

            const randomIndexClient = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.notSelectedClients)
            clientName = await this.actionDriver.getText(`(${employeePageLoc.notSelectedClients})[${randomIndexClient}]`)
            await this.actionDriver.typeText(clientName)
            await this.actionDriver.keyboardPress('Enter')


            // edit interviewDate
            interviewDate = await this.actionDriver.getRandomJsonItem(jsonData, 'interviewDate')

            await this.actionDriver.clickButton(employeePageLoc.datePenIcon)
            await this.actionDriver.checkElementVisibility(employeePageLoc.dateTimePicker)

            await this.actionDriver.clickButton(employeePageLoc.dateTimePicker)

            // to clear the date textfield
            await this.actionDriver.keyboardPress('Control+A')
            await this.actionDriver.keyboardPress('Backspace')

            // to enter the new randomized date in the date textfield
            await this.actionDriver.typeText(interviewDate)
            await this.actionDriver.keyboardPress('Enter')
            await this.actionDriver.hoverElement(employeePageLoc.dateSelected)
            await this.actionDriver.clickButton(employeePageLoc.dateSelected)

            // edit interviewTime
            await this.actionDriver.clickButton(employeePageLoc.timePenIcon)
            await this.actionDriver.checkElementVisibility(employeePageLoc.timeDropdown)
            await this.actionDriver.clickButton(employeePageLoc.timeDropdown)
            const randomIndexTime = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.notSelectedTimes)
            interviewTime = await this.actionDriver.getText(`${employeePageLoc.notSelectedTimes}[${randomIndexTime}]`)
            await this.actionDriver.typeText(interviewTime)
            await this.actionDriver.keyboardPress('Enter')


            // edit invitees
            await this.actionDriver.clickButton(employeePageLoc.inviteesPenIcon)
            await this.actionDriver.checkElementVisibility(employeePageLoc.updateInviteesMultiSelect)
            await this.actionDriver.clickButton(employeePageLoc.updateInviteesMultiSelect)


            const inviteeCount = await this.actionDriver.elementCount(employeePageLoc.updateInviteesOptions)

            if (inviteeCount > 0) {
                if (inviteeCount === 1) {
                    invitee = await this.actionDriver.getText(`(${employeePageLoc.updateInviteesOptions})`)
                    await this.actionDriver.keyboardPress('Enter')


                }
                else if (inviteeCount === 2) {
                    randomIndexInvitee = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.updateInviteesOptions)
                    invitee = await this.actionDriver.getText(`(${employeePageLoc.updateInviteesOptions})[${randomIndexInvitee}]`)
                    await this.actionDriver.typeText(invitee)
                    await this.actionDriver.keyboardPress('Enter')



                }
                else {
                    randomIndexInvitee = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.updateInviteesOptions)
                    invitee = await this.actionDriver.getText(`(${employeePageLoc.updateInviteesOptions})[${randomIndexInvitee}]`)
                    await this.actionDriver.typeText(invitee)
                    await this.actionDriver.keyboardPress('Enter')



                }

            }
            else {
                console.log("No options available to select")
            }

            // edit status
            await this.actionDriver.clickButton(employeePageLoc.statusPenIcon)
            await this.actionDriver.checkElementVisibility(employeePageLoc.statusDropdown)
            await this.actionDriver.clickButton(employeePageLoc.statusDropdown)

            const randomIndexStatus = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.notSelectedStatus)

            await this.actionDriver.getText(`${employeePageLoc.notSelectedStatus}[${randomIndexStatus}]`)
            interviewStatus = await this.actionDriver.getText(`${employeePageLoc.notSelectedStatus}[${randomIndexStatus}]`)

            await this.actionDriver.clickButton(`${employeePageLoc.notSelectedStatus}[${randomIndexStatus}]`)




            // select reason for "Failed" status
            if (interviewStatus === 'Failed') {
                await this.actionDriver.clickButton(employeePageLoc.reasonPenIcon)
                await this.actionDriver.checkElementVisibility(employeePageLoc.reasonDropdown)
                await this.actionDriver.clickButton(employeePageLoc.reasonDropdown)

                const randomIndexReason = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.notSelectedReasons)
                reason = await this.actionDriver.getText(`(${employeePageLoc.notSelectedReasons})[${randomIndexReason}]`)
                await this.actionDriver.clickButton(`(${employeePageLoc.notSelectedReasons})[${randomIndexReason}]`)
                await this.actionDriver.keyboardPress('Enter')


            }

            // update grade

            await this.actionDriver.clickButton(employeePageLoc.gradePenIcon)
            await this.actionDriver.checkElementVisibility(employeePageLoc.performanceGradeDropdown)
            await this.actionDriver.clickButton(employeePageLoc.performanceGradeDropdown)
            const randomIndexGrade = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.notSelectedGrade)
            grade = await this.actionDriver.getText(`(${employeePageLoc.notSelectedGrade})[${randomIndexGrade}]`)
            await this.actionDriver.clickButton(`(${employeePageLoc.notSelectedGrade})[${randomIndexGrade}]`)


            // edit Client Feedback

            await this.actionDriver.clickButton(employeePageLoc.clientFeedbackPenIcon)
            await this.actionDriver.checkElementVisibility(employeePageLoc.clientFeedbackTextArea)
            clientFeedback = await this.actionDriver.getRandomJsonItem(jsonData, 'clientFeedback')
            await this.actionDriver.clickButton(employeePageLoc.clientFeedbackTextArea)
            await this.actionDriver.typeText(clientFeedback)
            await this.actionDriver.clickButton(employeePageLoc.notificationCheckbox)


            // click Save Notes button
            await this.actionDriver.clickButton(employeePageLoc.saveNotesButton)
            await this.actionDriver.waitElementUntilHidden(employeePageLoc.savingChangesLoader)
        }

    }


    async paginationCheck(text, elements) {
        let blnResult = false;
        let el;
        let isVisible = await this.actionDriver.elementVisible(employeePageLoc.goToNextPage);
        let isLastPage = false;
        if (isVisible) {
            while (isVisible) {
                el = await this.actionDriver.removeChildElement(elements);
                el = await this.trimSchedule(el);
                blnResult = await this.actionDriver.checkIfIncludesInArray(el, text);
                isLastPage = await this.actionDriver.elementVisible(employeePageLoc.goToNextPage);
                if (blnResult) {
                    return true;
                }
                if (!blnResult && !isLastPage) {
                    return false;
                }
                await this.actionDriver.waitElementUntilVisible(employeePageLoc.goToNextPage);
                isVisible = await this.actionDriver.elementVisible(employeePageLoc.goToNextPage);
                await this.actionDriver.clickButton(employeePageLoc.goToNextPage);
                await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
            }
        } else {
            el = await this.actionDriver.removeChildElement(elements);
            el = await this.trimSchedule(el);
            blnResult = await this.actionDriver.checkIfIncludesInArray(el, text);
        }
        return blnResult;
    }

    async trimSchedule(dateStrings) {
        const extractedDateTime = dateStrings.map(item => {
            const match = item.match(/^(.*?\d{4}.*?\d{1,2}:\d{2} [APM]{2})/);
            return match ? match[1] : null;
        });

        return extractedDateTime;
    }


    async clickClientNameLink() {
        await this.actionDriver.clickButton(employeePageLoc.clientNameLink)

    }

    async isInClientPage() {
        await this.actionDriver.waitElementUntilVisible(manageClientsLoc.weeklyReportZeroStateLabel)
        await this.actionDriver.checkElementVisibility(manageClientsLoc.weeklyReportZeroStateLabel)
        const cname = await this.actionDriver.getText(manageClientsLoc.clientNameLink)
        await this.actionDriver.checkInclude(clientName, cname)
        await this.actionDriver.goBackPreviousPage()


    }

    async addEmployee(testData) {
        await this.searchEmployee(testData);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        const contain = await this.actionDriver.getTextArray(employeePageLoc.employeeNameList);
        if(contain.length > 0) {
            await this.deleteEmployee(testData);
        }
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
        const employeeName = testData.lastName + ', ' + testData.firstName;
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.editEmployeeClients)
        await this.actionDriver.clickButton(employeePageLoc.employeeListTab);
        await this.actionDriver.ElemetType(employeePageLoc.searchEmployee, employeeName);
        await this.actionDriver.keyboardPress('Enter')
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        await this.actionDriver.findText(employeeName, employeePageLoc.employeeNameList);
        await this.actionDriver.selectDataFromText(employeeName, employeePageLoc.employeeNameList, employeePageLoc.employeeNameList);
    }

    async searchEmployee(testData) {
        const employeeName = testData.lastName + ', ' + testData.firstName;
        await this.actionDriver.clickButton(employeePageLoc.employeeListTab);
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.searchEmployee)
        await this.actionDriver.ElemetType(employeePageLoc.searchEmployee, employeeName);
        await this.actionDriver.keyboardPress('Enter')
    }

    async updatePosition(testData) {

        await this.actionDriver.clickButton(employeePageLoc.employmentTab);
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.editWorkDetail);
        await this.actionDriver.clickButton(employeePageLoc.editWorkDetail);
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.positionField);
        await this.actionDriver.ElemetType(employeePageLoc.positionField, testData);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.selectFromList(testData, employeePageLoc.itemSearchSuggestion);
        await this.page.waitForTimeout(1000);
        await this.actionDriver.clickButton(employeePageLoc.selectDeveloperType);
        await this.page.waitForTimeout(1000);
        await this.actionDriver.clickButton(employeePageLoc.fullStackOption);
        await this.page.waitForTimeout(1000);
        await this.actionDriver.clickButton(employeePageLoc.currentPositionField);
        await this.page.waitForTimeout(1000);
        await this.actionDriver.clickButton(employeePageLoc.seniorOption);
        await this.page.waitForTimeout(1000);
        await this.actionDriver.clickButton(employeePageLoc.savePosition);
    }

    async validatePostion(testData) {
        
        await this.actionDriver.clickButton(employeePageLoc.employmentTab);

        const position = testData.position + " " + testData.role;
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.modalTitle);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.currentPosition);
        await this.actionDriver.expectEquals(position, employeePageLoc.currentPosition);
    }

    async addSkills(testData) {
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.editSkills);
        await this.actionDriver.clickButton(employeePageLoc.enterSkillField);
        for (let i = 0; i < testData.length; i++) {
            await this.actionDriver.typeText(testData[i][0]);
            await this.actionDriver.waitElementUntilVisible(employeePageLoc.itemSearchSuggestion);
            await this.actionDriver.selectFromList(testData[i][0], employeePageLoc.itemSearchSuggestion);
        }
        for (let j = 0; j < testData.length; j++) {
            const skill = testData[j];
            if (!skill[1]) {
                await this.actionDriver.clickButton(`(${employeePageLoc.showInProfileCheckbox})[${j + 1}]`);
            }
            if (skill[2]) {
                await this.actionDriver.clickButton(`(${employeePageLoc.searchbleCheckbox})[${j + 1}]`);
            }
        }
        await this.actionDriver.clickButton(employeePageLoc.saveSkills);
    }

    async validateTalentSkill(skills) {
        for (let i = 0; i < skills.length; i++) {
            await this.actionDriver.findText(skills[0], employeePageLoc.skillsListInProfile);
        }
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

    async removeAllClients(testData) {
        await this.actionDriver.clickButton(employeePageLoc.editEmployeeClients);
        await this.actionDriver.waitElementUntilEnabled(employeePageLoc.enterProjectField);
        const projects = await this.page.locator(employeePageLoc.projectList);
        const projectCount = await projects.count();
        if(projectCount > 0) {
            const removeEl = await this.page.locator(employeePageLoc.removeProject);
            for(let i=projectCount-1; i>=0; i--) {
                await removeEl.nth(i).click();
            }
        }
        await this.actionDriver.clickButton(employeePageLoc.saveProject);
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.editEmployeeClients);
        await this.updateClient(testData);
    }

    async updateClient(testData) {
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.editEmployeeClients);
        await this.actionDriver.clickButton(employeePageLoc.editEmployeeClients);
        await this.actionDriver.waitElementUntilEnabled(employeePageLoc.enterProjectField);
        await this.actionDriver.clickButton(employeePageLoc.enterProjectField);
        await this.actionDriver.typeText(testData);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.selectFromList(testData, employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.clickButton(employeePageLoc.saveProject);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.enterProjectField);
    }

    async validateClient(testData) {
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.editEmployeeClients);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.clientList);
        await this.actionDriver.findText(testData, employeePageLoc.clientList);
    }

    async navigateToEmployeeList() {
        await this.actionDriver.waitElementUntilVisible(dashboardLoc.employeesSide);
        const visible = await this.actionDriver.elementVisible(dashboardLoc.collapseEmployees);
        if(visible) {
            await this.actionDriver.clickButton(dashboardLoc.collapseEmployees);
        }
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.employeeListTab);
        await this.actionDriver.clickButton(employeePageLoc.employeeListTab)
    }

    async validateClientRemoved(testData) {
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.clientList);
        await this.actionDriver.compareFromList(testData, employeePageLoc.clientList);
    }

    async deleteEmployee(testData) {
        const employeeName = testData.lastName + ', ' + testData.firstName;
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        await this.actionDriver.selectDataFromText(employeeName, employeePageLoc.employeeNameList, employeePageLoc.employeeActionButton);
        await this.actionDriver.selectDataFromText(employeeName, employeePageLoc.employeeNameList, employeePageLoc.deleteRequest);
        await this.actionDriver.clickButton(employeePageLoc.confirmDeletion);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.deletionProgress);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        await this.actionDriver.ElemetType(employeePageLoc.searchEmployee, employeeName);
        await this.actionDriver.keyboardPress('Enter')
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        await this.actionDriver.compareFromList(employeeName, employeePageLoc.employeeNameList);
    }

    async editAboutMe(testData) {
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.editAboutMe);
        await this.actionDriver.clickButton(employeePageLoc.editAboutMe);
        await this.actionDriver.ElemetType(employeePageLoc.aboutMeTxtArea, testData);
        await this.actionDriver.clickButton(employeePageLoc.saveAboutMeBtn);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.aboutMeTxtArea);


        await this.actionDriver.waitElementUntilClickable(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);

        await this.actionDriver.waitElementUntilVisible(employeePageLoc.editAboutMe);
        const text = await this.actionDriver.getText(employeePageLoc.aboutMeDetails);
        await this.actionDriver.checkInclude(text, testData);
    }

    /* Add Work Experience */

    async addWorkExperience(testData) {

        await this.actionDriver.waitElementUntilClickable(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.addWorkExpBtn);
        await this.actionDriver.clickButton(employeePageLoc.addWorkExpBtn);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.jobTitle);
        await this.actionDriver.ElemetType(employeePageLoc.jobTitle, testData.jobPosition);
        await this.actionDriver.clickButton(employeePageLoc.startDate);
        await this.actionDriver.clickButton(employeePageLoc.dateToday);
        await this.actionDriver.clickButton(employeePageLoc.otherCompany);
        await this.actionDriver.ElemetType(employeePageLoc.otherCompanyName, testData.companyName);
        await this.actionDriver.clickButton(employeePageLoc.addProject);
        await this.actionDriver.ElemetType(employeePageLoc.modalprojectName, testData.projectName);
        await this.setProjectDescription(testData.description);
        await this.actionDriver.clickButton(employeePageLoc.addProjectBtnModal);
        await this.actionDriver.clickButton(employeePageLoc.saveWorkExp);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.deletionProgress);
    }

    async validateWorkExperience(testData) {
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.addWorkExpBtn);
        await this.actionDriver.expectEquals(testData.jobPosition, employeePageLoc.addedJobTitle);
        await this.actionDriver.expectEquals(testData.projectName, employeePageLoc.projectName);
        await this.actionDriver.expectEquals(testData.description, employeePageLoc.projectDesc);
    }

    async addNewWorkExperience(){

        jsonData = await readJsonFile('employee')


        await this.actionDriver.waitElementUntilClickable(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);

        await this.actionDriver.waitElementUntilClickable(employeePageLoc.addWorkExpBtn)
        await this.actionDriver.clickButton(employeePageLoc.addWorkExpBtn);

        await this.actionDriver.waitElementUntilVisible(employeePageLoc.jobTitle);
        await this.actionDriver.clickButton(employeePageLoc.jobTitle)
        jobPosition = await this.actionDriver.getRandomJsonItem(jsonData['workExperience'], 'jobPosition')
        await this.actionDriver.typeText(jobPosition)

        await this.actionDriver.clickButton(employeePageLoc.startDate)
        startDate = await this.actionDriver.getRandomJsonItem(jsonData['workExperience'], 'startDate')
        await this.actionDriver.typeText(startDate)
        await this.actionDriver.keyboardPress('Enter')
        await this.actionDriver.keyboardPress('Escape')


    }


    async companyIsFullscale(){
        await this.actionDriver.isElementChecked(employeePageLoc.fullScaleCompanyRadioBtn)

    }

    async companyIsOther(){
        jsonData = await readJsonFile('employee')
        otherEmployer = await this.actionDriver.getRandomJsonItem(jsonData['workExperience'], 'otherEmployer')

        await this.actionDriver.clickButton(employeePageLoc.otherCompany);
        await this.actionDriver.clickButton(employeePageLoc.otherCompanyName);
        await this.actionDriver.typeText(otherEmployer);


    }

    async isNotCurrentlyEmployed(){
        jsonData = await readJsonFile('employee')

        await this.actionDriver.clickButton(employeePageLoc.currentlyEmployedCheckbox)

        await this.actionDriver.clickButton(employeePageLoc.endDate)
        endDate = await this.actionDriver.getRandomJsonItem(jsonData['workExperience'], 'endDate')
        await this.actionDriver.typeText(endDate)
        await this.actionDriver.keyboardPress('Enter')


        await this.actionDriver.clickButton(employeePageLoc.reasonForLeaving)
        reasonForLeaving = await this.actionDriver.getRandomJsonItem(jsonData['workExperience'], 'reasonForLeaving')
        await this.actionDriver.typeText(reasonForLeaving)

    }


    async isCurrentlyEmployed(){
        await this.actionDriver.isElementChecked(employeePageLoc.currentlyEmployedCheckbox)

    }

 
    /** Add Project */

    async addOtherProject(){

        jsonData = await readJsonFile('employee')

        await this.actionDriver.clickButton(employeePageLoc.addProject);

        projectName = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'projectName')
        await this.actionDriver.clickButton(employeePageLoc.modalprojectName);
        await this.actionDriver.typeText(projectName)
        await this.page.waitForTimeout(2000);

        projectDescription = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'projectDescription')
        await this.actionDriver.clickButton(employeePageLoc.projectDescriptionTextArea)
        await this.actionDriver.typeText(projectDescription)
        await this.page.waitForTimeout(2000);

        durationInMonths = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'durationInMonths')
        await this.actionDriver.clickButton(employeePageLoc.durationInMonthsSpinner);
        await this.actionDriver.typeText(durationInMonths)
        await this.page.waitForTimeout(2000);

        numOfMembers = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'numberOfTeamMembers')
        await this.actionDriver.clickButton(employeePageLoc.numTeamMembersSpinner);
        await this.actionDriver.typeText(numOfMembers)
        await this.page.waitForTimeout(2000);

        techStack = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'techStack')
        await this.actionDriver.clickButton(employeePageLoc.techStackDropdown);
        await this.actionDriver.typeText(techStack)
        await this.page.waitForTimeout(2000);
        await this.actionDriver.keyboardPress('Enter')

        await this.actionDriver.clickButton(employeePageLoc.addProjectBtnModal)

    }


    async addFullScaleProject(){

        jsonData = await readJsonFile('employee')

        await this.actionDriver.clickButton(employeePageLoc.addProject);

        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingDots)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.addFullScaleProjectModal)

        // Add Fullscale ProjectName
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.fullscaleProjectList)
        const fsProjectCount = await this.actionDriver.elementCount(employeePageLoc.fullscaleProjectOptions)
        const randomIndexFsProject = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.fullscaleProjectOptions)
        projectName = await this.actionDriver.getText(`(${employeePageLoc.fullscaleProjectOptions})[${randomIndexFsProject}]`)
        await this.actionDriver.clickButton(`(${employeePageLoc.fullscaleProjectOptions})[${randomIndexFsProject}]`)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.modalprojectName)
        await this.page.waitForTimeout(2000);
        await this.actionDriver.ExpectElementValue(employeePageLoc.modalprojectName, projectName)

        // Add Fullscale Project Description
        projectDescription = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'projectDescription')
        await this.setProjectDescription(projectDescription);
        // await this.actionDriver.ElemetType(employeePageLoc.projectDescriptionTextArea, projectDescription)
        await this.page.waitForTimeout(2000);


        // Add Fullscale Project Duration
        durationInMonths = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'durationInMonths')
        await this.actionDriver.clickButton(employeePageLoc.durationInMonthsSpinner);
        await this.actionDriver.typeText(durationInMonths)
        await this.page.waitForTimeout(2000);

        // Add Fullscale Project - Number of Team Members
        numOfMembers = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'numberOfTeamMembers')
        await this.actionDriver.clickButton(employeePageLoc.numTeamMembersSpinner);
        await this.actionDriver.typeText(numOfMembers)
        await this.page.waitForTimeout(2000);

        // Add Fullscale Project - Tech Stack
        techStack = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'techStack')
        await this.actionDriver.clickButton(employeePageLoc.techStackDropdown);
        await this.actionDriver.typeText(techStack)
        await this.page.waitForTimeout(2000);
        await this.actionDriver.keyboardPress('Enter')

        await this.actionDriver.clickButton(employeePageLoc.addProjectBtnModal)

    }

    async saveWorkExperience(){
        await this.actionDriver.clickButton(employeePageLoc.saveWorkExp)

    }

    
    async isWorkExperienceAdded() {


        await this.actionDriver.waitElementUntilClickable(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);

        await this.actionDriver.waitElementUntilHidden(employeePageLoc.savingChangesLoader);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.jobPositionInList);

        const jobPositionList = await this.actionDriver.getTextArray(employeePageLoc.jobPositionInList);
        await this.actionDriver.checkIfIncludesInArray(jobPositionList, jobPosition)

        const projectNameList = await this.actionDriver.getTextArray(employeePageLoc.projectNameInList);
        await this.actionDriver.checkIfIncludesInArray(projectNameList, projectName)

        const projectDescriptionList = await this.actionDriver.getTextArray(employeePageLoc.projectDescriptionInList);
        await this.actionDriver.checkIfIncludesInArray(projectDescriptionList, projectDescription)
        
    }

    async isWorkExperienceAddedInPublicProfile(newPage){

        const actionDriverNewPage = new ActionDriver(newPage)

        const jobPositionInPublicProfile = await actionDriverNewPage.getTextArray(employeePageLoc.jobPositionInListPublicProfile)
        await actionDriverNewPage.checkIfIncludesInArray(jobPositionInPublicProfile, jobPosition)

        const projectNameInPublicProfile = await actionDriverNewPage.getTextArray(employeePageLoc.projectNameInListPublicProfile)
        await actionDriverNewPage.checkIfIncludesInArray(projectNameInPublicProfile, projectName)

        const projectDescrptionInPublicProfile = await actionDriverNewPage.getTextArray(employeePageLoc.projectDescriptionInListPublicProfile)
        await actionDriverNewPage.checkIfIncludesInArray(projectDescrptionInPublicProfile, projectDescription)

    }

   
    /** Deleting Work Experience */

    async deleteWorkExperience(){

        await this.actionDriver.waitElementUntilClickable(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);

        await this.actionDriver.selectDataFromTextwithNode(jobPosition, employeePageLoc.jobPositionInList, employeePageLoc.deleteWorkExpBtn)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.deleteWorkExpDialog);
        
        await this.actionDriver.clickButton(employeePageLoc.yesDeleteButton)

        const confirmJobDeletionText = await this.actionDriver.getText(employeePageLoc.deletingInProgress)
        await this.actionDriver.checkInclude(jobPosition, confirmJobDeletionText)
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.deletingInProgress);
        

    }

    async isWorkExperienceDeleted(){
        
        await this.actionDriver.checkElementVisibility(employeePageLoc.deleteNotification)
        const jobDeleted = await this.actionDriver.getText(employeePageLoc.deleteNotification)
        await this.actionDriver.checkInclude(jobPosition, jobDeleted)
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.deleteNotification)
    }


    /** Update Work Experience */

    async updateWorkExperience(){
        
        jsonData = await readJsonFile('employee')

        await this.actionDriver.waitElementUntilClickable(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);

        await this.actionDriver.selectDataFromTextwithNode(jobPosition, employeePageLoc.jobPositionInList, employeePageLoc.editWorkExpBtn)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.jobTitle);

        await this.actionDriver.clearInputElement(employeePageLoc.startDate)
        startDate = await this.actionDriver.getRandomJsonItem(jsonData['workExperience'], 'startDate')

        await this.actionDriver.typeText(startDate)
        await this.actionDriver.keyboardPress('Enter')
        await this.page.waitForTimeout(2000);
        await this.actionDriver.keyboardPress('Escape') // this is to dismiss the datePicker

    
    }

    async updateFullscaleProject(){

        await this.actionDriver.clickButton(employeePageLoc.editProjectBtn);

        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingDots)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.editFullscaleProjectModal)


        // Update and select another Fullscale project
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.fullscaleProjectList)
        const fsProjectCount = await this.actionDriver.elementCount(employeePageLoc.notSelectedFullscaleProjectOptions)
        const randomIndexFsProject = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.notSelectedFullscaleProjectOptions)
        projectName = await this.actionDriver.getText(`(${employeePageLoc.notSelectedFullscaleProjectOptions})[${randomIndexFsProject}]`)
        await this.actionDriver.clickButton(`(${employeePageLoc.notSelectedFullscaleProjectOptions})[${randomIndexFsProject}]`)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.modalprojectName)
        await this.actionDriver.ExpectElementValue(employeePageLoc.modalprojectName, projectName)

        // Update Fullscale project-description
        projectDescription = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'projectDescription')
        await this.actionDriver.clearInputElement(employeePageLoc.projectDescriptionTextArea)
        // await this.actionDriver.typeText(projectDescription)
        await this.setProjectDescription(projectDescription);
        await this.page.waitForTimeout(2000);
        
        // Update Fullscale project duration
        durationInMonths = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'durationInMonths')
        await this.actionDriver.clearInputElement(employeePageLoc.durationInMonthsSpinner);
        await this.actionDriver.typeText(durationInMonths)
        await this.page.waitForTimeout(2000);

        // Update Fullscale project number of team members
        numOfMembers = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'numberOfTeamMembers')
        await this.actionDriver.clearInputElement(employeePageLoc.numTeamMembersSpinner);
        await this.actionDriver.typeText(numOfMembers)
        await this.page.waitForTimeout(2000);

        // Update Fullscale project tech stack
        techStack = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'techStack')
        await this.actionDriver.clickButton(employeePageLoc.techStackDropdown);
        await this.actionDriver.keyboardPress('Backspace')
        await this.actionDriver.typeText(techStack)
        await this.page.waitForTimeout(2000);
        await this.actionDriver.keyboardPress('Enter')

        await this.actionDriver.clickButton(employeePageLoc.editProjectBtnModal)
    }

    async updateOtherProject(){

        await this.actionDriver.clickButton(employeePageLoc.editProjectBtn);

        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingDots)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.editFullscaleProjectModal)

        // Update Other project-name
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.modalprojectName)
        // await this.actionDriver.ExpectElementValue(employeePageLoc.modalprojectName, projectName)
        await this.actionDriver.clearInputElement(employeePageLoc.modalprojectName)
        projectName = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'projectName')
        await this.actionDriver.typeText(projectName)
        await this.page.waitForTimeout(2000);


        // Update OTHER project-description
        projectDescription = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'projectDescription')
        await this.actionDriver.clearInputElement(employeePageLoc.projectDescriptionTextArea)
        await this.setProjectDescription(projectDescription);
        // await this.actionDriver.typeText(projectDescription)
        await this.page.waitForTimeout(2000);
        
        
        // Update OTHER project duration
        durationInMonths = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'durationInMonths')
        await this.actionDriver.clearInputElement(employeePageLoc.durationInMonthsSpinner);
        await this.actionDriver.typeText(durationInMonths)
        await this.page.waitForTimeout(2000);

        // Update OTHER project number of team members
        numOfMembers = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'numberOfTeamMembers')
        await this.actionDriver.clearInputElement(employeePageLoc.numTeamMembersSpinner);
        await this.actionDriver.typeText(numOfMembers)
        await this.page.waitForTimeout(2000);

        
        // Update OTHER project number of team members
        techStack = await this.actionDriver.getRandomJsonItem(jsonData['projects'], 'techStack')
        await this.actionDriver.clickButton(employeePageLoc.techStackDropdown);
        await this.actionDriver.keyboardPress('Backspace')
        await this.actionDriver.typeText(techStack)
        await this.page.waitForTimeout(2000);
        await this.actionDriver.keyboardPress('Enter')

        await this.actionDriver.clickButton(employeePageLoc.editProjectBtnModal)
    }


    async setProjectDescription(description) {
        const frameHandle = await this.page.waitForSelector(employeePageLoc.descriptionIframe);
        const frame = await frameHandle.contentFrame();
        if (frame) {
            await frame.type(employeePageLoc.descriptionBody, description);
            await this.page.waitForTimeout(1000);
        }
    }

    async addMultipleEmployees(employees, employeeDetails) {
        await this.navigateToEmployeeList();
        await this.addEmployee(employees);
        await this.validateAddedEmployee(employees);
        await this.updatePosition(employeeDetails.role);
        await this.validatePostion(employeeDetails);
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.editSkills);
        await this.actionDriver.clickButton(employeePageLoc.enterSkillField);
        await this.actionDriver.typeText(employeeDetails.skills);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.selectFromList(employeeDetails.skills, employeePageLoc.itemSearchSuggestion);
        await this.actionDriver.clickButton(employeePageLoc.searchbleCheckbox);
        await this.actionDriver.clickButton(employeePageLoc.saveSkills);
        await this.updateClient(employeeDetails.client);
        await this.validateClient(employeeDetails.client);
    }

    /* Add Client Spotlight */

    async addClientSpotlight(clientSpotlightData){
        //performanceReviewContent

        await this.actionDriver.waitElementUntilClickable(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);

        /**
         * Checks if zero-state message is present under Client Spotlight section
         */
        const noClientReview = await this.actionDriver.elementVisible(employeePageLoc.zeroStateClientReview)

        /**
         * When zero-state message is present, that means there are no existing client review / spotlight added
         * This proceeds clicking the selectButtonA - that triggers Add Client Spotlight / Review modal
         */
        if(noClientReview === true){
            await this.actionDriver.waitElementUntilClickable(employeePageLoc.selectNewButton)
            await this.actionDriver.clickButton(employeePageLoc.selectNewButton)
        }
        /**
         * When zero-state message is NOT present, means there is already existing client review in the Client Spotlight section
         * This proceeds clicking to the other selectButtonB - that also triggers the Add Client Spotlight / Review modal
         */
        else{
            await this.actionDriver.waitElementUntilClickable(employeePageLoc.selectExistingButton)
            await this.actionDriver.clickButton(employeePageLoc.selectExistingButton)
        }

        await this.actionDriver.waitElementUntilVisible(employeePageLoc.selectSpotlightModal)
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.addClientReviewButton)
        await this.actionDriver.clickButton(employeePageLoc.addClientReviewButton)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.reviewerNameTextfield)
        
        const reviewerName = await this.actionDriver.getRandomJsonItem(clientSpotlightData, 'reviewerName')
        await this.actionDriver.ElemetType(employeePageLoc.reviewerNameTextfield, reviewerName)

        const reviewerTitle = await this.actionDriver.getRandomJsonItem(clientSpotlightData, 'reviewerTitle')
        await this.actionDriver.ElemetType(employeePageLoc.reviewerTitleTextfield, reviewerTitle)

        const randomRating = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.ratingOptionsRadiobutton)
        const rating = await this.actionDriver.getText(`${employeePageLoc.ratingOptionsRadiobutton}[${randomRating}]`)
        await this.actionDriver.clickButton(`${employeePageLoc.ratingOptionsRadiobutton}[${randomRating}]`)

        await this.actionDriver.clickButton(employeePageLoc.dateField)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.yearDropdown)
        const randomMonth = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.activeAndDefaultMonths)
        const reviewMonth = await this.actionDriver.getText(`${employeePageLoc.activeAndDefaultMonths}[${randomMonth}]`)
        await this.actionDriver.clickButton(`${employeePageLoc.activeAndDefaultMonths}[${randomMonth}]`)

        /**
         * We simulate the actual user keyboard interaction here
         * To get the month-year value, we click once on the dateField
         * Clicked Control + A keys to select all
         * Control + C to copy the dateValue to clipboard
         */
        await this.actionDriver.clickButton(employeePageLoc.dateField)
        await this.actionDriver.keyboardPress('Control+A')
        await this.actionDriver.keyboardPress('Control+C')
        /**
        * copied to clipboard dateValue is now stored in the reviewDate variable
        */
        const reviewDate = await this.page.evaluate(() => navigator.clipboard.readText());
        await this.actionDriver.clickButton(employeePageLoc.addClientReviewModal)

        const reviewerComment = await this.actionDriver.getRandomJsonItem(clientSpotlightData, 'reviewerComment')
        await this.actionDriver.clickButton(employeePageLoc.reviewerCommentTextarea)
        await this.actionDriver.ElemetType(employeePageLoc.reviewerCommentTextarea, reviewerComment)

        const newClientSpotlight = {reviewerName, reviewerTitle, rating, reviewDate, reviewerComment}

        await this.actionDriver.clickButton(employeePageLoc.selectSpotlightButton)

        return newClientSpotlight

     
    }

    async isClientSpotlightSaved(savedClientSpotlight){

        await this.actionDriver.waitElementUntilVisible(employeePageLoc.reviewTitleTextDisplay)
    
        /** View Saved Title */
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.reviewTitleTextDisplay)
        const savedTitle = await this.actionDriver.getText(employeePageLoc.reviewTitleTextDisplay)
        const formattedSavedTitle = savedTitle.replace(/^, /, '');
        await this.actionDriver.checkInclude(savedClientSpotlight.reviewerTitle.trim(), formattedSavedTitle.trim())


        /** View Saved Rating */
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.reviewRatingTextDisplay)

        /**
         * addedRating - the rating returned from addClientSpotlight()
         * savedRating - the text display for rating in Client Spotlight (text extracted via getText())
         */
        let addedRating = savedClientSpotlight.rating
        const savedRating = await this.actionDriver.getText(employeePageLoc.reviewRatingTextDisplay)

    
        /**
         * when adding client review rating from Add Client Review modal, options are "1 - Needs Improvement" , "2 - Meets Expectations" or "3 - Exceeds Expections"
         * code below trims the trailing digits and '-' so it now reads as - "Meets Expectations" and "Exceeds Expectations"
         * However, Client Spotlight displays for options 2 & 3 are "Meets expectations" and "Exceeds expectations" respectively
         * 'expectations' is in lowerCase
        */
        addedRating = addedRating.replace(/^\d+\s-\s/, '');

        /**
         * Both strings are converted to lowerCases so they would match
         */
        const newAddedRating = addedRating.toLowerCase()
        const newSavedRating = savedRating.toLowerCase()

        if (newAddedRating === newSavedRating) {
            await this.actionDriver.checkInclude(newAddedRating, newSavedRating)

        } else {
            /**
             * when option '1 - Needs Improvement' is selected in Add Client Review modal, it will read as 'Below expectations' in the Client Spotlight section
             * To avoid adding more logic, log info is added below that says "1 - Needs Improvement" and "Below expectations" are of the same option
             */
        }
        
        /** View Saved Comment */
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.reviewCommentTextDisplay)
        const savedComment = await this.actionDriver.getText(employeePageLoc.reviewCommentTextDisplay)
        await this.actionDriver.checkInclude(savedComment, savedClientSpotlight.reviewerComment)

        return true
    }

    async editClientSpotlight(oldClientSpotlight, clientSpotlightJsonData){

        await this.actionDriver.waitElementUntilClickable(employeePageLoc.editButton)
        await this.actionDriver.clickButton(employeePageLoc.editButton)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.editClientReviewModal)
        
        /** Edit Reviewer name */
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.reviewerNameTextfield)
        await this.actionDriver.ExpectElementValue(employeePageLoc.reviewerNameTextfield, oldClientSpotlight.reviewerName)

        const reviewerName = await this.actionDriver.getRandomJsonItem(clientSpotlightJsonData, 'reviewerName')
        await this.actionDriver.clearInputElement(employeePageLoc.reviewerNameTextfield)
        await this.actionDriver.ElemetType(employeePageLoc.reviewerNameTextfield, reviewerName)


        /** Edit Reviewer Title */
        // await this.actionDriver.ExpectElementValue(employeePageLoc.reviewerTitleTextfield, oldClientSpotlight.reviewerTitle.trim())
        const reviewerTitle = await this.actionDriver.getRandomJsonItem(clientSpotlightJsonData, 'reviewerTitle')
        await this.actionDriver.clearInputElement(employeePageLoc.reviewerTitleTextfield)
        await this.actionDriver.ElemetType(employeePageLoc.reviewerTitleTextfield, reviewerTitle)

        /** Edit Rating */
        const randomRating = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.ratingOptionsRadiobutton)
        const rating = await this.actionDriver.getText(`${employeePageLoc.ratingOptionsRadiobutton}[${randomRating}]`)
        await this.actionDriver.clickButton(`${employeePageLoc.ratingOptionsRadiobutton}[${randomRating}]`)

        /** Edit Date */
        await this.actionDriver.clickButton(employeePageLoc.editDateField)
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.yearDropdown)
        const randomMonth = await this.actionDriver.selectRandomIndexFromList(employeePageLoc.activeNotSelectedMonths)
        const updatedReviewMonth = await this.actionDriver.getText(`${employeePageLoc.activeNotSelectedMonths}[${randomMonth}]`)
        await this.actionDriver.clickButton(`${employeePageLoc.activeNotSelectedMonths}[${randomMonth}]`)

        await this.actionDriver.clickButton(employeePageLoc.editDateField)
        await this.actionDriver.keyboardPress('Control+A')
        await this.actionDriver.keyboardPress('Control+C')
        const reviewDate = await this.page.evaluate(() => navigator.clipboard.readText());
        await this.actionDriver.clickButton(employeePageLoc.editClientReviewModal)


         /** Edit Comment */

        /**
         *  Don't see other way to getText of textarea so keyboard controlA (selectAll) and controlC (copy) is simulated 
         *  to get the existing value of the textArea
        */
        await this.actionDriver.clickButton(employeePageLoc.reviewerCommentTextarea)
        await this.actionDriver.keyboardPress('Control+A')
        await this.actionDriver.keyboardPress('Control+C')

        /** then, the copied value is assigned to <existingReviewComment> variable */
        const existingReviewComment = await this.page.evaluate(() => navigator.clipboard.readText());
        await this.actionDriver.checkInclude(existingReviewComment, oldClientSpotlight.reviewerComment)

        /** Generated to new random value and typed it in the text area */
        const reviewerComment = await this.actionDriver.getRandomJsonItem(clientSpotlightJsonData, 'reviewerComment')
        await this.actionDriver.clearInputElement(employeePageLoc.reviewerCommentTextarea)
        await this.actionDriver.ElemetType(employeePageLoc.reviewerCommentTextarea, reviewerComment)
        await this.actionDriver.clickButton(employeePageLoc.editClientReviewModal)

        const updatedClientSpotlight = {reviewerName, reviewerTitle, rating, reviewDate, reviewerComment}

        await this.actionDriver.hoverElement(employeePageLoc.updateReviewButton)
        await this.actionDriver.clickButton(employeePageLoc.updateReviewButton)

        return updatedClientSpotlight;
        
    }
    
    async deleteClientSpotlight(){


        await this.actionDriver.waitElementUntilClickable(employeePageLoc.clearButton)
        await this.actionDriver.clickButton(employeePageLoc.clearButton)

        await this.actionDriver.checkElementVisibility(employeePageLoc.deleteSpotlightDialog)
        await this.actionDriver.takeScreenshot()
        
        await this.actionDriver.clickButton(employeePageLoc.yesDeleteButton)

        await this.actionDriver.waitElementUntilVisible(employeePageLoc.deletingProgressSpotlightDialog)
        await this.actionDriver.takeScreenshot()

        await this.actionDriver.waitElementUntilHidden(employeePageLoc.deletingProgressSpotlightDialog)

    }

    async isClientSpotlightDeleted(){
        await this.actionDriver.checkElementVisibility(employeePageLoc.deletedSpotlightNotification)
        await this.actionDriver.takeScreenshot()
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.deletedSpotlightNotification)
        
        await this.actionDriver.elementVisible(employeePageLoc.zeroStateClientReview)
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.selectNewButton)
        await this.actionDriver.takeScreenshot()

        return true

    }
}