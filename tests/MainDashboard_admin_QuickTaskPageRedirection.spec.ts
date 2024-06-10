import { test, expect } from '@playwright/test';

test.beforeEach('Login to portal', async ({ page }) => {
  await page.goto('https://preprod.fullscale.rocks/login');
  await page.getByPlaceholder('Email/User Name').click();
  await page.getByPlaceholder('Email/User Name').fill('rnahid');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Fu115c@leRocks!');
  await page.getByPlaceholder('Password').click();
  await page.getByRole('button', { name: 'SIGN IN' }).click();
  await page.waitForTimeout(3000);
});

test('Main Dashboard Navigation', async ({ page }) => {
  //Validate Url
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/')
  //Validate Welcome Text
  await expect(page.locator('#fs-page-holder-container')).toContainText('Hi rnahid, what would you like to do today?');
  //Validate My Dashboard button is shown in the page main page
  await expect(page.getByRole('tab', { name: 'My Dashboard' })).toBeVisible();
  await expect(page.locator('#nav-my-dashboard-tab')).toContainText('My Dashboard');
  //Validate Clien/Sales Dashboard button is shown in the page main page
  await expect(page.getByRole('tab', { name: 'Client / Sales Dashboard' })).toBeVisible();
  await expect(page.locator('#nav-client-sales-dashboard-tab')).toContainText('Client / Sales Dashboard');
  //Validate HR/Recruitment Dashboard button is shown in the page main page
  await expect(page.getByRole('tab', { name: 'HR / Recruitment Dashboard' })).toBeVisible();
  await expect(page.locator('#nav-hr-recruitment-dashboard-tab')).toContainText('HR / Recruitment Dashboard');
  //Validate Employee Dashboard button is shown in the page main page
  await expect(page.getByRole('tab', { name: 'Employee Dashboard' })).toBeVisible();
  await expect(page.locator('#nav-employee-dashboard-tab')).toContainText('Employee Dashboard');
  //Validate My Dashboard Section
  await expect(page.locator('#dahboard-holder')).toContainText('Your Productivity');
  await expect(page.locator('#dahboard-holder')).toContainText('Announcements');
  await expect(page.locator('#dahboard-holder')).toContainText('Events and Holidays');
  await expect(page.locator('#dahboard-holder')).toContainText('Certification Leaderboards');
  //Naviagete to Client/ Sales Dashboard
  await page.getByRole('tab', { name: 'Client / Sales Dashboard' }).click();
  await page.waitForTimeout(5000);
  //Validate Client / Sales Dashboard section
  await expect(page.locator('#client-admin-dashboard')).toContainText('See all clients');
  await expect(page.locator('#client-admin-dashboard')).toContainText('Active Clients');
  await expect(page.locator('#client-admin-dashboard')).toContainText('Utilization Rate');
  await expect(page.locator('#client-admin-dashboard')).toContainText('See all talent');
  await expect(page.locator('#client-admin-dashboard')).toContainText('Revenue Generating Talent');
  await expect(page.locator('#client-admin-dashboard')).toContainText('New Clients');
  await expect(page.locator('#client-admin-dashboard')).toContainText('Assigned Talent by Position');
  await expect(page.locator('#client-admin-dashboard')).toContainText('Team Size');
  await expect(page.locator('#client-admin-dashboard')).toContainText('Floor Report - Red Flags');
  await expect(page.locator('h6')).toContainText('Productivity Rate (RGE)');
  //Navigate to HR/Recruitments Dashboard
  await page.getByRole('tab', { name: 'HR / Recruitment Dashboard' }).click();
  await page.waitForTimeout(5000);
  //Validate New applicant by Role Section
  await expect(page.locator('#metrics-card-widget-new_applicant_by_roles_widget')).toContainText('New Applicants by Role');
  await expect(page.locator('#metrics-card-widget-new_applicant_by_roles_widget')).toContainText('See all applicants');
  await expect(page.locator('#tab-buttons-new_applicant_by_roles_widget')).toContainText('Weekly');
  await expect(page.locator('#tab-buttons-new_applicant_by_roles_widget')).toContainText('Monthly');
  await expect(page.locator('#metrics-card-widget-new_applicant_by_roles_widget')).toContainText('Week-Over-Week');
  //Validate New Applicants by Source section
  await expect(page.locator('#metrics-card-widget-new_applicants_by_source_widget')).toContainText('See all applicants');
  await expect(page.locator('#metrics-card-widget-new_applicants_by_source_widget')).toContainText('New Applicants by Source');
  await expect(page.locator('#tab-buttons-new_applicants_by_source_widget')).toContainText('Weekly');
  await expect(page.locator('#tab-buttons-new_applicants_by_source_widget')).toContainText('Monthly');
  await expect(page.locator('#metrics-card-widget-new_applicants_by_source_widget')).toContainText('Week-Over-Week');
  //Validate Concducted Intervies Section
  await expect(page.locator('#metrics-card-widget-conducted_interviews_widget')).toContainText('See all applicants');
  await expect(page.locator('#metrics-card-widget-conducted_interviews_widget')).toContainText('Conducted Interviews');
  await expect(page.locator('#tab-buttons-conducted_interviews_widget')).toContainText('Weekly');
  await expect(page.locator('#tab-buttons-conducted_interviews_widget')).toContainText('Monthly');
  await expect(page.locator('#metrics-card-widget-conducted_interviews_widget')).toContainText('Week-Over-Week');
  //Navigate to Employee Dashboard
  await page.getByRole('tab', { name: 'Employee Dashboard' }).click();
  await page.waitForTimeout(5000);
  //Validate Telent Distribution by Department
  await expect(page.locator('#metrics-card-widget-employee-demographics-widget')).toContainText('See all employees');
  await expect(page.locator('#metrics-card-widget-employee-demographics-widget')).toContainText('Talent Distribution by Department');
  await expect(page.getByText('SoftwareSales &')).toBeVisible();

  //Validate Daily Report Submission Rate Section
  await expect(page.locator('#metrics-card-widget-daily-report-submission-rate-widget')).toContainText('See all daily reports');
  await expect(page.locator('#metrics-card-widget-daily-report-submission-rate-widget')).toContainText('Daily Report Submission Rate');
});

