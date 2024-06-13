exports.LoginPage = class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    //Locators
    this.email = page.getByPlaceholder('Email/User Name');
    this.password = page.getByPlaceholder('Password');
    this.signIn = page.getByRole('button', { name: 'SIGN IN' });
    this.superAdminWelcomeText = page.getByText('Hi darrell, what would you');
    this.dailyReport = page.getByRole('link', { name: ' Create Daily Report' });
    this.dailyReportTitle = page.getByRole('heading', { name: 'Daily Reports' });
    this.createExpenseReport = page.getByRole('link', { name: ' Create Expense Report' });
    this.createExpenseReportTitle = page.getByRole('heading', { name: 'Submit Expense Report' });
    this.createExpenseReportEsc = page.getByRole('button', { name: 'Press Esc to close' });
    this.createExpenseReportYes = page.getByRole('button', { name: 'Yes' });
    this.createWeeklyFloorReport = page.getByRole('link', { name: ' Create Weekly Floor Report' });
    this.createWeeklyFloorReportTitle = page.getByRole('heading', { name: 'Create Weekly Floor Report' });
    this.createWeeklyFloorReportClose = page.getByRole('button', { name: 'Close', exact: true });
    this.submitSelfPerformance = page.getByRole('button', { name: ' Submit Self-Performance' });
    this.submitSelfPerformanceTitle = page.getByRole('heading', { name: 'Performance Evaluation Review' });
    this.performanceEvaluationReview = page.getByRole('heading', { name: 'Performance Evaluation Review' });
    this.performanceEvaluationReviewTitle = page.getByRole('heading', { name: 'Performance Evaluation Review' });
    this.submitManagerPerformance = page.getByRole('button', { name: ' Submit Manager Performance' });
    this.submitManagerPerformanceTitle = page.getByRole('heading', { name: 'Performance Evaluation Review' });
    this.submitFeedback = page.getByRole('button', { name: ' Submit Feedback' });
    this.submitFeedbackCategory = page.getByText('Category');
    this.submitFeedbackAnonymous = page.getByText('Send as anonymous');
    //using xpath
    this.clientDashboard = page.locator('//*[@id="side-navigation"]/ul/li[3]/div/ul/li[1]/a/span[2]');
    this.clientDashboardTitle = page.getByRole('heading', { name: 'Client / Sales Dashboard' });
    this.recentlySignUpClients = page.getByRole('link', { name: ' Recently Signed-up Clients' });
    this.recentlySignUpClientsTitle = page.getByRole('heading', { name: 'Review Client Prospects' });
    this.clientListing = page.getByRole('button', { name: ' Client Listing' });
    this.clientListingTitle = page.getByRole('heading', { name: 'Clients' });
    // this.teamRequests= page.getByRole('link', { name: ' Team Requests (24)' });
    //using xpath
    this.teamRequests = page.locator('xpath=//*[@id="side-navigation"]/ul/li[3]/div/ul/li[4]/a/span[2]');
    this.teamRequestsTitle = page.getByRole('heading', { name: 'Manage Team Requests' });
    this.documentsAgreements = page.getByRole('link', { name: ' Documents & Agreements (0)' });
    this.documentsAgreementsTitle = page.getByRole('heading', { name: 'Client Documents & Agreements' });
    this.salesLeads = page.getByRole('button', { name: ' Sales Leads' });
    this.salesLeadsTitle = page.getByRole('heading', { name: 'Sales Leads' });
    this.clientInterviews = page.getByRole('button', { name: ' Client Employee Interviews' });
    this.clientInterviewsTitle = page.getByRole('heading', { name: 'Client Employee Interviews' });
    this.findTalent = page.getByRole('button', { name: ' Find Talent' });
    this.findTalenttitle = page.getByRole('heading', { name: 'Find Talent' });
    //using xpath
    this.recruitmentDashboard = page.locator('xpath=//*[@id="side-navigation"]/ul/li[5]/div/ul/li[1]/a/span[2]');
    //*[@id="side-navigation"]/ul/li[5]/div/ul/li[1]/a
    this.recruitmentDashboardTitle = page.getByRole('heading', { name: 'Recruitment Dashboard' });
    this.applicantListing = page.getByRole('button', { name: ' Applicant Listing' });
    this.applicantListingTitle = page.getByRole('heading', { name: 'All Applicants' });
    //using xpath
    this.employeeAdminDashboard = page.locator('xpath=//*[@id="side-navigation"]/ul/li[6]/div/ul/li[1]/a');
    this.employeeAdminDashboardTitle = page.getByRole('heading', { name: 'Employee Admin Dashboard' });
    this.employeeListing = page.getByRole('button', { name: ' Employee Listing' });
    this.employeeListingTitle = page.getByRole('heading', { name: 'Employees' });
    this.performanceReviewDashboard = page.getByRole('button', { name: ' Performance Review Dashboard' });
    this.performanceReviewDashboardTitle = page.getByRole('heading', { name: 'Performance Review Dashboard' });
    this.feedbackformListing = page.getByRole('button', { name: ' Feedback Form Listing' });
    this.feedbackformListingTitle = page.getByRole('heading', { name: 'Feedback Responses' });
    this.certifications = page.getByRole('button', { name: ' Certifications' });
    this.certificationsTitle = page.getByRole('heading', { name: 'Certification Leaderboard' });
    this.dailyStatusReport = page.getByRole('link', { name: ' Daily Status Reports' });
    this.dailyStatusReportTitle = page.getByRole('heading', { name: 'Daily Status Reports' });
    this.dailyTimeClockReports = page.getByRole('button', { name: ' Daily Time Clock Reports' });
    this.dailyTimeClockReportsTitle = page.locator('#fs-page-holder-container').getByText('Daily Time Clock Reports');
    this.timeClockReportsSummary = page.getByRole('button', { name: ' Time Clock Summary Reports' });
    this.timeClockReportsSummaryTitle = page.locator('#fs-page-holder-container').getByText('Time Clock Summary Reports');
    this.weeklyTimeClockReports = page.getByRole('button', { name: ' Weekly Time Clock Reports' });
    this.weeklyTimeClockReportsTitle = page.locator('#fs-page-holder-container').getByText('Weekly Time Clock Reports');
    this.weeklyFloorReports = page.getByRole('button', { name: ' Weekly Floor Reports' });
    this.weeklyFloorReportsTitle = page.getByRole('heading', { name: 'Weekly Floor Reports' });
    this.expenseReports = page.getByRole('button', { name: ' Expense Reports' });
    this.expenseReportsTitle = page.getByRole('heading', { name: 'Expense Report' });
    this.fullscaleExperience = page.getByRole('button', { name: 'Dashboard', exact: true });
    this.fullscaleExperienceTitle = page.getByRole('heading', { name: 'Full Scale Experience' });
    this.announcementsFaqs = page.getByRole('button', { name: ' Announcements and FAQs' });
    this.announcementsFaqsTitle = page.getByRole('heading', { name: 'Employee Resources' });
    this.users = page.getByRole('button', { name: ' Users' });
    this.usersTitle = page.getByRole('heading', { name: 'User Management' });
    this.roles = page.getByRole('button', { name: ' Roles' });
    this.rolesTitle = page.getByRole('heading', { name: 'Role Management' });
    this.position = page.getByRole('button', { name: ' Positions' });
    this.positionTitle = page.getByRole('heading', { name: 'Job Position Management' });
    this.categories = page.getByRole('button', { name: ' Categories' });
    this.categoriesTitle = page.getByRole('heading', { name: 'Categories Management' });
    this.skills = page.getByRole('button', { name: ' Skills' });
    this.skillsTitle = page.getByRole('heading', { name: 'Skills Management' });
    this.clientManagement = page.getByRole('button', { name: ' Client Management' });
    this.clientManagementTitle = page.getByRole('heading', { name: 'Client Management Settings' });
    this.employeeManagement = page.getByRole('heading', { name: 'Client Management Settings' });
    this.employeeManagementTitle = page.getByRole('heading', { name: 'Client Management Settings' });
    this.employeeStatus = page.getByRole('button', { name: ' Employee Status' });
    this.employeeStatusTitle = page.getByRole('heading', { name: 'Employee Status' });
    this.recruitment = page.getByRole('button', { name: ' Recruitment' });
    this.recruitmentTitle = page.getByRole('heading', { name: 'Recruitment Settings' });
    this.expenseReport = page.getByRole('button', { name: ' Expense Report', exact: true });
    this.processWorkFlow = page.getByRole('button', { name: ' Process Workflow' });
    this.processWorkFlowTitle = page.getByRole('heading', { name: 'Process Workflows' });
    this.documentsTemplates = page.getByRole('button', { name: ' Document Templates' });
    this.documentsTemplatesTitle = page.getByRole('heading', { name: 'Document Templates' });
    this.reportTemplates = page.getByRole('button', { name: ' Report Templates' });
    this.reportTemplatesTitle = page.getByRole('heading', { name: 'Email Reporting Template' });
    this.surveyQuestionaire = page.getByRole('button', { name: ' Survey Questionnaires' });
    this.surveyQuestionaireTitle = page.getByRole('heading', { name: 'Survey Questionnaires' });
    this.holidays = page.getByRole('button', { name: ' Holidays' });
    this.holidaysTitle = page.getByRole('heading', { name: 'Holidays Management' });
    this.routeWizardtiles = page.getByRole('button', { name: ' Route Wizard Tiles' });
    this.routeWizardtilesTitle = page.getByRole('heading', { name: 'Route Wizard Tile Management' });
    this.dailyReportSettings = page.getByRole('button', { name: ' Daily Report Settings' });
    this.dailyReportSettingsTitle = page.getByRole('heading', { name: 'Daily Report Settings' });
    this.globalSearch =page.getByPlaceholder('Search Rocks');
    this.globalSearchEmployeeDB =page.getByText('EmployeeDB');
    this.clientProfileEmployeeDB =page.getByRole('heading', { name: 'Client\'s Profile' });
    this.clientProfileEmployeeDBtitle =page.getByRole('heading', { name: 'EmployeeDB' });
    this.superAdminNotif = page.locator('//*[@id="main-wrapper"]/nav/div[2]/nav/div[2]/div[1]/a');
    this.superAdminNotifTitle = page.locator('//*[@id="main-wrapper"]/nav/div[2]/nav/div[2]/div[1]/div/div[1]/div[1]');
    this.superAdminHiddenMenus = page.locator(".ks-avatar");
    this.superAdminMyProfile =page.getByRole('link', { name: ' My Profile' });
    this.superAdminMyProfileTitle =page.getByRole('heading', { name: 'Employee Profile' });
    this.superAdminemailSignatureTemplate =page.getByRole('link', { name: ' Email Signature Template' });
    this.superAdminemailSignatureTemplateTitle = page.getByRole('heading', { name: 'Email Signature Template' });
    this.superAdminChangePassword = page.getByRole('link', { name: ' Change Password' });
    this.superAdminChangePasswordTitle = page.getByRole('heading', { name: 'Change Password' });
    this.superAdminChangePasswordClose = page.getByRole('button', { name: 'Press Esc to close' });
    this.superAdminChangeTimezone = page.getByRole('link', { name: ' Change Timezone' });
    this.superAdminChangeTimezoneTitle = page.getByRole('heading', { name: 'Set Timezone' });
   

    //Logout
    this.dropdownMenu = page.locator('.nav-item.dropdown.ks-user')
    this.superAdminLogout = page.getByRole('link', { name: 'Logout' });
  }


  //Actions and Assertions
  // base URL
  async gotoDev() {
    await this.page.goto("https://dev.fullscale.rocks/login");
  }

  async gotoPreprod() {
    await this.page.goto("https://preprod.fullscale.rocks/login");
  }

  async gotoProd() {
    await this.page.goto("https://fullscale.rocks/login");
  }
  
  async openRocks(rocksENV) {
    await this.page.goto(`https://${rocksENV}fullscale.rocks/login`, { timeout: 190000 });
  }
  // login function
  async login(username, password) {
    await this.email.fill(username);
    await this.password.fill(password);
    await this.signIn.click();

  }
  // Logout function
  async logout() {
    await  this.dropdownMenu.click();
    await this.superAdminLogout.click();
  }

  // specific super admin login
  async superAdminLogin() {
    await this.email.fill('SUPERADMIN');
    await this.password.fill("Fu115c@leRocks!");
    await this.signIn.click();
  }

  // specific floor manager login
  async floorManagerLogin() {
    await this.email.fill("mparadela");
    await this.password.fill("Fu115c@leRocks!");
    await this.signIn.click();
  }

}
