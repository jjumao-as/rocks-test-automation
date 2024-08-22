import { expect } from '@playwright/test';
const { sleep } = require('../../utils/utility')

exports.FeedbackListPage = class FeedbackListPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    
    this.feedbackListHeading = page.getByRole('heading', { name: 'Feedback Responses' })
    this.newlyAddedFeedbackRow = page.locator('div > table > tbody').nth(0) 
    this.feedbackImage = this.page.locator('.feedback-content > img')
    this.viewFeedbackDetailsBtn = page.locator('div > table > tbody > tr > td > a.action-button').nth(0)

  
    this.feedbackResponseModalHeading = page.getByRole('heading', { name: 'Feedback Response Details:' })
    this.closeButton = page.getByRole('button', { name: 'Press Esc to close' })
   

  }
  
//  employee/feedback-list

  async isInFeedbackListing(){
    await expect(this.feedbackListHeading).toBeVisible()
  }


  
  async viewFeedbackAdded(){

    await expect(this.newlyAddedFeedbackRow).toBeVisible()
    await this.viewFeedbackDetailsBtn.click()

    await expect(this.feedbackResponseModalHeading).toBeVisible()

    await this.closeButton.click()
    
  }

}