test('Create Daily Report page', async ({ page }) => {
  await page.getByRole('link', { name: ' Create Daily Report' }).click();
  await page.waitForTimeout(8000);
  //Validate page url
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/daily-report')
  //Validate Page label
  await expect(page.locator('h4')).toContainText('Daily Reports');
  //Validate Compose new message button
  await expect(page.getByRole('button', { name: 'Compose new message' })).toBeVisible();
  await expect(page.getByLabel('next')).toBeVisible(); await expect(page.getByLabel('prev')).toBeVisible();
  await expect(page.getByLabel('next')).toBeVisible();
  //Pagination
  await expect(page.locator('.paginate_button').first()).toBeVisible();
  await expect(page.locator('.pagination > li:nth-child(2)')).toBeVisible();
  await expect(page.locator('a').filter({ hasText: /^1$/ })).toBeVisible();
  await expect(page.locator('a').filter({ hasText: /^2$/ })).toBeVisible();
  await expect(page.locator('a').filter({ hasText: /^3$/ })).toBeVisible();
  await expect(page.locator('a').filter({ hasText: /^4$/ })).toBeVisible();
  await expect(page.locator('.paging-numbers')).toBeVisible();
  await expect(page.getByText('...')).toBeVisible();
  await expect(page.getByTitle('Go to the next page')).toBeVisible();
  await expect(page.getByTitle('Go to the last page')).toBeVisible();
});

