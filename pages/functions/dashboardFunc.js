const dashboardLocators = require('../locators/dashboardLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { sleep } = require('../../utils/utility')

exports.DashboardPage = class DashboardPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async checkTabsVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.myDashboard);
        await this.actionDriver.checkElementVisibility(dashboardLocators.clientSalesDashboard);
        await this.actionDriver.checkElementVisibility(dashboardLocators.employeeDashboard);
    }

    async checkSuperAdminTabsVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.clientSalesDashboard);
        await this.actionDriver.checkElementVisibility(dashboardLocators.employeeDashboard);
    }

    async checkHRTabsVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.myDashboard);
        await this.actionDriver.checkElementVisibility(dashboardLocators.employeeDashboard);
    }

    async checkFloorTabsVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.myDashboard);
    }

    async checkFinanceTabsVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.myDashboard);
    }

    async checkSalesTabsVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.myDashboard);
    }

    async checkDashboardSectionVisibility() {
        await sleep(5000);
        await this.actionDriver.checkElementVisibility(dashboardLocators.yourProductivity);
        await this.actionDriver.checkElementVisibility(dashboardLocators.announcements);
        await this.actionDriver.checkElementVisibility(dashboardLocators.eventsAndHoliday);
    }

    async checkSalesDashboardSectionVisibility() {
        await sleep(5000);
        await this.actionDriver.checkElementVisibility(dashboardLocators.yourProductivity);
        await this.actionDriver.checkElementVisibility(dashboardLocators.eventsAndHoliday);
    }

    async navigateClientDashboard(){
        await this.actionDriver.clickButton(dashboardLocators.clientSalesDashboard);
        await sleep(5000);
    }

    async checkClientDashboardSectionVisibility(){
        await this.actionDriver.checkElementVisibility(dashboardLocators.activeClients);
        await this.actionDriver.checkElementVisibility(dashboardLocators.seeAllClients);
        await this.actionDriver.checkElementVisibility(dashboardLocators.utilizationRate);
        await this.actionDriver.checkElementVisibility(dashboardLocators.revenueGeneratingTalent);
        await this.actionDriver.checkElementVisibility(dashboardLocators.assignedTalent);
        await this.actionDriver.checkElementVisibility(dashboardLocators.teamSize);
        await this.actionDriver.checkElementVisibility(dashboardLocators.floorReport);
        await this.actionDriver.checkElementVisibility(dashboardLocators.productivityRate);
    }

    async checkSuperAdminSidePanelVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.users);
        await this.actionDriver.checkElementVisibility(dashboardLocators.roles);
        await this.actionDriver.checkElementVisibility(dashboardLocators.categories);
        await this.actionDriver.checkElementVisibility(dashboardLocators.clientManagement);
        await this.actionDriver.checkElementVisibility(dashboardLocators.employeeManagement);
        await this.actionDriver.checkElementVisibility(dashboardLocators.employeeStatus);
        await this.actionDriver.checkElementVisibility(dashboardLocators.recruitment);
        await this.actionDriver.checkElementVisibility(dashboardLocators.expenseReport);
        await this.actionDriver.checkElementVisibility(dashboardLocators.processWorkflow);
        await this.actionDriver.checkElementVisibility(dashboardLocators.documentTemplates);
    }

    async checkHRSidePanelVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.employeeList);
        await this.actionDriver.checkElementVisibility(dashboardLocators.performanceReviews);
        await this.actionDriver.checkElementVisibility(dashboardLocators.createDailyReportLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.createExpenseReportLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.submitSelfPerformanceReviewLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.managerPerformanceReviewLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.submitFeedbackLink);
    }

    async checkFloorSidePanelVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.createDailyReportLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.createExpenseReportLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.submitSelfPerformanceReviewLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.managerPerformanceReviewLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.submitFeedbackLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.weeklyFloorReportLink);
    }

    async checkFinanceSidePanelVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.dailyStatus);
        await this.actionDriver.checkElementVisibility(dashboardLocators.dailyTimeClock);
        await this.actionDriver.checkElementVisibility(dashboardLocators.timeClockSummary);
        await this.actionDriver.checkElementVisibility(dashboardLocators.weeklyTimeClock);
        await this.actionDriver.checkElementVisibility(dashboardLocators.expenseReports);
    }

    async checkEmployeeSidePanelVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.createDailyReportLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.createExpenseReportLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.submitSelfPerformanceReviewLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.submitFeedbackLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.dailyStatus);
        await this.actionDriver.checkElementVisibility(dashboardLocators.dailyTimeClock);
        await this.actionDriver.checkElementVisibility(dashboardLocators.timeClockSummary);
        await this.actionDriver.checkElementVisibility(dashboardLocators.expenseReports);
    }

    async checkWriterSidePanelVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.createDailyReportLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.createExpenseReportLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.submitSelfPerformanceReviewLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.submitFeedbackLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.dailyStatus);
        await this.actionDriver.checkElementVisibility(dashboardLocators.dailyTimeClock);
        await this.actionDriver.checkElementVisibility(dashboardLocators.timeClockSummary);
        await this.actionDriver.checkElementVisibility(dashboardLocators.expenseReports);
        await this.actionDriver.checkElementVisibility(dashboardLocators.employeeList);
    }

    async checkSalesSidePanelVisibility() {
        await this.actionDriver.checkElementVisibility(dashboardLocators.createDailyReportLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.createExpenseReportLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.submitSelfPerformanceReviewLink);
        await this.actionDriver.checkElementVisibility(dashboardLocators.submitFeedbackLink);
    }

    async navigateEmployeeDashboard(){
        await this.actionDriver.clickButton(dashboardLocators.employeeDashboard);
        await sleep(5000);
    }

    async checkEmployeeDashboardSectionVisibility(){
        await this.actionDriver.checkElementVisibility(dashboardLocators.talentDistribution);
        await this.actionDriver.checkElementVisibility(dashboardLocators.seeAllEmployees);
        await this.actionDriver.checkElementVisibility(dashboardLocators.dailyReportSubmissionRate);
        await this.actionDriver.checkElementVisibility(dashboardLocators.seeAllDailyReport);
    }

    async checkWelcomeMessage(){
        await this.actionDriver.checkElementVisibility(dashboardLocators.whatWouldYouLike);
    }

    async search(data){
        await this.actionDriver.setText(dashboardLocators.searchRocks, data);
    }

    async viewSearchResult(){
        await this.actionDriver.clickButton(dashboardLocators.searchFirstRow);
    }

    async clickNotification() {
        await this.actionDriver.clickButton(dashboardLocators.notificationButton);
    }

    async viewNotification() {
        await this.actionDriver.clickButton(dashboardLocators.viewNotification);
    }

    async clickAvatar() { 
        await this.actionDriver.clickButton(dashboardLocators.avatar);
    }

    async validateProfileOptions(testData) {
        await this.actionDriver.validateEachTextFromList(testData, dashboardLocators.profileOptions);
    }

    async navigateAnnouncementFaqs() {
        await this.actionDriver.clickButton(dashboardLocators.announcements);
    }

    async navigateFindTalent() {
        await this.actionDriver.clickButton(dashboardLocators.findTalents);
    }

    async checkElementAnnouncementVisibility(){
        await this.actionDriver.checkElementVisibility(dashboardLocators.employeeResources);
        await this.actionDriver.checkAllElementsVisibility(dashboardLocators.announcements);
    }

    async checkSearchResultOfResignedEmployee(){
        const result = await this.actionDriver.elementVisible(dashboardLocators.searchFirstRow);
        await this.actionDriver.expectFalse(result);
    }

    async checkValidSearchResult(){
        await sleep(5000);
        const result = await this.actionDriver.elementVisible(dashboardLocators.searchFirstRow);
        await this.actionDriver.expectTrue(result);
    }

    async verifyClient(){
        await sleep(5000);
        const result = await this.actionDriver.elementVisible(dashboardLocators.clientName);
        await this.actionDriver.expectTrue(result);
    }

    async verifyTalent(){
        await sleep(5000);
        const result = await this.actionDriver.elementVisible(dashboardLocators.talentName);
        await this.actionDriver.expectTrue(result);
    }

    async deleteFloorManager(){
        await this.actionDriver.clickButton(dashboardLocators.floorManager);
        await sleep(3000);
        await this.actionDriver.clickButton(dashboardLocators.emptyFloorManager);
        await sleep(3000);
    }

    async navigateToUsers(){
        await this.actionDriver.clickButton(dashboardLocators.users);
        await sleep (5000);
    }
}