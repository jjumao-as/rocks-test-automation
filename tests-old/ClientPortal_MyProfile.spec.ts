import { test, expect, chromium } from '@playwright/test';
const { LoginPage, HomePage, MyProfilePage, MyContactsPage, FindTalentPage } = require('../pages/functions/index.js');
const {savedContact} = require('../utils/randomData.js');
const { readJsonFile } = require('../utils/jsonReader');


let browser;
let context;
let page;
let loginPage;
let homePage;
let myProfilePage;
let myContactsPage;
let testDataPath;
let testData;
let findTalentPage;

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    myProfilePage = new MyProfilePage(page);
    myContactsPage = new MyContactsPage(page);
    findTalentPage = new FindTalentPage(page);
    savedContact();
    testDataPath = 'myProfile';
    testData = await readJsonFile(testDataPath);
    await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
});

test('Validate Client Dashboard', async () => {
    //Check on sections
    await homePage.checkSectionsVisibility();
    //Check on buttons
    await homePage.checkRightSidePanelsVisibility();
});

test('Update profile check UI', async () => {
    await homePage.navigateMyProfile();
    //Assert for labels on Edit profile
    await myProfilePage.checkLabelsVisibility();
    //Assert What do you need help with? options
    await myProfilePage.checkElementsVisibility();
});

test('Update profile', async () => {
    await homePage.navigateMyProfile();
    await myProfilePage.untickAllCheckboxes();
    await myProfilePage.checkElement(testData.updateProfile.needHelp);
    await myProfilePage.inputTechUsed(testData.updateProfile.techUsed);
    await myProfilePage.inputOtherTech(testData.updateProfile.otherTech)
    await myProfilePage.checkElement(testData.updateProfile.currentlyOnTeamUntick);
    await myProfilePage.untickAllCheckboxesOnTeam();
    await myProfilePage.checkElement(testData.updateProfile.currentlyOnTeam);
    await myProfilePage.saveUpdates();
    await myProfilePage.navigateHome();
    await homePage.navigateMyProfile();
    await myProfilePage.verifyTickedCheckboxes(testData.updateProfile.needHelp);
    await myProfilePage.verifyTickedCheckboxes(testData.updateProfile.currentlyOnTeam);
});

test('My Contacts check UI', async () => {
    await homePage.navigateMyContacts();
   //Confirm column headers and button are displayed.
   await myContactsPage.checkElementsVisibility();
});

test('My Contacts Add - Cancel', async () => {
    await homePage.navigateMyContacts();
    await myContactsPage.clickAddContact();
    await myContactsPage.fillUpContactForm(testData.contacts);
    await myContactsPage.clickCancel();
    await myContactsPage.verifyContactsNotAdded(testData.contacts);
});

test('My Contacts Add - Save', async () => {
    await homePage.navigateMyContacts();
    await myContactsPage.clickAddContact();
    await myContactsPage.fillUpContactForm(testData.contacts);
    await myContactsPage.clickSave();
    await myContactsPage.verifyContactsAdded(testData.contacts);
});

test('Update time zone', async () => {
    await homePage.openChangeTimeZone();
    await homePage.updateTimeZone(testData.timeZone);
    await homePage.setTimeZone();
    await homePage.closeTimeZoneModal();
    await homePage.openChangeTimeZone();
    await homePage.verifyTimeZone(testData.timeZone);
})

test('Find Talent Check UI', async () => {
    await homePage.navigateFindTalent();
    await findTalentPage.checkElementsVisibility();
});

test('Find Talent - Confirm number of search results', async () => {
    await homePage.navigateFindTalent();
    await findTalentPage.checkElementsVisibility();
    await findTalentPage.searchTalent(testData.talent.skill)
    await findTalentPage.validateTalentFound();
});

test('Find Talent - Select a profile and confirm', async () => {
    await homePage.navigateFindTalent();
    await findTalentPage.selectFirstTalent();
    await findTalentPage.validateProfileName();
});

test('Find Talent - Adding to the team', async () => {
    await homePage.navigateFindTalent();
    await findTalentPage.searchTalent(testData.talent.skill)
    await findTalentPage.selectFirstTalent();
    await findTalentPage.validateProfileName();
    await findTalentPage.addToTeam();
    //Assertion
    await findTalentPage.showTalentDrawer();
    await findTalentPage.validateAddedToTeam();
});

test('Remove Talent - Pending List', async () => {
    await findTalentPage.showTalentDrawer();
    await findTalentPage.removeToTeam();
    await findTalentPage.validateTalentRemoved();
});