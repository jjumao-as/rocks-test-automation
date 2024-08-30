module.exports = {

    // Submit Feedback locators
    categoryLabel : '//*[@id="__BVID__57"]/div/span/label', 
    categoryDropdown : '//*[@id="select-category_id"]',
    feedback : '.bv-no-focus-ring > div > div.editr--content',
    sendBtn : '//*[@id="fs-page-holder-container"]/div/div[2]/div/div/div/div/div[3]/button',                         

    imagePickerBtn : '.vw-btn-image > svg > path',
    clickToUploadBtn : "//span[text()='Click here to upload...']" ,
    previewImage : '.editr--content > img', 

    notification : '#main-wrapper > div:nth-child(3) > div.snotify.snotify-centerTop > div > div.snotifyToast__inner > div.snotifyToast__body',
    progressBar : '//*[@id="main-wrapper"]/div[2]/div[8]/div/div[1]',

    createDailyReport : "//span[text()='Create Daily Report']",
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

    //Expense Report
    createExpenseReport : "//span[text()='Create Expense Report']",
    submitExpenseReportModal : "//h4[text()='Submit Expense Report']",
    expenseType : "//label[text()='Expense Type']",
    recieptAmount : "//label[text()='Receipt Amount']",
    cashAdvanceAmount : "//label[text()='Cash Advance Amount']",
    reimbursableAmount : "//label[text()='Reimbursable Amount']",
    justification : "//label[text()='Justification']",
    receiptMissing : "//label[contains(text(),'Receipt Missing?')]",
    uploadReceipt : "//span[text()='Upload Receipt']",
    submitButton : "//a[text()='SUBMIT']",
    closeButton : "//a[text()='close']",

    //Weekly Floor Report
    createWeeklyReport : "//span[text()='Create Weekly Floor Report']",
    createWeeklyFloorReportModal : "//h4[text()='Create Weekly Floor Report']",
    selectClients : "//label[text()='Select Client(s)']",
    goalsOrDeadline : "//span[text()='Do you have goals or deadlines?']",
    makingProgress : "//span[text()='Is the team making progress?']",
    needMoreTalent : "//span[text()='Does the project need more talent?']",

    //Self-Performance Review
    submitSelfPerformanceReview : "//span[text()='Submit Self-Performance Review']",
    performanceEvaluationReview : "//h4[text()='Performance Evaluation Review']",
    evaluationPeriodStep : "//ol[@class='step-indicator']//span[contains(text(),'Evaluation Period')]",
    performanceCompetencies : "//ol[@class='step-indicator']//span[contains(text(),'Performance Competencies')]",
    performanceSummary : "//ol[@class='step-indicator']//span[contains(text(),'Performance Summary')]",
    startDate : "//label[text()='Start date']",
    endDate : "//label[text()='End date']",

    //Manager Performance Review
    managerPerformanceReviewTab : "//span[text()='Submit Manager Performance Review']",
    managerPerformanceReview : "//h4[text()='Performance Evaluation Review']",
    managerReviewstartDate : "//label[text()='Start date']",
    managerReviewendDate : "//label[text()='End date']",
    selectTalent : "//label[text()='Select a talent to evaluate']",

    //Submit Feedback
    submitFeedback : "//span[text()='Submit Feedback']",
    category : "//label[text()='Category']",
    feedbackTab : "//legend[text()='Feedback']",
    sendButton : "//span[text()='Send']/parent::button",

}