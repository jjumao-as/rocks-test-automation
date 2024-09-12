module.exports = {
    //general locators
    home : "//span[text()='Home']",

    //Avatar
    avatar : "//div[contains(@class,'ks-user')]/a",
    profileOptions : "//div[contains(@class,'ks-user')]/div//span[2]",

    //Search
    searchRocks : "//div[@id='input-group-icon-text']//input",
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
    announcementFaqs : "//span[text()='Announcements & FAQs']",
    employeeResources : "//h4[text()='Employee Resources']",
    announcementLinks : "//td[contains(@class,'act-as-link')]",
 
    //Find Talent
    findTalents : "//span[text()='Find Talent']",

    //Employees (superadmin, admin)
    employeeList : "//span[text()='Employee List']",
    performanceReviews : "//span[text()='Performance Reviews']",

    //Quick Tasks
    createDailyReportLink : "//span[text()='Create Daily Report']",
    createExpenseReportLink : "//span[text()='Create Expense Report']",
    submitSelfPerformanceReviewLink : "//span[text()='Submit Self-Performance Review']",
    managerPerformanceReviewLink : "//span[text()='Submit Manager Performance Review']",
    submitFeedbackLink : "//span[text()='Submit Feedback']",
    weeklyFloorReportLink : "//span[text()='Create Weekly Floor Report']",

    //Reports
    dailyStatus : "//span[text()='Daily Status']",
    dailyTimeClock : "//span[text()='Daily Time Clock']",
    timeClockSummary : "//span[text()='Time Clock Summary']",
    weeklyTimeClock : "//span[text()='Weekly Time Clock']",
    expenseReports : "//span[text()='Expense Reports']",

    //Super Admin Locators
    users : "//span[text()='Users']",
    roles : "//span[text()='Roles']",
    categories : "//span[text()='Categories']",
    clientManagement : "//span[text()='Client Management']",
    employeeManagement : "//span[text()='Employee Management']",
    employeeStatus : "//span[text()='Employee Status']",
    recruitment : "//span[text()='Recruitment']",
    expenseReport : "//span[text()='Expense Report']",
    processWorkflow : "//span[text()='Process Workflow']",
    documentTemplates : "//span[text()='Document Templates']",
}