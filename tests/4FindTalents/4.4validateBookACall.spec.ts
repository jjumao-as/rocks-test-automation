import { test } from '@playwright/test';
const { LoginPage, HomePage, FindTalentIntPage } = require('../../pages/functions/index.js');

let browser;
let context;
let page;
let loginPage;
let findTalentIntPage;
let homePage;


test.describe('Test Script for adding talent to the team', async () => {
    test.beforeAll(async ({ browser: b }) => {
        browser = b;
    });

    test.beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = await new LoginPage(page);
        homePage = await new HomePage(page);
        findTalentIntPage = await new FindTalentIntPage(page);
        await loginPage.login('wdilidili', 'W4rr3nr3n@0001');
    });

    test.afterEach(async () => {
        await context.close();
    });

    test('Find Talent - Book a call', async () => {
        await homePage.navigateFindTalent();
        await findTalentIntPage.validateAllBookACall();
    });
    

});
