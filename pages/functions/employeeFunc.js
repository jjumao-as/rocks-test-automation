const employeePageLoc = require('../locators/employeeLoc');
const manageClientsLoc = require('../locators/manageClientsLoc');
const ActionDriver = require('../../utils/ActionDriver');
const dashboardLoc = require('../locators/dashboardLoc');
const { readJsonFile } = require('../../utils/jsonReader');
const { time } = require('console');
const { stat } = require('fs');


let empName;
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

exports.EmployeesPage = class EmployeesPage {

    constructor(page) {

        this.page = page;
        this.actionDriver = new ActionDriver(page);


    }


    /*
    * Employee Feeback functions
    */ 

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

        const rowCount = await this.actionDriver.elementCount(employeePageLoc.employeeNameLink)
        const randomIndex = Math.floor(Math.random() * (rowCount - 1 + 1)) + 1

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
        const clientCount = await this.actionDriver.elementCount(employeePageLoc.clientOptions)
        const randomIndexClient = Math.floor(Math.random() * (clientCount - 1 + 1)) + 1
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
        const timeCount = await this.actionDriver.elementCount(employeePageLoc.timeOptions)
        const randomIndexTime = Math.floor(Math.random() * (timeCount - 1 + 1)) + 1
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
                randomIndexInvitee = Math.floor(Math.random() * (inviteeCount - 1 + 1)) + 1
                invitee = await this.actionDriver.getText(`(${employeePageLoc.additionalInviteesOptions})[${randomIndexInvitee}]`)
                await this.actionDriver.typeText(invitee)
                await this.actionDriver.keyboardPress('Enter')


            }
            else {
                randomIndexInvitee = Math.floor(Math.random() * (inviteeCount - 1 + 1)) + 1
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

        const statusCount = await this.actionDriver.elementCount(employeePageLoc.statusOptions)
        const randomIndexStatus = Math.floor(Math.random() * (statusCount - 1 + 1)) + 1

        await this.actionDriver.getText(`${employeePageLoc.statusOptions}[${randomIndexStatus}]`)
        interviewStatus = await this.actionDriver.getText(`${employeePageLoc.statusOptions}[${randomIndexStatus}]`)

        await this.actionDriver.clickButton(`${employeePageLoc.statusOptions}[${randomIndexStatus}]`)





        // select reason for "Failed" status
        if (interviewStatus === 'Failed') {

            await this.actionDriver.checkElementVisibility(employeePageLoc.reasonDropdown)
            await this.actionDriver.clickButton(employeePageLoc.reasonDropdown)

            const reasonCount = await this.actionDriver.elementCount(employeePageLoc.reasonOptions)
            const randomIndexReason = Math.floor(Math.random() * (reasonCount - 1 + 1)) + 1

            await this.actionDriver.getText(`(${employeePageLoc.reasonOptions})[${randomIndexReason}]`)
            reason = await this.actionDriver.getText(`(${employeePageLoc.reasonOptions})[${randomIndexReason}]`)

            await this.actionDriver.clickButton(`(${employeePageLoc.reasonOptions})[${randomIndexReason}]`)

            await this.actionDriver.keyboardPress('Enter')

        }


        // select grade
        await this.actionDriver.clickButton(employeePageLoc.performanceGradeDropdown)

        const gradeCount = await this.actionDriver.elementCount(employeePageLoc.performanceGradeOptions)

        const randomIndexGrade = Math.floor(Math.random() * (gradeCount - 1 + 1)) + 1

        await this.actionDriver.getText(`(${employeePageLoc.performanceGradeOptions})[${randomIndexGrade}]`)
        grade = await this.actionDriver.getText(`(${employeePageLoc.performanceGradeOptions})[${randomIndexGrade}]`)

        await this.actionDriver.clickButton(`(${employeePageLoc.performanceGradeOptions})[${randomIndexGrade}]`)


        // enter client feedback
        clientFeedback = await this.actionDriver.getRandomJsonItem(jsonData, 'clientFeedback')
        await this.actionDriver.clickButton(employeePageLoc.clientFeedbackTextArea)
        await this.actionDriver.typeText(clientFeedback)




    }

    async submitInterview() {
        await this.actionDriver.clickButton(employeePageLoc.addNotesButton)
        console.log(`Added Interview : ${interviewStatus} | ${clientName} | ${grade} | ${invitee} | ${interviewDate}, ${interviewTime}`)
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

    async updateInterview(){
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

            console.log(`Viewed Interview : ${vStatus} | ${vClientName} | ${vGrade} | ${vInvitee} | ${vDate}, ${vTime}`)



            // edit clientName
            await this.actionDriver.clickButton(employeePageLoc.clientPenIcon)
            await this.actionDriver.checkElementVisibility(employeePageLoc.updateClientDropdown)
            await this.actionDriver.clickButton(employeePageLoc.updateClientDropdown)

            const clientCount = await this.actionDriver.elementCount(employeePageLoc.notSelectedClients)
            const randomIndexClient = Math.floor(Math.random() * (clientCount - 1 + 1)) + 1
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
            const timeCount = await this.actionDriver.elementCount(employeePageLoc.notSelectedTimes)
            const randomIndexTime = Math.floor(Math.random() * (timeCount - 1 + 1)) + 1
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
                    randomIndexInvitee = Math.floor(Math.random() * (inviteeCount - 1 + 1)) + 1
                    invitee = await this.actionDriver.getText(`(${employeePageLoc.updateInviteesOptions})[${randomIndexInvitee}]`)
                    await this.actionDriver.typeText(invitee)
                    await this.actionDriver.keyboardPress('Enter')

    
    
                }
                else {
                    randomIndexInvitee = Math.floor(Math.random() * (inviteeCount - 1 + 1)) + 1
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

            const statusCount = await this.actionDriver.elementCount(employeePageLoc.notSelectedStatus)
            const randomIndexStatus = Math.floor(Math.random() * (statusCount - 1 + 1)) + 1

            await this.actionDriver.getText(`${employeePageLoc.notSelectedStatus}[${randomIndexStatus}]`)
            interviewStatus = await this.actionDriver.getText(`${employeePageLoc.notSelectedStatus}[${randomIndexStatus}]`)

            await this.actionDriver.clickButton(`${employeePageLoc.notSelectedStatus}[${randomIndexStatus}]`)



        
            // select reason for "Failed" status
            if (interviewStatus === 'Failed') {
                await this.actionDriver.clickButton(employeePageLoc.reasonPenIcon)
                await this.actionDriver.checkElementVisibility(employeePageLoc.reasonDropdown)
                await this.actionDriver.clickButton(employeePageLoc.reasonDropdown)

                const reasonCount = await this.actionDriver.elementCount(employeePageLoc.notSelectedReasons)
                const randomIndexReason = Math.floor(Math.random() * (reasonCount - 1 + 1)) + 1

                await this.actionDriver.getText(`(${employeePageLoc.notSelectedReasons})[${randomIndexReason}]`)
                reason = await this.actionDriver.getText(`(${employeePageLoc.notSelectedReasons})[${randomIndexReason}]`)

                await this.actionDriver.clickButton(`(${employeePageLoc.notSelectedReasons})[${randomIndexReason}]`)

                await this.actionDriver.keyboardPress('Enter')


            }

            // update grade

            await this.actionDriver.clickButton(employeePageLoc.gradePenIcon)
            await this.actionDriver.checkElementVisibility(employeePageLoc.performanceGradeDropdown)
            await this.actionDriver.clickButton(employeePageLoc.performanceGradeDropdown)

            const gradeCount = await this.actionDriver.elementCount(employeePageLoc.notSelectedGrade)

            const randomIndexGrade = Math.floor(Math.random() * (gradeCount - 1 + 1)) + 1

            await this.actionDriver.getText(`(${employeePageLoc.notSelectedGrade})[${randomIndexGrade}]`)
            grade = await this.actionDriver.getText(`(${employeePageLoc.notSelectedGrade})[${randomIndexGrade}]`)

            await this.actionDriver.clickButton(`(${employeePageLoc.notSelectedGrade})[${randomIndexGrade}]`)
            
            // edit Client Feedback

            await this.actionDriver.clickButton(employeePageLoc.clientFeedbackPenIcon)
            await this.actionDriver.checkElementVisibility(employeePageLoc.clientFeedbackTextArea)
            clientFeedback = await this.actionDriver.getRandomJsonItem(jsonData, 'clientFeedback')
            await this.actionDriver.clickButton(employeePageLoc.clientFeedbackTextArea)
            await this.actionDriver.typeText(clientFeedback)

            // uncheck Send Notifications
            await this.actionDriver.clickButton(employeePageLoc.notificationCheckbox)

            
            // click Save Notes button
            await this.actionDriver.clickButton(employeePageLoc.saveNotesButton)
            await this.actionDriver.waitElementUntilHidden(employeePageLoc.savingChangesLoader)

            console.log(`Updated Interview : ${interviewStatus} | ${clientName} | ${grade} | ${invitee} | ${interviewDate}, ${interviewTime} | ${clientFeedback}`)

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


    async clickClientNameLink(){
        await this.actionDriver.clickButton(employeePageLoc.clientNameLink)
          
    }

    async isInClientPage(){
        await this.actionDriver.waitElementUntilVisible(manageClientsLoc.weeklyReportZeroStateLabel) 
        await this.actionDriver.checkElementVisibility(manageClientsLoc.weeklyReportZeroStateLabel) 
        const cname = await this.actionDriver.getText(manageClientsLoc.clientNameLink)
        await this.actionDriver.checkInclude(clientName, cname)
        await this.actionDriver.goBackPreviousPage()

     
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
        const employeeName = testData.lastName + ', ' + testData.firstName;
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.editEmployeeClients)
        await this.actionDriver.clickButton(employeePageLoc.employeeListTab);
        await this.actionDriver.setText(employeePageLoc.searchEmployee, employeeName);
        await this.actionDriver.clickButton(employeePageLoc.searchEmployeeBtn);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        await this.actionDriver.findText(employeeName, employeePageLoc.employeeNameList);
        await this.actionDriver.selectDataFromText(employeeName, employeePageLoc.employeeNameList, employeePageLoc.employeeNameList);
    }

    async searchEmployee(testData) {
        const employeeName = testData.lastName + ', ' + testData.firstName;
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

    async validatePostion(testData) {
        const position = testData.position + " " + testData.role;
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.modalTitle);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.currentPosition);
        await this.actionDriver.expectEquals(position, employeePageLoc.currentPosition);
    }

    async addSkills(testData) {
        await this.actionDriver.clickButton(employeePageLoc.talentProfileTab);
        await this.actionDriver.clickButton(employeePageLoc.editSkills);
        await this.actionDriver.clickButton(employeePageLoc.enterSkillField);
        for(let i=0; i<testData.length; i++) {
            await this.actionDriver.typeText(testData[i][0]);
            await this.actionDriver.waitElementUntilVisible(employeePageLoc.itemSearchSuggestion);
            await this.actionDriver.selectFromList(testData[i][0], employeePageLoc.itemSearchSuggestion);
        }
        for(let j=0; j<testData.length; j++) {
            const skill = testData[j];
            if(!skill[1]) {
                await this.actionDriver.clickButton(`(${employeePageLoc.showInProfileCheckbox})[${j+1}]`);
            }
            if(skill[2]) {
                await this.actionDriver.clickButton(`(${employeePageLoc.searchbleCheckbox})[${j+1}]`);
            }
        }
        await this.actionDriver.clickButton(employeePageLoc.saveSkills);
    }

    async validateTalentSkill(skills) {
        for(let i=0; i<skills.length; i++) {
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

    async navigateToEmployeeList() {
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
        await this.actionDriver.setText(employeePageLoc.searchEmployee, employeeName);
        await this.actionDriver.clickButton(employeePageLoc.searchEmployeeBtn);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.loadingRecords);
        await this.actionDriver.compareFromList(employeeName, employeePageLoc.employeeNameList);
    }

    async editAboutMe(testData) {
        await this.actionDriver.waitElementUntilClickable(employeePageLoc.editAboutMe);
        await this.actionDriver.clickButton(employeePageLoc.editAboutMe);
        await this.actionDriver.ElemetType(employeePageLoc.aboutMeTxtArea, testData);
        await this.actionDriver.clickButton(employeePageLoc.saveAboutMeBtn);
        await this.actionDriver.waitElementUntilHidden(employeePageLoc.aboutMeTxtArea);
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.editAboutMe);
        const text = await this.actionDriver.getText(employeePageLoc.aboutMeDetails);
        await this.actionDriver.checkInclude(text, testData);
    }

    async addWorkExperience(testData) {
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
        await this.actionDriver.waitElementUntilVisible(employeePageLoc.addWorkExpBtn);
    }

    async validateWorkExperience(testData) {
        await this.actionDriver.expectEquals(testData.jobPosition, employeePageLoc.addedJobTitle);
        await this.actionDriver.expectEquals(testData.projectName, employeePageLoc.projectName);
        await this.actionDriver.expectEquals(testData.description, employeePageLoc.projectDesc);
    }

    async setProjectDescription(description) {
        const frameHandle = await this.page.waitForSelector(employeePageLoc.descriptionIframe);
        const frame = await frameHandle.contentFrame();
        if(frame) {
                await frame.type(employeePageLoc.descriptionBody, description);
                await this.page.waitForTimeout(1000);
        }
    }
}