import { test } from '@playwright/test';
import { roles } from '../../testdata/rolesForParallel';
import { LoginPage, HomePage, QuickTasksPage, EmployeesPage, DashboardPage, HomePageFunc, ClientListFunc } from '../../pages/functions/index';
const path = require('path');

let context;
let page;
let loginPage;
let homePage;
let quickTasksPage;
let employeesPage;
let dashboardPage;
let file;
let homePageFunc;
let clientListFunc;


const rolesToTest = ['SUPERADMIN', 'ADMIN']

test.beforeAll(async () =>{
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

rolesToTest.forEach(role => {
    const {username, password} = roles[role];

    test.describe.parallel('Views client profile page for active client', () => {

        test.beforeEach(async ({browser}) =>{
            context = await browser.newContext()
            page = await context.newPage()
        
            loginPage = new LoginPage(page);
            homePage = new HomePage(page);
            homePageFunc = new HomePageFunc(page);
            quickTasksPage = new QuickTasksPage(page)
            employeesPage = new EmployeesPage(page)
            dashboardPage = new DashboardPage(page)
            clientListFunc = new ClientListFunc(page);
        })

        test.afterEach(async () => {
            await context.close()
        });     

        test(`${role} Views client profile page for active client`, async() => {
            await loginPage.login(username, password)
            await homePage.isInHomePage()
            await homePageFunc.navigateToClientList()
            await clientListFunc.searchCompanyFieldInput('full scale fast track');
            await clientListFunc.searchCompanyButtonClick();
            await clientListFunc.selectCompanySearchResultFSClick();
            await clientListFunc.checkCompanyProfileStatusActive();
            await clientListFunc.checkCompanyProfileMemberCount();
            await clientListFunc.checkCompanyMemberDashboardCount();
            await clientListFunc.checkClientTechProfileTab();
            await clientListFunc.checkClientWeeklyFloorReportTab();
            await clientListFunc.clientWeeklyFloorReportTabClick();
            await clientListFunc.checkWeeklyFloorAddReportButton();
            //check sorting
            await clientListFunc.testCheckSortingWeeklyFloorReportDate();
            await clientListFunc.checkCheckpointMeetingTab();
            await clientListFunc.checkpointMeetingTabClick();
            await clientListFunc.checkClientCheckpointMeetingDashboard();
            await clientListFunc.checkClientPerformanceReviewTab();
            await clientListFunc.clientPerformanceReviewTabClick();
            await clientListFunc.checkClientAllReviewDashboard();
            await clientListFunc.checkClientPerformanceReviewDashboard();
            //sort filter
            await clientListFunc.testCheckPerformaceReviewSortFilter();
            //team members filter
            await clientListFunc.testCheckPerformaceReviewTeamMemberFilter();
            //status filter
            await clientListFunc.testCheckPerformaceReviewStatusFilter();
            await clientListFunc.checkClientTalentInterviewTab();
            await clientListFunc.clientTalentInterviewTabClick();
            await clientListFunc.checkAddInterviewButton();
            //await clientListFunc.checkClientTeamRequestTab();
            //await clientListFunc.clientTeamRequestTabClick();
            await clientListFunc.checkClientTeamMemberTab();
            await clientListFunc.clientTeamMemberTabClick();
            //await clientListFunc.checkAddTalentButton();
            await clientListFunc.checkClientActiveMembersLabel();
            //check sorting
            await clientListFunc.testCheckSortingTeamMembers();
            await clientListFunc.checkClientContactsTab();
            await clientListFunc.clientContactsTabClick();
            await clientListFunc.checkClientAddContactsButton();
            //check sorting
            await clientListFunc.testCheckSortingContactsName();
            await clientListFunc.checkClientMSATab();
            await clientListFunc.clientMSATabClick();
            await clientListFunc.checkClientUploadSignedDocuButton();
            //check sorting
            await clientListFunc.testCheckSortingMSA();
            await clientListFunc.checkClientTechProfileTab();
            await clientListFunc.clientTechProfileTabClick();
            await clientListFunc.checkClientTechProfileLabel();
            await clientListFunc.checkClientTechStackDashboard();
            await clientListFunc.checkClientTechStackSkillNet();
            await clientListFunc.checkClientProjectTab();
            await clientListFunc.clientProjectTabClick();
            await clientListFunc.checkClientAddProjectButton();
            await clientListFunc.checkClientProjectListFSFT();
            //check sorting
            await clientListFunc.testCheckSortingProjects();
            await clientListFunc.checkClientChangeLogsTab();
            await clientListFunc.clientChangeLogsTabClick();
            await clientListFunc.checkClientChangeLogsLabelProj();
            await clientListFunc.clientChangeLogsCloseButtonClick();
            await clientListFunc.checkClientSettingsTab();
            await clientListFunc.clientSettingsTabClick();
            await clientListFunc.checkClientSettingsDailyFrequency();
        });
    }) 
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})  
