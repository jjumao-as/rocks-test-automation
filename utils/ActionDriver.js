import { expect } from '@playwright/test';

class ActionDriver {
    constructor(page) {
        this.page = page;
    }

    /**
     * This function is to simply input the text to specific text field
     * @param {*} element : this is the field where text will be inputted
     * @param {*} text : text or data that will be inputted
     */
    async setText(element, text) {
        await this.page.fill(element, text);
    }

    /**
     * This function is use to click not only a button but also the elements that can be clickable
     * @param {*} element : element to click
     */
    async clickButton(element) {
        await this.page.click(element);
    }

    /**
     * This function is use to assert if a condition or a boolean variable is false. 
     * Usually used for negative scenarios and validation after deletion.
     * @param {*} result : boolean result from the function files.
     */
    async expectFalse(result) {
        await expect(result).toBeFalsy();
    }

    /**
     * This function is use to assert if a condition or a boolean variable is TRUE. 
     * Usually used for positive test cases and validation after adding or creating data.
     * @param {*} result : boolean result from the function files
     */
    async expectTrue(result) {
        await expect(result).toBeTruthy();
    }

    /**
     * This function is use to determine and assert if specific element is visible in the UI.
     * This will check element visibility upto 90 seconds.
     * @param {*} element : element to assert visibility.
     */
    async checkElementVisibility(element) {
        await expect(this.page.locator(element)).toBeVisible({ timeout: 120000 });
    }

    /**
     * This function is used when a locator contains multiple element (i.e. table row, side tabs)
     * @param {*} element : locator with multiple elements.
     */
    async checkAllElementsVisibility(element) {
        const elements = await this.page.locator(element).all();
        const visibilityResults = await Promise.all(elements.map(async (el) => {
            return await el.isVisible();
        }));

        visibilityResults.forEach(async (isVisible, index) => {
            await expect(isVisible).toBeTruthy();
        })
    }

    /**
     * This function is to check if element is visible.
     * This will check element visibility every 100ms and will time out after 5 seconds
     * This is usually used when you are trying to find a specific element before proceeding in the next step.
     * This also can be used for both negative and positive scenarios.
     * 
     * @param {*} element : element or locator to find
     * @returns : returns true if visible and false if not.
     */
    async elementVisible(element) {
        const el = await this.page.locator(element);
        const start = Date.now();
        const interval = 100; // Check every 100 ms
            while (Date.now() - start < 5000) {
                try {
                    if (await el.isVisible()) {
                        return true;
                    }
                } catch (error) {
                    // Element is not yet in the DOM or not visible
                }
                await this.page.waitForTimeout(interval);
            }
            return false;
    }

    /**
     * This function is use to assert a text from test data into element text value or content.
     * @param {*} text : text to find, usually from json file or a test data.
     * @param {*} element : element where we will compare the text
     */
    async expectEquals(text, element) {
        const received = await this.getText(element);
        await expect(received).toEqual(text);
    }

    /**
     * This function is use to assert the count of an element visible in the UI.
     * 
     * @param {*} element : element to count 
     * @param {*} number : expected number to display
     */
    async expectToHaveCount(element, number) {
        await expect(this.page.locator(element)).toHaveCount(number);

    }

    /**
     * This function is use to check if the expected sentence contains the actual text.
     * (i.e. expected = Hello World and actual = Hello, this will pass the expectation since Hello World contains the word Hello)
     * @param {*} actual : actual text to search or to check if contains in the expected
     * @param {*} expected : expected word or sentence.
     */
    async checkInclude(actual, expected) {
        await expect(expected).toContain(actual)
    }

    /**
     * This is use to select specific text into the dropdown list.
     * NOTE: This cannot be used for select option
     * 
     * @param {*} text : text to select 
     * @param {*} element : list of options from the dropdown selection
     */
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

    /**
     * This function usually use to determine if the data to be inputted is not yet added or existing
     * This can be also use to determine if a deleted data was not in the list.
     * 
     * @param {*} text : text to find
     * @param {*} element : element where we compare or check the text
     */
    async compareFromList(text, element) {
        const elements = await this.page.locator(element).all();
        const extractedTexts = await Promise.all(elements.map(async element => {
            return await element.textContent()
        }));

        const pageTextContents = extractedTexts.map(name => name.trim().toLowerCase());

        const isIncluded = pageTextContents.includes(text);

        await expect(isIncluded).toBeFalsy();
    }

