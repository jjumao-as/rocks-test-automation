const myContactsLocators = require('../locators/myContactsLoc');
const ActionDriver = require('../../utils/ActionDriver');

exports.MyContactsPage = class MyContactsPage {
    constructor(page){
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async checkElementsVisibility() {
        await this.actionDriver.checkElementVisibility(myContactsLocators.nameHeader);
        await this.actionDriver.checkElementVisibility(myContactsLocators.emailHeader);
        await this.actionDriver.checkElementVisibility(myContactsLocators.contactNumberHeader);
        await this.actionDriver.checkElementVisibility(myContactsLocators.enableLoginHeader);
        await this.actionDriver.checkElementVisibility(myContactsLocators.accessLevelHeader);
        await this.actionDriver.checkElementVisibility(myContactsLocators.actionHeader);
        await this.actionDriver.checkElementVisibility(myContactsLocators.addContact);
    }

    async clickAddContact(){
        await this.actionDriver.clickButton(myContactsLocators.addContact);
        await this.actionDriver.checkElementVisibility(myContactsLocators.addContactHeader);
    }

    async fillUpContactForm(contactDetails){
        await this.actionDriver.setText(myContactsLocators.nameField, contactDetails.firstName + " " + contactDetails.lastName);
        await this.actionDriver.setText(myContactsLocators.emailField, contactDetails.email);
        await this.actionDriver.setText(myContactsLocators.contactField, contactDetails.phoneNumber);
    }

    async clickCancel(){
        await this.actionDriver.clickButton(myContactsLocators.cancelContactButton);
    }

    async clickSave(){
        await this.actionDriver.clickButton(myContactsLocators.saveContactButton);
        await this.actionDriver.checkElementVisibility(myContactsLocators.contactSaveMsg);
    }

    async verifyContactsNotAdded(contactDetails){
        const result = await this.paginationCheck(contactDetails.firstName + " " + contactDetails.lastName, myContactsLocators.nameList);
        await this.actionDriver.expectFalse(result);
    }
    async verifyContactsAdded(contactDetails){
        const result = await this.paginationCheck(contactDetails.firstName + " " + contactDetails.lastName, myContactsLocators.nameList);
        await this.actionDriver.expectTrue(result);
    }

    async paginationCheck(text, elements){
        await this.actionDriver.waitElementUntilVisible(myContactsLocators.paginationNextPage);
        const element = await this.page.locator(myContactsLocators.paginationNextPage);
        let blnResult = false;
        let pages = 0;
        let isVisible = await element.isVisible();
        if(isVisible) {
            while(isVisible){
                await element.click();
                blnResult = await this.validateName(text, elements);
                isVisible = await element.isVisible();
            }
        } else {
            blnResult = await this.validateName(text, elements);
        } 
        return blnResult;
      }

      async validateName(text, elements){
        let blnResult = false;
        await this.actionDriver.waitElementUntilVisible(elements);
        const rows = this.page.locator(elements);
        await rows.first().waitFor();
        for(let j=0; j<await rows.count(); j++){
            const textContent = await rows.nth(j).textContent();
            const correctedContent = textContent.replace(/Name\s*/g, '').trim();
            if(correctedContent === text){
                blnResult = true;
            }
        }
        return blnResult;
      }
}