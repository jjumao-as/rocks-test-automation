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
    skillTaken : "//span[text()='The name has already been taken.']",

    //Process Workflow
    workFlowName : "//td[contains(@class,'action-buttons')]/following-sibling::td[1]/span[2]",
    workFlowActionButton : "//button[contains(@id,'fsButtonDropdown-workflow')]",
    editWorkFlow : "//button[contains(@id,'fsButtonDropdown-workflow')]/following-sibling::div/a",
    templateUpdated : "//h2[text()='Template updated']",
    clientEnableAccessDropdown : "//span[text()='Client Enable Access - Client']/ancestor::tr/td/div/button[contains(@id,'fsButtonDropdown')]",
    clientEnableAccessEditWorkFlow : "//span[text()='Client Enable Access - Client']/ancestor::tr/td/div/div/a",
    emailToField : "//input[@id='text-datalist-email_to']",
    saveWorkFlow : "//span[text()='Save']/parent::a",
    savingChanges : "//div[contains(text(),'Saving changes')]",
}