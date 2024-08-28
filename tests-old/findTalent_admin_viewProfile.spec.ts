import { test, expect } from '@playwright/test';
import exp from 'constants';
const { HomePage, LoginPage } = require('./pages/index.js');

let page

test.afterEach(async ({ page }) => {
  await page.close();
});
test('Find Talent View Profile', async ({ browser }) => {
  page = await browser.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  // Login to Rocks with Admin role
  await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
  // Navigating to Find Talent
  await homePage.navigateFindTalent();
  await expect(page.getByRole('heading', { name: 'Find Talent' })).toBeVisible();
  // Viewing profile in Find Talent 
  //await page.pause();
  await homePage.selectFirstTalent();
  await expect(page.locator('#modalDescription')).toBeVisible();
  await page.waitForTimeout(5000);
  // Checking sections popup profile
  const aboutMe = await page.$('.profile-about');
  const skills = await page.$('.profile-skills');
  const clientSpotlight = await page.$('.profile-client-spotlight');
  const competencies = await page.$('.profile-competencies');
  const workExperience = await page.$('.profile-work-experience');
  const education = await page.$('.profile-education');
  if (aboutMe) {
    const contentAboutMe = await aboutMe.textContent();
    if (contentAboutMe) {
      console.log('About Me section is visible')
    }
  }
  else {
    console.log('About Me section is empty in internal profile')
  }
  if (skills) {
    const contentSkills = await skills.textContent();
    if (contentSkills) {
      console.log('Skills section is visible')
    }
  }
  else {
    console.log('Skills section is empty in internal profile')
  }
  if (clientSpotlight) {
    const contentClientSpotlight = await clientSpotlight.textContent();
    if (contentClientSpotlight) {
      console.log('Client Spotlight section is visible');
    }
  }
  else {
    console.log('Client Spotlight section is empty in internal profile');
  }
  if (competencies) {
    const contentCompetencies = await competencies.textContent();
    if (contentCompetencies) {
      console.log('Competencies section is visible')
    }
  }
  else {
    console.log('Competencies section is empty in internal profile');
  }
  if (workExperience) {
    const contentWorkExperience = await workExperience.textContent();
    if (contentWorkExperience) {
      console.log('Work Experiecen section is visible');
    }
  }
  else {
    console.log('Work Experience section is empty in internal profile')
  }
  if (education) {
    const contentEducation = await education.textContent();
    if (contentEducation) {
      console.log('Education section is visible')
    }
  }
  else {
    console.log('Education section is empty in internal profile')
  }
  await homePage.checkStaticSections();
  // Viewing other profile under Other Talent
  await homePage.selectOtherTalent();
  await expect(page.locator('#modalDescription')).toBeVisible();
  // Closing popup profile page
  await homePage.closePopupProfilePage();
  await expect(page.getByRole('heading', { name: 'Find Talent' })).toBeVisible();
});
test('Viewing a Book a Call modal', async ({ browser }) => {
  page = await browser.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  // Login to Rocks with Admin role
  await loginPage.openRocks(process.env.TEST_ENV);
  await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
  // Navigating to Find Talent
  await homePage.navigateFindTalent();
  await expect(page.getByRole('heading', { name: 'Find Talent' })).toBeVisible();
  // Viewing profile in Find Talent 
  await homePage.selectFirstTalent();
  await await expect(page.locator('#modalDescription')).toBeVisible();
  //Viewing a book a call modal
  await homePage.openBookACallModal();
  await expect(page.locator('//*[@id="modalTitle"]/h4')).toHaveText('Book a Call');
});
test('Searching skill that Show in Profile is enabled', async ({ browser }) => {
  page = await browser.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  // Login to Rocks with Admin role
  await loginPage.openRocks(process.env.TEST_ENV);
  await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
  // Creating test artifact to search skill in Find Talent
  await homePage.clickShowInProfile();
  await page.reload();
  // Navigating to Find Talent
  await homePage.navigateFindTalent();
  await expect(page.getByRole('heading', { name: 'Find Talent' })).toBeVisible();
  // Searching skill in search bar
  await homePage.enterSkillToSearch();
  await expect(page.getByRole('link', { name: 'Luis Francisco Macasaet', exact: true })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'Nightwatch' }).nth(2)).toBeVisible;
});
test('Searching skill that Show in Profile is disabled', async ({ browser }) => {
  page = await browser.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  // Login to Rocks with Admin role
  await loginPage.openRocks(process.env.TEST_ENV);
  await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
  // Navigating to Find Talent
  await homePage.clickShowInProfile();
  await page.reload();
  await homePage.navigateFindTalent();
  await expect(page.getByRole('heading', { name: 'Find Talent' })).toBeVisible();
  // Searching skill in search bar
  await homePage.enterSkillToSearch();
  await expect(page.getByRole('link', { name: 'Luis Francisco Macasaet', exact: true })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'Nightwatch' }).nth(2)).toBeHidden();
});