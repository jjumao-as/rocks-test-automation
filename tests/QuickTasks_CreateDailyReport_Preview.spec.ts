import { test, expect } from '@playwright/test';
const { LoginPage } = require('./pages/index.js');

    // 3 servers URLs. Uncomment the server to used
 //var env ="https://dev.fullscale.rocks/";
  var env ="https://preprod.fullscale.rocks/";
// var env ="https://fullscale.rocks/";


test.beforeEach('Login to portal', async ({ page }) => {
    const lp = new LoginPage(page);

    // 3 login URLs. Uncomment the login url to used
  //await lp.gotoDev();
     await lp.gotoPreprod();
    //await lp.gotoProd();

    await lp.login("lrodriguez", "Fu115c@leRocks!");  // change credentials here
   // await page.waitForTimeout(6000);

});

test.afterEach(async ({ page }) => {
    await page.close();
  })

test('test', async ({ page }) => {

// Creating variables for current system dates
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const curDate = new Date();   // for complete current date
const yr = curDate.getFullYear();  // for current year
const mt = String(curDate.getMonth() + 1).padStart(2, '0'); // for current month by number
const mt1 = monthNames[curDate.getMonth()];   // for current month by name
const dy = String(curDate.getDate() ).padStart(2, '0'); // for current day by number
const FD = (yr+"-"+mt+"-"+dy); // forcurrent date by this format 2024-05-10
//const Dat = FD; 
const FDM = (mt1+" "+dy+", "+yr); // for current date by this format May 10, 2024
const PReview =('Subject: EmployeeDB : Daily Report'+' '+'('+FDM+')'+' '+'- Rodriguez, Louie Carlo Opao');
//onst Report = ('EmployeeDB : Daily Report'+' '+'('+FDM+')'+' '+'- Rodriguez, Louie Carlo Opao '+mt1+' '+dy+',');
const Oreport = { name: 'EmployeeDB : Daily Report'+' '+'('+FDM+')'+' '+'- Rodriguez, Louie Carlo Opao '+mt1+' '+dy+',' }
const Subject = 'EmployeeDB : Daily Report'+' '+'('+FDM+')'+' '+'- Rodriguez, Louie Carlo Opao '
//const lp = new loginPage(page);

// Create Daily Report
  await page.getByRole('link', { name: ' Create Daily Report' }).click();
   await page.getByRole('button', { name: 'Compose new message' }).click();
await page.getByText("What I did today:").click();
  for (let i =0; i < 6; i++){
    await page.keyboard.press('Tab');
    }
  await page.keyboard.type("This is for Today's update"); 
  await page.getByText('What I will be doing the next working day:').click();
  for (let i =0; i < 6; i++){
    await page.keyboard.press('Tab');
  }
    await page.keyboard.type("This is for next day update"); 
    for (let i =0; i < 6; i++){
      await page.keyboard.press('Tab');
    }
    await page.getByText('My Roadblocks/Impediments:').click();
    for (let i =0; i < 6; i++){
      await page.keyboard.press('Tab');
    }
    await page.keyboard.type("Roablocks testing");
   
    await page.getByText('Other Remarks:').click();
    for (let i =0; i < 6; i++){
      await page.keyboard.press('Tab');
    }
    await page.keyboard.type("QA-Other Remarks");
await page.getByRole('button', { name: 'Preview' }).click();  

  //Validation inside Create >Preview
  await expect(page.getByRole('img', { name: 'Full Scale logo', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'icon-check' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What I did today:' })).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('This is for Today\'s update');
  await expect(page.getByRole('heading', { name: 'What I will be doing the next' })).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('This is for next day update');
  await expect(page.getByRole('heading', { name: 'My Roadblocks/Impediments:' })).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('Roablocks testing');
  await expect(page.getByRole('heading', { name: 'Other Remarks:' })).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('QA-Other Remarks');
  await expect(page.getByText('Subject: EmployeeDB : Daily')).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText(PReview);
  await expect(page.locator('#modalDescription')).toContainText('Report Date: '+FD);
  await page.getByRole('button', { name: 'Send Report' }).click(); 
  // Validate Green Star for the Newly created Daily report
  expect(await page.waitForSelector('span#popover-target-' + dy + ' + i.la.la-star')).not.toBeNull();
  await page.getByRole ('row', Oreport ).getByRole('link').nth(1).click();
  await page.getByRole('button', { name: 'Preview' }).click();  
 
  //Validation inside preview after Submit >edit
  await expect(page.getByRole('img', { name: 'Full Scale logo', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'icon-check' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What I did today:' })).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('This is for Today\'s update');
  await expect(page.getByRole('heading', { name: 'What I will be doing the next' })).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('This is for next day update');
  await expect(page.getByRole('heading', { name: 'My Roadblocks/Impediments:' })).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('Roablocks testing');
  await expect(page.getByRole('heading', { name: 'Other Remarks:' })).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('QA-Other Remarks');
  await expect(page.getByText('Subject: EmployeeDB : Daily')).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText(PReview);
  await expect(page.locator('#modalDescription')).toContainText('Report Date: '+FD); 
  await page.getByRole('button', { name: 'Press Esc to close' }).click();
  await page.getByRole('button', { name: 'Yes' }).click(); 
  //Validating the Report View - Clicking report Subject Name
  await page.getByRole('gridcell', { name: Subject }).click();
  await page.getByRole('link', { name: Subject }).click();
  await expect(page.locator('#modalDescription')).toContainText(FDM);
  await expect(page.locator('#modalDescription')).toContainText(Subject);
  await expect(page.locator('#modalDescription')).toContainText('What I did today: This is for Today\'s update');
  await expect(page.locator('#modalDescription')).toContainText('What I will be doing the next working day: This is for next day update');
  await expect(page.locator('#modalDescription')).toContainText('Other Remarks: QA-Other Remarks');
  await expect(page.locator('#modalDescription')).toContainText('My Roadblocks/Impediments: Roablocks testing');
  await page.getByRole('button', { name: 'Press Esc to close' }).click();

  //Navigating to View Reports
  await page.getByRole('link', { name: ' Daily Status Reports' }).click();
  await page.getByRole('row', { name: 'EmployeeDB '+ Subject}).getByRole('link').click();
// Valiting the View reports for the Recently created daily report
  await expect(page.locator('#modalDescription')).toContainText(FDM);
  await expect(page.locator('#modalDescription')).toContainText(Subject);
  await expect(page.locator('#modalDescription')).toContainText('What I did today: This is for Today\'s update');
  await expect(page.locator('#modalDescription')).toContainText('What I will be doing the next working day: This is for next day update');
  await expect(page.locator('#modalDescription')).toContainText('Other Remarks: QA-Other Remarks');
  await expect(page.locator('#modalDescription')).toContainText('My Roadblocks/Impediments: Roablocks testing');
  await page.getByRole('button', { name: 'Press Esc to close' }).click();
  //await page.waitForTimeout(6000);
  });
  
  
 
