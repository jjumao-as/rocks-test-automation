module.exports = {
    //Dashboard
    manageClientDashboard : "//span[text()='Manage Clients']/ancestor::div[contains(@class,'nav-title')]/following-sibling::ul//span[text()='Dashboard']",

    //Recently Signed Up Clients
    recentlySignedUpClients : "//span[contains(text(),'Recently Signed-up Clients')]",
    reviewClientProspects : "//h4[text()='Review Client Prospects']",

    //Client Listing
    clientListing : "(//span[contains(text(),'Client List')])[1]",
    loadingOverlay : "//div[@class='loadingoverlay']",
    clients : "//h4[text()='Clients']",
    paginationBar : "//ul[@class='pagination']",
    addNewClientButton : "//button[text()='Add New Client']",
    
    
   
    endDataField : "//input[@name='contract_end_date']/following-sibling::input",
    endDateYearArrowUp : "(//input[contains(@class,'cur-year')]/following-sibling::span[@class='arrowUp'])[4]",
    
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
    addNewClientTitle : "//h4[text()='Add New Client']",
    clientTableBody : "//table/tbody/tr",
    email : '//input[contains(@name, "email")]',
    name : '//input[contains(@name, "name")]', 
    number : '//input[contains(@name, "number")]', 
    close : '//button[contains(@area-label, "Close Modal")]', 
    search : '//input[contains(@placeholder, "Search Company Name")]',
    editClientName : '//input[contains(@name, "company")]',
    deletionProgress : "//div[contains(text(),'Deleting')]",

    clientTableSortableCols : "//span[contains(@class,'sorting')]/parent::div/preceding-sibling::div",
    clientTableCols : "//th[not(contains(@class,'sort'))]",
    sortedClientName : "//p[text()='Client Name']/following-sibling::a",
    sortedStatus : "//p[text()='Status']/following-sibling::span",
    sortedStartDate : "//p[text()='Start Date']/following-sibling::span",
    sortedSource : "//p[text()='Source']/following-sibling::p[1]",
    sortedLoc : "//p[text()='Location']/parent::td",
    sortedServicesNeeded : "//p[text()='Services Needed']/parent::td",
    sortedTechStack : "//p[text()='Tech Stack']/parent::td",
    sortedNumberOfTalent : "//p[text()='No. of Talent']/parent::td",
    sortedDateAdded : "//p[text()='Date Added']/parent::td",
    sortedLastUpdated : "//p[text()='Last Updated']/parent::td",

    msaStatusCol : "//p[text()='MSA Status']/following-sibling::div//div[contains(@class,'status')]",
    paginationNextPage : "//a[contains(@title,'Go to the next page')]",
    paginationLastPage : "//a[contains(@title,'Go to the last page')]",
    paginationPrevPage : "//a[contains(@title,'Go to the previous page')]",
    paginationFirstPage : "//a[contains(@title,'Go to the first page')]",


    searchCompanyNameField : "//input[contains(@placeholder,'Search Company Name')]",
    searchButton : "//i[contains(@class,'search-icon')]",
    companySearchResult : "//a[contains(@class,'client-profile')]",

    showingResult: "//div[contains(text(),'Showing')]",


    //New Client
    companyNameField : "//label[text()='Company Name']/following-sibling::input",
    companyField : "//label[text()='Company Status']/following-sibling::span[contains(@class,'select2')]",
    clientDropdownOptions : "//span[contains(@class,'select2-result')]//li",
    isHighGrowthField : "//label[text()='Is High Growth Client?']/following-sibling::span[contains(@class,'select2')]",
    isHighGrowthOptions : "//span[contains(@class,'select2-result')]//li",
    startDateField : "//input[@name='start_date']/following-sibling::input",
    dateTodayPicker : "//span[contains(@class,'today')]",
    countryField: "//label[text()='Country']/following-sibling::div[contains(@class,'country-select')]",
    countryInput : "//input[@id='country-select']",
    countryOptions : "//div[contains(@class,'country-select')]//ul/li/span/span",
    stateRegionField : "//label[text()='State / Region']/following-sibling::div[contains(@class,'state-select')]",
    stateInput : "//input[@id='state-select']",
    stateOptions : "//div[contains(@class,'state-select')]//ul/li/span/span",
    cityField: "//label[text()='City']/following-sibling::div[contains(@class,'city-select')]",
    cityOptions : "//div[contains(@class,'city-select')]//ul/li/span/span",
    addressField : "//label[text()='Address']/following-sibling::input",
    zipCodeField : "//label[text()='ZIP Code']/following-sibling::input",
    timezoneField : "//label[text()='Time Zone']/following-sibling::span/span[@class='selection']",
    enableLoginToggle : "//input[@name='form-checkbox-can_login']/following-sibling::label",
    clientContacts : "//a[contains(text(),'Contacts')]",
    emailColumn : "//td[@class='email-column']",
    enableLogin : "//div[contains(@class,'login-switch')]/input",
    loginEnabled : "//h2[contains(text(),'Contact login is enable')]",
    generateAgreement : "//a[contains(@class,'generate-doc')]",
    generateBtn : "//button[contains(@class,'generate-button')]",
    unsigned : "//span[text()='unsigned']",
    clientStatusList : "//p[text()='Status']/following-sibling::span",
    clientMSAStatusList : "//p[text()='MSA Status']/following-sibling::div//div[contains(@class,'status')]",
    viewMSALinkList : "//p[text()='MSA Status']/following-sibling::div//div[contains(@class,'btn-view-document')]/u",

    //Client Filters
    thead: "//thead",
    filterLocationFld : "//div[@id='location-filter']//div[@class='vue-treeselect__multi-value']",
    filterLocationSelections : "//div[@id='location-filter']//label[@class='vue-treeselect__label']",
    filterServicesNeededFld : "//div[@id='project-needs-filter']//div[@class='vue-treeselect__multi-value']",
    filterServicesNeededSelections : "//div[@id='project-needs-filter']//label[@class='vue-treeselect__label']",
    filterTechStacksFld : "//div[@id='tech-stack-filter']//div[@class='vue-treeselect__multi-value']",
    filterTechStacksSelections : "//div[@id='tech-stack-filter']//label[@class='vue-treeselect__label']",
    filterStatusFld : "//div[@id='status-filter']//div[@class='vue-treeselect__multi-value']",
    filterStatusSelections : "//div[@id='status-filter']//label[@class='vue-treeselect__label']",
    filterHighGrowthFld : "//div[@id='high-growth-filter']//div[@class='vue-treeselect__multi-value']",
    filterHighGrowthSelections : "//div[@id='high-growth-filter']//label[@class='vue-treeselect__label']",
    filterTimeLineFld : "//div[@id='timeline-filter']//div[@class='vue-treeselect__multi-value']",
    filterTimeLineSelections : "//div[@id='timeline-filter']//label[@class='vue-treeselect__label']",
    filterMSAFld : "//div[@id='msa-status-filter']//div[@class='vue-treeselect__multi-value']",
    filterMSASelections : "//div[@id='msa-status-filter']//label[@class='vue-treeselect__label']",
    filterSourceFld : "//div[@id='lead-source-filter']//div[@class='vue-treeselect__multi-value']",
    filterSourceSelections : "//div[@id='lead-source-filter']//label[@class='vue-treeselect__label']",
    
    
    //Client Profile
    clientLogo : "//div[contains(@class,'client-logo')]",
    weeklyFloorReportTab : "//a[contains(text(),'Weekly Floor Report')]",
    teamRequestsTab : "//a[contains(text(),'Team Requests')]",
    teamMembersTab : "//a[contains(text(),'Team Members')]",
    clientNameLink : "//p[contains(@class,'client-name')]",
    weeklyReportZeroStateLabel : "//div[contains(@class,'talent-interview-wrapper')]//div[contains(@class,'justify-content-end')]/div[1]//h2",

    //Client Profile Team Requests Table
    dropRequestedLink : "(//div[contains(@class,'action-dropdowns')]//button[contains(text(),'Drop Requested')])[1]",
    cancelDropRequestLink : "(//div[contains(@class,'action-dropdowns')]//button[contains(text(),'Cancel Drop Request')])[1]",
    dropRequestTalent : "(//div[contains(@class,'photo position-relative')]/a)[1]",
    dropRequestType : "(//div[contains(@class,'align-items-center')]//span[text()='Drop'])[1]",
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

    //Manage Team
    performanceEvaluation : "//span[text()='Performance Review']",
    perfNameList : "//p[contains(@class,'talent-name')]",
    perfEvalButton : "//span[text()='EVALUATE']",
    evalModal: "//div[contains(@class,'review-competencies')]",
    needsImprovement : "//div[contains(@class,'review-competencies')]/div[contains(@class,'text-center')]//input[contains(@id,'option_0')]/parent::div",
    meetsExpectations : "//div[contains(@class,'review-competencies')]/div[contains(@class,'text-center')]//input[contains(@id,'option_1')]/parent::div",
    exceedsExpectations : "//div[contains(@class,'review-competencies')]/div[contains(@class,'text-center')]//input[contains(@id,'option_2')]/parent::div",
    overAllNeedsImprovement : "//div[contains(@class,'summary-feedback')]//div[contains(@class,'text-center')]//input[contains(@id,'option_0')]/parent::div",
    overAllmeetsExpectations: "//div[contains(@class,'summary-feedback')]//div[contains(@class,'text-center')]//input[contains(@id,'option_1')]/parent::div",
    overAllexceedsExpectations: "//div[contains(@class,'summary-feedback')]//div[contains(@class,'text-center')]//input[contains(@id,'option_2')]/parent::div",
    commentsOverallRating: "//div[@class='tox-edit-area']",
    commentsIframe: "//iframe[@class='tox-edit-area__iframe']",
    commentsBody: "//body[@id='tinymce']",
    submitPerfEvalBtn: "//button[contains(text(),'Submit')]",
    submitProgress : "//div[contains(text(),'Wait while saving changes')]",
    cancelPerfEvalBtn: "//button[contains(text(),'Cancel')]",
    perfEvalModalTitle: "//h4[@class='modal-title']",
    nameListWithSubmittedEval: "//span[text()='VIEW SUBMISSION']//ancestor::div[contains(@class,'card-body')]//p[contains(@class,'talent-name')]",
    viewSubmissionBtns: "//span[text()='VIEW SUBMISSION']",

    //MSA Tab
    clientDefaultView : "//h5[text()='Create weekly report to track of important info']",
    msaTab : "//a[contains(text(),'MSA')]",
    uploadSignedDocu: "//a[contains(text(),'Upload Signed Document')]",
    chooseFile : "//input[@id='filename']",
    dateSigned : "//input[@id='date_signed']",
    dateSignedToday : "//span[contains(@class,'today')]",
    signedByName : "//input[@id='signed_by_name']",
    signedByTitle : "//input[@id='signed_by_title']",
    saveMSA : "//span[text()='Save']",
    completeStatus : "//span[contains(@class,'status-complete')]",
    addTalent : "//span[text()='Add Talent']",
    addTalentList : "//table[@id='add-talent-modal']/tbody/tr",
    addTalentNameList: "//table[@id='add-talent-modal']/tbody/tr/td[3]/p[1]",
    addTalentNextPage : "//button[contains(@aria-label,'Go to next page')]",
    addToTeam : "//button[contains(text(),'Add to Team')]",
    confirmAdd : "//div[@class='swal2-actions']/button[text()='OK']",
    employeeAddedName : "//table[@id='resource-manage-team-assigned']/tbody/tr/td/a",
    talentLoadingRecords : "//span[text()='Loading records...']",
}