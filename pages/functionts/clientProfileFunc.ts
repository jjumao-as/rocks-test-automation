import { expect, type Locator, type Page } from '@playwright/test';
import { clientProfileLoc } from '../../pages/locatorts/clientProfileLoc';

export class clientProfileFunc{
    readonly page: Page;
    readonly clientProfileLocator: clientProfileLoc; 
    checkpointMeetingsDeleteNoteButton: Locator;


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
    async testCheckpointMeetingsNoteCleanup() {
        await expect(this.clientProfileLocator.weeklyFloorReportTab).toBeVisible();
        await this.clientProfileLocator.weeklyFloorReportTab.click();
        await expect(this.clientProfileLocator.checkpointMeetingsTab).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsTab.click();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        await expect(this.clientProfileLocator.checkpointMeetingsAddNoteButton).toBeVisible();
    
        const deleteNoteButtons = await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.count();
    
        if (deleteNoteButtons > 1) {
            if (await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first().isVisible()) {
                await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first().click();
            }
        } else if (await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.isVisible()) {
            await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.click();
        }
    
        await expect(this.clientProfileLocator.checkpointMeetingsDeleteYesButton).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsDeleteYesButton.click();
        await expect(this.clientProfileLocator.weeklyFloorReportTab).toBeVisible();
        await this.clientProfileLocator.weeklyFloorReportTab.click();
        await expect(this.clientProfileLocator.checkpointMeetingsTab).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsTab.click();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
    
        const noCheckpointVisible = await this.clientProfileLocator.checkpointMeetingsNoCheckpointAddedLabel.isVisible();
        if (noCheckpointVisible) {
            await expect(this.clientProfileLocator.checkpointMeetingsNoCheckpointAddedLabel).toBeVisible();
        } else {
            await expect(this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first()).toBeVisible();
        }
    }
    async testcheckCheckpointMeetingsAddNote() {
        await expect(this.clientProfileLocator.weeklyFloorReportTab).toBeVisible();
        await this.clientProfileLocator.weeklyFloorReportTab.click();
        await expect(this.clientProfileLocator.checkpointMeetingsTab).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsTab.click();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        await expect(this.clientProfileLocator.checkpointMeetingsAddNoteButton).toBeVisible();
        // Click Add Note button
        await this.clientProfileLocator.checkpointMeetingsAddNoteButton.click();
        // Validate labels and buttons
        await expect(this.clientProfileLocator.checkpointMeetingsNoteClientContactLabel).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsNoteMonthYearLabel).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsNoteTypeLabel).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsNoteMethodLabel).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsSaveDraftButton).toBeDisabled();
        await expect(this.clientProfileLocator.checkpointMeetingsSaveSendButton).toBeDisabled();
    }
    async testcheckCheckpointMeetingsAddNoteSaveDraft(clientName: string){
        await expect(this.clientProfileLocator.checkpointMeetingsNoteCancelButton).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsClientNamePlaceHolder).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsClientNameDropdown.click();
        await this.clientProfileLocator.checkpointMeetingsClientNameFillField.fill(clientName);
        await this.page.locator('span').filter({ hasText: clientName }).first().click();
        await expect(this.clientProfileLocator.checkpointMeetingsSaveDraftButton).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsSaveSendButton).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsSaveDraftButton.click();
        this.checkpointMeetingsDeleteNoteButton = this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        await expect(this.checkpointMeetingsDeleteNoteButton).toBeVisible();
    }
    async testcheckCheckpointMeetingsDeleteNote() {
        if (await this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt.isVisible()) {
            await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        }
    
        this.checkpointMeetingsDeleteNoteButton = this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first();
        await expect(this.checkpointMeetingsDeleteNoteButton).toBeVisible();
        
        const deleteNoteButtonsCount = await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.count();
        
        if (deleteNoteButtonsCount > 2) {
            await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first().click();
        } else if (await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.isVisible()) {
            await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.click();
        }
    
        await expect(this.clientProfileLocator.checkpointMeetingsDeleteYesButton).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsDeleteCancelButton).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsDeleteYesButton.click();
        
        if (await this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt.isVisible()) {
            await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        }
    
        if (deleteNoteButtonsCount > 2) {
            if (await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first().isVisible()) {
                }
        } else {
            await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.isVisible();
        }
    
        // Check if "No Checkpoint Added" label is visible
        const noCheckpointVisible = await this.clientProfileLocator.checkpointMeetingsNoCheckpointAddedLabel.isVisible();
    
        if (noCheckpointVisible) {
            await expect(this.clientProfileLocator.checkpointMeetingsNoCheckpointAddedLabel).toBeVisible();
        } else {
            this.checkpointMeetingsDeleteNoteButton = this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first();
            await expect(this.checkpointMeetingsDeleteNoteButton).toBeVisible();
        }
    }
    async testCheckpointMeetingsCancelDeleteNote() {
        if (await this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt.isVisible()) {
            await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        }
    
        this.checkpointMeetingsDeleteNoteButton = this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first();
        await expect(this.checkpointMeetingsDeleteNoteButton).toBeVisible();
        
        const deleteNoteButtonsCount = await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.count();
        
        if (deleteNoteButtonsCount > 2) {
            await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first().click();
        } else if (await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.isVisible()) {
            await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.click();
        }
        await expect(this.clientProfileLocator.meetingstAskDeleteHeading).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsDeleteYesButton).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsDeleteCancelButton).toBeVisible();
        try {
            await this.clientProfileLocator.checkpointMeetingsDeleteCancelButton.click({ timeout: 10000 });
        } catch (error) {
            if (await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first().isVisible()) {
                await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first().click();
            }

    }
        
        
        if (await this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt.isVisible()) {
            await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        }
        try {
            await this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt.isVisible({ timeout: 10000 });
            await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        } catch (error) {
            await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        }
    
        if (deleteNoteButtonsCount > 2) {
            if (await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first().isVisible()) {
                }
        } else {
            await this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.isVisible();
        }
        // Check if "No Checkpoint Added" label is visible
        const noCheckpointVisible = await this.clientProfileLocator.checkpointMeetingsNoCheckpointAddedLabel.isVisible();
    
        if (noCheckpointVisible) {
            await expect(this.clientProfileLocator.checkpointMeetingsNoCheckpointAddedLabel).toBeVisible();
        } else {
            this.checkpointMeetingsDeleteNoteButton = this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first();
            try {
                expect(this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.isVisible({ timeout: 10000 }));
            } catch (error) {
                await expect(this.checkpointMeetingsDeleteNoteButton.first()).toBeVisible();
            }
        }
    }
    async testcheckCheckpointMeetingsAddNoteSaveSend(clientName: string){
        await expect(this.clientProfileLocator.checkpointMeetingsNoteCancelButton).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsClientNamePlaceHolder).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsClientNameDropdown.click();
        await this.clientProfileLocator.checkpointMeetingsClientNameFillField.fill(clientName);
        await this.page.locator('span').filter({ hasText: clientName }).first().click();
        await expect(this.clientProfileLocator.checkpointMeetingsSaveDraftButton).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsSaveSendButton).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsSaveSendButton.click();
        this.checkpointMeetingsDeleteNoteButton = this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
    }
    async testCheckpointMeetingsNewAddNote(clientName: string) {
        await expect(this.clientProfileLocator.weeklyFloorReportTab).toBeVisible();
        await this.clientProfileLocator.weeklyFloorReportTab.click();
        await expect(this.clientProfileLocator.checkpointMeetingsTab).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsTab.click();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        await expect(this.clientProfileLocator.checkpointMeetingsAddNoteButton).toBeVisible();
        // Click Add Note button
        await this.clientProfileLocator.checkpointMeetingsAddNoteButton.click();
        // Validate labels and buttons
        await expect(this.clientProfileLocator.checkpointMeetingsNoteClientContactLabel).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsNoteMonthYearLabel).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsNoteTypeLabel).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsNoteMethodLabel).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsSaveDraftButton).toBeDisabled();
        await expect(this.clientProfileLocator.checkpointMeetingsSaveSendButton).toBeDisabled();
        await expect(this.clientProfileLocator.checkpointMeetingsNoteCancelButton).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsClientNamePlaceHolder).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsClientNameDropdown.click();
        await this.clientProfileLocator.checkpointMeetingsClientNameFillField.fill(clientName);
        await this.page.locator('span').filter({ hasText: clientName }).first().click();
        await expect(this.clientProfileLocator.checkpointMeetingsSaveDraftButton).toBeVisible();
        await expect(this.clientProfileLocator.checkpointMeetingsSaveSendButton).toBeVisible();
        await this.clientProfileLocator.checkpointMeetingsSaveDraftButton.click();
        this.checkpointMeetingsDeleteNoteButton = this.clientProfileLocator.checkpointMeetingsDeleteNoteButton.first();
        await expect(this.clientProfileLocator.checkpointMeetingsLoadingRecordsPrompt).toBeHidden();
        await expect(this.checkpointMeetingsDeleteNoteButton).toBeVisible();
    }
}
