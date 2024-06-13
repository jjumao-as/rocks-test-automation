import { test, expect } from '@playwright/test';
const { HomePage, LoginPage } = require('./pages/index.js');
const constants = require('./config/constants.js');
const fakedata =require('./../utils/randomData.js')
//GLOBAL VARIABLE
let homePage
let page
//-----
test.beforeAll('Login to portal', async ({ browser }) => {
          page = await browser.newPage()
    const loginPage = new LoginPage(page);
          homePage = new HomePage (page);
    await loginPage.openRocks(process.env.TEST_ENV);
    await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
    await expect(page.getByText('Dashboard')).toBeVisible();
});
test.afterEach(async ({ page }) => {
   // await page.close();
  })
test('Confirm Client Dashboard', async () => {
    //Check on sections
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByText('My Team')).toBeVisible();
    await expect(page.getByText('Events and Holidays (PH)')).toBeVisible();
    await expect(page.getByText('Saved & Suggested Talent')).toBeVisible();
    //Check on buttons
    await expect(homePage.MyProfileButton).toBeVisible();
    await expect(homePage.MyContactsButton).toBeVisible();
    await expect(homePage.FindTalentButton).toBeVisible();
    await expect(homePage.DocumentsAgreementsButton).toBeVisible();
    await expect(homePage.ReportingButton).toBeVisible();
    await expect(homePage.NeedHelpButton).toBeVisible();
    await expect(homePage.ManageTeamButton).toBeVisible();
});
test('Update profile check UI', async () => {
    await homePage.navigateMyProfile();
   // await expect(homePage.MyProfileButton).toHaveClass(/active-menu-tile/)
   await expect(homePage.MyProfileTitle).toBeVisible()
   //Assert for labels on Edit profile
   await expect(page.getByText('What do you need help with?')).toBeVisible();
   await expect(page.getByText('What tech does or will your project use?')).toBeVisible();
   await expect(page.getByText('Other technologies you use')).toBeVisible();
   await expect(page.getByText('Which of the following are currently on your team?')).toBeVisible();
   //Assert What do you need help with? options
   await expect(page.getByRole('checkbox', {name: 'Web Development'})).toBeVisible()
   await expect(page.getByRole('checkbox', {name: 'QA Testing'})).toBeVisible()
   await expect(page.getByRole('checkbox', {name: 'Mobile Development'})).toBeVisible()
});
test.skip('Update profile', async () => {
    await homePage.navigateMyProfile();
   // await expect(homePage.MyProfileButton).toHaveClass(/active-menu-tile/)
   await expect(homePage.MyProfileTitle).toBeVisible()
   //Input form
   const testData = {
    needHelp: [
        "Web Development",
        "QA Testing",
        "Mobile Development"
    ]

   };
   await homePage.udpateProfile(testData);
   await expect(page.getByRole('checkbox', {name: 'Web Development'})).toBeVisible()
});
test.skip('My Contacts check UI', async () => {
    await homePage.navigateMyContacts();
    await expect(page.getByText('My Contacts')).toBeVisible();
   //Confirm column headers
   await expect(page.getByRole('table').getByText('Name')).toBeVisible();
   await expect(page.getByRole('table').getByText('Email')).toBeVisible();
   await expect(page.getByRole('table').getByText('Contact Number')).toBeVisible();
   await expect(page.getByRole('table').getByText('Enable Login')).toBeVisible();
   await expect(page.getByRole('table').getByText('Access Level')).toBeVisible();
   await expect(page.getByRole('table').getByText('Action')).toBeVisible();
   //Confirm Add contact button
   await expect(homePage.addContactButton).toBeVisible()

});
test.skip('My Contacts Add - Cancel', async () => {
    await homePage.navigateMyContacts();
    await expect(page.getByText('My Contacts')).toBeVisible();

});
test.skip('My Contacts Add - Save', async () => {
    await homePage.navigateMyContacts();
    await expect(page.getByText('My Contacts')).toBeVisible();
   //Assert for labels on Edit profile
   await expect(page.getByText('What do you need help with?')).toBeVisible();
   await expect(page.getByText('What tech does or will your project use?')).toBeVisible();
   await expect(page.getByText('Other technologies you use')).toBeVisible();
   await expect(page.getByText('Which of the following are currently on your team?')).toBeVisible();
   //Assert What do you need help with? options
   await expect(page.getByRole('checkbox', {name: 'Web Development'})).toBeVisible();
   await expect(page.getByRole('checkbox', {name: 'QA Testing'})).toBeVisible();
   await expect(page.getByRole('checkbox', {name: 'Mobile Development'})).toBeVisible();

});
test('Find Talent Check UI', async () => {
    await homePage.navigateFindTalent();
    await expect(page.getByRole('heading', {name: 'Find Talent'})).toBeVisible();
    await expect(homePage.searchField).toBeVisible();
    await expect(homePage.talentDrawerButton).toBeVisible();
});
test('Find Talent - Confirm number of search results', async () => {
    //Search Talent
    const talent = {
        skill: 'QA Lead'
    }
    await homePage.navigateFindTalent();
    await page.waitForLoadState();
    await expect(homePage.searchField).toBeVisible();
    await homePage.searchTalent(talent.skill)
    await page.waitForLoadState();
    const searchResultTotal = await page.getByText(/We found/).locator('strong').first().innerText();
    await expect(page.locator('.resource-grid-item')).toHaveCount(Number(searchResultTotal));
});
test('Find Talenet - Select a profile and confirm', async () => {
    //Search Talent
    const talent = {
        nameProfile: 'Enrico Jerome B' 
    }
    await homePage.navigateFindTalent();
    await page.waitForLoadState();   
    await homePage.selectProfile(talent.nameProfile);
    await expect(page.getByRole('heading', {name: talent.nameProfile})).toBeVisible();
});
test('Find Talent - Adding to the team', async () => {
    //Search Talent
    const talent = {
        skill: 'QA Lead',
        nameProfile: 'Enrico Jerome B' 
    }
    await homePage.navigateFindTalent();
    await page.waitForLoadState();
    await homePage.searchTalent(talent.skill);
    await page.waitForLoadState();
    await homePage.selectProfile(talent.nameProfile);
    await expect(page.getByRole('heading', {name: talent.nameProfile})).toBeVisible();
    await homePage.addToTeam();
    await page.waitForLoadState();
    //Assertion
    await homePage.showTalentDrawer();
    await expect(page.locator('#fsSideDrawer').getByRole('link', { name: 'Enrico Jerome B', exact: true })).toBeVisible();
});

