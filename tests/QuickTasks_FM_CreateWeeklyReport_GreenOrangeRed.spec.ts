import { test, expect } from '@playwright/test';
// import LoginPage from './pages/loginPage';
const { HomePage, LoginPage } = require('./pages/index.js');

var env = "https://preprod.fullscale.rocks/";

test.describe('Creating Weekly Floor Report', () => {

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);

        // Accessing the Pre-Prod Environment and login as Floor Manager
        await login.gotoPreprod();
        await login.floorManagerLogin();

    });

    test('Creating Weekly Report with Green Status', async ({ page }) => {

        // Opening the Weekly Floor Report Form    
        //await page.pause();
        await page.getByRole('link', { name: ' Create Weekly Floor Report' }).click();
        await page.getByRole('heading', { name: 'Create Weekly Floor Report' }).isVisible();
        await expect(page.locator('#modalTitle')).toHaveText('Create Weekly Floor Report');

        // Filling out the Week Floor Report Form    
        await page.locator('.vue-treeselect__multi-value').click();
        await page.getByLabel('Create Weekly Floor Report').getByText('EmployeeDB').click();
        await page.locator('#modalDescription').click()
        await page.getByText('Do you have goals or').isVisible();
        await page.locator('#radio-1').getByText('Yes').click();
        await page.getByText('Are you on track?').isVisible();
        await page.locator('#radio-2').getByText('Yes').click();
        await page.getByText('Is the team making progress?').isVisible();
        await page.locator('#radio-3').getByText('Yes').click();
        await page.locator('#radio-9').getByText('No').click();

        // Submitted the Weekly Floor Report    
        await expect(page.getByRole('button', { name: 'Save' })).toBeEnabled();
        await page.getByRole('button', { name: 'Save' }).click();

        // Checking for the submitted report  
        await page.getByRole('button', { name: ' Weekly Floor Reports' }).click();
        await expect(page.getByRole('heading', { name: 'Weekly Floor Reports' })).toHaveText('Weekly Floor Reports');
        await expect(page.locator('//div[@class="tr flag   flag-3"]').first()).toBeVisible();

    });

    test('Creating Weekly Floor Report with Orange Status', async ({ page }) => {

        // Opening the Weekly Floor Report Form
        //await page.pause();
        await page.getByRole('link', { name: ' Create Weekly Floor Report' }).click();
        await page.getByRole('heading', { name: 'Create Weekly Floor Report' }).isVisible();
        await expect(page.locator('#modalTitle')).toHaveText('Create Weekly Floor Report');

        // Filling out the Week Floor Report Form
        await page.locator('.vue-treeselect__multi-value').click();
        await page.getByLabel('Create Weekly Floor Report').getByText('EmployeeDB').click();
        await page.locator('#modalDescription').click()
        await page.getByText('Do you have goals or').isVisible();
        await page.locator('#radio-1').getByText('Yes').click();
        await page.getByText('Are you on track?').isVisible();
        await page.locator('#radio-2').getByText('Yes').click();
        await page.getByText('Is the team making progress?').isVisible();
        await page.locator('#radio-3').getByText('No').click();
        await page.getByText('What are the blockers?').isVisible();
        await page.getByText('Talent performance').click();
        await page.getByText('Has the problem been').isVisible();
        await page.locator('#radio-6').getByText('Yes').click();
        await page.getByText('Resolution is in progress').click();
        await page.getByText('Does the project need more').isVisible();
        await page.locator('#radio-9').getByText('No').click();

        // Submitting the Weekly Floor Report
        await expect(page.getByRole('button', { name: 'Save' })).toBeEnabled();
        await page.getByRole('button', { name: 'Save' }).click();

        // Checking for the submitted report    
        await page.getByRole('button', { name: ' Weekly Floor Reports' }).click();
        await expect(page.getByRole('heading', { name: 'Weekly Floor Reports' })).toHaveText('Weekly Floor Reports');
        await expect(page.locator('//div[@class="tr flag  flag-2"]').first()).toBeVisible();

    });

    test('Creating Weekly Floor Report with Red Status', async ({ page }) => {

        // Opening the Weekly Floor Report Form
        //await page.pause();
        await page.getByRole('link', { name: ' Create Weekly Floor Report' }).click();
        await page.getByRole('heading', { name: 'Create Weekly Floor Report' }).isVisible();
        await expect(page.locator('#modalTitle')).toHaveText('Create Weekly Floor Report');

        // Filling out the Week Floor Report Form
        await page.locator('.vue-treeselect__multi-value').click();
        await page.getByLabel('Create Weekly Floor Report').getByText('EmployeeDB').click();
        await page.locator('#modalDescription').click();
        await page.getByText('Do you have goals or').isVisible();
        await page.locator('#radio-1').getByText('No').click();
        await page.getByText('Is the team making progress?').isVisible();
        await page.locator('#radio-3').getByText('No').click();
        await page.getByText('What are the blockers?').isVisible();
        await page.getByText('Counterpart point of contact').click();
        await page.getByText('Has the problem been').isVisible();
        await page.locator('#radio-6').getByText('No').click();
        await page.getByText('Client is unreachable').click();
        await page.getByText('Does the project need more').isVisible();
        await page.locator('#radio-9').getByText('No').click();

        // Submitting the Weekly Floor Report
        await expect(page.getByRole('button', { name: 'Save' })).toBeEnabled();
        await page.getByRole('button', { name: 'Save' }).click();

        // Checking for the submitted report in Weekly Floor Reports page   
        await page.getByRole('button', { name: ' Weekly Floor Reports' }).click();
        await expect(page.getByRole('heading', { name: 'Weekly Floor Reports' })).toHaveText('Weekly Floor Reports');
        await expect(page.locator('//div[@class="tr flag flag-1"]').first()).toBeVisible();
        
        // Logging out from Floor Manager account
        await page.locator('a').filter({ hasText: 'Michael II' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL(env + "login");

        // Accessing the Pre-Prod Environment as Super Admin
        const login = new LoginPage(page);
        await login.superAdminLogin();

        // Additional checking for the submitted report with Red Status in Main Dashboard
        await expect(page.getByRole('heading', { name: 'Floor Report - Red Flags' })).toHaveText('Floor Report - Red Flags');
        await expect(page.locator('.fs-link').first()).toHaveText('EmployeeDB');
        await expect(page.locator('.d-table > div:nth-child(2)').first()).toHaveText('Michael II');
        await expect(page.getByRole('link', { name: 'View' }).first()).toBeEnabled();
        await page.getByRole('link', { name: 'See all reports ' }).click();
        await expect(page.getByRole('heading', { name: 'Weekly Floor Reports' })).toHaveText('Weekly Floor Reports');
        await expect(page.locator('//div[@class="tr flag flag-1"]').first()).toBeVisible();

    });
});
