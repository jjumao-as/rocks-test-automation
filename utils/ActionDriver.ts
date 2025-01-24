import { Page, Locator, test, BrowserContext, expect } from '@playwright/test';

class ActionDriver {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    /**
     * This function is use to take a screenshot of the test and attach it in the report.
     */
    async takeScreenshot(): Promise<void> {
        const formattedDateTime = await this.getCurrentDateTime();
        const screenshotPath = `screenshots/${formattedDateTime}.png`;
        const screenshot = await this.page.screenshot({ path: screenshotPath });
        test.info().attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }
    /**
     * This function is to get current date time.
     */
    private async getCurrentDateTime(): Promise<string> {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    /**
     * This function is to simply input the text to specific text field
     * @param {*} element : this is the field where text will be inputted
     * @param {*} text : text or data that will be inputted
     */
    async setText(selector: string, text: string): Promise<void> {
        await this.page.fill(selector, text);
    }
    /**
     * This function is use to click not only a button but also the elements that can be clickable
     * @param {*} element : element to click
     */
    async clickButton(selector: string): Promise<void> {
        await this.page.click(selector);
    }
    /**
     * This function is use to assert if a condition or a boolean variable is false. 
     * Usually used for negative scenarios and validation after deletion.
     * @param {*} result : boolean result from the function files.
     */
    async expectFalse(result: boolean): Promise<void> {
        await this.takeScreenshot();
        expect(result).toBeFalsy();
    }
    /**
     * This function is use to assert if a condition or a boolean variable is TRUE. 
     * Usually used for positive test cases and validation after adding or creating data.
     * @param {*} result : boolean result from the function files
     */
    async expectTrue(result: boolean): Promise<void> {
        await this.takeScreenshot();
        expect(result).toBeTruthy();
    }
    /**
     * This function is use to validate if button is disabled.
     * @param {*} element : element to check if disabled
     */
    async expectDisabled(selector: string): Promise<void> {
        const locator = this.page.locator(selector);
        await this.takeScreenshot();
        await expect(locator).toBeDisabled();
    }
    /**
     * This function is use to validate if button is enabled.
     * @param {*} element : element to check if enabled
     */
    async expectEnabled(selector: string): Promise<void> {
        const locator = this.page.locator(selector);
        await this.takeScreenshot();
        await expect(locator).toBeEnabled();
    }
    /**
     * This function is use to determine and assert if specific element is visible in the UI.
     * This will check element visibility upto 90 seconds.
     * @param {*} element : element to assert visibility.
     */
    async checkElementVisibility(selector: string): Promise<void> {
        const locator = this.page.locator(selector);
        await expect(locator).toBeVisible({ timeout: 120000 });
        await this.takeScreenshot();
    }
    /**
     * This function is used when a locator contains multiple element (i.e. table row, side tabs)
     * @param {*} element : locator with multiple elements.
     */
    async checkAllElementsVisibility(selector: string): Promise<void> {
        const elements = this.page.locator(selector);
        const visibilityResults = await Promise.all((await elements.elementHandles()).map(el => el.isVisible()));
        await this.takeScreenshot();

        visibilityResults.forEach(isVisible => expect(isVisible).toBeTruthy());
    }

    async checkHiddenElement(selector: string): Promise<void> {
        await this.takeScreenshot();
        await expect(this.page.locator(selector)).toBeHidden({ timeout: 60000 });
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
    async elementVisible(selector: string): Promise<boolean> {
        const locator = this.page.locator(selector);
        const start = Date.now();
        const interval = 100; // Check every 100ms
        while (Date.now() - start < 5000) {
            try {
                if (await locator.isVisible()) {
                    return true;
                }
            } catch {
                // Ignored: element not visible or in DOM
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
    async expectEquals(expectedText: string, selector: string): Promise<void> {
        const receivedText = await this.getText(selector);
        await this.takeScreenshot();
        expect(receivedText).toEqual(expectedText);
    }
    /**
     * This function is use to assert the count of an element visible in the UI.
     * 
     * @param {*} element : element to count 
     * @param {*} number : expected number to display
     */
    async expectToHaveCount(selector: string, count: number): Promise<void> {
        await this.takeScreenshot();
        await expect(this.page.locator(selector)).toHaveCount(count);
    }
    /**
     * This function is use to check if the expected sentence contains the actual text.
     * (i.e. expected = Hello World and actual = Hello, this will pass the expectation since Hello World contains the word Hello)
     * @param {*} actual : actual text to search or to check if contains in the expected
     * @param {*} expected : expected word or sentence.
     */
    async checkInclude(expected: string, actual: string): Promise<void> {
        await this.takeScreenshot();
        expect(expected).toContain(actual);
    }
    /**
     * This is use to select specific text into the dropdown list.
     * NOTE: This cannot be used for select option
     * 
     * @param {*} text : text to select 
     * @param {*} element : list of options from the dropdown selection
     */
    async selectFromList(text: string, selector: string): Promise<void> {
        const elements = this.page.locator(selector);
        for (let i = 0; i < await elements.count(); i++) {
            const el = elements.nth(i);
            const textContent = (await el.textContent())?.trim().toLowerCase();
            if (textContent === text.toLowerCase()) {
                await el.click();
                break;
            }
        }
    }
    /**
     * This is use to select specific text into the dropdown list.
     * NOTE: This cannot be used for select option
     * 
     * @param {*} text : text to select 
     * @param {*} element : list of options from the dropdown selection
     */
    async selectRandomIndexFromList(selector: string): Promise<number> {
        const elements = this.page.locator(selector);
        const count = await elements.count();
        const randomIndex = Math.floor(Math.random() * count);
        return randomIndex;
    }
    /**
     * This function usually use to determine if the data to be inputted is not yet added or existing
     * This can be also use to determine if a deleted data was not in the list.
     * 
     * @param {*} text : text to find
     * @param {*} element : element where we compare or check the text
     */
    async compareFromList(text: string, selector: string): Promise<void> {
        const elements = await this.page.locator(selector).all(); // Await the promise here
        const extractedTexts = await Promise.all(
            elements.map(async (element) => (await element.textContent())?.trim().toLowerCase() || '')
        );
        const isIncluded = extractedTexts.includes(text.toLowerCase());
        await this.takeScreenshot();
        expect(isIncluded).toBeFalsy();
    }
     /**
     * This function is use to assert if text value is existing from the list of elements
     * 
     * @param {*} text : text value to find
     * @param {*} element : list of elements where we will compare the text.
     */   
    async findText(text: string, selector: string): Promise<void> {
        const elements = this.page.locator(selector);
        for (let i = 0; i < await elements.count(); i++) {
            const el = elements.nth(i);
            const textContent = (await el.textContent())?.trim();
            if (textContent?.toLowerCase() === text.toLowerCase()) {
                await this.takeScreenshot();
                expect(textContent).toBe(text);
                break;
            }
        }
    }
    /**
     * This function is use if setText is not working. This will input the text like we are typing in a keyboard.
     * 
     * @param {*} text : text to type 
     */
    async typeText(text: string): Promise<void> {
        await this.page.keyboard.type(text);
    }
    /**
     * This function is use to execute some keyboard functions (i.e. Enter, Escape, Delete, Control+A)
     * @param {*} key : key to press
     */
    async keyboardPress(key: string): Promise<void> {
        await this.page.keyboard.press(key);
    }
    /**
     * This function will get the textContent of an element
     * @param {*} element : element where we are getting the text
     * @returns : return trimmed textContent. 
     */
    async getText(element: string): Promise<string> {
        const textContent = await this.page.locator(element).textContent();
        return textContent?.trim() || '';
    }
    /**
     * This function is to check if the list of options, tabs stored in test data is visible in the UI based on the element given
     * This will check if each of the given text is existing in the UI
     * @param {*} texts : list of text to compare
     * @param {*} element : element that contains the text
     */
    async validateEachTextFromList(texts: string[], element: string): Promise<void> {
        const pageTexts = await this.page.locator(element).allTextContents();
        const pageTextContent = pageTexts.join(' ');
        for (const text of texts) {
            await this.takeScreenshot();
            expect(pageTextContent).toContain(text);
        }
    }
    /**
     * This function is usually use if you want to click a button in a row where the text is displayed.
     * @param {*} testData : text that will be searching in the list of elements (table)
     * @param {*} element : element where we will compare the given text
     * @param {*} elementButton : button to click once we verify the position of the text to find.
     */
    async selectDataFromText(testData: string, element: string, elementButton: string): Promise<void> {
        const elements = this.page.locator(element);
        const toggleButton = this.page.locator(elementButton);
        for (let i = 0; i < await elements.count(); i++) {
            const el = elements.nth(i);
            const textContent = await el.textContent();
            if (textContent?.trim().toLowerCase() === testData.toLowerCase()) {
                await toggleButton.nth(i).click();
                break;
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
    async selectDataFromTextwithNode(testData: string, element: string, elementButton: string): Promise<void> {
        const elements = this.page.locator(element);
        const toggleButton = this.page.locator(elementButton);
        for (let i = 0; i < await elements.count(); i++) {
            const el = elements.nth(i);
            const textContent = await el.evaluate((node) => {
                return Array.from(node.childNodes)
                    .filter((n) => n.nodeType === Node.TEXT_NODE)
                    .map((n) => n.textContent?.trim() || '')
                    .join(' ');
            });
            if (textContent?.trim().toLowerCase() === testData.toLowerCase()) {
                await toggleButton.nth(i).click();
                break;
            }
        }
    }
    /**
     * This will randomly select an option from select option dropdown
     * <select> is 0-based index (e.g, if dropdown option count is 5, index starts [0] to [4])
     * @param {*} element : locator of select option
     */
    async selectOptionRandom(element: string): Promise<void> {
        const dropdown = this.page.locator(element);
        const optionCount = await dropdown.locator('option').count();
        const randomIndex = Math.floor(Math.random() * optionCount);
        await dropdown.selectOption({ index: randomIndex });
    }
    /**
     * This function will select specific option from select option dropdown
     * 
     * @param {*} text : text to select
     * @param {*} element : locator of select option element
     */
    async selectOption(text: string, element: string): Promise<void> {
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
    async checkDisplay(testData: string, textElements: string, buttonElements: string): Promise<string | null> {
        const rowIndex = await this.page.evaluate(
            ({ testData, textElements }) => {
                const xpathResult = document.evaluate(
                    textElements,
                    document,
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null
                );
    
                for (let i = 0; i < xpathResult.snapshotLength; i++) {
                    const element = xpathResult.snapshotItem(i);
                    if (element && element.textContent?.includes(testData)) {
                        return i;
                    }
                }
                return -1;
            },
            { testData, textElements }
        );
    
        const displayValue = await this.page.evaluate(
            ({ index, buttonElements }) => {
                const xpathResult = document.evaluate(
                    buttonElements,
                    document,
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null
                );
    
                if (index >= 0 && index < xpathResult.snapshotLength) {
                    const element = xpathResult.snapshotItem(index);
                    if (element) {
                        const computedStyle = window.getComputedStyle(element as Element);
                        return computedStyle.display;
                    }
                }
                return null;
            },
            { index: rowIndex, buttonElements }
        );
    
        return displayValue;
    }
    /**
     * This will toggle off buttons that are currently toggle on from the list
     * 
     * @param {*} toggleOnElement : span on label that will check the display if block; if display block toggleElements will be clicked.
     * @param {*} toggleElements : toggle button to be click to switch to off.
     */
    async toggleOff(toggleOnElement: string, toggleElements: string): Promise<void> {
        const elementsOn = await this.page.locator(toggleOnElement).elementHandles();
    
        for (let i = 0; i < elementsOn.length; i++) {
            const element = elementsOn[i];
            const displayValue = await this.page.evaluate((el) => {
                if (el instanceof Element) {
                    return getComputedStyle(el).display;
                }
                return null;
            }, element);
    
            if (displayValue === 'block') {
                const toggleToClick = `(${toggleElements})[${i + 1}]`;
                await this.clickButton(toggleToClick);
            }
        }
    }
    /**
     * This function will count the number of elements displayed in the UI.
     * 
     * @param {*} element : locator to be used on checking the count 
     * @returns : number of element displayed based on the given locator
     */
    async elementCount(element: string): Promise<number> {
        return this.page.locator(element).count();
    }
    /**
     * This function is used to hover in any element.
     * @param {*} element : element to hover
     */
    async hoverElement(element: string): Promise<void> {
        await this.page.hover(element);
    }
    /**
     * This function is use to wait an element to be visible.
     * This is introduce to prevent using sleep and to lessen the time of execution
     * @param {*} element : element to wait.
     */
    async waitElementUntilVisible(element: string): Promise<void> {
        await this.page.waitForSelector(element, { state: 'visible', timeout: 120000 });
    }
    /**
     * This function is use to wait an element to be enabled.
     * This is introduce to prevent using sleep and to lessen the time of execution
     * This is usually used in fields and buttons where disabled class is NOT added in parent element
     * 
     * @param {*} element : element to wait until enabled.
     */
    async waitElementUntilEnabled(element: string): Promise<void> {
        await this.page.waitForFunction(
            (el) => {
                const result = document.evaluate(el, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                const ele = result.singleNodeValue as HTMLInputElement | null;
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
    async waitElementUntilClickable(element: string): Promise<void> {
        await this.page.waitForFunction(
            (el: string) => {
                const result = document.evaluate(
                    el,
                    document,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                );
                const ele = result.singleNodeValue as HTMLElement | null;
    
                // Narrow the type to include only elements with 'disabled' property
                const isDisabled = (ele as HTMLInputElement | HTMLButtonElement | null)?.disabled ?? false;
                return ele !== null && ele.offsetParent !== null && !isDisabled;
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
    async waitElementUntilHidden(element: string): Promise<void> {
        await this.page.waitForSelector(element, { state: 'hidden', timeout: 120000 });
    }
    /**
     * This function is use to get the value of textbox if the element does not contain value attribute or text on its element.
     * @param {*} element : textbox 
     * @returns : returns textValue or content of the text box.
     */
    async getTextBoxValue(element: string): Promise<string | null> {
        const textvalue = await this.page.evaluate((xpath: string) => {
            const xpathResult = document.evaluate(
                xpath,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            );
            const textbox = xpathResult.singleNodeValue as HTMLInputElement | null;
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
    async removeChildElement(element: string): Promise<string[]> {
        const parentElements = await this.page.locator(element);
        const parents: string[] = [];
        const rowCount = await parentElements.count();
    
        for (let i = 0; i < rowCount; i++) {
            const textContent = await parentElements.nth(i).textContent();
            if (textContent) {
                const popText = textContent.trim().split('\n').pop();
                if (popText) {
                    parents.push(popText.trim());
                }
            }
        }
    
        return parents;
    }
    /**
     * This function is use to validate if specific text is included in the given array.
     * @param {*} array : list of text from where we will compare a specific text from test data
     * @param {*} text : text to check if included in the given array.
     * @returns 
     */
    async checkIfIncludesInArray(array: string[], text: string): Promise<boolean> {
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
        /**
     * This function is use on uploading file test case
     * @param {filePath} filePath : Path of the file to upload should be in testdata
     * @param {button} button : locator of the button for uploading
     */
    async fileUpload(filePath, button) {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.clickButton(button);
        const fileChooser = await fileChooserPromise;
        const path = require('path');
        const imgPath = path.resolve(__dirname, filePath);
        await fileChooser.setFiles(imgPath);
    }
        /**
     * This will pick random to given jsonData
     * @param {jsonArray} jsonArray : list of data to pick saved in array
     * @param {key} key : key in the array 
     * @returns 
     */
    async getRandomJsonItem(jsonArray, key){
        const dataArray = Object.values(jsonArray[key])
        const randomIndex = Math.floor(Math.random() * dataArray.length);
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
        await this.takeScreenshot();
        await expect(this.page.locator(element)).toHaveValue(text);
    }
    async expectElementNotToBeEmpty(element) {
        const textContent = await this.getText(element);
        expect(textContent).not.toBe('');
    }
         /**
     * This function is use to asserts if the specific text value exist inside the current open page
     * @param {*} text    : text data value to assert if it exist within the page
     */
    async checkVisibility(text) {
        await this.takeScreenshot();
        await expect(this.page.getByText(text)).toBeVisible({ timeout : 120000 });
    }
        /**
     * This function is use to check if the element is display usually to verify "No more records to display" is visible
     * @param {element} element : element to check if visible.
     * @returns 
     */
    async checkElementBottom(element){
        const elementHandle = await this.page.$(element);
        if(elementHandle){
            const boundingBox = await elementHandle.boundingBox();
            return boundingBox !== null;
        }
        return false;
    }
    /**
     * This will scroll the page to the bottom.
     * @param {element} element : element to check if the page reached the bottom. 
     */
    async scrollToBottom(element) {
        let isVisible = false;
            while (!isVisible) {
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await this.page.waitForTimeout(5000);

            isVisible = await this.checkElementBottom(element);
        }
    }
    /**
    * This function is used to select data from an array, check if the data is visible in the UI, and click a specified button if it is visible.
    * @param testData Array of strings containing the data to check.
    * @param element CSS or XPath selector for elements to compare against the array data.
    * @param elementButton CSS or XPath selector for the button to click once the array data is available in the UI.
    */
    async compareAndSelectList(
        testData: string[],
        element: string,
        elementButton: string): Promise<void> {
        const elements = await this.page.locator(element).all();
        const viewProfileBtn = this.page.locator(elementButton);

        const extractedTexts = await Promise.all(
        elements.map(async (el) => {
            const textContent = await el.textContent();
            return textContent ? textContent.trim().toLowerCase() : '';
            })
        );

    for (const [index, text] of testData.entries()) {
        const textLowerCase = text.toLowerCase();
        const isTextIncluded = extractedTexts.some((pageText) =>
            pageText.includes(textLowerCase)
            );
        const textIndex = extractedTexts.indexOf(textLowerCase);

        if (isTextIncluded && textIndex !== -1) {
            await viewProfileBtn.nth(textIndex).click();
            break;
            }
        }
    }
    /**
     * Function that determines if a radioButton or a checkBox is selected
     * @param {*} element : an element radioButton or a checkBox
     */

    async isElementChecked(element){
        await expect(this.page.locator(element)).toBeChecked()
    }
    async goToUrl(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async clearInputElement(element: string): Promise<void> {
        await this.page.click(element);
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
    }

    async openNewTab(context: BrowserContext, action: () => Promise<void>): Promise<Page> {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            action()
        ]);
    
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }
}

export default ActionDriver;