test('Expense report', async ({ page }) => {
  await page.getByRole('link', { name: ' Create Expense Report' }).click();
  await page.waitForTimeout(5000);
  //Verify modal Title is visible
  await expect(page.locator('#modalTitle')).toBeVisible();
  //Verify Labels in modal
  await expect(page.getByLabel('Submit Expense Report').getByRole('heading')).toContainText('Submit Expense Report');
  await expect(page.getByText('Expense Type', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Submit Expense Report').getByText('Date')).toBeVisible();
  await expect(page.getByText('Receipt Amount')).toBeVisible();
  await expect(page.getByText('Cash Advance Amount')).toBeVisible();
  await expect(page.getByText('Reimbursable Amount')).toBeVisible();
  await expect(page.getByText('Justification')).toBeVisible();
  await expect(page.getByText('Receipt Missing?')).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Yes No' }).locator('span').first()).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'Upload Receipt' })).toBeVisible();
  await expect(page.getByText('SUBMIT close')).toBeVisible();
  await expect(page.getByText('close')).toBeVisible();
});

test('Weekly Floor Report', async ({ page }) => {
  await page.getByRole('link', { name: ' Create Weekly Floor Report' }).click();
  await page.waitForTimeout(5000);
  //Verify text found in the Weekly floor report modal
  await expect(page.getByRole('heading', { name: 'Create Weekly Floor Report' })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('Create Weekly Floor Report');
  await expect(page.getByRole('button', { name: 'Press Esc to close' })).toBeVisible();
  await expect(page.locator('[id="__BVID__85"]')).toContainText('Select Client(s)');
  await expect(page.locator('[id="__BVID__97__BV_label_"]')).toContainText('Do you have goals or deadlines?');
  await expect(page.locator('[id="__BVID__105__BV_label_"]')).toContainText('Is the team making progress?');
  await expect(page.locator('[id="__BVID__121__BV_label_"]')).toContainText('Does the project need more talent?');
});

test('Sumbit Self-Performance Review', async ({ page }) => {
  await page.getByRole('button', { name: ' Submit Self-Performance' }).click();
  await page.waitForTimeout(5000);
  //Validate page url
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/performance-evaluation');
  //1validate text in Self-Performance review
  await expect(page.locator('h4')).toContainText('Performance Evaluation Review');
  await expect(page.locator('ol')).toContainText('Evaluation Period');
  await expect(page.locator('ol')).toContainText('Performance Competencies');
  await expect(page.locator('ol')).toContainText('Performance Summary');
  await expect(page.locator('h3')).toContainText('Performance Evaluation Review');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Start date');
  await expect(page.locator('#fs-page-holder-container')).toContainText('End date');
  await page.getByRole('button', { name: ' Dashboard' }).click();
  await expect(page).toHaveURL('https://preprod.fullscale.rocks');
});

test('Sumbit Manager Performance Review', async ({ page }) => {
  await page.getByRole('button', { name: ' Submit Manager Performance' }).click();
  await page.waitForTimeout(10000);
  //Validate page url
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/performance-review-manager');
  //validate text in Manager Performance review
  await expect(page.locator('h4')).toContainText('Performance Evaluation Review');
  await expect(page.locator('ol')).toContainText('Choose a Talent');
  await expect(page.locator('ol')).toContainText('Performance Competencies');
  await expect(page.locator('ol')).toContainText('Performance Summary');
  await expect(page.locator('h3')).toContainText('Performance Evaluation Review');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Start date');
  await expect(page.locator('#fs-page-holder-container')).toContainText('End date');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Select a talent to evaluate');
});

test('Sumbit Feedback', async ({ page }) => {
  await page.getByRole('button', { name: ' Submit Feedback' }).click();
  await page.waitForTimeout(5000);
  //Validate page url
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/employee/feedback');
});

test('Manage Client - Dashoard', async ({ page }) => {
  await page.getByRole('button', { name: ' Dashboard' }).first().click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/client-admin-dashboard');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Client / Sales Dashboard');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
});

test('Client Listing', async ({ page }) => {
  await page.getByRole('link', { name: ' Recently Signed-up Clients' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/review-client-prospects');
  await expect(page.locator('h4')).toContainText('Review Client Prospects');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
});

test('Team Request', async ({ page }) => {
  await page.getByRole('link', { name: ' Team Requests (24)' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/manage-team-requests');
  await expect(page.getByRole('heading')).toContainText('Manage Team Requests');
  await expect(page.locator('.container-fluid > div:nth-child(2)').first()).toBeVisible();
});

test('Documants and Agreenebts', async ({ page }) => {
  await page.getByRole('link', { name: ' Documents & Agreements (0)' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/documents');
  await expect(page.getByRole('heading')).toContainText('Client Documents & Agreements');
  await expect(page.locator('#nav-all-agreements-tab')).toContainText('All Agreements');
  await expect(page.locator('#nav-unsigned-tab')).toContainText('Unsigned');
  await expect(page.locator('#nav-require-review-tab')).toContainText('Require Review');
});

test('Sales Leads', async ({ page }) => {
  await page.getByRole('button', { name: ' Sales Leads' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/sales-leads');
  await expect(page.locator('.container-fluid > div').first()).toBeVisible();
});

test('Client Employee Interviews', async ({ page }) => {
  await page.getByRole('button', { name: ' Client Employee Interviews' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/client-employee-interviews');
  await expect(page.getByRole('heading')).toContainText('Client Employee Interviews');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
  await expect(page.getByRole('table')).toContainText('Client');
  await expect(page.getByRole('table')).toContainText('Employee');
  await expect(page.getByRole('table')).toContainText('Schedule');
  await expect(page.getByRole('table')).toContainText('Status')
});

test('Find Talent', async ({ page }) => {
  await page.getByRole('button', { name: ' Find Talent' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/find-talent');
  await expect(page.getByRole('heading')).toContainText('Find Talent');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
});

test('Manage Applicants Dashboard', async ({ page }) => {
  await page.getByRole('button', { name: ' Dashboard' }).nth(1).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/recruitment-dashboard');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Recruitment Dashboard');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
});

test('Applicant Listing', async ({ page }) => {
  await page.getByRole('button', { name: ' Applicant Listing' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/applicants');
  await expect(page.locator('#fs-page-holder-container')).toContainText('All Applicants');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
});

test('Manage Employees Dashboard', async ({ page }) => {
  await page.getByRole('button', { name: ' Dashboard' }).nth(2).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/employee-admin-dashboard');
});

test('Employee Listing', async ({ page }) => {
  await page.getByRole('button', { name: ' Employee Listing' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/employees');
  await expect(page.getByRole('heading')).toContainText('Employees');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
});

test('Performance Review Dashboard', async ({ page }) => {
  await page.getByRole('button', { name: ' Performance Review Dashboard' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/performance-review-dashboard');
  await expect(page.getByRole('heading')).toContainText('Performance Review Dashboard');
});

test('Certification', async ({ page }) => {
  await page.getByRole('button', { name: ' Certifications' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/certifications');
  await expect(page.getByRole('heading')).toContainText('Certification Leaderboard');
  await expect(page.locator('.container-fluid > div').first()).toBeVisible();
});

test('Daily Status Reports', async ({ page }) => {
  await page.getByRole('link', { name: ' Daily Status Reports' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/daily-reports');
  await expect(page.getByRole('heading')).toContainText('Daily Status Reports');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
});

test('Daily Timeclock Reports', async ({ page }) => {
  await page.getByRole('button', { name: ' Daily Time Clock Reports' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/worklogs/daily');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Daily Time Clock Reports');
  await expect(page.locator('#fs-page-holder-container div').filter({ hasText: 'Show 5102050100 20 Abadicio,' }).nth(1)).toBeVisible();
});

test('Time Clock Summary Reports', async ({ page }) => {
  await page.getByRole('button', { name: ' Time Clock Summary Reports' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/worklogs/monthly');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Time Clock Summary Reports');
  await expect(page.locator('#fs-page-holder-container div').filter({ hasText: 'Show 5102050100 20 Monthly' }).nth(1)).toBeVisible();
});

test('Weekly Time Clock Reports', async ({ page }) => {
  await page.getByRole('button', { name: ' Weekly Time Clock Reports' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/worklogs/weekly');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Weekly Time Clock Reports');
  await expect(page.getByText('EXPORT Advisors ExcelAdvisors')).toBeVisible();
});

test('Weekly Floor Reports', async ({ page }) => {
  await page.getByRole('button', { name: ' Weekly Floor Reports' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/weekly-floor-report/list');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Weekly Floor Reports');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Development Floor Manager Dashboard');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
});

test('Expense Reports', async ({ page }) => {
  await page.getByRole('button', { name: ' Expense Reports' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/expense-report');
  await expect(page.getByRole('heading')).toContainText('Expense Report');
  await expect(page.locator('#fs-page-holder-container')).toContainText('Submit Expense Report');
  await expect(page.getByText('Submit Expense Report')).toBeVisible();
});

test('FullScale Experience Dashboard', async ({ page }) => {
  await page.getByRole('button', { name: 'Dashboard', exact: true }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/fs-experience');
  await expect(page.locator('#employee-resources')).toContainText('Full Scale Experience');
  await expect(page.locator('#fs-experience')).toContainText('Announcements');
  await expect(page.locator('#fs-experience')).toContainText('Frequently Asked Questions');
  await expect(page.locator('#fs-experience')).toContainText('Events and Holidays');
  await page.getByRole('link', { name: 'See all' }).first().click();
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/employee-resources');
  await expect(page.locator('section')).toContainText('Full Scale Experience');
  await expect(page.locator('h4')).toContainText('Employee Resources');
  await expect(page.locator('.ks-page-content')).toBeVisible();
  await page.getByRole('link', { name: ' Full Scale Experience' }).click();
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/fs-experience');
});

test('Announcements and FAQs', async ({ page }) => {
  await page.getByRole('button', { name: ' Announcements and FAQs' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/employee-resources');
  await expect(page.locator('section')).toContainText('Full Scale Experience');
  await expect(page.locator('h4')).toContainText('Employee Resources');
  await page.getByRole('link', { name: ' Full Scale Experience' }).click();
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/fs-experience');
});

test('Positions', async ({ page }) => {
  await page.getByRole('button', { name: ' Positions' }).click();
  await page.waitForTimeout(10000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/positions');
  await expect(page.getByRole('heading')).toContainText('Job Position Management');
  await expect(page.locator('.ks-page-content')).toBeVisible();
});

test('Skills', async ({ page }) => {
  await page.getByRole('button', { name: ' Skills' }).click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/skills');
  await expect(page.getByRole('heading')).toContainText('Skills Management');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
});

test('Reports Template', async ({ page }) => {
  await page.getByRole('button', { name: ' Report Templates' }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL('https://preprod.fullscale.rocks/templates');
  await expect(page.getByRole('heading')).toContainText('Email Reporting Template');
  await expect(page.locator('.ks-nav-body')).toBeVisible();
});