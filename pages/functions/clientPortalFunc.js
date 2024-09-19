const clientPortalLocators = require('../locators/clientPortalLoc');
const manageClientLocators = require('../locators/manageClientsLoc');
const ActionDriver = require('../../utils/ActionDriver');

exports.ClientPortalPage = class ClientPortalPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    //Manage Team menu
    async checkManageTeamMenuVisibility() {
        await this.actionDriver.checkElementVisibility(clientPortalLocators.manageTeam);
    }

    //Click the Manage Team menu
    async navigateManageTeam() {
        await this.actionDriver.clickButton(clientPortalLocators.manageTeam);
    }

    //To assert that the first Acttive talent's context menu are already loaded 
    async checkMyTeamTableVisibility() {
        await this.actionDriver.checkElementVisibility(clientPortalLocators.contextMenuActiveTalent);
    }

    //Get the first Active talent name 
    async dropTalentName() {
        const name = (await this.actionDriver.getText(clientPortalLocators.talentNameSelectedRow));  
        console.log('Talent to drop: ' + name);
        return name;        
    }

    //drop to team request
    async dropFromMyTeam(){
        await this.actionDriver.clickButton(clientPortalLocators.contextMenuActiveTalent);
        await this.actionDriver.clickButton(clientPortalLocators.dropFromMyTeamSelectActionMenu);
        await this.actionDriver.checkElementVisibility(clientPortalLocators.dropFromMyTeamRequestModalHeader);
        await this.actionDriver.checkElementVisibility(clientPortalLocators.reasonDropDown);
        await this.actionDriver.clickButton(clientPortalLocators.reasonDropDown);
        await this.actionDriver.checkElementVisibility(clientPortalLocators.budgetaryAdjustmentReason);
        await this.actionDriver.clickButton(clientPortalLocators.budgetaryAdjustmentReason);
        await this.actionDriver.clickButton(clientPortalLocators.submitButton);
        await this.actionDriver.checkElementVisibility(clientPortalLocators.OKthankYouButton);
        await this.actionDriver.clickButton(clientPortalLocators.OKthankYouButton);        
    }

    //To verify the drop requested talent matches in the table
    async dropTalentNameConfirmed(nameValue){
        const name = await this.actionDriver.getText(clientPortalLocators.talentNameConfirmed + nameValue + "')]");
        console.log('Drop requested: ' + name);
    }

    //To verify in the Admin client profile the drop requested talent status
    async dropTalentNameConfirmedAdmin(){
        await this.actionDriver.checkElementVisibility(manageClientLocators.clientListing);
        await this.actionDriver.clickButton(manageClientLocators.clientListing);
        await this.actionDriver.waitElementUntilHidden(manageClientLocators.loadingRecords);
        await this.actionDriver.waitElementUntilHidden(manageClientLocators.loadingOverlay);
        await this.actionDriver.waitElementUntilVisible(manageClientLocators.clientTableBody);
        await this.actionDriver.checkElementVisibility(manageClientLocators.clients);
        await this.actionDriver.checkElementVisibility(manageClientLocators.searchCompanyNameField);
        await this.actionDriver.setText(manageClientLocators.searchCompanyNameField, "EmployeeDB");
        await this.actionDriver.keyboardPress('Enter');
        await this.actionDriver.waitElementUntilHidden(manageClientLocators.loadingRecords);
        await this.actionDriver.clickButton(manageClientLocators.companySearchResult);
        await this.actionDriver.checkElementVisibility(manageClientLocators.clientLogo);
        await this.actionDriver.checkElementVisibility(manageClientLocators.teamRequestsTab);
        await this.actionDriver.clickButton(manageClientLocators.teamRequestsTab);               
   }

    //Verify the drop requested talent
    async dropTalentStatusCheck(){      
        await this.actionDriver.waitElementUntilHidden(manageClientLocators.loadingRecords);  
        await this.actionDriver.checkElementVisibility(manageClientLocators.dropRequestTalent);                
        await this.actionDriver.checkElementVisibility(manageClientLocators.dropRequestType);
        await this.actionDriver.checkElementVisibility(manageClientLocators.dropRequestedLink);
     }
}
