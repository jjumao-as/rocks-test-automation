import { test, expect } from '@playwright/test';
import { log } from 'console';
const { HomePage, LoginPage } = require('./pages/index.js');
const dashboard = require('./config/dashboardAccess.js');
const constants = require('./config/constants.js');

let homePage
let page
let loginPage

test.beforeEach(async({ browser }) => {
    page = await browser.newPage()
    loginPage = new LoginPage(page);
    homePage = new HomePage (page);
    await loginPage.openRocks();
})
test.afterEach(async ({ page }) => {
    await page.close();
  })

 constants.ROLES.forEach(roleValue => {
    test(`Login with ${roleValue} and check dashboard`, async () => {
        let filterOptions;
        let graphOptions;
        let quickTasksOptions;
        let manageClientsOptions;
        let manageApplicantsOptions;
        let manageEmployeesOptions ;
        let viewReportsOptions;
        let fullscaleExperienceOptions;
        let settingsOptions;
        if(roleValue === 'SUPER_ADMIN') {
            await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
            filterOptions = dashboard.SUPER_ADMIN.FILTERS
            graphOptions = dashboard.SUPER_ADMIN.GRAPHS
            quickTasksOptions = dashboard.SUPER_ADMIN.QUICK_TASKS
            manageClientsOptions = dashboard.SUPER_ADMIN.MANAGE_CLIENTS
            manageApplicantsOptions = dashboard.SUPER_ADMIN.MANAGE_APPLICANTS
            manageEmployeesOptions = dashboard.SUPER_ADMIN.MANAGE_EMPLOYEES
            viewReportsOptions = dashboard.SUPER_ADMIN.VIEW_REPORTS
            fullscaleExperienceOptions = dashboard.SUPER_ADMIN.FULLSCALE_EXPERIENCE
            settingsOptions = dashboard.SUPER_ADMIN.SETTINGS
        }
        if(roleValue === 'ADMIN') {
            await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
            filterOptions = dashboard.ADMIN.FILTERS
            graphOptions = dashboard.ADMIN.GRAPHS
            quickTasksOptions = dashboard.ADMIN.QUICK_TASKS
            manageClientsOptions = dashboard.ADMIN.MANAGE_CLIENTS
            manageApplicantsOptions = dashboard.ADMIN.MANAGE_APPLICANTS
            manageEmployeesOptions = dashboard.ADMIN.MANAGE_EMPLOYEES
            viewReportsOptions = dashboard.ADMIN.VIEW_REPORTS
            fullscaleExperienceOptions = dashboard.ADMIN.FULLSCALE_EXPERIENCE
            settingsOptions = dashboard.ADMIN.SETTINGS
        }
        if(roleValue === 'HR') {
            await loginPage.login(process.env.HR, process.env.PASSWORD);
            filterOptions = dashboard.HR.FILTERS
            graphOptions = dashboard.HR.GRAPHS
            quickTasksOptions = dashboard.HR.QUICK_TASKS
            manageClientsOptions = dashboard.HR.MANAGE_CLIENTS
            manageApplicantsOptions = dashboard.HR.MANAGE_APPLICANTS
            manageEmployeesOptions = dashboard.HR.MANAGE_EMPLOYEES
            viewReportsOptions = dashboard.HR.VIEW_REPORTS
            fullscaleExperienceOptions = dashboard.HR.FULLSCALE_EXPERIENCE
            settingsOptions = dashboard.HR.SETTINGS
        }
        if(roleValue === 'FLOOR') {
            await loginPage.login(process.env.FLOOR, process.env.PASSWORD);
            filterOptions = dashboard.FLOOR.FILTERS
            graphOptions = dashboard.FLOOR.GRAPHS
            quickTasksOptions = dashboard.FLOOR.QUICK_TASKS
            manageClientsOptions = dashboard.FLOOR.MANAGE_CLIENTS
            manageApplicantsOptions = dashboard.FLOOR.MANAGE_APPLICANTS
            manageEmployeesOptions = dashboard.FLOOR.MANAGE_EMPLOYEES
            viewReportsOptions = dashboard.FLOOR.VIEW_REPORTS
            fullscaleExperienceOptions = dashboard.FLOOR.FULLSCALE_EXPERIENCE
            settingsOptions = dashboard.FLOOR.SETTINGS
        }
        if(roleValue === 'SALES') {
            await loginPage.login(process.env.SALES, process.env.PASSWORD);
            filterOptions = dashboard.SALES.FILTERS
            graphOptions = dashboard.SALES.GRAPHS
            quickTasksOptions = dashboard.SALES.QUICK_TASKS
            manageClientsOptions = dashboard.SALES.MANAGE_CLIENTS
            manageApplicantsOptions = dashboard.SALES.MANAGE_APPLICANTS
            manageEmployeesOptions = dashboard.SALES.MANAGE_EMPLOYEES
            viewReportsOptions = dashboard.SALES.VIEW_REPORTS
            fullscaleExperienceOptions = dashboard.SALES.FULLSCALE_EXPERIENCE
            settingsOptions = dashboard.SALES.SETTINGS
        }
        if(roleValue === 'FINANCE') {
            await loginPage.login(process.env.FINANCE, process.env.PASSWORD);
            filterOptions = dashboard.FINANCE.FILTERS
            graphOptions = dashboard.FINANCE.GRAPHS
            quickTasksOptions = dashboard.FINANCE.QUICK_TASKS
            manageClientsOptions = dashboard.FINANCE.MANAGE_CLIENTS
            manageApplicantsOptions = dashboard.FINANCE.MANAGE_APPLICANTS
            manageEmployeesOptions = dashboard.FINANCE.MANAGE_EMPLOYEES
            viewReportsOptions = dashboard.FINANCE.VIEW_REPORTS
            fullscaleExperienceOptions = dashboard.FINANCE.FULLSCALE_EXPERIENCE
            settingsOptions = dashboard.FINANCE.SETTINGS
        }
        if(roleValue === 'WRITER') {
            await loginPage.login(process.env.WRITER, process.env.PASSWORD);
            filterOptions = dashboard.WRITER.FILTERS
            graphOptions = dashboard.WRITER.GRAPHS
            quickTasksOptions = dashboard.WRITER.QUICK_TASKS
            manageClientsOptions = dashboard.WRITER.MANAGE_CLIENTS
            manageApplicantsOptions = dashboard.WRITER.MANAGE_APPLICANTS
            manageEmployeesOptions = dashboard.WRITER.MANAGE_EMPLOYEES
            viewReportsOptions = dashboard.WRITER.VIEW_REPORTS
            fullscaleExperienceOptions = dashboard.WRITER.FULLSCALE_EXPERIENCE
            settingsOptions = dashboard.WRITER.SETTINGS
        }
        if(roleValue === 'EMPLOYEE') {
            await loginPage.login(process.env.EMPLOYEE, process.env.PASSWORD);
            filterOptions = dashboard.EMPLOYEE.FILTERS
            graphOptions = dashboard.EMPLOYEE.GRAPHS
            quickTasksOptions = dashboard.EMPLOYEE.QUICK_TASKS
            manageClientsOptions = dashboard.EMPLOYEE.MANAGE_CLIENTS
            manageApplicantsOptions = dashboard.EMPLOYEE.MANAGE_APPLICANTS
            manageEmployeesOptions = dashboard.EMPLOYEE.MANAGE_EMPLOYEES
            viewReportsOptions = dashboard.EMPLOYEE.VIEW_REPORTS
            fullscaleExperienceOptions = dashboard.EMPLOYEE.FULLSCALE_EXPERIENCE
            settingsOptions = dashboard.EMPLOYEE.SETTINGS
        }
        //ASSERT DASHBOARD - FILTERS
        log("Checking Filters")
        await filterOptions.forEach(element => {
            expect(page.getByRole('a', {name: element})).toBeVisible({ timeout: 90000 });
        }); filterOptions = null;
        //ASSERT DASHBOARD - GRAPHS
        log("Checking Graph sections")
        await graphOptions.forEach(element => {
            expect(page.getByRole('heading', element)).toBeVisible({ timeout: 90000 });
        }); graphOptions = null;
        //ASSERT DASHBOARD - SIDE NAV
        log("Checking each section of the side nav")
        //QUICK TASKS
        await quickTasksOptions.forEach(element => {
            expect(page.getByRole('li', {name: element})).toBeVisible({ timeout: 90000 })
        }); quickTasksOptions = null;   
        //MANAGE CLIENTS
        await manageClientsOptions.forEach(element => {
            expect(page.getByRole('li', {name: element})).toBeVisible({ timeout: 90000 })
        }); manageClientsOptions = null;  
        //MANAGE APPLICANTS
        await manageApplicantsOptions.forEach(element => {
            expect(page.getByRole('li', {name: element})).toBeVisible({ timeout: 90000 })
        }); manageApplicantsOptions = null;
        //MANAGE Employees
        await manageEmployeesOptions.forEach(element => {
            expect(page.getByRole('li', {name: element})).toBeVisible({ timeout: 90000 })
        }); manageEmployeesOptions = null;
        //VIEW REPORTS
        await viewReportsOptions.forEach(element => {
            expect(page.getByRole('li', {name: element})).toBeVisible({ timeout: 90000 })
        }); viewReportsOptions = null;
        //FULLSCALE EXPERIENCE
        await fullscaleExperienceOptions.forEach(element => {
            expect(page.getByRole('li', {name: element})).toBeVisible({ timeout: 90000 })
        }); fullscaleExperienceOptions = null;
        //SETTINGS
        await settingsOptions.forEach(element => {
            expect(page.getByRole('li', {name: element})).toBeVisible({ timeout: 90000 })
        }); settingsOptions = null;
    });
});
