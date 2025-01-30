import { expect, type Locator, type Page } from '@playwright/test';
import { clientProfileLoc } from '../../pages/locatorts/clientProfileLoc';

export class clientProfileFunc{
    readonly page: Page;
    readonly clientProfileLocator: clientProfileLoc; 


    constructor(page: Page){
        this.page = page;
        this.clientProfileLocator = new clientProfileLoc(page);
    }

    async testcheckAddWeeklyReportEntry(){
        await expect(this.clientProfileLocator.addWeeklyReportButton).toBeVisible();
        await this.clientProfileLocator.addWeeklyReportButton.click();
        await expect(this.clientProfileLocator.doHaveGoalSetYesButton).toBeVisible();
        await this.clientProfileLocator.doHaveGoalSetYesButton.click();
        await expect(this.clientProfileLocator.areOnTrackSetYesButton).toBeVisible();
        await this.clientProfileLocator.areOnTrackSetYesButton.click();
        await expect(this.clientProfileLocator.teamProgressSetYesButton).toBeVisible();
        await this.clientProfileLocator.teamProgressSetYesButton.click();
        await expect(this.clientProfileLocator.needMoreInTeamSetNoButton).toBeVisible();
        await this.clientProfileLocator.needMoreInTeamSetYesButton.click();
        await expect(this.clientProfileLocator.needWhatSpecificTalentOnTeamLabel).toBeVisible();
        await expect(this.clientProfileLocator.needHowLongTalentNeededLabel).toBeVisible();
        await expect(this.clientProfileLocator.needMoreInTeamSetNoButton).toBeVisible();
        await this.clientProfileLocator.needMoreInTeamSetNoButton.click();
        await expect(this.clientProfileLocator.weeklyReportSaveButton).toBeVisible();
        await this.clientProfileLocator.weeklyReportSaveButton.click();
    }
    async testcheckEditWeeklyReportSaved(){
        await expect(this.clientProfileLocator.weeklyReportOnTrackGrid).toBeVisible();
        await expect(this.clientProfileLocator.weeklyReportOnTrackRowEdit).toBeVisible();
        await this.clientProfileLocator.weeklyReportOnTrackRowEdit.click();
        await expect(this.clientProfileLocator.weeklyReportEditHeading).toBeVisible();
        await expect(this.clientProfileLocator.weeklyReportEditSaveButton).toBeVisible();
        await expect(this.clientProfileLocator.weeklyReportEditCancelButton).toBeVisible();
        await this.clientProfileLocator.weeklyReportEditSaveButton.click();
        await expect(this.clientProfileLocator.weeklyReportEditSavedPrompt).toBeVisible();
    }
    async testcheckCancelDeleteWeeklyReport(){
        await expect(this.clientProfileLocator.weeklyReportOnTrackRowDelete).toBeVisible();
        await this.clientProfileLocator.weeklyReportOnTrackRowDelete.click();
        await expect(this.clientProfileLocator.weeklyReportDeleteHeading).toBeVisible();
        await expect(this.clientProfileLocator.weeklyReportDeleteCancelButton).toBeVisible();
        await expect(this.clientProfileLocator.weeklyReportDeleteYesButton).toBeVisible();
        await this.clientProfileLocator.weeklyReportDeleteCancelButton.click();
    }
    async testcheckSucessfulDeleteWeeklyReport(){
        await expect(this.clientProfileLocator.weeklyReportOnTrackRowDelete).toBeVisible();
        await this.clientProfileLocator.weeklyReportOnTrackRowDelete.click();
        await expect(this.clientProfileLocator.weeklyReportDeleteHeading).toBeVisible();
        await expect(this.clientProfileLocator.weeklyReportDeleteCancelButton).toBeVisible();
        await expect(this.clientProfileLocator.weeklyReportDeleteYesButton).toBeVisible();
        await this.clientProfileLocator.weeklyReportDeleteYesButton.click();
        await expect(this.clientProfileLocator.weeklyReportDeletedPrompt).toBeVisible();
    }
}
