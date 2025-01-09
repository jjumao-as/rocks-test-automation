module.exports = {

    // Employee List locators
    employeeTable : "//table[@class='table dataTable showHeaderOnly']",
    employeeListHeader : "//h4[contains(text(), 'Employees')]",
    employeeNameLink : "//a[contains(@class,'photo-card-user-names')]",

    /**
     * Superadmin
     * Performance Reviews
    */
    performanceReviewsTab : "(//span[text()='Performance Reviews'])[1]",
    pullingRecordsLoader : " //span[contains(text(), 'Pulling all records')]",
    pullingEmployeesLoader : "//span[contains(text(), 'Pulling all employees')]",
    performanceReviewHeader : "//h4[contains(text(), 'Performance Review Dashboard')]",
    performanceEmployeeNames : "//a[@class='mb-0 text-success font-weight-bold text-font-1']",
    performanceClientNames : "//a[@class='mb-0 text-success']",
    row1 : "(//tbody/tr[1])",
    row1TdLinks : "(//tbody/tr)[1]//a",
    employeeName1 : "(//tbody/tr/td/a)[1]",
    clientName1 : "(//tbody/tr/td/a)[2]",
    select2QuarterDropdown : "(//span[@class='selection'])[1]",
    select2QuarterOptions : "(//span[@class='select2-results']/ul/li)",
    select2YearDropdown : "(//span[@class='selection'])[2]",
    select2YearContainer : "//ul[@id='select2-2sdh-results']",
    select2YearOptions : "(//span[@class='select2-results']/ul/li)",



    // View Performance Evaluation
    viewButton1 : "(//button[contains(text(), 'VIEW')])[1]",
    loadingRecords : "//span[contains(text(), 'Loading records...')]",
    viewPerformanceReviewHeader : "//h4[contains(text(), 'View Performance Review')]",
    performanceCompetenciesRows : "//div[@class='row no-gutters align-items-center']",
    performanceCompetenciesRow1 : "(//div[@class='row no-gutters align-items-center'])[1]",
    closeViewPerformanceReviewModal : "//button[@class='btn btn-close']",
    performanceObjectiveCard : "//*[@id='modalDescription']/div/div[3]/div/div[3]/div",
    managerFeedback : "//div[contains(text(), 'Manager Feedback')]",
    managerRating : "//div[contains(text(), 'Manager Rating')]",
    summaryManagerRating : "//*[@id='modalDescription']/div/div/div[2]/div[3]/div[2]/div/span",
    summaryManagerComment : "//div[@class='card rounded comment-manager']//div//div",
    

    
    // Feedback Listing locators
    feedbackResponsesHeader : "//h4[text()='Feedback Responses']",
    topRow : '//*[@id="feedback-list"]/div/div/div/div[2]/div/table/tbody/tr[1]',
    feedbackDetailsBtn : '//*[@id="feedback-list"]/div/div/div/div[2]/div/table/tbody/tr[1]/td[5]/a',
    feedbackResponseModalHeading : '//*[@id="modalTitle"]/h4',
    imageInModal : '//*[@id="feedback-detail-modal-container"]/div/table/tbody/tr[3]/td[2]/div/img',
    closeButton : '//*[@id="modalTitle"]/div/button',

    

    // Employee Profile Locators > Add Interview

    talentName : "//span[contains(@class, 'talent-name')]",
    publicProfileLink : "//a[contains(text(), 'Public Profile')]",
    


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
    clientNameLink : "//a[contains(@class, 'text-forest-green hover:text-forest-green hover:underline')]",
    clientTD : "//span[@class='w-100 d-block text-wrap text-break']",
    gradeTD : '//*[@id="client-interview-table"]/tbody/tr/td[3]/span',
    inviteeTD : '//*[@id="client-interview-table"]/tbody/tr/td[4]/p/span[1]',
    scheduleTD : '//*[@id="client-interview-table"]/tbody/tr/td[5]/span',

    deleteButton : '//*[@id="client-interview-table"]/tbody/tr/td[6]/div/div/a',
    yesButton : "//button[@class='swal2-confirm swal2-styled']",
    goToNextPage : "//button[contains(@aria-label,'Go to next page')]",

    
    // View Client Interview
    viewedClientName : "//*[@id='modalDescription']/div[2]/div[1]/div",
    viewedDate : "//*[@id='modalDescription']/div[2]/div[3]/div",
    viewedInvitee : "//*[@id='modalDescription']/div[2]/div[5]/div",
    viewedTime : "//*[@id='modalDescription']/div[2]/div[4]/div",
    viewedStatus : "//*[@id='modalDescription']/div[3]/div[1]/div",
    viewedGrade : "//*[@id='modalDescription']/div[3]/div[3]/div",
    viewedClientFeedback : "//*[@id='modalDescription']/div[3]/div[4]/dl/dd[1]/div/p",


    // Update Client Interview

    viewButton : "//*[@id='client-interview-table']/tbody/tr/td[6]/div/a",

    loadingDots : "//div[contains(@class, 'inline-loader')]",
    viewInterviewModalHeading : "//h4[contains(text(), 'View Client Interview Notes')]",

    clientPenIcon : '//*[@id="modalDescription"]/div[2]/div[1]/label/i',
    updateClientDropdown : "//*[@id='modalDescription']/div[2]/div[1]/span/span[1]/span",
    loaderClientUpdate : "//*[@id='modalDescription']/div[2]/div[1]",
                          
    datePenIcon : "//*[@id='modalDescription']/div[2]/div[3]/label/i",
    timePenIcon : "//*[@id='modalDescription']/div[2]/div[4]/label/i",

    inviteesPenIcon : "//*[@id='modalDescription']/div[2]/div[5]/label/i",
    updateInviteesMultiSelect : "//*[@id='modalDescription']/div[2]/div[5]/div/div[2]",
    updateInviteesOptions : "//*[@id='modalDescription']/div[2]/div[5]/div/div[3]/ul/li[not(contains(@style, 'display: none'))]",

    statusPenIcon : "//*[@id='modalDescription']/div[3]/div[1]/label/i",
    reasonPenIcon : "//*[@id='modalDescription']/div[3]/div[2]/label/i",
    gradePenIcon : "//*[@id='modalDescription']/div[3]/div[3]/label/i",

    clientFeedbackPenIcon : "//*[@id='modalDescription']/div[3]/div[4]/dl/dt[1]/i",
    salesFeedbackPenIcon : "//*[@id='modalDescription']/div[3]/div[4]/dl/dt[2]/i",
    talentFeedbackPenIcon : "//*[@id='modalDescription']/div[3]/div[4]/dl/dt[3]/i",

    notSelectedClients : "//li[@class='select2-results__option' and not(@aria-selected='true')]",
    notSelectedTimes : "//li[@class='select2-results__option' and not(@aria-selected='true')]",
    notSelectedStatus : "//li[@class='select2-results__option' and not(@aria-selected='true')]",
    notSelectedReasons : "//li[contains(@class, 'select2-results__option') and not(@aria-selected='true')]",
    notSelectedGrade : "//li[contains(@class, 'select2-results__option') and position() > 1 and not(@aria-selected='true')]",
    notificationCheckbox : "//input[@id='send_notification']",

    saveNotesButton : "//span[contains(text(), 'Save Notes')]",
    savingChangesLoader : "//div[contains(text(), 'Wait while saving changes')]",

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

    projectList : "//div[@id='projectsSelection']//li[contains(@class,'tag valid')]//span",
    removeProject : "//div[@id='projectsSelection']//li[contains(@class,'tag valid')]/div/i[@class='icon-close']",

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

    performanceAnalysis : "//span[text()='Performance Analysis']",
    generateAnalysisBtn : "//a[contains(text(),'Generate Analysis')]",
    performanceReviewLoader : "//span[text()='Performance Reviews']/parent::h2/parent::header/following-sibling::div/div/div/div[@class='simple-loader']",

    editAboutMe : "//div[contains(text(),'About Me')]//span[text()='Edit']",
    aboutMeTxtArea : "//textarea[@placeholder='About Me']",
    saveAboutMeBtn : "//h4[text()='About Me']/following-sibling::div//span[text()='Save']",
    aboutMeDetails : "//div[contains(@class,'about-me')]//blockquote",

    // Add Work Experience 
    addWorkExpBtn : "//span[text()='Work Experience']/following-sibling::a//span[text()='Add']",
    addWorkExperienceHeading : "//h4[text()='Add Work Experience']",
    jobTitle : "//input[@id='text-job_title']",
    fullScaleCompanyRadioBtn : "//input[@id='radio-company_name_BV_option_0']",
    otherCompany : "//span[text()='Other (Specify company)']",
    otherCompanyName : "//input[@id='text-other_company_name']",
    currentlyEmployedCheckbox : "//*[@id='checkbox-current']/div/label/span",
    endDate : "//label[contains(text(),'End Date')]/following-sibling::input[2]",
    reasonForLeaving : "//textarea[@id='textarea-reason_for_leaving']",

    // Add Other Project
    addProject : "//span[text()='Add Project']",
    modalprojectName : "//span[text()='Project Display Name']/parent::label/following-sibling::div/input",
    descriptionIframe : "//iframe[@class='tox-edit-area__iframe']",
    descriptionBody: "//body[@id='tinymce']",

    durationInMonthsSpinner : "//html/body/div[1]/div/div[1]/div/div/section[1]/div/div[2]/div[1]/div/fieldset/div/input",
    numTeamMembersSpinner : "//html/body/div[1]/div/div[1]/div/div/section[1]/div/div[2]/div[2]/div/fieldset/div/input",
    techStackDropdown : "//html/body/div[1]/div/div[1]/div/div/section[1]/div/div[2]/div[3]/div/div/div/div/div[2]",

    addProjectBtnModal : "//section[@class='modal-footer-new']//span[text()='Add Project']",
    editProjectBtnModal : "//section[@class='modal-footer-new']//span[text()='Edit Project']",
    
    // Add Fullscale Project
    addFullScaleProjectModal : "//h4[text()='Add Full Scale Project']",
    fullscaleProjectList : "//div[contains(@class, 'select-project-list')]",
    fullscaleProjectOptions : "//div[contains(@class, 'list-group-item')]",
    saveWorkExp : "//span[text()='Save Work Experience']",
    addedJobTitle : "//div[contains(@class,'job-position')][1]//div[@class='left-section']/span[1]",
    projectName : "(//div[contains(@class,'project')])[1]/div[contains(@class,'main-content')]//span[1]",
    projectDesc: "((//div[contains(@class,'project')])[1]/div[contains(@class,'main-content')]//p)[2]",
    projectDescriptionTextArea : "//*[@id='projectComment']/div/div[1]/div[2]/div[1]",

    // Edit Work Experience
    editFullscaleProjectModal : "//*[@id='modalTitle']",
    notSelectedFullscaleProjectOptions : "//div[contains(@class, 'list-group-item') and not(@class='list-group-item active')]",
    editProjectBtn : "//span[contains(text(), 'Edit')]",

   
    // employee internal profile
    jobPositionInList : "//span[@class='w-100 d-inline-block font-weight-bold']",
    projectNameInList : "//span[@class='w-100 d-inline-block font-16 font-weight-bold']",
    projectDescriptionInList : "//*[@id='profile']/div/div/div[5]/div/div[2]/div/div[2]/div/div/div/div[2]/p",
    companyAndDateInList : "//span[@class='w-100 d-inline-block font-13']",
    copyProfileUrlBtn : "//a[contains(@title, 'Click to copy URL to clipboard')]",
    copiedToClipboardText : "//h2[contains(text(), 'Copied to clipboard')]",
    managerName : "//*[@id='fs-page-holder-container']/div/div/aside/div/div[3]/div[2]/ul/li[1]",
    addTeamManagerButton : "//span[contains(text(), 'Add Team Manager')]",
    managerEditButton : "(//span[contains(text(), 'Edit')])[1]",
    selectManagerInput : "//input[@class='multiselect__input']",
    managerListItem : "//li[@class='multiselect__element']",
    selectedManager : "//span[@class='multiselect__option multiselect__option--selected']",
    loadingSpinner : "//i[@class='mt-1 fa fa-spinner fa-spin']",
    successNotification : "//h2[contains(text(), 'Successfully saved changes')]",


    // employee public profile
    profileName : "//h2[contains(@class, 'profile-name')]",
    jobPositionInListPublicProfile : "//h4[@class='mb-6 fw-semibold font-16 text-gray-100']",
    projectNameInListPublicProfile : "//h3[@class='mb-1 fw-semibold font-16 text-gray-100']",
    companyNameInListPublicProfile : "//div[@class='experience-item']//h4/following-sibling::div/div",
    projectDescriptionInListPublicProfile : "//p[@class='font-16 whitespace-pre-line text-gray-100']",
    profileAvatar : "//img[@class='mb-6 w-100 avatar']",
    bookACallBtn : "//div[@class='w-100 text-center btn-book-a-call']",

    // Work Experience Actions
    editWorkExpBtn : "//*[@id='profile']/div/div/div[5]/div/div[2]/div/div[1]/div[2]/a[2]/span",
    deleteWorkExpBtn : "//span[contains(text(),'Delete')]",
    deleteWorkExpDialog : "//div[contains(text(), 'Are you sure you want to delete this project?')]",
    yesDeleteButton : "//button[contains(text(), 'Yes')]",
    deletingInProgress : "//*[@id='swal2-content']",
    deleteNotification : "//*[@id='swal2-title']",

    /** Add Employee Spotlight */
    navBar : "//nav[@class='nav navbar-nav']",
    zeroStateClientReview : "//div[contains(text(), 'No client review selected')]",
    selectNewButton :   "//*[@id='profile']/div/div/div[2]/div/div[1]/div/a/span",           
    selectExistingButton : "//*[@id='profile']/div/div/div[2]/div/div[1]/div/a[3]/span",
    selectSpotlightModal : "//h4[contains(text(), 'Select Client Spotlight')]",
    addClientReviewButton : "//span[contains(text(), 'Add Client Review')]",
    addClientReviewModal : "//h4[contains(text(), 'Add Client Review')]",
    reviewerNameTextfield : "//input[@id='text-reviewer_name']",
    reviewerTitleTextfield : "//input[@id='text-reviewer_title']",
    ratingOptionsRadiobutton : "//div[@class='custom-control custom-control-inline custom-radio']",
    dateField : "//*[@id='modalDescription']/div[2]/div/div[1]/div[4]/div/input[2]",
    yearDropdown : "//input[@class='numInput cur-year']",
    arrowDown : "//span[@class='arrowDown']",
    activeAndDefaultMonths : "//span[contains(@class, 'flatpickr-monthSelect-month') and not(@class='flatpickr-monthSelect-month disabled')]",
    activeNotSelectedMonths : "//span[contains(@class, 'flatpickr-monthSelect-month') and not(@class='flatpickr-monthSelect-month disabled') and not(@class='flatpickr-monthSelect-month selected')]",
    reviewerCommentTextarea : "//*[@id='reviewerComment']/div/div[1]/div[2]/div[1]",
    selectSpotlightButton : "//*[@id='modal']//span[text()='Select Spotlight']",
    

    // View Spotlight
    reviewerNameTextDisplay : "//p[@class='w-100 d-inline-block mb-0 font-weight-bold']/text()[normalize-space()]",
    reviewTitleTextDisplay : "//span[@class='font-weight-normal' and normalize-space()]",
    reviewRatingTextDisplay : "//*[@id='profile']/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[1]/div/span",
    reviewCommentTextDisplay : "//*[@id='profile']/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/p",
    reviewDateTextDisplay : "//span[@class='review-date']",

    // Edit Spotlight
    editButton : "//*[@id='profile']/div/div/div[2]/div/div[1]/div/a[2]/span",
    editClientReviewModal : "//h4[contains(text(), 'Edit Client Review')]",
    editDateField : "//*[@id='modalDescription']/div/div/div[1]/div[4]/div/input[2]",
    updateReviewButton : "//*[@id='modal']//span[text()='Update Review']",
    

    // Delete Spotlight
    clearButton : "//*[@id='profile']/div/div/div[2]/div/div[1]/div/a[1]/span",
    deleteSpotlightDialog : "//div[contains(text(), 'Are you sure you want to delete this review?')]",
    yesDeleteButton : "//button[contains(text(), 'Yes')]",
    deletingProgressSpotlightDialog : "//*[@id='swal2-content']",
    deletedSpotlightNotification : "//*[@id='swal2-title']",












}