import { expect } from '@playwright/test';
import { title } from 'process';
const { sleep } = require('../../utils/utility')

exports.SubmitFeedbackPage = class SubmitFeedbackPage {
  /**
   * @param {import('@playwright/test').Page} page
   * 
   * 
   */

  constructor (page) {
    this.page = page

    this.category = page.getByLabel('Category')
    this.feedback = page.locator('.editr--content')
    this.sendBtn = page.getByRole('button', {name : 'Send'})

    this.imagePickerBtn =  page.getByTitle('Insert Image').locator('a')
    this.clickToUploadBtn = page.getByText('Click here to upload...')
    this.previewImg = page.locator('.editr--content > img')
    // page.getByLabel('Category').setInputFiles('playwright.png');

    this.notification = page.getByText('Thank you! Your feedback has')
    this.progressBar = page.locator('.snotifyToast__progressBar')

  }
  

 async isInFeedbackFormPage(){
      await expect(this.category).toBeVisible()

 }


  async selectCategory(){
    const randomIndex = Math.floor(Math.random() * 20)

    await this.category.selectOption({index : randomIndex})

  }

  async enterTextFeedback(){

    await this.feedback.fill("Sample Rocks feedback with TEXT only")
  

  }

  async enterTextAndImageFeedback(){

    await this.feedback.fill("Sample Rocks with feedback with TEXT and IMAGE attachment")
    
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.imagePickerBtn.click()
    await this.clickToUploadBtn.click()

    const fileChooser = await fileChooserPromise;
    const path = require('path')

    const imgPath = path.resolve('./testdata/playwright.png')

    await fileChooser.setFiles(imgPath);

    await expect(this.previewImg).toBeVisible()

  }

  async submitFeedback(){
    await this.sendBtn.click()

  }

  async isFeedbackSubmitted(){
    await expect(this.notification).toBeVisible()


  }










}