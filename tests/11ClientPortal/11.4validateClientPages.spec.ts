import { test } from '@playwright/test';
const { LoginPage, HomePage, ClientsPage, FindTalentPage } = require('../../pages/functions/index');
const { readJsonFile } = require('../../utils/jsonReader');

let browser;
let context;
let page;
let loginPage;
let homePage;
let testDataPath;
let testData;
let clientPage;
let findTalentPage;
let testDataPathClient;
let testDataClient;
let testDataPathTalent;
let testDataTalent;

const rolesToTest = ["msa", "nomsa"];
test.describe.parallel(`Validate Client Portal Pages for active client`, () => {

    test.beforeAll(async ({ browser: b }) => {
        browser = b;
    })
    test.beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
        testDataPath = 'ClientData'
        testDataPathClient = 'createClient'
        testDataPathTalent = 'rocksTalent'
        loginPage = await new LoginPage(page);
        homePage = await new HomePage(page);
        clientPage = await new ClientsPage(page);
        findTalentPage = await new FindTalentPage(page);
        testData = await readJsonFile(testDataPath);
        testDataClient = await readJsonFile(testDataPathClient);
        testDataTalent = await readJsonFile(testDataPathTalent);
    });

    test.afterEach(async () => {
        await context.close();
    });

    test(`Validate available pages for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.validateSideTabs(testData.activeClientPages);
            //Validate Saved & Suggested if saved talent disaplyed first
            await clientPage.validateSavedSuggested(testData.saved);
            await clientPage.logout();
        }
    })

    test(`Validate My Profile for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.navigateToPage(testData.activeClientPages[0]);
            await clientPage.verifyURL(testData.urls.myProfile);
            await clientPage.validateMyProfilePage();
            await clientPage.navigateToHome();
            await clientPage.logout();
        }
    });

    test(`Validate My Contacts for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.navigateToPage(testData.activeClientPages[1]);
            await clientPage.verifyURL(testData.urls.myContacts);
            await clientPage.validateMyContactPage();
            await clientPage.navigateToHome();
            await clientPage.logout();
        }
    })

    test(`Validate Find Talent for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.navigateToPage(testData.activeClientPages[2]);
            await clientPage.verifyURL(testData.urls.findTalent);
            await clientPage.validateFindTalentPage();
            //Validate count is correct
            await clientPage.validateTalentCount();
            //View Profile
            await findTalentPage.compareList(testDataTalent.talents);
            //Validate Save is display, add to team, book a call is displayed.
            await clientPage.validateAvailableTalentButtons();
            await clientPage.navigateToHome();
            await clientPage.logout();
        }
    });

    test(`Validate Documents & Agreements for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.navigateToPage(testData.activeClientPages[3]);
            await clientPage.verifyURL(testData.urls.documents);
            await clientPage.validateDocumentsPage();
            await clientPage.navigateToHome();
            await clientPage.logout();
        }
    });

    test(`Validate Manage Team for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.navigateToPage(testData.activeClientPages[4]);
            await clientPage.verifyURL(testData.urls.manageTeam);
            await clientPage.validateManageTeamPage();
            //Validate Find and Add Talent is displayed
            await clientPage.validateFindAddTalent();
            //Validate redirected to /find-add-talent?ref=manage-team
            await clientPage.validateFindTalentPage();
            await clientPage.verifyURL(testData.urls.findAddTalent);
            //Validate <- Manage Team is displayed
            await clientPage.validateBackToManageTeam();
            await clientPage.navigateToHome();
            await clientPage.logout();
        }
    });

    test(`Validate Performance Review for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.navigateToPage(testData.activeClientPages[5]);
            await clientPage.verifyURL(testData.urls.performanceReview);
            await clientPage.validatePerformanceReviewPage();
            await clientPage.navigateToHome();
            await clientPage.logout();
        }
    });

    test(`Validate Daily Status Report for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.navigateToPage(testData.activeClientPages[6]);
            await clientPage.verifyURL(testData.urls.dailyStatusReport);
            await clientPage.validateDailyStatusPage();
            await clientPage.navigateToHome();
            await clientPage.logout();
        }
    });

    test(`Validate Daily Time Clock for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.navigateToPage(testData.activeClientPages[7]);
            await clientPage.verifyURL(testData.urls.dailyTimeClock);
            await clientPage.validateDailyTimePage();
            await clientPage.navigateToHome();
            await clientPage.logout();
        }
    });

    test(`Validate Weekly Time Clock Reports for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.navigateToPage(testData.activeClientPages[8]);
            await clientPage.verifyURL(testData.urls.weeklyTimeClock);
            await clientPage.validateWeeklyTimePage();
            await clientPage.navigateToHome();
            await clientPage.logout();
        }
    });

    test(`Validate Time Clock Summary Report for active client`, async () => {
        for (const role of rolesToTest) {
            await loginPage.login(testDataClient[role].email, process.env.CLIENTPASSWORD);
            await clientPage.navigateToPage(testData.activeClientPages[9]);
            await clientPage.verifyURL(testData.urls.timeClockSummary);
            await clientPage.validateTimeClockSummaryPage();
            await clientPage.navigateToHome();
            await clientPage.logout();
        }
    });

});


