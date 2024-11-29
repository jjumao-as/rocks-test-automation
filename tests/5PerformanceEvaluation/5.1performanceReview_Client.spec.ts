import { test } from '@playwright/test';
const { LoginPage, DashboardPage, ManageClientsPage, EmployeesPage, HomePage, ClientsPage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');
const { savedContact } = require('../../utils/randomData.js');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let homePage;
let clientPage;
let dashboardPage;
let manageClientPage;
let employeePage;
let testDataPath;
let testData;
let file;

test.describe('Test Script for adding talent to the team', async () => {
    test.beforeAll(async ({ browser: b }) => {
        browser = b;  
        testDataPath = 'performanceReview';  
        file = path.basename(__filename);
        console.log('Execution started.. ', file);
    });
    
    test.beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
        testData = await readJsonFile(testDataPath);
        loginPage = await new LoginPage(page);
        dashboardPage = await new DashboardPage(page);
        manageClientPage = await new ManageClientsPage(page);
        employeePage = await new EmployeesPage(page);
        homePage = await new HomePage(page);
        clientPage = await new ClientsPage(page);
    });

    test('Prepare data..', async() => {
        await savedContact(testDataPath);
    })

    test('Evaluate using client portal - Cancel', async() => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await employeePage.addEmployee(testData.employeeName);
        await employeePage.validateAddedEmployee(testData.employeeName);
        await employeePage.updatePosition(testData.employeeDetails.role);
        await employeePage.validatePostion(testData.employeeDetails);
        await employeePage.updateClient(testData.employeeDetails.client);
        await employeePage.validateClient(testData.employeeDetails.displayClientName);

        await homePage.logout();

        await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
        await manageClientPage.navigateToPerformanceReview();
        await manageClientPage.selectEmployee(testData.employeeName);
        await manageClientPage.validatePerfEvalModal(testData.employeeName);
        await manageClientPage.evaluate(testData.evaluation);
        await manageClientPage.cancelPerfEval();
        await manageClientPage.validateCancel();
    });

    test('Evaluate using client portal - Submit without specifying required fields', async() => {
        await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
        await manageClientPage.navigateToPerformanceReview();
        await manageClientPage.selectEmployee(testData.employeeName);
        await manageClientPage.validatePerfEvalModal(testData.employeeName);
        await manageClientPage.validateSubmitDisabled();
    });

    test('Evaluate using client portal - Submit', async() => {
        await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
        await manageClientPage.navigateToPerformanceReview();
        await manageClientPage.selectEmployee(testData.employeeName);
        await manageClientPage.validatePerfEvalModal(testData.employeeName);
        await manageClientPage.evaluate(testData.evaluation);
        await manageClientPage.overAllComments(testData.evaluation.comments);
        await manageClientPage.validateSubmitEnabled();
        await manageClientPage.submitPerfEval();
        await manageClientPage.validateEvaluation(testData.employeeName);

        await clientPage.logout();

        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await employeePage.navigateToEmployeeList();
        await employeePage.searchEmployee(testData.employeeName);
        await employeePage.deleteEmployee(testData.employeeName);
    });

    test('Delete Employee', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await employeePage.searchEmployee(testData.employeeName);
        await employeePage.deleteEmployee(testData.employeeName);
    });

    test.afterEach(async () => {
        await context.close();
    });

    test.afterAll(async() => {
        console.log();
        console.log('Execution ended.. ', file);
    })
    
});