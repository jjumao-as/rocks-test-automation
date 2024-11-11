import { test } from '@playwright/test';
const { LoginPage, HomePage, EmployeesPage, FindTalentPage } = require('../../pages/functions/index.js');
const { readJsonFile } = require('../../utils/jsonReader');
const { savedContact } = require('../../utils/randomData.js');


let browser;
let context;
let page;
let loginPage;
let findTalentPage;
let employeePage;
let homePage;
let testDataPath;
let testData;


test.describe('Test Script for adding talent to the team', async () => {
    test.beforeAll(async ({ browser: b }) => {
        browser = b;
        testDataPath = 'findTalentData';
    });

    test.beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = await new LoginPage(page);
        homePage = await new HomePage(page);
        employeePage = await new EmployeesPage(page);
        findTalentPage = await new FindTalentPage(page);
        testData = await readJsonFile(testDataPath);
    });

    test.afterEach(async () => {
        await context.close();
    });

    test('Prepare Data', async() => {
        await savedContact(testDataPath);
    })

    test('Add Employee', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
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
        await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
        await homePage.navigateFindTalent();
        await findTalentPage.searchTalent(testData.toSearch.skill1)
        await findTalentPage.validateTalentDisplayedAndSelect(testData.employeeName);
        await findTalentPage.validateSkillDisplayed(testData.toSearch.skill1);
    });

    test('Find Talent - Show In Profile & Not Searchable', async () => {
        await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
        await homePage.navigateFindTalent();
        await findTalentPage.searchTalent(testData.toSearch.skill2)
        await findTalentPage.validateTalentNotDisplayed(testData.employeeName);
    });

    test('Find Talent - Hide In Profile & Searchable', async () => {
        await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
        await homePage.navigateFindTalent();
        await findTalentPage.searchTalent(testData.toSearch.skill3)
        await findTalentPage.validateTalentDisplayedAndSelect(testData.employeeName)
        await findTalentPage.validateSkillNotDisplayed(testData.toSearch.skill3);
    });

    test('Find Talent - Hide In Profile & Not Searchable', async () => {
        await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
        await homePage.navigateFindTalent();
        await findTalentPage.searchTalent(testData.toSearch.skill4)
        await findTalentPage.validateTalentNotDisplayed(testData.employeeName);
    });

    test('Find Talent - Smart search works in about me section ', async () => {
        await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
        await homePage.navigateFindTalent();
        await findTalentPage.searchTalent(testData.toSearch.about)
        await findTalentPage.validateTalentDisplayedAndSelect(testData.employeeName);
        await findTalentPage.validateAboutMeSection(testData.aboutMe);
    });

    test('Find Talent - Smart search works in work Experience Section ', async () => {
        await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
        await homePage.navigateFindTalent();
        await findTalentPage.searchTalent(testData.toSearch.exp)
        await findTalentPage.validateTalentDisplayedAndSelect(testData.employeeName);
        await findTalentPage.validateWorkExpSection(testData.workExperience.description);
    });

    test('Delete Employee', async () => {
        await loginPage.login(process.env.SUPERADMIN, process.env.PASSWORD);
        await employeePage.searchEmployee(testData.employeeName);
        await employeePage.deleteEmployee(testData.employeeName);
    });
});
