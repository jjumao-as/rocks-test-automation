import { test } from '@playwright/test';
import { LoginPage, HomePage, QuickTasksPage, EmployeesPage, DashboardPage } from '../../pages/functions/index';
import { roles } from '../../testdata/rolesForParallel.ts';
import { readJsonFile } from '../../utils/jsonReader.js'
const ActionDriver = require('../../utils/ActionDriver.js');
const path = require('path');

let context;
let page;
let newPage;
let loginPage;
let homePage;
let quickTasksPage;
let employeesPage;
let dashboardPage;
let actionDriver;
let testData;
let testDataPath;
let file;

const roleToTest = ['SUPERADMIN', 'ADMIN', 'HR', 'FLOOR']

test.beforeAll(async () =>{
    file = path.basename(__filename);
    console.log('Execution started.. ', file);
})

roleToTest.forEach(role => {

    const {username, password} = roles[role]

    test.describe.parallel('Employee Work Experience Management', () => {

        test.beforeEach(async ({browser}) =>{
            context = await browser.newContext()
            page = await context.newPage()

            testDataPath = 'employee'
            testData = await readJsonFile(testDataPath)
        
            loginPage = new LoginPage(page);
            homePage = new HomePage(page);
            quickTasksPage = new QuickTasksPage(page)
            employeesPage = new EmployeesPage(page)
            dashboardPage = new DashboardPage(page)
            actionDriver = new ActionDriver(page)


            await loginPage.login(username, password)
            await homePage.isInHomePage()

            // Search Employee
            await dashboardPage.search(testData[role].employee);
            await dashboardPage.checkValidSearchResult();
            await dashboardPage.viewSearchResult();
            await dashboardPage.verifyTalent();

            // add Work Experience for job position and start date
            await employeesPage.addNewWorkExperience()

        
        })

        test.afterEach(async () => {

            await employeesPage.deleteWorkExperience()
            await employeesPage.isWorkExperienceDeleted()

            await context.close()
            await page.close()
        });


        test.describe(`Add Work Experience`, async() => {
            test(`${role} adds work experience - OTHER EMPLOYER and NOT CURRENTLY EMPLOYED`, async() => {
                await employeesPage.companyIsOther()
                await employeesPage.isNotCurrentlyEmployed()
                await employeesPage.addOtherProject()
                await employeesPage.saveWorkExperience()

                // check if work-experience info is saved successfully in internal page
                await employeesPage.isWorkExperienceAdded()

                // check if work-experience info is sasved successfully in public profile page
                newPage = await actionDriver.openNewTab(context, async () => {
                    await employeesPage.viewPublicProfile()
                });
                await employeesPage.isInPublicProfile(newPage)
                await employeesPage.isWorkExperienceAddedInPublicProfile(newPage)

                // closes new tab (public profile page)
                await newPage.close()
    
            })
    
            test(`${role} adds work experience - Fullscale as Employer and is CURRENTLY EMPLOYED`, async() => {
                await employeesPage.companyIsFullscale()
                await employeesPage.isCurrentlyEmployed()
                await employeesPage.addFullScaleProject()
                await employeesPage.saveWorkExperience()

                 // check if work-experience info is saved successfully in internal page
                 await employeesPage.isWorkExperienceAdded()

                 // check if work-experience info is sasved successfully in public profile page
                 newPage = await actionDriver.openNewTab(context, async () => {
                     await employeesPage.viewPublicProfile()
                 });
                 await employeesPage.isInPublicProfile(newPage)
                 await employeesPage.isWorkExperienceAddedInPublicProfile(newPage)

                 // closes new tab (public profile page)
                 await newPage.close()
    
            })
    
            test(`${role} adds work experience - Fullscale as Employer and is NOT CURRENTLY EMPLOYED`, async() => {
                await employeesPage.companyIsFullscale()
                await employeesPage.isNotCurrentlyEmployed()
                await employeesPage.addFullScaleProject()
                await employeesPage.saveWorkExperience()

                 // check if work-experience info is saved successfully in internal page
                 await employeesPage.isWorkExperienceAdded()

                 // check if work-experience info is sasved successfully in public profile page
                 newPage = await actionDriver.openNewTab(context, async () => {
                     await employeesPage.viewPublicProfile()
                 });
                 await employeesPage.isInPublicProfile(newPage)
                 await employeesPage.isWorkExperienceAddedInPublicProfile(newPage)

                 // closes new tab (public profile page)
                 await newPage.close()
    
            })
    
    
        })

        test.describe(`Update Work Experience`, async() => {
            test(`${role} edits work experience -  startDate and Fullscale Project`, async() => {
                await employeesPage.companyIsFullscale()
                await employeesPage.isCurrentlyEmployed()
                await employeesPage.addFullScaleProject()
                await employeesPage.saveWorkExperience()
                await employeesPage.isWorkExperienceAdded()

                newPage = await actionDriver.openNewTab(context, async () => {
                     await employeesPage.viewPublicProfile()
                 });

                 await employeesPage.isInPublicProfile(newPage)
                 await employeesPage.isWorkExperienceAddedInPublicProfile(newPage)
                 await newPage.close()

                 await employeesPage.updateWorkExperience()

                 // update Fullscale project info
                 await employeesPage.updateFullscaleProject()

                 await employeesPage.saveWorkExperience()
                 await employeesPage.isWorkExperienceAdded()

                 newPage = await actionDriver.openNewTab(context, async () => {
                    await employeesPage.viewPublicProfile()
                });

                await employeesPage.isInPublicProfile(newPage)
                await employeesPage.isWorkExperienceAddedInPublicProfile(newPage)
                await newPage.close()

              
            })

            test(`${role} edits work experience - startDate and non-Fullscale Project`, async() => {
                await employeesPage.companyIsOther()
                await employeesPage.isCurrentlyEmployed()
                await employeesPage.addOtherProject()
                await employeesPage.saveWorkExperience()
                await employeesPage.isWorkExperienceAdded()

                newPage = await actionDriver.openNewTab(context, async () => {
                     await employeesPage.viewPublicProfile()
                 });

                 await employeesPage.isInPublicProfile(newPage)
                 await employeesPage.isWorkExperienceAddedInPublicProfile(newPage)
                 await newPage.close()

                 await employeesPage.updateWorkExperience()

                 // update Other employer project info
                 await employeesPage.updateOtherProject()

                 await employeesPage.saveWorkExperience()
                 await employeesPage.isWorkExperienceAdded()

                 newPage = await actionDriver.openNewTab(context, async () => {
                    await employeesPage.viewPublicProfile()
                });

                await employeesPage.isInPublicProfile(newPage)
                await employeesPage.isWorkExperienceAddedInPublicProfile(newPage)
                await newPage.close()
            })
        })
    
    })
      
})

test.afterAll(async() => {
    console.log();
    console.log('Execution ended.. ', file);
})

