import { expect } from '@playwright/test';
exports.HomePage = class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    //Home Page Elements
    this.MyProfileButton = page.locator('span', {hasText: 'My Profile'})
    this.MyContactsButton = page.locator('span', {hasText: 'My Contacts'})
    this.FindTalentButton = page.locator('span', {hasText: 'Find Talent'})
    this.DocumentsAgreementsButton = page.locator('span', {hasText: 'Documents & Agreements'})   
    this.ManageTeamButton = page.locator('span', {hasText: 'Manage Team'})    
    this.ReportingButton = page.locator('span', {hasText: 'Reporting'})    
    this.NeedHelpButton = page.locator('h4', {hasText: 'Need Help'})     
   //My Profile Elements
   this.MyProfileTitle = page.locator('span', { hasText: 'Technical Profile' })
   this.checkboxWebDevelopment = page.getByRole('checkbox', {name: 'Web Development'})
   this.checkboxQATesting = page.locator('span', {hasText: 'QA Testing'})
   this.checkboxMobileDevelopment = page.locator('span', {hasText: 'Mobile Development'})
   this.webDevelopmentCheckbox = page.locator('label[for="__BVID__60"]')
   //My Contacts Elements
   this.addContactButton = page.locator('a', {hasText: 'Add Contact'})
   this.addContactNameField = page.locator('#text-name')
   this.addContactEmailField = page.getByRole('email')
   this.addContactCountryCode = page.locator('placeholder="Country code"')
   this.addContactPhoneNumber = page.locator('placeholder="Phone number"')
   this.addContactSaveButton = page.locator('a', {name: 'Save'})
   this.addContactCancelButton = page.locator('a', {name: 'Cancel'})
   //Find Talent Elements
   this.searchField = page.getByPlaceholder('Enter a skill, language, or framework')
   this.talentDrawerButton = page.getByTitle('Click to open')
   this.searchButton = page.getByTitle('Search')
   this.addToTeamButton = page.getByTitle('Add to Team')
  }
  // Dynamic elements
  selectTalent (talentName) {
    return this.page.getByText(talentName)
  }
  // CLIENT PORTAL FUNCTIONS =========================================================================================
  //==================================================================================================================
  async navigateMyProfile () {
    return await this.MyProfileButton.click()
  }
  async navigateMyContacts () {
    return await this.MyContactsButton.click()
  }
  async navigateFindTalent () {
    return await this.FindTalentButton.click()
  }
  // CLIENT PORTAL END OF FUNCTIONS ==================================================================================
  //==================================================================================================================

  // MY PROFILE FUNCTIONS ===========================================================================================
  //==================================================================================================================
  async udpateProfile (testData) {
    //What do you need help with? section
    await this.webDevelopmentCheckbox.click()
    //await this.checkboxWebDevelopment.click()
    //await this.checkboxQATesting.click()
    //await this.checkboxMobileDevelopment.click()
    //await this.techNeededDropdown.locator('visible=true').click()
    await this.techNeededDropdown.fill('')
  }
  // MY PROFILE END OF FUNCTIONS =====================================================================================
  //==================================================================================================================

  // MY CONTACTS FUNCTIONS ===========================================================================================
  //==================================================================================================================
  async openAddContact () {
    await this.addContactButton.click()
    await expect(page.getByText('Add Contact')).toBeVisible();
  }
  async fillUpContactForm (testData) {
    await this.addContactNameField.fill(testData.name)
    await this.addContactEmailField.fill(testData.email)
    await this.addContactCountryCode.selectOption(testData.countryCode)
    await this.addContactPhoneNumber.fill(testData.phoneNumber)
  }
  async saveContact () {
    await this.addContactSaveButton.click()
  }
  async cancelContact () {
    await this.addContactCancelButton.click()
  }
  // MY CONTACTS END OF FUNCTIONS ====================================================================================
  //==================================================================================================================

    // FIND TALENT FUNCTIONS ===========================================================================================
  //==================================================================================================================
  async searchTalent (talentData) {
    await this.searchField.fill(talentData);
    await expect(this.page.getByText('Searching...')).toHaveCount(0)
    await this.searchButton.click();
    await this.searchField.click()
    await this.page.waitForLoadState();
    await this.page.keyboard.type(' ');
    await this.selectTalent(talentData).click();
  }
  async selectProfile (profileName) {
    await this.page.getByText(profileName).click()
  }
  async addToTeam () {
    await this.addToTeamButton.click()
  }
  async showTalentDrawer () {
    await this.talentDrawerButton.click()
  }
  // FIND TALENT END OF FUNCTIONS ====================================================================================
  //==================================================================================================================
}