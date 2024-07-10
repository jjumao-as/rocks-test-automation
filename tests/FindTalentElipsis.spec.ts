import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';
const { HomePage, LoginPage } = require('./pages/index.js');

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

    await lp.login("jlasala", "Fu115c@leRocks!");  // change credentials here
   // await page.waitForTimeout(6000);

});


test.afterEach(async ({ page }) => {
    await page.close();
  })

// VERIFY GO TO PROFILE TEST CASE
test('Verify - Go to Profile', async ({ page }) => {
  //await page.goto('https://preprod.fullscale.rocks/login');
  //await page.getByPlaceholder('Password').click();
 // await page.getByPlaceholder('Password').fill('Fu115c@leRocks!');
  //await page.getByPlaceholder('Email/User Name').click();
 // await page.getByPlaceholder('Email/User Name').fill('jlasala');
  //await page.getByRole('button', { name: 'SIGN IN' }).click();
  await page.getByRole('button', { name: ' Find Talent' }).click();
  await page.locator('.dynamic-icon.fa.fa-ellipsis-h').first().click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: ' Go to Profile' }).click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('heading', { name: 'Employee Profile' })).toBeVisible();
  await expect(page1.getByRole('tab', { name: 'Profile' })).toBeVisible();
  await expect(page1.getByText('About Me Edit')).toBeVisible();
  await page1.getByText('Skills and Proficiencies Edit').click();
  await expect(page1.getByText('Work Experience')).toBeVisible();
  await expect(page1.getByText('Education Edit')).toBeVisible();
  await expect(page1.getByText('Files and Assets')).toBeVisible();
  await expect(page1.getByText('Video Profile')).toBeVisible();
  await expect(page1.getByText('Video Banner')).toBeVisible();
  await expect(page1.getByText('Resume')).toBeVisible();
  await expect(page1.getByRole('link', { name: 'View', exact: true })).toBeVisible();
  await page.waitForTimeout(6000);
 
});


//COPY BOOK A CALL TEST CASE
test('Book a Call - by search Manual testing talent', async ({ page }) => {
  await page.getByRole('button', { name: ' Find Talent' }).click();
  await page.getByPlaceholder('Enter a skill, language, or').click();
  await page.getByPlaceholder('Enter a skill, language, or').fill('manual testing');
  await page.keyboard.press('Enter');
  await page.locator('#dropdownMenuButton-action-fs00516ceolum').click();
  await page.locator('.fs-box-shadow-light > a:nth-child(3)').first().click();
  await page.waitForSelector('button.btn.ml-2.fs-button-orange.rounded.btn-success.disabled');
  await page.locator('.time-slot-button').first().click();
  await expect(page.getByText('ATTENDEE / INTERVIEWER:')).toBeVisible();
  await page.getByText('Email Address').click();
  await expect(page.getByRole('heading', { name: 'Book a Call' })).toBeVisible();
  const SelectedTime = await page.$eval('.time-slot-button.active', (element) => {return element.textContent;});
  const curDate = new Date();
  const yr = curDate.getFullYear();  
  

const dateElement = await page.$('.flatpickr-day.selected');
if(dateElement){
const ActiveButton = await dateElement.getAttribute('aria-label');

if (ActiveButton){
const dayName = new Date(ActiveButton).toLocaleDateString(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
 }).split(',');
if(SelectedTime){
  const SelectedTimeTrim= SelectedTime.trim();
  console.log('You are booking a schedule for '+dayName+', '+yr+', '+SelectedTimeTrim+' Asia/Taipei');
 await expect(page.getByText('You are booking a schedule')).toBeVisible();
 await expect(page.getByText(dayName+', '+yr+', '+SelectedTimeTrim+' Asia/Taipei')).toBeVisible();
}}
}
  await page.waitForSelector('button.btn.ml-2.fs-button-orange.rounded.btn-success');
  await page.getByRole('button', { name: 'Book Schedule' }).click();
});


