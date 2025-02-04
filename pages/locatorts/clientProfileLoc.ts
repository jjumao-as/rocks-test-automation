import { type Locator, type Page } from '@playwright/test';


export class clientProfileLoc{
    readonly page: Page;
    readonly addWeeklyReportButton : Locator;
    readonly doHaveGoalSetYesButton : Locator;
    readonly areOnTrackSetYesButton : Locator;
    readonly teamProgressSetYesButton : Locator;
    readonly needMoreInTeamSetYesButton : Locator;
    readonly needWhatSpecificTalentOnTeamLabel : Locator;
    readonly needHowLongTalentNeededLabel : Locator;
    readonly needMoreInTeamSetNoButton : Locator;
    readonly weeklyReportSaveButton : Locator;
    readonly weeklyReportOnTrackGrid : Locator;
    readonly weeklyReportOnTrackRowEdit : Locator;
    readonly weeklyReportEditHeading : Locator;
    readonly weeklyReportEditSaveButton : Locator;
    readonly weeklyReportEditCancelButton : Locator;
    readonly weeklyReportEditSavedPrompt : Locator;
    readonly weeklyReportOnTrackRowDelete : Locator;
    readonly weeklyReportDeleteHeading : Locator;
    readonly weeklyReportDeleteCancelButton : Locator;
    readonly weeklyReportDeleteYesButton : Locator;
    readonly weeklyReportDeletedPrompt : Locator;


    constructor(page: Page){
        this.page = page;
        this.addWeeklyReportButton = page.getByText('Add Report');
        this.doHaveGoalSetYesButton = page.locator('#radio-1 label').filter({ hasText: 'Yes' });
        this.areOnTrackSetYesButton = page.locator('#radio-2 label').filter({ hasText: 'Yes' });
        this.teamProgressSetYesButton = page.locator('#radio-3 label').filter({ hasText: 'Yes' });
        this.needMoreInTeamSetYesButton = page.locator('#radio-9 label').filter({ hasText: 'Yes' });
        this.needWhatSpecificTalentOnTeamLabel = page.getByText('What specific talent are');
        this.needHowLongTalentNeededLabel = page.getByText('How long are the talent');
        this.needMoreInTeamSetNoButton = page.locator('#radio-9 label').filter({ hasText: 'No' });
        this.weeklyReportSaveButton = page.getByRole('button', { name: 'Save' });
        this.weeklyReportOnTrackGrid = page.getByRole('gridcell').filter({ hasText: 'On Track' }).first();
        this.weeklyReportOnTrackRowEdit = page.getByRole('row').filter({ hasText: 'On Track' }).locator('a').nth(1);
        this.weeklyReportEditHeading = page.getByRole('heading', { name: 'Edit Weekly Floor Report' });
        this.weeklyReportEditSaveButton = page.getByRole('button', { name: 'Save' });
        this.weeklyReportEditCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.weeklyReportEditSavedPrompt = page.getByRole('heading', { name: 'Report successfully saved.' });
        this.weeklyReportOnTrackRowDelete = page.getByRole('row').filter({ hasText: 'On Track' }).locator('a').nth(2);
        this.weeklyReportDeleteHeading = page.getByRole('heading', { name: 'Are you sure you want to' });
        this.weeklyReportDeleteCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.weeklyReportDeleteYesButton = page.getByRole('button', { name: 'Yes' });
        this.weeklyReportDeletedPrompt = page.getByText('Successfully deleted report×');

    }
}
