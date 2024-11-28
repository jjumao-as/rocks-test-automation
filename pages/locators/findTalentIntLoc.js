module.exports = {
    // Internal Find Talent locators
    loadingOverlay : "//div[contains(@class,'loadingoverlay')]",
    findTalentLabel : "//span[text()='Find Talent']",
    enterSkillField : "//input[contains(@placeholder,'Enter a skill')]",
    searchingLabel : "//p[contains(text(),'Searching')]",
    weFoundCount : "//p[contains(text(),'We found')]/strong[1]",
    searchItems : "//li[contains(@class,'tags-input-typeahead-item')]",
    firstTalent : "(//span[text()='VIEW PROFILE'])[1]",
    nameList : "//a[contains(@class,'photo-card-user-name')]/div",
    viewProfileButtonList : "//a[@title='View profile']",
    noMoreRecords : "//div[text()='No more records']",
    talentName : "//a[contains(@class,'photo-card-user-names')]/div",

    // Employee Profile locators
    talentSkills : "//span[contains(@class,'skill-name')]",
    talentAboutMe : "//h3[text()='About Me']/parent::header/following-sibling::article/p",
    workExperienceDesc : "//h3[text()='E-commerce Project']/following-sibling::p/p",

    bookaCall: "//span[text()='Book a Call']/parent::a",
    closeModalBtn : "//a[@class='embed-btn']",
    firstName : "//span[@class='first-name']",
    lastName : "//span[@class='last-name']",
    bookACallCalendar : "//div[contains(@class,'calendar-container')]",
    loadingSchedule : "//span[text()='Loading available schedules...']",
}