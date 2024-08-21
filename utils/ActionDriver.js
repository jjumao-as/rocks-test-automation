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

    async expectEquals(text, element) {
        const received = await this.getText(element);
        await expect(received).toEqual(text);
    }

    async expectToHaveCount(element, number) {
        await expect(this.page.locator(element)).toHaveCount(number);
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
}
module.exports = ActionDriver;