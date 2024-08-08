import { test, expect } from '@playwright/test';
const { HomePage, LoginPage } = require('./pages/index.js');
const constants = require('./config/constants.js');
const { fullContactData, firstAndLastName, getRandomTimezone} = require('../utils/randomData.js')
//GLOBAL VARIABLE
let homePage
let page
//-----
test.beforeAll('Login to portal', async ({ browser }) => {
          page = await browser.newPage()
    const loginPage = new LoginPage(page);
          homePage = new HomePage (page);
    await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
    await expect(page.getByText('Dashboard')).toBeVisible();
});
test.afterEach(async ({ page }) => {
    await page.close();
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
test('Update profile', async () => {
    await homePage.navigateMyProfile();
   // await expect(homePage.MyProfileButton).toHaveClass(/active-menu-tile/)
   await expect(homePage.MyProfileTitle).toBeVisible()
   //Input form
   const testData = {
    needHelp: ['Web Development'],
    techUsed: 'NodeJS',
    otherTech: 'React',
    currentlyOnTeam: ['Lead Developer', 'Product Manager']
   };
   await homePage.udpateProfile(testData);
   await homePage.saveUpdates();
   await homePage.navigateHOme();
   await homePage.navigateMyProfile();
   //Assert
   await testData.needHelp.forEach(element => {
    expect(page.getByLabel(element)).toBeChecked()
   });
   await testData.currentlyOnTeam.forEach(element => {
    expect(page.getByLabel(element)).toBeChecked()
   });
   //TO DO assert field
   //await expect(homePage.techUseField).toContainText(testData.techUsed)
   //await expect(homePage.otherTechUseField).toContainText(testData.otherTech)
});
test('My Contacts check UI', async () => {
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
test('My Contacts Add - Cancel', async () => {
    const testData = {
        name: `${firstAndLastName().firstName} ${firstAndLastName().lastName}`,
        email: fullContactData().email,
        countryCode: '',
        phoneNumber: fullContactData().phone,
        agreements: true
    }
    await homePage.navigateMyContacts();
    await expect(page.getByText('My Contacts')).toBeVisible();
    await homePage.openAddContact();
    await homePage.fillUpContactForm(testData);
    await homePage.cancelContact();
    await expect(page.getByRole('gridcell', {name: testData.name})).not.toBeVisible();
    await expect(page.getByRole('gridcell', {name: testData.email})).not.toBeVisible();

});
test('My Contacts Add - Save', async () => {
    const testData = {
        name: `${firstAndLastName().firstName} ${firstAndLastName().lastName}`,
        email: fullContactData().email,
        countryCode: '',
        phoneNumber: fullContactData().phone,
        agreements: true
    }
    await homePage.navigateMyContacts();
    await expect(page.getByText('My Contacts')).toBeVisible();
    await homePage.openAddContact();
    await homePage.fillUpContactForm(testData);
    await homePage.saveUpdates();
    await expect(page.getByRole('gridcell', {name: testData.name})).toBeVisible();
    await expect(page.getByRole('gridcell', {name: testData.email})).toBeVisible();

});
test('Update time zone', async () => {
  await homePage.openChangeTimeZone();
  await homePage.updateTimeZone('(GMT-04:00) America, Kentucky, Monticello');
  await homePage.setTimeZone();
  await homePage.closeTimeZoneModal();
  await homePage.openChangeTimeZone();
  await expect(page.locator('#modalDescription span.selection')).toContainText('(GMT-04:00) America, Kentucky, Monticello');
})
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

