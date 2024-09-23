import { test, expect, chromium } from '@playwright/test';
const { LoginPage, HomePage, FindTalentPage } = require('../../pages/functions/index');
const { readJsonFile } = require('../../utils/jsonReader');


let browser;
let context;
let page;
let loginPage;
let homePage;
let testDataPath;
let testData;
let findTalentPage;

test.beforeAll(async ({browser : b}) => {
    browser = b;
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = await new LoginPage(page);
    homePage = await new HomePage(page);
    findTalentPage = await new FindTalentPage(page);
    testDataPath = 'rocksTalent';
    testData = await readJsonFile(testDataPath);
    await loginPage.login(process.env.CLIENTFORBOOKACALL, process.env.PASSWORDBOOKACALL);
});

test.afterEach(async () => {
    await context.close();
});

test('Find Talent - Book a call', async() => {
  await homePage.navigateFindTalent();
  await findTalentPage.compareList(testData.talents);
  await findTalentPage.clickBookACall();
  await findTalentPage.selectTimeSlot();
  await findTalentPage.verifySchedule();
  await findTalentPage.clickBookSchedule();
  await findTalentPage.clickBookACall();
  await findTalentPage.verifyBooking();
  await findTalentPage.verifyTimeSlot();
});





