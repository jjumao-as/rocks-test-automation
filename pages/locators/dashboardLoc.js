module.exports = {
    //general locators
    home : "(//span[text()='Home'])[1]",
    allSideTabs : "//span[contains(@class,'ks-text')]",

    //Avatar
    avatar : "//div[contains(@class,'ks-user')]/a",
    profileOptions : "//div[contains(@class,'ks-user')]/div//span[2]",

    //Search
    searchRocks : "//div[@id='input-group-icon-text']//input",
    xIcon : "//*[@id='main-wrapper']/nav/div[2]/nav/div[2]/form/div/div/span/span",
    searchFirstRow : "(//li[@class='item valid'])[1]",
    clearSearch : "//span[@class='la la-times']",
    clientName : "//p[contains(@class,'client-name')]",
    talentName : "//span[contains(@class,'talent-name')]",
    floorManager : "//p[contains(@class,'client-name')]/following-sibling::div//i[contains(@class,'pen')]",
    emptyFloorManager : "(//span[contains(@class,'multiselect__option')])[1]",
    addFloorManager : "//a[contains(text(),'Add Floor Manager')]",
    saveSuccessfully : "//div[contains(@class,'swal2-bottom')]",

    //Notifications
    notificationButton : "//div[contains(@class,'ks-notifications')]/a",
    notificationContainer : "//div[contains(@class,'notification-container')]",
    viewNotification : "(//div[@id='navbar-notifications-all']//a)[1]",

    //My Dashboard
    whatWouldYouLike : "//p[contains(text(),'what would you like to do today?')]",
    myDashboard : "//span[text()='My Dashboard']",
    clientSalesDashboard : "//span[text()='Client / Sales Dashboard']",
    employeeDashboard : "//span[text()='Employee Dashboard']",
    yourProductivity : "//div[contains(text(),'Your Productivity')]",
    announcements : "//div[contains(text(),'Announcements')]",
    eventsAndHoliday: "//div[contains(text(),'Events and Holidays')]",

    //Client / Sales Dashboard
    seeAllClients : "//a[contains(text(),'See all clients')]",
    activeClients : "//span[contains(text(),'Active Clients')]",
    utilizationRate : "//span[contains(text(),'Utilization Rate')]",
    revenueGeneratingTalent : "//span[contains(text(),'Revenue Generating Talent')]",
    assignedTalent : "//span[contains(text(),'Assigned Talent by Position')]",
    teamSize : "(//span[contains(text(),'Team Size')])[1]",
    floorReport : "(//h4[contains(text(),'Floor Report - Red Flags')])[1]",
    productivityRate : "//h6[contains(text(),'Productivity Rate (RGE)')]",

    //Employee Dashboard
    talentDistribution : "//h4[contains(text(),'Talent Distribution by Department')]",
    seeAllEmployees : "//span[text()='See all employees']",
    dailyReportSubmissionRate : "//h4[contains(text(),'Daily Report')]",
    seeAllDailyReport : "//span[text()='See all daily reports']",

    //Announcement & FAQS
    announcementFaqs : "(//span[text()='Announcements & FAQs'])[1]",
    employeeResources : "//h4[text()='Employee Resources']",
    announcementLinks : "//td[contains(@class,'act-as-link')]",
 
    //Find Talent
    findTalents : "(//span[text()='Find Talent'])[1]",

    //Employees (superadmin, admin)
    employeeList : "(//span[text()='Employee List'])[1]",
    performanceReviews : "(//span[text()='Performance Reviews'])[1]",

    //Quick Tasks
    createDailyReportLink : "(//span[text()='Create Daily Report'])[1]",
    createExpenseReportLink : "(//span[text()='Create Expense Report'])[1]",
    submitSelfPerformanceReviewLink : "(//span[text()='Submit Self-Performance Review'])[1]",
    managerPerformanceReviewLink : "(//span[text()='Submit Manager Performance Review'])[1]",
    submitFeedbackLink : "(//span[text()='Submit Feedback'])[1]",
    weeklyFloorReportLink : "(//span[text()='Create Weekly Floor Report'])[1]",

    //Reports
    dailyStatus : "(//span[text()='Daily Status'])[1]",
    dailyTimeClock : "(//span[text()='Daily Time Clock'])[1]",
    timeClockSummary : "(//span[text()='Time Clock Summary'])[1]",
    weeklyTimeClock : "(//span[text()='Weekly Time Clock'])[1]",
    expenseReports : "(//span[text()='Expense Reports'])[1]",

    //Super Admin Locators
    users : "(//span[text()='Users'])[1]",
    roles : "(//span[text()='Roles'])[1]",
    categories : "(//span[text()='Categories'])[1]",
    clientManagement : "(//span[text()='Client Management'])[1]",
    employeeManagement : "(//span[text()='Employee Management'])[1]",
    employeeStatus : "(//span[text()='Employee Status'])[1]",
    recruitment : "(//span[text()='Recruitment'])[1]",
    expenseReport : "(//span[text()='Expense Report'])[1]",
    processWorkflow : "(//span[text()='Process Workflow'])[1]",
    documentTemplates : "(//span[text()='Document Templates'])[1]",

    //Side Panel
    quickTasksSide : "//span[text()='Quick Tasks']",
    collapseQuickTasks : "//span[text()='Quick Tasks']/parent::div/following-sibling::i[contains(@class,'arrow--down')]",
    clientsSide : "//span[text()='Clients']",
    collapseClients : "//span[text()='Clients']/parent::div/following-sibling::i[contains(@class,'arrow--down')]",
    applicantsSide : "//span[text()='Applicants']",
    collapseApplicants : "//span[text()='Applicants']/parent::div/following-sibling::i[contains(@class,'arrow--down')]",
    employeesSide : "//span[text()='Employees']",
    collapseEmployees : "//span[text()='Employees']/parent::div/following-sibling::i[contains(@class,'arrow--down')]",
    mentorshipSide : "//span[text()='Mentorship']",
    collapseMentorship : "//span[text()='Mentorship']/parent::div/following-sibling::i[contains(@class,'arrow--down')]",
    reportsSide : "//span[text()=' Reports']",
    collapseReports : "//span[text()=' Reports']/parent::div/following-sibling::i[contains(@class,'arrow--down')]",
    settingsSide : "//span[text()='Settings']",
    collapseSettings : "//span[text()='Settings']/parent::div/following-sibling::i[contains(@class,'arrow--down')]",   
}