    /**
     * This function is use to assert if text value is existing from the list of elements
     * 
     * @param {*} text : text value to find
     * @param {*} element : list of elements where we will compare the text.
     */
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

    /**
     * This function is use if setText is not working. This will input the text like we are typing in a keyboard.
     * 
     * @param {*} text : text to type 
     */
    async typeText(text) {
        await this.page.keyboard.type(text);
    }

    /**
     * This function is use to execute some keyboard functions (i.e. Enter, Escape, Delete, Control+A)
     * @param {*} key : key to press
     */
    async keyboardPress(key) {
        await this.page.keyboard.press(key);
    }

    /**
     * This function will get the textContent of an element
     * @param {*} element : element where we are getting the text
     * @returns : return trimmed textContent. 
     */
    async getText(element) {
        const textContent = await this.page.locator(element).textContent();
        return textContent.trim();
    }

    /**
     * This function is to check if the list of options, tabs stored in test data is visible in the UI based on the element given
     * This will check if each of the given text is existing in the UI
     * @param {*} texts : list of text to compare
     * @param {*} element : element that contains the text
     */
    async validateEachTextFromList(texts, element) {
        const pageTexts = await this.page.locator(element).allTextContents();
        const pageTextContent = pageTexts.join(' ');
        for (const text of texts) {
            await expect(pageTextContent).toContain(text);
        }
    }

    /**
     * This function is usually use if you want to click a button in a row where the text is displayed.
     * @param {*} testData : text that will be searching in the list of elements (table)
     * @param {*} element : element where we will compare the given text
     * @param {*} elementButton : button to click once we verify the position of the text to find.
     */
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

    /**
     * This function is usually use if you want to click a button in a row where the text is displayed.
     * The difference of this function to selectDataFromText, this function will remove the extra child-element from the given locator.
     * Usually this can be used when we want to search text in contacts, find talent
     * 
     * @param {*} testData : text that will be searching in the list of elements (table)
     * @param {*} element : element where we will compare the given text
     * @param {*} elementButton : button to click once we verify the position of the text to find.
     */
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

    /**
     * This will randomly select an option from select option dropdown
     * @param {*} element : locator of select option
     */
    async selectOptionRandom(element) {
        const dropdown = await this.page.locator(element)
        const optionCount = await dropdown.locator('option').count()
        const randomIndex = Math.floor(Math.random() * optionCount)

        await dropdown.selectOption({ index: randomIndex })

    }

    /**
     * This function will select specific option from select option dropdown
     * 
     * @param {*} text : text to select
     * @param {*} element : locator of select option element
     */
    async selectOption(text, element) {
        await this.page.selectOption(element, text);
    }

    /**
     * This will check the list of displayed values in the UI and compare the text. Once text is found this will toggle on the button.
     * After toggling on the switch, this will return the display value (i.e. inline-block, block, none) that will be use on validating if test step is pass.
     * 
     * @param {*} testData : text to find
     * @param {*} textElements : list of elements where text will be compared
     * @param {*} buttonElements : toggle button
     * @returns 
     */
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

    /**
     * This will toggle off buttons that are currently toggle on from the list
     * 
     * @param {*} toggleOnElement : span on label that will check the display if block; if display block toggleElements will be clicked.
     * @param {*} toggleElements : toggle button to be click to switch to off.
     */
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

    /**
     * This function will count the number of elements displayed in the UI.
     * 
     * @param {*} element : locator to be used on checking the count 
     * @returns : number of element displayed based on the given locator
     */
    async elementCount(element) {
        const count = await this.page.locator(element).count();
        return count;
    }

    /**
     * This function is used to hover in any element.
     * @param {*} element : element to hover
     */
    async hoverElement(element) {
        await this.page.hover(element)
    }

    /**
     * This function is use to wait an element to be visible.
     * This is introduce to prevent using sleep and to lessen the time of execution
     * @param {*} element : element to wait.
     */
    async waitElementUntilVisible(element) {
        await this.page.waitForSelector(element, { state: 'visible', timeout: 120000 });
    }

