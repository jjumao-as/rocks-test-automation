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
        await expect(this.page.getByText(text)).toBeVisible({ timeout: 90000 });
    }

    async expectFalse(result) {
        await expect(result).toBeFalsy();
    }

    async expectTrue(result) {
        await expect(result).toBeTruthy();
    }

    async checkElementVisibility(element) {
        await expect(this.page.locator(element)).toBeVisible({ timeout: 90000 });
    }

    async checkAllElementsVisibility(element) {
        const elements = await this.page.locator(element).all();
        const visibilityResults = await Promise.all(elements.map(async (el) => {
            return await el.isVisible();
        }));

        visibilityResults.forEach(async (isVisible, index) => {
            await expect(isVisible).toBeTruthy();
        })
    }

    async elementVisible(element) {
        const el = await this.page.locator(element);
        const isElementVisibleWithinTimeout = async (locator, timeout) => {
            const start = Date.now();
            const interval = 100; // Check every 100 ms

            while (Date.now() - start < timeout) {
                try {
                    if (await locator.isVisible()) {
                        return true;
                    }
                } catch (error) {
                    // Element is not yet in the DOM or not visible
                }
                await this.page.waitForTimeout(interval);
            }
            return false;
        };
        return await isElementVisibleWithinTimeout(el, 5000);
    }

    async expectEquals(text, element) {
        const received = await this.getText(element);
        await expect(received).toEqual(text);
    }

    async expectToHaveCount(element, number) {
        await expect(this.page.locator(element)).toHaveCount(number);

    }

    async checkInclude(actual, expected) {
        await expect(expected).toContain(actual)
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

    async compareFromList(text, element) {
        const elements = await this.page.locator(element).all();
        const extractedTexts = await Promise.all(elements.map(async element => {
            return await element.textContent()
        }));

        const pageTextContents = extractedTexts.map(name => name.trim().toLowerCase());

        const isIncluded = pageTextContents.includes(text);

        await expect(isIncluded).toBeFalsy();
    }

    async splitTextComma(text) {
        return text.split(',');
    }

    async findText(text, element) {
        const elements = await this.page.locator(element);
        for (let i = 0; i < await elements.count(); i++) {
            const el = elements.nth(i);
            const textContent = await el.textContent();
            const trimmedText = textContent.trim();
            if (trimmedText.toLowerCase() === text.toLowerCase()) {
                await expect(trimmedText).toBe(text);
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

    async getTextofLastElement(element) {
        const elements = await this.page.locator(element).all();
        const lastElement = elements[elements.length - 1];
        const textContent = await lastElement.textContent();
        return textContent.trim();
    }

    async validateEachTextFromList(texts, element) {
        const pageTexts = await this.page.locator(element).allTextContents();
        const pageTextContent = pageTexts.join(' ');

        for (const text of texts) {
            await expect(pageTextContent).toContain(text);
        }
    }

    async compareAndSelectList(testData, element, elementButton) {
        const elements = await this.page.locator(element).all();
        const viewProfileBtn = this.page.locator(elementButton);
        const extractedTexts = await Promise.all(elements.map(async element => {
            return await element.textContent()
        }));

        const pageTextContents = extractedTexts.map(name => name.trim().toLowerCase());

        for (const [index, text] of testData.entries()) {
            const textLowerCase = text.toLowerCase();
            const isTextIncluded = pageTextContents.some(pageText => pageText.includes(textLowerCase));
            const textIndex = pageTextContents.indexOf(textLowerCase);
            if (isTextIncluded) {
                await viewProfileBtn.nth(textIndex).click();
                break;
            }
        }
    }

    async selectDataFromText(testData, element, elementButton) {
        const elements = await this.page.locator(element);
        const toggleButton = await this.page.locator(elementButton);
        for (let i = 0; i < await elements.count(); i++) {
            const el = elements.nth(i);
            const textContent = await el.textContent();
            if (textContent.trim().toLowerCase() === testData.toLowerCase()) {
                await toggleButton.nth(i).click();
            }
        }
    }

    async selectDataFromTextwithNode(testData, element, elementButton) {
        const elements = await this.page.locator(element);
        const toggleButton = await this.page.locator(elementButton);
        for (let i = 0; i < await elements.count(); i++) {
            const el = elements.nth(i);
            const textContent = await el.evaluate(node => {
                // Filter out text from specific child elements
                return Array.from(node.childNodes)
                    .filter(n => n.nodeType === Node.TEXT_NODE) // Only text nodes
                    .map(n => n.textContent.trim()) // Extract and trim text
                    .join(' '); // Combine text
            });
            if (textContent.trim().toLowerCase() === testData.toLowerCase()) {
                await toggleButton.nth(i).click();
            }
        }
    }

    async checkElementBottom(element) {
        const elementHandle = await this.page.$(element);
        if (elementHandle) {
            const boundingBox = await elementHandle.boundingBox();
            return boundingBox !== null;
        }
        return false;
    }

    async scrollToBottom(element) {
        let isVisible = false;
        while (!isVisible) {
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await this.page.waitForTimeout(5000);

            isVisible = await this.checkElementBottom(element);
        }
    }

    async selectOptionRandom(element) {
        const dropdown = await this.page.locator(element)
        const optionCount = await dropdown.locator('option').count()
        const randomIndex = Math.floor(Math.random() * optionCount)

        await dropdown.selectOption({ index: randomIndex })

    }

    async selectOption(text, element) {
        await this.page.selectOption(element, text);
    }

    async checkDisplay(testData, textElements, buttonElements) {
        const rowIndex = await this.page.evaluate(({ testData, textElements }) => {
            const elements = Array.from(document.evaluate(textElements, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null));
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].textContent.includes(testData)) {
                    return i;
                }
            }
            return -1;
        }, { testData, textElements });
        const displayValue = await this.page.evaluate(({ index, buttonElements }) => {
            const elements = Array.from(document.evaluate(buttonElements, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null));
            if (index >= 0 && index < elements.length) {
                const element = elements[index];
                const computedStyle = window.getComputedStyle(element);
                return computedStyle.display;
            }
            return null;
        }, { index: rowIndex, buttonElements });

        return displayValue;
    }

    async toggleOff(toggleOnElement, toggleElements) {
        const elementsOn = await this.page.locator(toggleOnElement).elementHandles();
        for (let i = 0; i < elementsOn.length; i++) {
            const element = elementsOn[i];
            const displayValue = await this.page.evaluate(el => getComputedStyle(el).display, element);
            if (displayValue === 'block') {
                const toggleToClick = `(${toggleElements})[${i + 1}]`;
                this.clickButton(toggleToClick);
            }
        }
    }

    async elementCount(element) {
        const count = await this.page.locator(element).count();
        return count;
    }

    async hoverElement(element) {
        await this.page.hover(element)
    }

    async waitElementUntilVisible(element) {
        await this.page.waitForSelector(element, { state: 'visible', timeout: 90000 });
    }

    async waitElementUntilEnabled(element) {
        await this.page.waitForFunction(
            (el) => {
                const result = document.evaluate(el, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                const ele = result.singleNodeValue;
                return ele && !ele.disabled;
            },
            element,
            { timeout: 90000 }
        );
    }

    async waitElementUntilClickable(element) {
        await this.page.waitForFunction(
            (el) => {
                const result = document.evaluate(el, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                const ele = result.singleNodeValue;
                return ele && ele.offsetParent !== null && !ele.disabled;
            },
            element,
            { timeout: 90000 }
        );
    }

    async waitElementUntilHidden(element) {
        await this.page.waitForSelector(element, { state: 'hidden', timeout: 60000 });
    }

    async getTextBoxValue(element) {
        const textvalue = await this.page.evaluate(xpath => {
            const xpathResult = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            const textbox = xpathResult.singleNodeValue;
            return textbox ? textbox.value : null;
        }, element);

        return textvalue;
    }

    async removeChildElement(element) {
        let parentElements = await this.page.locator(element);
        let parents = [];
        let rowCount = await parentElements.count();
        for (let i = 0; i < rowCount; i++) {
            const textContent = await parentElements.nth(i).textContent();
            const popText = textContent.trim().split('\n').pop();
            parents.push(popText.trim());
        }
        return parents;
    }

    async checkIfIncludesInArray(array, text) {
        return array.includes(text);
    }
}
module.exports = ActionDriver;