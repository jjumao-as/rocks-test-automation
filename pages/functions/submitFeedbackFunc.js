const ActionDriver = require('../../utils/ActionDriver')
const submitFeedbackLocator = require('../locators/submitFeedbackLoc');

exports.SubmitFeedbackPage = class SubmitFeedbackPage {

/**
   * @param {import('@playwright/test').Page} page
   * 
   * 
   */

    constructor(page){
        this.page = page
        this.actionDriver = new ActionDriver(page);

        this.imagePickerBtn = this.page.getByTitle('Insert Image').locator('a')
        this.clickToUploadBtn = this.page.getByText('Click here to upload...')

       
    }

    async isInFeedbackFormPage() {
        
        await this.actionDriver.checkElementVisibility(submitFeedbackLocator.categoryDropdown)

    }

    async selectCategory() {
        await this.actionDriver.selectOption(submitFeedbackLocator.categoryDropdown )
        
    }

    async enterTextFeedback(textFeedback){
        await this.actionDriver.setText(submitFeedbackLocator.feedback, textFeedback)
    }

    async enterTextWithImageFeedback(textFeedback){

        await this.actionDriver.setText(submitFeedbackLocator.feedback, textFeedback)

        const fileChooserPromise = this.page.waitForEvent('filechooser')

        await this.imagePickerBtn.click()
        await this.clickToUploadBtn.click()

        // await this.actionDriver.clickButton(submitFeedbackLocator.imagePickerBtn)
        // await this.actionDriver.clickButton(submitFeedbackLocator.clickToUploadBtn)

        const fileChooser = await fileChooserPromise;
        const path = require('path')

        const imgPath = path.resolve('./testdata/playwright.png')

        await fileChooser.setFiles(imgPath);

        await this.actionDriver.checkElementVisibility(submitFeedbackLocator.previewImage)


    }

    async submitFeedback(){
        await this.actionDriver.clickButton(submitFeedbackLocator.sendBtn)
    }

    async isFeedbackSubmitted(){
        await this.actionDriver.checkElementVisibility(submitFeedbackLocator.notification)
    }



  
}