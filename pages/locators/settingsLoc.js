module.exports = {
    searchUser : "//div[contains(@class,'show-search-section')]//input[@id='autosuggest__input']",
    assignRole : "//i[contains(@class,'la-cube')]",
    userRoles : "//ul[contains(@class,'user-role')]/li/span",
    userRolesToggle : "//ul[contains(@class,'user-role')]/li/span/following-sibling::label",
    userRoleOnToggle : "//ul[contains(@class,'user-role')]//span[@class='ks-on']",
    loadingRecords : "//span[contains(text(),'Loading records')]",
    loadingBg : "//div[@class='datatable-mask']",
    currentRole : "//span[@class='fs-active-user']",

    //skills
    skillsTab : "(//span[text()='Skills'])[1]",
    addNewSkillsBtn : "//button[text()='Add New Skills']",
    skillName : "//input[@name='name']",
    addNewSkillSave : "//span[text()='Add New Skill']",
    searchSkill : "//input[@id='autosuggest__input']",
    skillNameList : "//table/tbody/tr/td[1]",
    deleteSkillList : "//i[contains(@class,'la-trash-alt')]",
    confirmDelete : "//button[contains(@class,'swal2-confirm')]",
    paginationNextPage : "//a[contains(@title,'Go to the next page')]",
    skillTaken : "//span[text()='The name has already been taken.']",

    /** 
     * Superadmin
     * Employee Management 
    */
    employeeManagementTab : "(//span[text()='Employee Management'])[1]",
    employeeManagementHeader : "//h4[contains(text(), 'Employee Management')]",
    teamTab : "//a[@id='nav-team-tab']",
    teamManagerList : "//*[@id='team-managers']/div/div/div[1]//*[contains(@class, 'fs-tags-input-badge fs-tags-input-badge-pill fs-tags-input-badge-selected-default')]",
    addManagerPenIcon : "//*[@id='nav-team']/div/div/fieldset/a/i",
    searchUsersTextbox : "//input[@class='fs-tags-input-field']",
    saveButton : "//a[@class='btn fs-button-orange rounded-pill text-uppercase text-white']",
    notificationBanner : "//html/body/div[3]/div",

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
    shortcodeVariables : "//i[@class='ks-icon hover-green la la-code']",

    //Expense Report Settings
    tableMask : "//div[@class='datatable-mask']",
    searchExpenseId : "//input[contains(@placeholder,'Search by Expense Report ID')]",
    expenseId : "//p[text()='Expense ID']/following-sibling::span[1]",
    loadingOverlay : "//div[@class='loadingoverlay']",
    expenseReportTab : "(//span[text()='Expense Report'])[1]",
    editGeneralSetting : "//legend[text()='General Settings']/following-sibling::div//a",
    expenseReportRecipientField : "//div[contains(text(),'Admin Email Recipients')]/following-sibling::div//div[@class='fs-tags-input']/input",
    expenseReportRecipient : "//div[contains(text(),'Admin Email Recipients')]/following-sibling::div//span[contains(@class,'fs-tags-input-badge')]/span",
    removeExpenseReportRecipient : "//div[contains(text(),'Admin Email Recipients')]/following-sibling::div//span[contains(@class,'fs-tags-input-badge')]/i",
    saveGeneralSettings : "//a[contains(text(),'Save')]",
    expenseReportsTab : "(//span[text()='Expense Reports'])[1]",

    //Floor Report Settings
    weeklyFloorReports : "(//span[text()='Weekly Floor Reports'])[1]",
    reporterName : "//div[contains(@class,'tr flag')]/div[2]/div",
    projectName : "//div[contains(@class,'tr flag')]/div[3]/div",
    reportRow : "//div[contains(@class,'tr flag')]",
    searchReport : "//input[@placeholder='Search..']",
    fetchingReport : "//span[text()='Fetching weekly floor reports...']",

}