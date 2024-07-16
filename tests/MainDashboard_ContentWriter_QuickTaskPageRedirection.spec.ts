import { test, expect } from '@playwright/test';
const { HomePage, LoginPage } = require('./pages/index.js');

let homePage
let page
let loginPage

test.beforeEach(async({ browser }) => {
    page = await browser.newPage()
    loginPage = new LoginPage(page);
    homePage = new HomePage (page);
    await loginPage.openRocks(process.env.TEST_ENV);
    await loginPage.login(process.env.WRITER, process.env.PASSWORD);
});

//Main Dashboard
test('Main Dashboard Navigation', async () => {  
  await page.getByText('Hi kquevedo, what would you').click();
  await page.getByText('Your Productivity').click();
  await page.locator('.announcement-widget > .card > .card-header').click();
  await expect(page.locator('.announcement-widget > .card > .card-header')).toBeVisible();
  await page.getByText('Events and Holidays').click();
  await page.locator('div:nth-child(4) > div > div > .card-header').click();
  await page.getByText('Certification Leaderboards').click();
  await expect(page).toHaveURL('https://preprod.fullscale.rocks');
});
//Quick Task
test('Quick Task', async () => {
  await page.waitForTimeout(5000);
  await page.getByText('Quick Tasks').click();
  await expect(page.locator('div').filter({ hasText: /^Quick Tasks$/ }).nth(1)).toBeVisible();
  await page.getByRole('link', { name: ' Create Daily Report' }).click();
  //await page.waitForTimeout(6000);
  await expect(page.getByRole('heading', { name: 'Daily Reports' })).toBeVisible();
  await page.locator('#fs-page-holder-container div').filter({ hasText: 'Daily Reports' }).nth(2).click();
  //await page.waitForTimeout(6000);
  await page.getByRole('link', { name: ' Create Expense Report' }).click();
  //await page.waitForTimeout(6000);
  await expect(page.getByRole('heading', { name: 'Submit Expense Report' })).toBeVisible();
  await page.getByRole('button', { name: 'Press Esc to close' }).click();
  //await page.waitForTimeout(6000);
  await page.getByRole('button', { name: 'Yes' }).click();
  //await page.waitForTimeout(6000);
  await page.getByRole('button', { name: ' Submit Self-Performance' }).click();
  //await page.waitForTimeout(5000);
  await page.getByRole('heading', { name: 'Performance Evaluation Review' }).click();
  //await page.waitForTimeout(6000);
  await page.getByRole('button', { name: ' Submit Feedback' }).click();
  //await page.waitForTimeout(6000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/employee/feedback');
});
//Find Talent
test('Find Talent', async () => {
  await page.getByRole('button', { name: ' Find Talent' }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByRole('heading', { name: 'Find Talent' })).toBeVisible();
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/find-talent');
});
//Manage Employees
test('Manage Employees', async () => {
  await page.waitForTimeout(5000);
  await expect(page.locator('div').filter({ hasText: /^Manage Employees$/ }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: ' Employee Listing' }).click();
  //await page.waitForTimeout(6000);
  await expect(page.getByRole('heading', { name: 'Employees' })).toBeVisible();
  await page.getByRole('button', { name: ' Certifications' }).click();
  //await page.waitForTimeout(6000);
  await page.getByRole('heading', { name: 'Certification Leaderboard' }).click();
  //await page.waitForTimeout(6000);
  await expect(page.getByRole('heading', { name: 'Certification Leaderboard' })).toBeVisible();
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/certifications');
});
//View Reports
test('View Reports', async () => {
  await page.waitForTimeout(3000);
  await page.locator('div').filter({ hasText: /^View Reports$/ }).nth(1).click();
  //await page.waitForTimeout(6000);
  await page.getByRole('link', { name: ' Daily Status Reports' }).click();
  //await page.waitForTimeout(5000);
  await expect(page.getByRole('heading', { name: 'Quevedo, Kerr Jason Gordon - Daily' })).toContainText('Quevedo, Kerr Jason Gordon - Daily');
  await page.getByRole('button', { name: ' Daily Time Clock Reports' }).click();
  //await page.waitForTimeout(6000);
  await page.locator('#fs-page-holder-container').getByText('Daily Time Clock Reports').click();
  //await page.waitForTimeout(6000);
  await page.getByRole('button', { name: ' Time Clock Summary Reports' }).click();
  //await page.waitForTimeout(6000);
  await page.locator('#fs-page-holder-container').getByText('Time Clock Summary Reports').click();
  //await page.waitForTimeout(6000);
  await page.getByRole('button', { name: ' Expense Reports' }).click();
  //await page.waitForTimeout(6000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/expense-report');
});
//Full Scale Experience
test('Full Scale Experience', async () => {
  await page.waitForTimeout(5000);
  await page.getByText('Full Scale Experience').click();
  await page.getByRole('button', { name: 'Dashboard', exact: true }).click();
  //await page.waitForTimeout(5000);
  await expect(page.getByRole('heading', { name: 'Full Scale Experience' })).toBeVisible();
  await expect(page.locator('#employee-resources')).toContainText('Full Scale Experience');
  await expect(page.getByRole('heading', { name: 'Announcements' })).toBeVisible();
  await expect(page.locator('#fs-experience')).toContainText('Announcements');
  await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
  await expect(page.locator('#fs-experience')).toContainText('Frequently Asked Questions');
  await expect(page.locator('div').filter({ hasText: /^Events and Holidays$/ })).toBeVisible();
  await expect(page.locator('#fs-experience')).toContainText('Events and Holidays');
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/fs-experience');
});
//Announcements and FAQs
test('Announcements and FAQs', async () => {
  await page.getByText('Announcements and FAQs').click();
  await page.waitForTimeout(5000);
  await expect(page.getByRole('heading', { name: 'Employee Resources' })).toContainText('Employee Resources');
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/employee-resources');
});
//My Notifications
test('Notifications', async () => {
    await page.locator('//*[@id="main-wrapper"]/nav/div[2]/nav/div[2]/div[1]/a').click(); 
    await page.waitForTimeout(5000);
    await expect (page.locator('//*[@id="main-wrapper"]/nav/div[2]/nav/div[2]/div[1]/div/div[1]/div[1]')).toContainText('Notifications');
    await expect(page).toHaveURL('https://preprod.fullscale.rocks');
  });
  //My Profile
  test('My Profile', async () => {
    await page.locator(".ks-avatar").click();
    await page.waitForTimeout(5000);
    await expect(page.getByRole('link', { name: ' My Profile' })).toContainText('My Profile');
    await expect(page.getByRole('link', { name: ' Change Password' })).toContainText('Change Password');
    await expect(page.getByRole('link', { name: ' Change Timezone' })).toContainText('Change Timezone');
    await expect(page.getByRole('link', { name: ' Email Signature Template' })).toContainText('Email Signature Template');
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();   
    await page.getByRole('link', { name: 'Logout' }).click();   
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL('https://preprod.fullscale.rocks/login');
  });