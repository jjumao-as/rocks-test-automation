module.exports = {
    //Dashboard
    manageClientDashboard : "//span[text()='Manage Clients']/ancestor::div[contains(@class,'nav-title')]/following-sibling::ul//span[text()='Dashboard']",


    //Recently Signed Up Clients
    recentlySignedUpClients : "//span[contains(text(),'Recently Signed-up Clients')]",
    reviewClientProspects : "//h4[text()='Review Client Prospects']",

    //Client Listing
    clientListing : "(//span[contains(text(),'Client List')])[1]",
    clients : "//h4[text()='Clients']",
    paginationBar : "//ul[@class='pagination']",
    addNewClientButton : "//button[text()='Add New Client']",
    companyNameField : "//label[text()='Company Name']/following-sibling::input",
    companyField : "//label[text()='Company Status']/following-sibling::span[contains(@class,'select2')]",
    companyStatusOptions : "//span[contains(@class,'select2-result')]//li",
    isHighGrowthField : "//label[text()='Is High Growth Client?']/following-sibling::span[contains(@class,'select2')]",
    isHighGrowthOptions : "//span[contains(@class,'select2-result')]//li",
    startDateField : "//input[@name='start_date']/following-sibling::input",
    dateTodayPicker : "//span[contains(@class,'today')]",
    endDataField : "//input[@name='contract_end_date']/following-sibling::input",
    endDateYearArrowUp : "(//input[contains(@class,'cur-year')]/following-sibling::span[@class='arrowUp'])[4]",
    countryField: "//label[text()='Country']/following-sibling::div[contains(@class,'country-select')]",
    exportCurrentRecordsBtn: "//button[normalize-space()='Export current records']",
    

    //Team Requests
    teamRequests : "(//span[contains(text(),'Team Requests')][1]",

    //Documents & Agreements
    documentsAgreements : "(//span[contains(text(),'Documents & Agreements')])[1]",

    //Sales Lead
    salesLead : "//span[contains(text(),'Sales Leads')]",

    //Client Employee Interviews
    clientEmpInterviews : "(//span[contains(text(),'Client Employee Interviews')])[1]",

    //Find Talent
    findTalent : "(//span[contains(text(),'Find Talent')])[1]",


}