    /**
     * This function is use to wait an element to be enabled.
     * This is introduce to prevent using sleep and to lessen the time of execution
     * This is usually used in fields and buttons where disabled class is NOT added in parent element
     * 
     * @param {*} element : element to wait until enabled.
     */
    async waitElementUntilEnabled(element) {
        await this.page.waitForFunction(
            (el) => {
                const result = document.evaluate(el, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                const ele = result.singleNodeValue;
                return ele && !ele.disabled;
            },
            element,
            { timeout: 120000 }
        );
    }

    /**
     * This function is use to wait an element to be enabled.
     * This is introduce to prevent using sleep and to lessen the time of execution
     * This is usually used in buttons where disabled class is added in parent element
     * 
     * @param {*} element : element to wait until enabled.
     */
    async waitElementUntilClickable(element) {
        await this.page.waitForFunction(
            (el) => {
                const result = document.evaluate(el, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                const ele = result.singleNodeValue;
                return ele && ele.offsetParent !== null && !ele.disabled;
            },
            element,
            { timeout: 120000 }
        );
    }

    /**
     * This function is use to wait an element to be hidden.
     * This is introduce to prevent using sleep and to lessen the time of execution
     * @param {*} element : element to wait.
     */
    async waitElementUntilHidden(element) {
        await this.page.waitForSelector(element, { state: 'hidden', timeout: 120000 });
    }

    /**
     * This function is use to get the value of textbox if the element does not contain value attribute or text on its element.
     * @param {*} element : textbox 
     * @returns : returns textValue or content of the text box.
     */
    async getTextBoxValue(element) {
        const textvalue = await this.page.evaluate(xpath => {
            const xpathResult = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            const textbox = xpathResult.singleNodeValue;
            return textbox ? textbox.value : null;
        }, element);

        return textvalue;
    }

    /**
     * This function is use to remove the child element of the column elements of the table and save all the text content into array.
     * This will be passed to checkIfIncludesInArray to identify if specific text is indluded in the array.
     * 
     * @param {*} element : table column element  
     * @returns : array with the list of text content.
     */
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

    /**
     * This function is use to validate if specific text is included in the given array.
     * @param {*} array : list of text from where we will compare a specific text from test data
     * @param {*} text : text to check if included in the given array.
     * @returns 
     */
    async checkIfIncludesInArray(array, text) {
        return array.includes(text);
    }

    /**
     * This will get all the text in all element using specified locator
     * @param {*} element : locator where all text will be taken.
     * @returns 
     */
    async getTextArray(element){
        const textArray = await this.page.locator(element).allTextContents();
        return textArray;
    }

    async fileUpload(filePath, button) {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.clickButton(button);
        const fileChooser = await fileChooserPromise;
        const path = require('path');
        const imgPath = path.resolve(__dirname, filePath);
        await fileChooser.setFiles(imgPath);
    }

    async getRandomJsonItem(jsonArray, key){
        const dataArray = Object.values(jsonArray[key])
        const randomIndex = Math.floor(Math.random() * dataArray.length)
        return dataArray[randomIndex]
    }

    async goBackPreviousPage(){
        await this.page.goBack()
    }

   

     /**
     * This function is use to simulate typing of text inside a input field
     * @param {*} element : locator of the input field element
     * @param {*} text    : text data value to type inside the input field
     */
    async ElemetType(element, text) { 
        await this.page.type(element, text);
    }
      
     /**
     * This function is use to asserts if the located element has a specific text value
     * @param {*} element : locator of the element that contains the text value
     * @param {*} text    : text data value to assert if it exist inside the specified element
     */
    async ExpectElementValue(element, text) {
    await expect(this.page.locator(element)).toHaveValue(text);
    }

     /**
     * This function is use to asserts if the specific text value exist inside the current open page
     * @param {*} text    : text data value to assert if it exist within the page
     */
    async checkVisibility(text) {
        await expect(this.page.getByText(text)).toBeVisible({ timeout : 120000 });
    }
}
module.exports = ActionDriver;