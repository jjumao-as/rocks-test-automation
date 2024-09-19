module.exports = {

    // Feedback Listing locators
    feedbackResponsesHeader : '//*[@id="fs-page-holder-container"]/div/div[1]/div[1]/div/div[1]/h4',
    topRow : '//*[@id="feedback-list"]/div/div/div/div[2]/div/table/tbody/tr[1]',
    feedbackDetailsBtn : '//*[@id="feedback-list"]/div/div/div/div[2]/div/table/tbody/tr[1]/td[5]/a',
    feedbackResponseModalHeading : '//*[@id="modalTitle"]/h4',
    imageInModal : '//*[@id="feedback-detail-modal-container"]/div/table/tbody/tr[3]/td[2]/div/img',
    closeButton : '//*[@id="modalTitle"]/div/button',

    // Employee List locators
    employeeTable : "//table[@class='table dataTable showHeaderOnly']",
    employeeListHeader : "//h4[contains(text(), 'Employees')]",
    employeeNameLink : "//a[contains(@class,'photo-card-user-names')]",

    // Employee Profile Locators
    clientInterviewLink : "//a[contains(@id, 'nav-client-interviews-link')]",
    addInterviewButton : "//span[contains(text(), 'Add Interview')]",
    addInterviewModalHeading : "//h4[contains(text(), 'Add Interview')]",

    selectClientDropdown : "//span[contains(text(), 'Select Client')]",
    clientOptions: "//li[@class='select2-results__option']",

    dateTimePicker : "//input[@class='form-control']",
    dateSelected : "//span[@class='flatpickr-day selected']",

    timeDropdown : "//span[@id='select2-fs-timepicker-interviewTime-container']",
    timeOptions : "//li[@class='select2-results__option']",

    additionalInviteesMultiselect : "#modalDescription > div:nth-child(1) > div.col-md-12.mb-3.font-16 > div > div.multiselect__tags",
    additionalInviteesOptions : '//*[@id="modalDescription"]/div[1]/div[5]/div/div[3]/ul/li[not(contains(@style, "display: none"))]',

    statusDropdown : "//span[@id='select2-status-container']",
    statusOptions : "//li[contains(@class, 'select2-results__option')]",

    reasonDropdown : "//span[@id='select2-reason-container']",
    reasonOptions : "//li[contains(@class, 'select2-results__option')]",

    performanceGradeDropdown : "//span[@id='select2-performanceGrade-container']",
    performanceGradeOptions : "//li[contains(@class, 'select2-results__option') and position() > 1]",

    clientFeedbackTextArea : '//*[@id="clientFeedback"]/div/div[1]/div[2]/div[1]',
    salesFeedbackTextArea : '//*[@id="salesFeedback"]/div/div[1]/div[2]/div[1]',
    talentFeedbackTextArea : '//*[@id="talentFeedback"]/div/div[1]/div[2]/div[1]',

    addNotesButton : "//span[contains(text(), 'Add Notes')]",

    interviewTable : "//table[@id='client-interview-table']",
    zeroStateTable : "//h5[contains(text(), 'There are no contents to show')]",
    
    statusTD : '//*[@id="client-interview-table"]/tbody/tr/td[1]/div/div',
    clientTD : "//a[contains(@class, 'text-forest-green hover:text-forest-green hover:underline')]",
    gradeTD : '//*[@id="client-interview-table"]/tbody/tr/td[3]/span',
    inviteeTD : '//*[@id="client-interview-table"]/tbody/tr/td[4]/p/span[1]',
    scheduleTD : '//*[@id="client-interview-table"]/tbody/tr/td[5]/span',

    deleteButton : '//*[@id="client-interview-table"]/tbody/tr/td[6]/div/div/a',
    yesButton : "//button[@class='swal2-confirm swal2-styled']",
    goToNextPage : "//button[contains(@aria-label,'Go to next page')]",



    addNewEmployeeButton : "//span[text()='Add New Employee']",
    startDate : "//label[contains(text(),'Start Date')]/following-sibling::input[2]",
    dateToday: "//span[@class='flatpickr-day today']",
    firstNameField : "//input[@name='first_name']",
    lastNameField : "//input[@name='last_name']",
    createEmployeeBtn : "//span[text()='Create Employee']",
    employeeListTab : "(//span[text()='Employee List'])[1]",
    employeeNameList : "//a[contains(@class,'photo-card-user-names')]//span",
    searchEmployee : "//input[contains(@placeholder,'Search Employee')]",
    searchEmployeeBtn : "//button[contains(@class,'btn-search')]",
    editEmployeeClients : "//span[text()='Clients']/following-sibling::a",
    enterProjectField : "//input[@id='projectsSelection']",
    itemSearchSuggestion : "//li[contains(@class,'item valid')]/div",
    saveProject : "//span[text()='Save']",
    clientList : "//span[contains(@class,'tag-name')]",
    manageProjectTitle : "//h4[text()='Manage Project']",

    editSkills : "//div[contains(@class,'skills-and-proficiencies')]/div/a",
    enterSkillField : "//input[@id='skills-selection']",
    skillsList : "//div[@id='skill']//div[contains(@class,'draggable-row')]/div[2]/span",
    showInProfileCheckbox : "//div[@id='skill']//div[contains(@class,'draggable-row')]/div[6]//input",
    searchbleCheckbox : "//div[@id='skill']//div[contains(@class,'draggable-row')]/div[7]//input",
    saveSkills : "//section[@class='modal-footer-new']//span[text()='Save']",
    skillsListInProfile : "//div[contains(@class,'skills-and-proficiencies')]//div/div[1]/span",

    employmentTab : "//span[text()='Employment']",
    editWorkDetail : "//div[@data-original-title='Edit work detail']",
    currentPositionField : "//span[@id='select2-position-level-container']",
    seniorOption : "//li[text()='Senior']",
    positionField : "//input[@id='employee-position']",
    savePosition : "//span[text()='Save']/parent::button",
    currentPosition : "//span[text()='Current Position']/parent::div/parent::div/following-sibling::div/span",
    talentProfileTab : "//span[text()='Talent Profile']",
    modalTitle : "//h4[text()='Work Detail']",
    selectedPosition : "//li[@class='tag valid']",
    selectDeveloperType : "//span[@id='select2-position-subtype-container']",
    fullStackOption : "//li[text()='Full Stack']",
    employeeActionButton : "//button[contains(@id,'fsButtonDropdown-action')]",
    deleteRequest : "//a[contains(text(),'Delete')]",
    confirmDeletion : "//div[contains(@class,'swal2-actions')]/button[text()='Yes']",
    deletionProgress : "//div[contains(text(),'Wait while saving changes')]",
    loadingRecords : "//span[contains(text(),'Loading records')]",
    interviewDeletionProgress : "//div[contains(text(),'Deleting interview')]",
}