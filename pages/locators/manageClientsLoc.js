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
    SelectCurrentDateforStartdate : '(//span[contains(@class,"flatpickr-day today")])[3]',  
    SelectNextMonthDateforEnddate : '(//span[contains(@class,"flatpickr-day nextMonthDay") and text()="3"])[4]', 
    CreateClientButton :'//button[.//span[text()="Create Client"]]' ,
    firstElipsis : '(//i[contains(@class, "dynamic-icon la la-ellipsis-h")])[1]',
    firstDelete : '(//a[contains(text(),"Delete")])[1]',
    deleteYes : '//button[contains(text(),"Yes")]', 
    CreatedClient : '(//a[contains(@id, "client-name")])[1]',
    EditClient : '//i[contains(@class, "las la-pen ml-1")]',
    CompanyName : '//input[contains(@name, "company")]',
    SelectCountry : '//input[contains(@name, "country")]',
    SelectStates :'//input[contains(@name, "state")]' ,
    SelectCity : '//input[contains(@name, "city")]' ,
    ContactTab : '//a[contains(@data-target, "#contact")]',
    AddContact : '//button[contains(text(),"Add Contact")]',
    email : '//input[contains(@name, "email")]',
    name : '//input[contains(@name, "name")]', 
    number : '//input[contains(@name, "number")]', 
    close : '//button[contains(@area-label, "Close Modal")]', 
    search : '//input[contains(@placeholder, "Search Company Name")]',
    

    searchCompanyNameField : "//input[contains(@placeholder,'Search Company Name')]",
    searchButton : "//i[contains(@class,'search-icon')]",
    companySearchResult : "//a[contains(@class,'client-profile')]",
    
    //Client Profile
    clientLogo : "//div[contains(@class,'client-logo')]",
    weeklyFloorReportTab : "//a[contains(text(),'Weekly Floor Report')]",
    teamRequestsTab : "//a[contains(text(),'Team Requests')]",
    teamMembersTab : "//a[contains(text(),'Team Members')]",

    //Client Profile Team Requests Table
    dropRequestedLink : "(//a[contains(text(),'Drop Requested')])[1]",
    dropRequestTalent : "(//a[contains(@class,'photo-card-user-names')])[1]",
    dropRequestType : "(//span[contains(text(),'Drop')])[1]",
    loadingRecords : "//span[contains(text(),'Loading records')]",

    //Team Requests 
    teamRequests : "(//span[contains(text(),'Team Requests')])[1]",
    actionColHeader : "//th[contains(text(),'Action')]",

    //Documents & Agreements
    documentsAgreements : "(//span[contains(text(),'Documents & Agreements')])[1]",

    //Sales Lead
    salesLead : "//span[contains(text(),'Sales Leads')]",

    //Client Employee Interviews
    clientEmpInterviews : "(//span[contains(text(),'Client Employee Interviews')])[1]",

    //Find Talent
    findTalent : "(//span[contains(text(),'Find Talent')])[1]",

}