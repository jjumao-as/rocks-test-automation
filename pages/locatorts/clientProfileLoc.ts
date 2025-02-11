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
    readonly weeklyFloorReportTab : Locator;
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
    readonly checkpointMeetingsTab : Locator;
    readonly checkpointMeetingsAddNoteButton : Locator;
    readonly checkpointMeetingsSaveDraftButton : Locator;
    readonly checkpointMeetingsSaveSendButton : Locator;
    readonly checkpointMeetingsNoteClientContactLabel : Locator;
    readonly checkpointMeetingsNoteMonthYearLabel : Locator;
    readonly checkpointMeetingsNoteTypeLabel : Locator;
    readonly checkpointMeetingsNoteMethodLabel : Locator;
    readonly checkpointMeetingsNoteCancelButton : Locator;
    readonly checkpointMeetingsClientNamePlaceHolder : Locator;
    readonly checkpointMeetingsClientNameDropdown : Locator;
    readonly checkpointMeetingsClientNameFillField : Locator;
    readonly checkpointMeetingsDeleteNoteButton : Locator;
    readonly checkpointMeetingsDeleteYesButton : Locator;
    readonly checkpointMeetingsDeleteCancelButton : Locator;
    readonly checkpointMeetingsNoCheckpointAddedLabel : Locator;
    readonly checkpointMeetingsLoadingRecordsPrompt : Locator;
    readonly meetingstAskDeleteHeading : Locator;


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
        this.weeklyFloorReportTab = page.getByRole('tab', { name: 'Weekly Floor Report' });
        this.checkpointMeetingsTab = page.getByRole('tab', { name: 'Checkpoint Meetings' });
        this.checkpointMeetingsAddNoteButton = page.getByRole('button', { name: ' Add Note' });
        this.checkpointMeetingsSaveDraftButton = page.getByRole('button', { name: 'Save draft' }).first();
        this.checkpointMeetingsSaveSendButton = page.getByRole('button', { name: 'Save & Send' }).first();
        this.checkpointMeetingsNoteClientContactLabel = page.getByText('Client Contact');
        this.checkpointMeetingsNoteMonthYearLabel = page.getByText('Month and Year *');
        this.checkpointMeetingsNoteTypeLabel = page.getByText('Type *');
        this.checkpointMeetingsNoteMethodLabel = page.getByText('Method *');
        this.checkpointMeetingsNoteCancelButton = page.getByRole('button', { name: 'Cancel' }).first();
        this.checkpointMeetingsClientNamePlaceHolder = page.getByText('Select from list or enter name');
        this.checkpointMeetingsClientNameDropdown = page.locator('.multiselect__tags');
        this.checkpointMeetingsClientNameFillField = page.getByRole('textbox', { name: 'Month and Year * Client' });
        this.checkpointMeetingsDeleteNoteButton = page.getByRole('button', { name: '' });
        this.checkpointMeetingsDeleteYesButton = page.getByRole('button', { name: 'Yes' });
        this.checkpointMeetingsDeleteCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.checkpointMeetingsNoCheckpointAddedLabel = page.getByRole('heading', { name: 'No checkpoint meetings added' });
        this.checkpointMeetingsLoadingRecordsPrompt = page.locator('#client-checkpoint-meeting-datatable div').filter({ hasText: 'Loading records...' });
        this.meetingstAskDeleteHeading = page.getByRole('heading', { name: 'Are you sure you want to' });
    }
}
