import { test } from '@playwright/test';
const { LoginPage, HomePage, EmployeesPage, FindTalentIntPage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');
const path = require('path');

let browser;
let context;
let page;
let loginPage;
let findTalentIntPage;
let employeePage;
let homePage;
let testDataPath;
let testData;
let file;

test.describe('Test Script for adding talent to the team', async () => {
    test.beforeAll(async ({ browser: b }) => {
        browser = b;
        testDataPath = 'findTalentData';
        file = path.basename(__filename);
        console.log('Execution started.. ', file);
    });

    test.beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = await new LoginPage(page);
        homePage = await new HomePage(page);
        employeePage = await new EmployeesPage(page);
        findTalentIntPage = await new FindTalentIntPage(page);
        testData = await readJsonFile(testDataPath);
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
    });

    test.afterEach(async () => {
        await context.close();
    });

    test.afterAll(async () => {
        console.log();
        console.log('Execution ended.. ', file);
    })

    test('Add Employee', async () => {
        await employeePage.addEmployee(testData.employeeName);
        await employeePage.validateAddedEmployee(testData.employeeName);
        await employeePage.updatePosition(testData.employeeDetails.role);
        await employeePage.validatePostion(testData.employeeDetails);
        await employeePage.addSkills(testData.skills);
        await employeePage.validateTalentSkill(testData.skills);
        await employeePage.updateClient(testData.employeeDetails.client);
        await employeePage.validateClient(testData.employeeDetails.client);
        //add about me
        await employeePage.editAboutMe(testData.aboutMe);
        //add work experience
        await employeePage.addWorkExperience(testData.workExperience);
        await employeePage.validateWorkExperience(testData.workExperience);
    });

    test('Find Talent - Show In Profile & Searchable ', async () => {
        await findTalentIntPage.navigateFindTalent();
        await findTalentIntPage.searchTalent(testData.toSearch.skill1)
        await findTalentIntPage.validateTalentDisplayedAndSelect(testData.employeeName);
        await findTalentIntPage.validateSkillDisplayed(testData.toSearch.skill1);
    });

    test('Find Talent - Show In Profile & Not Searchable', async () => {
        await findTalentIntPage.navigateFindTalent();
        await findTalentIntPage.searchTalent(testData.toSearch.skill2)
        await findTalentIntPage.validateTalentNotDisplayed(testData.employeeName);
    });

    test('Find Talent - Hide In Profile & Searchable', async () => {
        await findTalentIntPage.navigateFindTalent();
        await findTalentIntPage.searchTalent(testData.toSearch.skill3)
        await findTalentIntPage.validateTalentDisplayedAndSelect(testData.employeeName)
        await findTalentIntPage.validateSkillNotDisplayed(testData.toSearch.skill3);
    });

    test('Find Talent - Hide In Profile & Not Searchable', async () => {
        await findTalentIntPage.navigateFindTalent();
        await findTalentIntPage.searchTalent(testData.toSearch.skill4)
        await findTalentIntPage.validateTalentNotDisplayed(testData.employeeName);
    });

    test('Find Talent - Smart search works in about me section ', async () => {
        await findTalentIntPage.navigateFindTalent();
        await findTalentIntPage.searchTalent(testData.toSearch.about)
        await findTalentIntPage.validateTalentDisplayedAndSelect(testData.employeeName);
        await findTalentIntPage.validateAboutMeSection(testData.aboutMe);
    });

    test('Find Talent - Smart search works in work Experience Section ', async () => {
        await findTalentIntPage.navigateFindTalent();
        await findTalentIntPage.searchTalent(testData.toSearch.exp)
        await findTalentIntPage.validateTalentDisplayedAndSelect(testData.employeeName);
        await findTalentIntPage.validateWorkExpSection(testData.workExperience.description);
    });

    test('Delete Employee', async () => {
        await employeePage.searchEmployee(testData.employeeName);
        await employeePage.deleteEmployee(testData.employeeName);
    });

});
