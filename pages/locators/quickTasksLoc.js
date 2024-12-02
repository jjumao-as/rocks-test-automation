module.exports = {

    // Submit Feedback locators
    categoryLabel : '//*[@id="__BVID__57"]/div/span/label', 
    categoryDropdown : '//*[@id="select-category_id"]',
    feedback : '.bv-no-focus-ring > div > div.editr--content',
    sendBtn : '//*[@id="fs-page-holder-container"]/div/div[2]/div/div/div/div/div[3]/button',                         

    imagePickerBtn : "//a[@class='vw-btn-image']",
    clickToUploadBtn : "//span[text()='Click here to upload...']" ,
    previewImage : '.editr--content > img', 

    notification : '#main-wrapper > div:nth-child(3) > div.snotify.snotify-centerTop > div > div.snotifyToast__inner > div.snotifyToast__body',
    progressBar : '//*[@id="main-wrapper"]/div[2]/div[8]/div/div[1]',

    createDailyReport : "(//span[text()='Create Daily Report'])[1]",
    composeNewMessage : "//button[text()='Compose new message']",
    dailyReports : "//h4[text()='Daily Reports']",
    paginationBar : "//ul[@class='pagination']",
    nextPage : "//a[contains(@title,'next page')]",
    sendReportModal : "//h4[text()='Send Report']",
    projectDropdown : "//select[@id='select-client_project_id']/option",

    //Create Report Modal
    sendReport : "//h4[text()='Send Report']",
    dailyReport : "//div[text()='Daily Report']",
    projectField : "//select[@id='select-client_project_id']",
    reportDateField : "//label[text()='Report Date:']/parent::span/following-sibling::div//input[2]",
    subjectField : "//div[@id='display-box-subject']",
    whatIDidField : "//label[text()='What I did today:']/parent::span/following-sibling::div//p",
    whatIWillbeDoingField : "//label[contains(text(),'What I will be doing')]/parent::span/following-sibling::div//p",
    roadBlockImpedimentsField : "//label[contains(text(),'Roadblocks/Impediments')]/parent::span/following-sibling::div//p",
    otherRemarksField : "//label[contains(text(),'Other Remarks')]/parent::span/following-sibling::div//p",
    attachementField : "//input[@type='file']",
    sendReportButton : "//span[text()='Send Report']/parent::button",
    subjectList : "//table[contains(@class,'dataTable')]/tbody/tr[1]/td[1]/a",
    syncMail : "//i[contains(@class,'la-sync')]",
    syncSpinner : "//i[contains(@class,'fa-spinner')]",
    reportAlreadyExist : "//div[text()='Report already exists.']",
    reportExistConfirmButton : "//button[contains(@class,'swal2-confirm')]",

    //Expense Report
    createExpenseReport : "(//span[text()='Create Expense Report'])[1]",
    submitExpenseReportModal : "//h4[text()='Submit Expense Report']",
    expenseTypeLabel : "//label[text()='Expense Type']",
    recieptAmountLabel : "//label[text()='Receipt Amount']",
    cashAdvanceAmountLabel : "//label[text()='Cash Advance Amount']",
    reimbursableAmountLabel : "//label[text()='Reimbursable Amount']",
    justificationLabel : "//label[text()='Justification']",
    receiptMissingLabel : "//label[contains(text(),'Receipt Missing?')]",
    expenseTypeFld : "//select[@id='select-expense_type_id']",
    dateField : "//label[text()='Date']/parent::span/following-sibling::div//input[2]",
    currentDate : "//span[@class='flatpickr-day today']",
    receiptAmountFld : "//div[@class='number-field-receipt_amount']//input",
    cashAdvanceAmountFld : "//div[@class='number-field-cash_advance_amount']//input",
    reimbursableAmountFld : "//div[@class='number-field-reimbursable_amount']//input",
    justificationFld : "//textarea[@id='textarea-justification']",
    receiptMissingToggle : "//div[contains(@class,'receipt-missing')]//label[contains(@class,'ks-checkbox-switch')]",
    uploadReceipt : "//span[text()='Upload Receipt']",
    uploadedReceipt : "//a[@title='View Uploaded Receipt']",
    uploadReceiptBtn : "//input[@id='uploadReceipt']",
    submitButton : "//a[text()='SUBMIT']",
    closeButton : "//a[text()='close']",
    confirmationMsg : "//div[text()='We will review your report and send an email once status is updated.']",
    okBtn : "//button[contains(@class,'swal2-confirm')]",

    //Weekly Floor Report
    createWeeklyReport : "(//span[text()='Create Weekly Floor Report'])[1]",
    createWeeklyFloorReportModal : "//h4[text()='Create Weekly Floor Report']",
    selectClients : "//label[text()='Select Client(s)']",
    selectClientsFld : "//div[@id='client_ids']",
    selectedClientName : "//div[@class='vue-treeselect__multi-value-item']/span[1]",
    clientOptions : "//label[text()='Select Client(s)']/parent::span/following-sibling::div//div[contains(@class,'label-container')]",
    clientNameList: "//label[text()='Select Client(s)']/parent::span/following-sibling::div//div[contains(@class,'label-container')]/label",
    goalsOrDeadlineOpt : "//span[text()='Do you have goals or deadlines?']/parent::label/following-sibling::div//span",
    onTrackOpt : "//span[text()='Are you on track?']/parent::label/following-sibling::div//span",
    goalsOrDeadline : "//span[text()='Do you have goals or deadlines?']",
    
    makingProgressOpt : "//span[text()='Is the team making progress?']/parent::label/following-sibling::div//span",
    blockersOpt : "//span[text()='What are the blockers?']/parent::label/following-sibling::div//span",
    problemCommunicatedOpt : "//span[text()='Has the problem been communicated?']/parent::label/following-sibling::div//span",
    probCommunicatedSubOpt : "//span[text()='Has the problem been communicated?']/ancestor::div[contains(@class,'radio-field material')]/parent::div/following-sibling::div[contains(@class,'sub-question')]//span",
    
    needMoreTalentOpt : "//span[text()='Does the project need more talent?']/parent::label/following-sibling::div//span",
    specificTalentOpt : "//span[text()='What specific talent are needed?']/parent::label/following-sibling::div//span",
    howLongTalentOpt : "//span[text()='How long are the talent needed for?']/parent::label/following-sibling::div//span",
    makingProgress : "//span[text()='Is the team making progress?']",
    needMoreTalent : "//span[text()='Does the project need more talent?']",
    saveFlrReport : "//span[text()='Save']",
    questionList : "//div[@class='question-list']",

    //Self-Performance Review
    submitSelfPerformanceReview : "(//span[text()='Submit Self-Performance Review'])[1]",
    performanceEvaluationReview : "//h4[text()='Performance Evaluation Review']",
    evaluationPeriodStep : "//ol[@class='step-indicator']//span[contains(text(),'Evaluation Period')]",
    performanceCompetencies : "//ol[@class='step-indicator']//span[contains(text(),'Performance Competencies')]",
    performanceSummary : "//ol[@class='step-indicator']//span[contains(text(),'Performance Summary')]",
    startDate : "//label[text()='Start date']",
    endDate : "//label[text()='End date']",

    /** Manager Performance Review */
    // Choose Talent
    managerPerformanceReviewTab : "(//span[text()='Submit Manager Performance Review'])[1]",
    managerPerformanceReview : "//h4[text()='Performance Evaluation Review']",
    managerReviewstartDate : "//label[text()='Start date']",
    managerReviewendDate : "//label[text()='End date']",
    selectTalent : "//label[text()='Select a talent to evaluate']",
    searchTalentTextbox : "//input[@class='search']",
    talentName : "//span[@class='photo-card-user-names']",
    nextButton : "//button[contains(text(), 'Next')]",
    // Performance Objectives
    performanceEvaluationBanner : "//h3[contains(text(), 'Performance Evaluation Review')]",
    employeeNameToReview : "//div[@class='font-semibold text-xl text-gray-200 employee--name']",
    searchClientPlaceholder : "//span[contains(text(), 'Search Client')]",
    searchClientDropdown : "//div[@class='multiselect']",
    topicHeader : "//span[@class='topic']",
    managerFeedbackCollapseButton : "//div[@class='textarea-field']",
    managerFeedbackTextArea : "//textarea[@class='form-control']",
    managerRatingDropdown : "//select[@class='mb-3 custom-select']",
    managerRatingDropdownOptions : "//option[@data-v-3ae57cd2]",
    // Performance Competencies
    ratingRadioGroup : "//div[@class='bv-no-focus-ring']",

    // Performance Summary
    overallRatingOptions : "//div[@class='custom-control custom-control-inline custom-radio']",
    additionalCommentTextarea : "//*[@id='1845']/div/div[1]/div[2]/div[1]",
    submitButton : "//button[contains(text(), 'Submit')]",

    // Submit Review
    savingInfoLoader : "//span[contains(text(), 'Wait, while we are saving your info...')]",
    thankYouEvaluationNotif : "//p[@class='thank-text text-secondary display-inline']",




    //Submit Feedback
    submitFeedback : "(//span[text()='Submit Feedback'])[1]",
    category : "//label[text()='Category']",
    feedbackTab : "//legend[text()='Feedback']",
    sendButton : "//span[text()='Send']/parent::button",
    
}