const findTalentIntLocators = require('../locators/findTalentIntLoc');
const ActionDriver = require('../../utils/ActionDriver');

exports.FindTalentIntPage = class FindTalentIntPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async navigateFindTalent(){
        await this.actionDriver.clickButton(findTalentIntLocators.findTalentLabel);
        await this.page.waitForLoadState();
    }

    async searchTalent(data) {
        await this.actionDriver.waitElementUntilHidden(findTalentIntLocators.loadingOverlay);
        await this.actionDriver.waitElementUntilHidden(findTalentIntLocators.searchingLabel);
        await this.actionDriver.clickButton(findTalentIntLocators.enterSkillField);
        await this.actionDriver.waitElementUntilVisible(findTalentIntLocators.weFoundCount);
        await this.actionDriver.typeText(data);
        await this.actionDriver.keyboardPress('Enter')
        await this.actionDriver.selectFromList(data, findTalentIntLocators.searchItems);
        await this.actionDriver.waitElementUntilVisible(findTalentIntLocators.searchingLabel);
        await this.actionDriver.waitElementUntilHidden(findTalentIntLocators.searchingLabel);
    }

    async selectTalent() {
        await this.actionDriver.clickButton(findTalentIntLocators.firstTalent);
    }

    async validateTalentDisplayedAndSelect(testData) {
        const talentName = testData.firstName + " " + testData.lastName;
        const countElements = await this.page.$$(findTalentIntLocators.nameList);
        if(countElements.length > 1) {
            await this.actionDriver.waitElementUntilHidden(findTalentIntLocators.searchingLabel);
            await this.actionDriver.waitElementUntilVisible(findTalentIntLocators.nameList);
            await this.actionDriver.scrollToBottom(findTalentIntLocators.noMoreRecords);
            await this.actionDriver.waitElementUntilVisible(findTalentIntLocators.viewProfileButtonList);
            await this.actionDriver.selectDataFromText(talentName, findTalentIntLocators.nameList, findTalentIntLocators.viewProfileButtonList);
        } else {
            await this.selectTalent();
        }   
    }

    async validateTalentNotDisplayed(name) {
        await this.actionDriver.waitElementUntilHidden(findTalentIntLocators.searchingLabel);
        const countElements = await this.page.$$(findTalentIntLocators.nameList);
        if(countElements > 1) {
            const talentName = name.firstName + " " + name.lastName;
            await this.actionDriver.scrollToBottom(findTalentIntLocators.noMoreRecords);
            const talentList = await this.actionDriver.getTextArray(findTalentIntLocators.nameList);
            const displayed = await this.actionDriver.checkIfIncludesInArray(talentList, talentName);
            await this.actionDriver.expectFalse(displayed);
        } else {
            await this.actionDriver.expectToHaveCount(findTalentIntLocators.nameList, 0);
        }
    }
        
    async validateSkillDisplayed(skill){
        await this.actionDriver.waitElementUntilVisible(findTalentIntLocators.talentSkills);
        const textArray = await this.actionDriver.getTextArray(findTalentIntLocators.talentSkills);
        const include = await this.actionDriver.checkIfIncludesInArray(textArray, skill);
        await this.actionDriver.expectTrue(include);
    }

    async validateSkillNotDisplayed(skill){
        await this.actionDriver.waitElementUntilVisible(findTalentIntLocators.talentSkills);
        const textArray = await this.actionDriver.getTextArray(findTalentIntLocators.talentSkills);
        const include = await this.actionDriver.checkIfIncludesInArray(textArray, skill);
        await this.actionDriver.expectFalse(include);
    }

    async validateAboutMeSection(about) {
        await this.actionDriver.waitElementUntilVisible(findTalentIntLocators.talentAboutMe);
        await this.actionDriver.expectEquals(about, findTalentIntLocators.talentAboutMe);
    }

    async validateWorkExpSection(exp) {
        await this.actionDriver.waitElementUntilVisible(findTalentIntLocators.workExperienceDesc);
        await this.actionDriver.expectEquals(exp, findTalentIntLocators.workExperienceDesc);
    }

    async validateAllBookACall(){
        const talentNames = [];
        const talentwithErrorBookACall = [];
        const talentWithBook = [];
        await this.actionDriver.waitElementUntilVisible(findTalentIntLocators.nameList);
        await this.actionDriver.scrollToBottom(findTalentIntLocators.noMoreRecords);
        const elements = await this.page.$$(findTalentIntLocators.viewProfileButtonList);
        for(const element of elements) {
            await element.click();
            const visible = await this.actionDriver.elementVisible(findTalentIntLocators.bookaCall);
            const firstName = await this.actionDriver.getText(findTalentIntLocators.firstName);
            const lastName = await this.actionDriver.getText(findTalentIntLocators.lastName);
            const fullName = firstName + " " + lastName;
            if(!visible) {
                talentNames.push(fullName);
            } else {
                await this.actionDriver.clickButton(findTalentIntLocators.bookaCall);
                const loadingSchedule = await this.actionDriver.elementVisible(findTalentIntLocators.loadingSchedule);
                if(loadingSchedule) {
                    talentwithErrorBookACall.push(fullName);
                } else {
                    await this.actionDriver.waitElementUntilVisible(findTalentIntLocators.bookACallCalendar);
                    await this.actionDriver.checkElementVisibility(findTalentIntLocators.bookACallCalendar);
                    talentWithBook.push(fullName);
                }
                await this.actionDriver.keyboardPress('Escape');
            }
            await this.actionDriver.clickButton(findTalentIntLocators.closeModalBtn);
            await this.page.waitForTimeout(500);
        }
        console.log('Without Book A Call', talentNames);
        console.log('With Book a call with error', talentwithErrorBookACall);
        console.log('With Book A Call', talentWithBook);
    }
}