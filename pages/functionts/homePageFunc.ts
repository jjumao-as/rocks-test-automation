import { expect, type Locator, type Page } from '@playwright/test';
import { homePageLoc } from '../../pages/locatorts/homePageLoc';

export class homePageFunc{
    readonly page: Page;
    readonly homePageLocator: homePageLoc;

    constructor(page: Page){
        this.page = page;
        this.homePageLocator = new homePageLoc(page);

    }

    async navigateToClientList(){
            await this.homePageLocator.clientListTab.click();
            await expect(this.homePageLocator.activeStatusList1).toBeVisible();
            await expect(this.homePageLocator.searchCompanyNameField).toBeVisible();
        }
}
