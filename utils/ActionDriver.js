import {expect} from '@playwright/test';

class ActionDriver {
    constructor(page) {
        this.page = page;
    }

    async setText(element, text){
        await this.page.fill(element, text);
    }

    async clickButton(element){
        await this.page.click(element);
    }

    async checkVisibility(text){
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async checkElementVisibility(element){
        await expect(this.page.locator(element)).toBeVisible();
    }

    async selectFromList(text, element){
        const elements = await this.page.locator(element);
        for(let i=0; i < await elements.count(); i++){
            const el = elements.nth(i);
            const textContent = await el.textContent();
            if(textContent.toLowerCase() === text.toLowerCase()){
                await el.click();
                console.log(textContent);
                break;
            }
        }
    }
}
module.exports = ActionDriver;