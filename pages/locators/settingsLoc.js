module.exports = {
    searchUser : "//div[contains(@class,'show-search-section')]//input[@id='autosuggest__input']",
    assignRole : "//i[contains(@class,'la-cube')]",
    userRoles : "//ul[contains(@class,'user-role')]/li/span",
    userRolesToggle : "//ul[contains(@class,'user-role')]/li/span/following-sibling::label",
    userRoleOnToggle : "//ul[contains(@class,'user-role')]//span[@class='ks-on']",
    loadingRecords : "//span[contains(text(),'Loading records')]",
    currentRole : "//span[@class='fs-active-user']",

    //skills
    skillsTab : "//span[text()='Skills']",
    addNewSkillsBtn : "//button[text()='Add New Skills']",
    skillName : "//input[@name='name']",
    addNewSkillSave : "//span[text()='Add New Skill']",
    searchSkill : "//input[@id='autosuggest__input']",
    skillNameList : "//table/tbody/tr/td[1]",
    deleteSkillList : "//i[contains(@class,'la-trash-alt')]",
    confirmDelete : "//button[contains(@class,'swal2-confirm')]",
    paginationNextPage : "//a[contains(@title,'Go to the next page')]",

    //Process Workflow
    clientEnableAccessDropdown : "//span[text()='Client Enable Access - Client']/ancestor::tr/td/div/button[contains(@id,'fsButtonDropdown')]",
    clientEnableAccessEditWorkFlow : "//span[text()='Client Enable Access - Client']/ancestor::tr/td/div/div/a",
    clientEnableAccessEmailTo : "//input[@id='text-datalist-email_to']",
    saveWorkFlow : "//span[text()='Save']",
}