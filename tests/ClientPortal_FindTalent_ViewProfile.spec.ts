import { test, expect } from '@playwright/test';
const { HomePage, LoginPage } = require('./pages/index.js');
//const constants = require('./config/constants.js');
//GLOBAL VARIABLE
let homePage
let page
//-----
test.beforeAll('Login to portal', async ({ browser }) => {
    page = await browser.newPage()
    const loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.openRocks(process.env.TEST_ENV);
    await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
    await expect(page.getByText('Dashboard')).toBeVisible();
});
test.afterEach(async ({ page }) => {
    await page.close();
})

test.only('Find Talent View Profile', async () => {
    await homePage.navigateClientFindTalent();
    await expect(page.getByRole('heading', { name: 'Find Talent' })).toBeVisible();
    await homePage.selectFirstTalent();
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();
    await expect(page.getByText('Other Talent:')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Work Experience' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Availability' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Years of Experience' })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Show more\.\.\.$/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Click to save' })).toBeVisible();
    await page.getByRole('link', { name: 'Show more...' }).click();
    
});