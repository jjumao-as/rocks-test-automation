import { test, expect, chromium } from '@playwright/test';
const { LoginPage, HomePage, MyProfilePage } = require('../pages/functions/index.js');
const homePageLocator = require('../pages/locators/homeLoc');
const myProfileLocator = require('../pages/locators/myProfileLoc');
const {savedContact} = require('../utils/randomData.js');
const { readJsonFile } = require('../utils/jsonReader');


let browser;
let context;
let page;
let loginPage;
let homePage;
let myProfilePage;
let testDataPath;
let testData;


test.beforeEach(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    myProfilePage = new MyProfilePage(page);

    savedContact();
    testDataPath = 'myProfile';
    testData = await readJsonFile(testDataPath);
    await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
});

test.afterEach(async () => {
    await context.close();
    await browser.close();
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