test('Book a Call - by default employee', async ({ page }) => {
  const curDate = new Date();
  const yr = curDate.getFullYear(); 
  //await page.getByRole('button', { name: 'SIGN IN' }).click();
  await page.getByRole('button', { name: ' Find Talent' }).click();
  await page.locator('.dynamic-icon.fa.fa-ellipsis-h').first().click();
  await page.locator('.fs-box-shadow-light > a:nth-child(3)').first().click();

  await page.locator('.time-slot-button').first().click();
  await expect(page.getByText('ATTENDEE / INTERVIEWER:')).toBeVisible();
  await page.getByText('Email Address').click();
  await expect(page.getByRole('heading', { name: 'Book a Call' })).toBeVisible();
  const SelectedTime = await page.$eval('.time-slot-button.active', (element) => {return element.textContent;});
 

const dateElement = await page.$('.flatpickr-day.selected');
if(dateElement){
const ActiveButton = await dateElement.getAttribute('aria-label');

if (ActiveButton){
const dayName = new Date(ActiveButton).toLocaleDateString(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
 }).split(',');
if(SelectedTime){
  const SelectedTimeTrim= SelectedTime.trim();
  console.log('You are booking a schedule for '+dayName+', '+yr+', '+SelectedTimeTrim+' Asia/Taipei');
 await expect(page.getByText('You are booking a schedule')).toBeVisible();
 await expect(page.getByText(dayName+', '+yr+', '+SelectedTimeTrim+' Asia/Taipei')).toBeVisible();
}}
}
  await page.waitForSelector('button.btn.ml-2.fs-button-orange.rounded.btn-success');
});




//COPY PROFILE TEST CASE
  test('Verify - Copy Profile', async ({page}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  
  const context3 = await browser.newContext({
  permissions: ['clipboard-read', 'clipboard-write']

  });
  const page4 = await context3.newPage();
  
  await page4.goto('https://preprod.fullscale.rocks/login');
  context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page4.getByPlaceholder('Password').click();
  await page4.getByPlaceholder('Password').fill('Fu115c@leRocks!');
  await page4.getByPlaceholder('Email/User Name').click();
  await page4.getByPlaceholder('Email/User Name').fill('jlasala');
  await page4.getByPlaceholder('Email/User Name').press('Enter');
  await page4.getByRole('button', { name: ' Find Talent' }).click();
 
  await page4.getByRole('link', { name: 'VIEW PROFILE' }).first().click();
 
  const profileName = await page4.textContent('.profile-name');
  if(profileName){
    const profileName2 = profileName.trim();
  
  await page4.getByRole('link', { name: '' }).click();
  await page4.locator('.dynamic-icon.fa.fa-ellipsis-h').first().click();
  await page4.getByText('Copy Link to Profile').first().click();
  
    const copiedContent = await page4.evaluate(() => {
    return navigator.clipboard.readText();
  }); 

   const imgLocator = page4.locator('img[data-v-23c0284f=""]');

   await imgLocator.click();
  await page4.getByRole('link', { name: 'Logout' }).click();
  await page4.goto(copiedContent);
  const profileName_copied =  await page4.textContent('.profile-name')

  if(profileName_copied){
    const profileName_copied2 = profileName_copied.trim();
  
  if (profileName2==profileName_copied2){
    console.log('This Profile Name is correct for View public profile : '+ profileName2 )
    const Skills  = await page4.$('.profile-skills');
    const clientSpotlight = await page4.$('.profile-client-spotlight');
    const AboutMe = await page4.$('.profile-about'); 
    const Competencies = await page4.$('.profile-competencies');
    const Workexperience = await page4.$('.profile-work-experience');
    const Education = await page4.$('.profile-education');   
          if (clientSpotlight) {
            const textContentCS = await clientSpotlight.textContent();
          
            if (textContentCS) {
              console.log('- Employee has clientspotlight');}
             
          } 
          else {
            console.log('- Employee has No Client Spotlight found');
        
        }
          
          if(AboutMe){
            const textContentAM = await AboutMe.textContent();
      
            if (textContentAM) {
              console.log('- Employee has About Me');
            }}
           else {
            console.log('- Employee has No About Me found');
          }

     if(Skills){
      const textContentSkills = await Skills.textContent();
      if(textContentSkills){
        console.log ('- Employee has skills')
      }}
      else{
        console.log('- Employee has Skills')
      }
     

     if(Competencies){
      const textContentcpt = await Competencies.textContent();
      if(textContentcpt){
        console.log ('- Employee has Competencies')
      }}
      else{
        console.log('- Employee has no Competencies')
      }
     
     if(Workexperience){
      const textContentwe = await Workexperience.textContent();
      if(textContentwe){
        console.log ('- Employee has Work experience')
      }}
      else{
        console.log('- Employee has no has Work experience')
      }
     
  if (Education){
    const textContented = await Education.textContent();
    if(textContented) {
        console.log(' - employee has Education')
            }}else{
            console.log(' - employee has NO Education')  
                    }   
   
    
  }else{
    console.error('Profile is not equal')
  }
 
await page4.waitForTimeout(10000);}}
  }

);


