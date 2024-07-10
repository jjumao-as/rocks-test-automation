import { expect } from '@playwright/test';
const { sleep } = require('../../utils/utility')
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
    this.homePageButton = page.getByTitle('Go to homepage') 
    this.dropdownMenu = page.locator('.nav-item.dropdown.ks-user')    
    this.changeTimeZoneButton = page.locator('span', {hasText: 'Change Timezone'})   
    //My Profile Elements
    this.MyProfileTitle = page.locator('span', { hasText: 'Technical Profile' })
    this.searchBar = page.getByPlaceholder('Search Rocks');
    this.searchName = page.getByText('Macasaet, Luis Francisco Trinidad Employee');
    this.skillEditButton = page.locator('.fs-field > .card > .card-header > .btn');
    this.skillNightWatch = page.locator('.col-lg-12 > div:nth-child(6)').first();
    this.showInProfile = page.locator('//*[@id="skill"]/div[2]/div[6]/div[5]/div');
    this.saveShowInProfile = page.getByRole('button', { name: 'Save' });
    //----What do you need help checkboxes
    this.checkboxWebDevelopment = page.locator('#__BVID__60')
    this.checkboxQATesting = page.locator('#__BVID__61')
    this.checkboxMobileDevelopment = page.locator('#__BVID__62')
    //----Which of the following are currently on your team checkboxes
    this.checkboxProductManager = page.locator('#__BVID__63')
    this.checkboxProductOwner = page.locator('#__BVID__64')
    this.checkboxLeadDeveloper = page.locator('#__BVID__65')
    this.checkboxNone = page.locator('#__BVID__66')
    //----Other form elements
    this.otherTechUseField = page.locator('#text-5')
    this.techUseField = page.locator('.multiselect__select')
    this.profileSaveButton = page.getByRole('button', {name: 'SAVE'})
    this.profileCancelButton = page.getByRole('button', {name: 'CANCEL'})
    //My Contacts Elements
    this.addContactButton = page.locator('a', {hasText: 'Add Contact'})
    this.addContactNameField = page.locator('#text-name')
    this.addContactEmailField = page.locator('input[type="email"]')
    this.addContactCountryCode = page.locator('placeholder="Country code"')
    this.addContactPhoneNumber = page.locator('input[type="tel"]')
    this.addContactSaveButton = page.locator('button', { hastText: 'SAVE'})
    this.addContactCancelButton = page.locator('button').filter({ hasText: 'CANCEL' })
    //Find Talent Elements
    this.searchField = page.getByPlaceholder('Enter a skill, language, or framework')
    this.talentDrawerButton = page.getByTitle('Click to open')
    this.addToTeamButton = page.getByTitle('Add to Team')
    this.findTalentUrl = page.getByRole('button', { name: ' Find Talent' });
    this.firstTalent = page.locator('.card-footer > .btn').first();
    this.aboutMe = page.getByRole('heading', { name: 'About Me' });
    this.skills = page.getByRole('heading', { name: 'Skills' });
    this.clientSpotlight = page.getByRole('heading', { name: 'Client Spotlight' });
    this.competencies = page.getByRole('heading', { name: 'Competencies', exact: true });
    this.workExperience = page.getByRole('heading', { name: 'Work Experience' });
    this.education = page.getByRole('heading', { name: 'Education' });
    this.yearsOfExperience = page.getByRole('heading', { name: 'Years of Experience' });
    this.availability = page.getByRole('heading', { name: 'Availability' });
    this.otherTalent = page.getByText('Other Talent:');
    this.otherTalentfirst = page.locator('#modalDescription').getByRole('link', { name: 'VIEW PROFILE' }).first();
    this.bookACallButton = page.getByRole('link', { name: 'Book a Call' });
    this.closeButtonProfile = page.getByRole('link', { name: '' });
    this.searchSkill = page.getByPlaceholder('Enter a skill, language, or');
    this.searchButton = page.getByTitle('Search');
    this.clickDropdown = page.getByText('Nightwatch');
  }
  // Dynamic elements
  selectTalent (talentName) {
    return this.page.getByText(talentName)
  }
  // CLIENT PORTAL FUNCTIONS =========================================================================================
  //==================================================================================================================
  async navigateMyProfile() {
    return await this.MyProfileButton.click()
  }
  async navigateMyContacts() {
    return await this.MyContactsButton.click()
  }
  async navigateFindTalent() {
    return await this.FindTalentButton.click()
  }
  async navigateHOme () {
    await this.homePageButton.click()
  }
  async openChangeTimeZone () {
    await this.dropdownMenu.click();
    await this.changeTimeZoneButton.click();
  }
  async updateTimeZone (testData) {
    await this.page.locator('#modalDescription span.selection').click()
    await this.page.keyboard.type(testData);
    await this.page.keyboard.press('Enter');
  }
  async setTimeZone () {
    await this.page.getByRole('button', { name: 'Set' }).click()
  }
  async closeTimeZoneModal () {
    await this.page.getByTitle('Press Esc to close').click()
  }
  // CLIENT PORTAL END OF FUNCTIONS ==================================================================================
  //==================================================================================================================

  // MY PROFILE FUNCTIONS ===========================================================================================
  //==================================================================================================================
  async udpateProfile(testData) {
    //What do you need help with? section
    await this.checkboxWebDevelopment.uncheck( { force: true } )
    await this.checkboxQATesting.uncheck( { force: true } )
    await this.checkboxMobileDevelopment.uncheck( { force: true } )
    await testData.needHelp.forEach(element => {
      this.page.getByLabel(element).check( { force: true } )
    });
    //What tech does or will your project use? section
    await this.techUseField.click()
    await this.page.keyboard.press('Backspace');
    await this.page.keyboard.press('Backspace');
    await this.page.keyboard.type(testData.techUsed);
    await sleep(2000)
    await this.page.locator('li').filter({ hasText: testData.techUsed }).click();
    await this.techUseField.click()
    //Other techonologies you use section
    await this.otherTechUseField.fill(testData.otherTech)
    //Which of the following are currently on your team? section
    await sleep(4000)
    await this.checkboxNone.check({force: true})
    this.checkboxProductManager.uncheck( { force: true } )
    this.checkboxProductOwner.uncheck( { force: true } )
    this.checkboxLeadDeveloper.uncheck( { force: true } )
    this.checkboxNone.uncheck( { force: true } )
    await testData.currentlyOnTeam.forEach(element => {
      if(element === 'None') { this.checkboxNone.check( { force: true } ) }
      if(element === 'Product Manager') { this.checkboxProductManager.check( { force: true } ) }
      if(element === 'Lead Developer') { this.checkboxLeadDeveloper.check( { force: true } ) }
      if(element === 'Product Owner') { this.checkboxProductOwner.check( { force: true } ) }
    });
  }
  async saveUpdates () {
    await this.profileSaveButton.click()
    await sleep(4000)
    
  }
  async cancelUpdates () {
    await this.profileCancelButton.click()
  }
  // MY PROFILE END OF FUNCTIONS =====================================================================================
  //==================================================================================================================

  // MY CONTACTS FUNCTIONS ===========================================================================================
  //==================================================================================================================
  async openAddContact() {
    await this.addContactButton.click()
    await expect(this.page.getByRole('heading', { name: 'Add Contact' })).toBeVisible();
  }
  async fillUpContactForm(testData) {
    await this.addContactNameField.fill(testData.name)
    await this.addContactEmailField.fill(testData.email)
    //await this.addContactCountryCode.selectOption(testData.countryCode)
    await this.addContactPhoneNumber.fill(testData.phoneNumber)
  }
  async saveContact() {
    await this.addContactSaveButton.click()
  }
  async cancelContact() {
    await this.addContactCancelButton.click()
  }
  /* TO DO EDIT HAVING TROUBLE CLICKING SPECIFIC EDIT BUTTON ON THE SELECTED CONTACT
  *async openEditContact() {
  *  await this.page.locator('//button[contains(@id,"dropdownMenuButton-contact")]').filter(this.page.locator('td', {hasText: 'Sophia Greenholt'})).click()
  *}
  */
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
  // FIND TALENT FUNCTIONS============================================================================================
  //==================================================================================================================
  async navigateFindTalent() {
    return await this.findTalentUrl.click();
  }
  async selectFirstTalent() {
    await this.firstTalent.click();
  }
  async checkStaticSections() {
    await this.yearsOfExperience.textContent('Years of Experience');
    await this.availability.textContent('Availability');
    await this.otherTalent.textContent('Other Talent:')
  }
  async selectOtherTalent() {
    await this.otherTalentfirst.click();
  }
  async closePopupProfilePage() {
    await this.closeButtonProfile.click();
  }
  async openBookACallModal() {
    await this.bookACallButton.click();
  }
  async enterSkillToSearch() {
    await this.searchSkill.click();
    await this.searchSkill.fill('Nightwatch');
    await this.searchSkill.press('Enter');
  }
  // FIND TALENT END OF FUNCTIONS ====================================================================================
  //==================================================================================================================

  // TEST ARTIFACTS============================================================================================
  //==================================================================================================================
  async clickShowInProfile() {
    await this.searchBar.click();
    await this.searchBar.fill('Luis Macasaet');
    await this.searchName.click();
    await this.skillEditButton.click();
    await this.skillNightWatch.isVisible();
    await this.showInProfile.click();
    await this.saveShowInProfile.click();
  }
}