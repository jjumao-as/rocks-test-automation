import { test, expect } from '@playwright/test';

test.beforeEach('Login to portal', async ({ page }) => {
  //test('Login to portal', async ({ page }) => {
  await page.goto('https://preprod.fullscale.rocks/login');
  await page.getByPlaceholder('Email/User Name').click();
  await page.getByPlaceholder('Email/User Name').fill('malcantara@fullscale.ph');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Fu115c@leRocks!');
  await page.getByPlaceholder('Password').click();
  await page.getByRole('button', { name: 'SIGN IN' }).click();
  await page.waitForTimeout(3000);
});

test('Dashboard & Quick Tasks', async ({ page }) => {
  //Validate Url
  await expect (page).toHaveURL('https://preprod.fullscale.rocks/');
  await page.getByRole('button', { name: ' Dashboard' }).click();
  //Validate Welcome Text
  await page.getByText('Hi malcantara, what would you').click();
  //Validate nav-title
  await page.locator('div').filter({ hasText: /^Quick Tasks$/ }).nth(1).click();
  //Validate Create Daily Report page is displayed
  await page.getByRole('link', { name: ' Create Daily Report' }).click();
  //Validate Create Daily Report URL
  await expect (page).toHaveURL('https://preprod.fullscale.rocks/daily-report');
  //Validate Create Daily Report page title
  await page.getByRole('heading', { name: 'Daily Reports' }).click();
  //Validate Submit Expense Report modal will launch
  await page.getByRole('link', { name: ' Create Expense Report' }).click();
  //Validate Submit Expense Report modal is displayed
  await page.getByRole('heading', { name: 'Submit Expense Report' }).click();
  //Validate that Submit Expence Report Close button
  await page.getByText('close').click();
  //Validate Close confirmation button.
  await page.getByRole('button', { name: 'Yes' }).click();
  //Validate Submit Self-Performance Review page is displayed
  await page.getByRole('button', { name: ' Submit Self-Performance' }).click();
  //Validate Submit Self-Performance Review URL
  await expect (page).toHaveURL('https://preprod.fullscale.rocks/performance-evaluation');
  //Validate Submit Self-Performance Review page title
  await page.getByRole('heading', { name: 'Performance Evaluation Review' }).click();
  //Validate Submit Feedback page
  await page.getByRole('button', { name: ' Submit Feedback' }).click();
  //Validate page url
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/employee/feedback');
});

test('View Reports', async ({ page }) => {
  //Validate nav-title
  await page.locator('div').filter({ hasText: /^View Reports$/ }).nth(1).click();
  //Validate Daily Status Reports page
  await page.getByRole('link', { name: ' Daily Status Reports' }).click();
  //Validate Daily Status Reports URL
  await expect (page).toHaveURL('https://preprod.fullscale.rocks/employee/10659/daily-reports');
  //Validate Daily Status Reports page title
  await page.getByRole('heading', { name: 'Alcantara, Marlon Alviola -' }).click();
  //Validate Daily Time Clock Reports page
  await page.getByRole('button', { name: ' Daily Time Clock Reports' }).click();
  //Validate Daily Time Clock Reports URL
  await expect (page).toHaveURL('https://preprod.fullscale.rocks/worklogs/daily');
  //Validate Daily Time Clock Reports page
  await page.locator('#fs-page-holder-container').getByText('Daily Time Clock Reports').click();
  //Validate Time Clock Summary Reports header
  await page.getByRole('button', { name: ' Time Clock Summary Reports' }).click();
  //Validate Time Clock Summary Reports URL
  await expect (page).toHaveURL('https://preprod.fullscale.rocks/worklogs/monthly');
  //Validate Time Clock Summary Reports header
  await page.locator('#fs-page-holder-container').getByText('Time Clock Summary Reports').click();
  //Validate Expense Reports page
  await page.getByRole('button', { name: ' Expense Reports' }).click();
  //Validate Expense Reports URL
  await expect (page).toHaveURL('https://preprod.fullscale.rocks/expense-report');
  //validate Expense Reports page title
  await page.getByRole('heading', { name: 'Expense Report' }).click();
});

test('Full Scale Experience', async ({ page }) => {
  //Validate nav-title
  await page.locator('div').filter({ hasText: /^Full Scale Experience$/ }).nth(1).click();
  //Validate FS Dashboard page
  await page.getByRole('button', { name: 'Dashboard', exact: true }).click();
  //Validate FS Dashboard URL
  await expect (page).toHaveURL('https://preprod.fullscale.rocks/fs-experience');
  //Validate FS Dashboard page title
  await page.getByRole('heading', { name: 'Full Scale Experience' }).click();
  //Validate Announcements and FAQs page
  await page.getByRole('button', { name: ' Announcements and FAQs' }).click();
  //Validate Announcements and FAQs URL
  await expect (page).toHaveURL('https://preprod.fullscale.rocks/employee-resources');
  //Validate Announcements and FAQs page title
  await page.getByRole('heading', { name: 'Employee Resources' }).click();
});