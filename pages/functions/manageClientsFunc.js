const manageClientsocators = require('../locators/manageClientsLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { expect } = require('@playwright/test');

exports.ManageClientsPage = class ManageClientsPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }

    async navigateClientDashboard() {
        await this.actionDriver.clickButton(manageClientsocators.manageClientDashboard);
    }

    async navigateRecentlySignedUpClients() {
        await this.actionDriver.clickButton(manageClientsocators.recentlySignedUpClients);
    }

    async checkClientProspectsVisibility() {
        await this.actionDriver.checkElementVisibility(manageClientsocators.reviewClientProspects);
    }

    async navigateClientListing(){
        await this.actionDriver.clickButton(manageClientsocators.clientListing);
        await this.actionDriver.checkElementVisibility(manageClientsocators.exportCurrentRecordsBtn);
    }

    async downloadExportCurrentRecords(page) {
        function getCurrentDate() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
          
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click(manageClientsocators.exportCurrentRecordsBtn)
        ]);
        const currentDate = getCurrentDate();
        const downloadedFileName = download.suggestedFilename();
        const expectedStartName = `client_list_${currentDate}_`;
        const expectedEndName = '.csv';

        expect(downloadedFileName).toMatch(new RegExp(`^${expectedStartName}.*${expectedEndName}`));
    }
}