import { test } from '@playwright/test';
const { LoginPage, ClientPortalPage } = require('../../pages/functions/index.js');

let browser;
let context;
let page;
let loginPage;
let clientPortalPage;

test.beforeAll(async ({ browser : b}) =>{
    browser = b;
})
test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = await new LoginPage(page);
    clientPortalPage = await new ClientPortalPage(page);
});

test.afterEach(async () => {
    await context.close();
});

test('Client Portal - Manage Team', async() => {    
    await loginPage.login(process.env.CLIENT, process.env.PASSWORD);
    await clientPortalPage.checkManageTeamMenuVisibility();
    await clientPortalPage.navigateManageTeam();
    await clientPortalPage.checkMyTeamTableVisibility();
    const name = await clientPortalPage.dropTalentName();
    await clientPortalPage.dropFromMyTeam();   
    await clientPortalPage.dropTalentNameConfirmed(name);
    
});

test('Admin: Client Profile - Team Requests', async() => {    
    await loginPage.login(process.env.ADMIN, process.env.PASSWORD);
    await clientPortalPage.dropTalentNameConfirmedAdmin();
    await clientPortalPage.dropTalentStatusCheck();
});