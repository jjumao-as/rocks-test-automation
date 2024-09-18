module.exports = {

    //Dashboard
    manageTeam : '//span[text()="Manage Team"]',

    //Manage Team
    myTeamHeader : "//p[text()='My Team']",

    //My Team Table
    contextMenuActiveTalent : "(//a[contains(text(),'Drop from my Team')]/ancestor::td)[1]",
    talentNameSelectedRow : "(((//a[contains(text(),'Drop from my Team')]/ancestor::td)/preceding-sibling::td)/child::a)[1]",
    dropFromMyTeamSelectActionMenu : "//a[contains(text(),'Drop from my Team')]",
    dropFromMyTeamSelectActionMenuNoIndex : "//a[contains(text(),'Drop from my Team')]",
    taLentNameAll : "(//a[@target='_blank']/parent::td)/child::a",
    dropRequestedTalentName : "//div[@class='reason-section']/preceding-sibling::a",  //talent with drop tag
    talentNameDropTag : "(//div[@class='reason-section']/preceding-sibling::a)[1]",   //talent with drop tag with xpath indexed to 1
    talentNameConfirmed : "//a[contains(text(),'", 
    DropRequestReason : "//span[contains(@class,'reason-category')]",
    
    //Drop From My Team Request Modal
    dropFromMyTeamRequestModalHeader : "//h4[contains(text(),'Drop from my Team Request')]",
    endDate : "//input[contains(@name,'startend_date')]",
    reasonDropDown : "//span[contains(@role,'combobox')]",
    noReason : "//li[contains(text(),'--')]",
    performanceReason : "//li[contains(text(),'Performance')]",
    resignationReason : "//li[contains(text(),'Resignation')]",
    budgetaryAdjustmentReason : "//li[contains(text(),'Budgetary Adjustments')]",
    additionalCommentRichText : "//body[contains(@class,'mce-content-body ')]",
    submitButton : "//button[contains(text(),'Submit')]",

    //"Thank You Drop From Team" Success Modal
    OKthankYouButton : "//button[contains(text(),'OK')]",
 
    //Dropped From Team Table    
    dropFromMyTeamTableHeader : "//p[text()='Dropped from Team']",
}