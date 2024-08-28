import { expect } from '@playwright/test';

class ActionDriver {
    constructor(page) {
        this.page = page;
    }

    async setText(element, text) {
        await this.page.fill(element, text);
    }

    async clickButton(element) {
        await this.page.click(element);
    }

    async checkVisibility(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async expectFalse(result) {
        await expect(result).toBeFalsy();
    }

    async expectTrue(result) {
        await expect(result).toBeTruthy();
    }

    async checkElementVisibility(element) {
        await expect(this.page.locator(element)).toBeVisible();
    }

    async checkAllElementsVisibility(element){
        const elements = await this.page.locator(element).all();
        const visibilityResults = await Promise.all(elements.map(async (el) => {
            return await el.isVisible();
        }));
        
        visibilityResults.forEach(async(isVisible, index) => {
            await expect(isVisible).toBeTruthy();
        })
    }

    async expectEquals(text, element) {
        const received = await this.getText(element);
        await expect(received).toEqual(text);
    }

    async expectToHaveCount(element, number) {
        await expect(this.page.locator(element)).toHaveCount(number);
    }

    async checkInclude(actual, expected){
        await expect(expected).toContain(actual);
    }

    async selectFromList(text, element) {
        const elements = await this.page.locator(element);
        for (let i = 0; i < await elements.count(); i++) {
            const el = elements.nth(i);
            const textContent = await el.textContent();
            const trimmedContent = textContent.trim();
            if (trimmedContent.toLowerCase() === text.toLowerCase()) {
                await el.click();
                break;
            }
        }
    }

    async compareFromList(text, element){
        const elements = await this.page.locator(element).all();
        const extractedTexts = await Promise.all(elements.map(async element => {
            return await element.textContent()
        }));
        
        const pageTextContents = extractedTexts.map(name => name.trim().toLowerCase());

        const isIncluded = pageTextContents.includes(text);

        await expect(isIncluded).toBeFalsy();
    }

    async splitTextComma(text){
        return text.split(',');
    }

    async findText(text, element) {
        const elements = await this.page.locator(element);
        for (let i = 0; i < await elements.count(); i++) {
            const el = elements.nth(i);
            const textContent = await el.textContent();
            if (textContent.toLowerCase() === text.toLowerCase()) {
                await expect(el).toBe(text);
                break;
            }
        }
    }
    
    async typeText(text) {
        await this.page.keyboard.type(text);
    }

    async keyboardPress(key) {
        await this.page.keyboard.press(key);
    }

    async getText(element) {
        const textContent = await this.page.locator(element).textContent();
        return textContent.trim();
    }

    async getTextofLastElement(element){
        const elements = await this.page.locator(element).all();
        const lastElement = elements[elements.length - 1];
        const textContent = await lastElement.textContent();
        return textContent.trim();
    }

    async validateEachTextFromList(texts, element) {
        const pageTexts = await this.page.locator(element).allTextContents();
        const pageTextContent = pageTexts.join(' ');

        for(const text of texts){
            await expect(pageTextContent).toContain(text);
        }
    }

    async compareAndSelectList(testData, element, elementButton){
        const elements = await this.page.locator(element).all();
        const viewProfileBtn =  this.page.locator(elementButton);
        const extractedTexts = await Promise.all(elements.map(async element => {
            return await element.textContent()
        }));
        
        const pageTextContents = extractedTexts.map(name => name.trim().toLowerCase());

        for(const [index, text] of testData.entries()) {
            const textLowerCase = text.toLowerCase();
            const isTextIncluded = pageTextContents.some(pageText => pageText.includes(textLowerCase));
            const textIndex = pageTextContents.indexOf(textLowerCase);
            if(isTextIncluded){
                await viewProfileBtn.nth(textIndex).click();
                break;
            }
        }
    }

    async checkElementBottom(element){
        const elementHandle = await this.page.$(element);
        if(elementHandle){
            const boundingBox = await elementHandle.boundingBox();
            return boundingBox !== null;
        }
        return false;
    }

    async scrollToBottom(element) {
        let isVisible = false;
        while(!isVisible){
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await this.page.waitForTimeout(5000);

            isVisible = await this.checkElementBottom(element);
        }
    }
}
module.exports = ActionDriver;