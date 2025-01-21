import { type Locator, type Page } from '@playwright/test';

export class homePageLoc{
    readonly page: Page;
    readonly clientListTab : Locator;
    readonly activeStatusList1 : Locator;
    readonly searchCompanyNameField : Locator;


    constructor(page: Page){
        this.page = page;
        this.clientListTab = page.getByRole('button', { name: ' Client List' });
        this.activeStatusList1 = page.locator('td:nth-child(3)').first();
        this.searchCompanyNameField = page.getByPlaceholder('Search Company Name');

    }
    
}
