import { expect, type Locator, type Page } from '@playwright/test';
import { clientListLoc } from '../../pages/locatorts/clientListLoc';

export class clientListFunc{
    readonly page: Page;
    readonly clientListLocator: clientListLoc; 


    constructor(page: Page){
        this.page = page;
        this.clientListLocator = new clientListLoc(page);
    }

    async searchCompanyFieldInput(companyName: string){
            await expect(this.clientListLocator.searchCompanyNameField).toBeVisible();
            await this.clientListLocator.searchCompanyNameField.click();
            await this.clientListLocator.searchCompanyNameField.fill(companyName);
        }
    
    async searchCompanyButtonClick(){
            await expect(this.clientListLocator.searchCompanyNameButton).toBeVisible();
            await this.clientListLocator.searchCompanyNameButton.click();
        }

    async selectCompanySearchResultFSClick(){
            await expect(this.clientListLocator.resultClientListFSFasttrack).toBeVisible({ timeout: 50000 });
            await this.clientListLocator.resultClientListFSFasttrack.click();
            await this.clientListLocator.resultClientListFSFasttrackLink.click();
        }

    async checkCompanyProfileStatusActive(){
            await expect(this.clientListLocator.clientProfileStatusActive).toBeVisible();
        }
    
    async checkCompanyProfileMemberCount(){
            await expect(this.clientListLocator.clientProfileMemberCount).toBeVisible();
            await expect(this.clientListLocator.clientProfileMemberCountN).toBeVisible();
        }

    async checkCompanyMemberDashboardCount(){
            await expect(this.clientListLocator.clientMemberDashboardCount).toBeVisible();
        }
    
    async checkClientTechProfileTab(){
            await expect(this.clientListLocator.clientTechProfileTab).toBeVisible();
        }

    async checkClientWeeklyFloorReportTab(){
            await expect(this.clientListLocator.clientWeeklyFloorReportTab).toBeVisible();
        }

    async clientWeeklyFloorReportTabClick(){
            await this.clientListLocator.clientWeeklyFloorReportTab.click();
        }

    async checkWeeklyFloorAddReportButton(){
            await expect(this.clientListLocator.clientWeeklyFloorAddReportButton).toBeVisible();
        }

    async checkCheckpointMeetingTab(){
            await expect(this.clientListLocator.clientCheckpointMeetingTab).toBeVisible();
        }

    async checkpointMeetingTabClick(){
            await this.clientListLocator.clientCheckpointMeetingTab.click();
        }

    async checkClientCheckpointMeetingDashboard(){
            await expect(this.clientListLocator.clientCheckpointMeetingDashboard).toBeVisible();
        }

    async checkClientPerformanceReviewTab(){
            await expect(this.clientListLocator.clientPerformanceReviewTab).toBeVisible();
        }
    
    async clientPerformanceReviewTabClick(){
            await this.clientListLocator.clientPerformanceReviewTab.click();
        }
    
    async checkClientAllReviewDashboard(){
            await expect(this.clientListLocator.clientAllReviewDashboard).toBeVisible();
        }

    async checkClientPerformanceReviewDashboard(){
            await expect(this.clientListLocator.clientPerformanceReviewDashboard).toBeVisible();
        }
    
    async checkClientTalentInterviewTab(){
            await expect(this.clientListLocator.clientTalentInterviewTab).toBeVisible();
        }
    
    async clientTalentInterviewTabClick(){
            await this.clientListLocator.clientTalentInterviewTab.click();
        }

    async checkAddInterviewButton(){
            await expect(this.clientListLocator.clientAddInterviewButton).toBeVisible();
        }
    
    async checkClientTeamRequestTab(){
            await expect(this.clientListLocator.clientTeamRequestTab).toBeVisible();
        }

    async clientTeamRequestTabClick(){
            await this.clientListLocator.clientTeamRequestTab.click();
        }

    async checkClientTeamMemberTab(){
            await expect(this.clientListLocator.clientTeamMemberTab).toBeVisible();
        }

    async clientTeamMemberTabClick(){
            await this.clientListLocator.clientTeamMemberTab.click();
        }

    async checkAddTalentButton(){
            await expect(this.clientListLocator.clientAddTalentButton).toBeVisible();
        }

    async checkClientActiveMembersLabel(){
            await expect(this.clientListLocator.clientActiveMembersLabel).toBeVisible();
        }

    async checkClientContactsTab(){
            await expect(this.clientListLocator.clientContactsTab).toBeVisible();
        }

    async clientContactsTabClick(){
            await this.clientListLocator.clientContactsTab.click();
        }

    async checkClientAddContactsButton(){
            await expect(this.clientListLocator.clientAddContactsButton).toBeVisible();
        }
    
    async checkClientMSATab(){
            await expect(this.clientListLocator.clientMSATab).toBeVisible();
        }

    async clientMSATabClick(){
            await this.clientListLocator.clientMSATab.click();
        }

    async checkClientUploadSignedDocuButton(){
            await expect(this.clientListLocator.clientUploadSignedDocuButton).toBeVisible();
        }

    async clientTechProfileTabClick(){
            await this.clientListLocator.clientTechProfileTab.click();
        }

    async checkClientTechProfileLabel(){
            await expect(this.clientListLocator.clientTechProfileLabel).toBeVisible();
        }

    async checkClientTechStackDashboard(){
            await expect(this.clientListLocator.clientTechStackDashboard).toBeVisible();
        }

    async checkClientTechStackSkillNet(){
            await expect(this.clientListLocator.clientTechStackSkillNet).toBeVisible();
        }

    async checkClientProjectTab(){
            await expect(this.clientListLocator.clientProjectTab).toBeVisible();
        }

    async clientProjectTabClick(){
            await this.clientListLocator.clientProjectTab.click();
        }

    async checkClientAddProjectButton(){
            await expect(this.clientListLocator.clientAddProjectButton).toBeVisible();
        }

    async checkClientProjectListFSFT(){
            await expect(this.clientListLocator.clientProjectListFSFT).toBeVisible();
        }

    async checkClientChangeLogsTab(){
            await expect(this.clientListLocator.clientChangeLogsTab).toBeVisible();
        }

    async clientChangeLogsTabClick(){
            await this.clientListLocator.clientChangeLogsTab.click();
        }

    async checkClientChangeLogsLabelProj(){
            await expect(this.clientListLocator.clientChangeLogsLabelProj).toBeVisible();
        }

    async clientChangeLogsCloseButtonClick(){
            await this.clientListLocator.clientChangeLogsCloseButton.click();
        }

    async checkClientSettingsTab(){
            await expect(this.clientListLocator.clientSettingsTab).toBeVisible();
        }

    async clientSettingsTabClick(){
            await this.clientListLocator.clientSettingsTab.click();
        }

    async checkClientSettingsDailyFrequency(){
            await expect(this.clientListLocator.clientSettingsDailyFrequency).toBeVisible();
        }
    
    async testCheckPerformaceReviewSortFilter(){
            await expect(this.clientListLocator.filterPerformaceReviewSortLatestButton).toBeVisible();
            await expect(this.clientListLocator.filterResultPerformaceReviewSortLastDate).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewSortLatestButton.click();
            await expect(this.clientListLocator.filterPerformaceReviewSortEmployeeNameLink).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewSortEmployeeNameLink.click();
            await expect(this.clientListLocator.filterResultPerformaceReviewSortEmployeeBarriga).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewSortEmployeeNameButton.click();
            await expect(this.clientListLocator.filterPerformaceReviewSortStatusLink).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewSortStatusLink.click();
            await expect(this.clientListLocator.filterResultPerformaceReviewSortStatusLastDate).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewSortStatusButton.click();
            await expect(this.clientListLocator.filterPerformaceReviewSortLatestLink).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewSortLatestLink.click();
        }

    async testCheckPerformaceReviewTeamMemberFilter(){
            await expect(this.clientListLocator.filterPerformaceReviewTeamMemberSelector).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewTeamMemberSelector.click();
            await expect(this.clientListLocator.filterPerformaceReviewTeamMemberBartlett).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewTeamMemberBartlett.click();
            await expect(this.clientListLocator.filterPerformaceReviewTeamMemberRowgroupBartlett).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewTeamMemberSelector.click();
            await expect(this.clientListLocator.filterPerformaceReviewTeamMemberData).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewTeamMemberData.click();
            await expect(this.clientListLocator.filterPerformaceReviewTeamMemberRowgroupData).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewTeamMemberSelector.click();
            await expect(this.clientListLocator.filterPerformaceReviewTeamMemberAll).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewTeamMemberAll.click();
        }

    async testCheckPerformaceReviewStatusFilter(){
            await expect(this.clientListLocator.filterPerformaceReviewStatusAllButton).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewStatusAllButton.click();
            await expect(this.clientListLocator.filterPerformaceReviewStatusMRPendingLink).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewStatusMRPendingLink.click();
            await expect(this.clientListLocator.filterPerformaceReviewStatusMRPendingButton).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewStatusMRPendingButton.click();
            await expect(this.clientListLocator.filterPerformaceReviewStatusMDPendingLink).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewStatusMDPendingLink.click();
            await expect(this.clientListLocator.filterPerformaceReviewStatusMDPendingButton).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewStatusMDPendingButton.click();
            await expect(this.clientListLocator.filterPerformaceReviewStatusEAcknowledgementLink).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewStatusEAcknowledgementLink.click();
            await expect(this.clientListLocator.filterPerformaceReviewStatusEAcknowledgementButton).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewStatusEAcknowledgementButton.click();
            await expect(this.clientListLocator.filterPerformaceReviewStatusReviewCompleteLink).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewStatusReviewCompleteLink.click();
            await expect(this.clientListLocator.filterPerformaceReviewStatusReviewCompleteButton).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewStatusReviewCompleteButton.click();
            await expect(this.clientListLocator.filterPerformaceReviewStatusAllLink).toBeVisible();
            await this.clientListLocator.filterPerformaceReviewStatusAllLink.click();
        }

        async testCheckSortingWeeklyFloorReportDate(){
            await expect(this.clientListLocator.sortingWeeklyFloorReportDateT).toBeVisible();
            await expect(this.clientListLocator.sortingWeeklyFloorReportDateC).toBeVisible();
            await this.clientListLocator.sortingWeeklyFloorReportDateC.click();
            await expect(this.clientListLocator.sortingWeeklyFloorReportDateJan).toBeVisible();
            await expect(this.clientListLocator.sortingWeeklyFloorReportDateC).toBeVisible();
            await this.clientListLocator.sortingWeeklyFloorReportDateC.click();
        }

        async testCheckSortingContactsName(){
            await expect(this.clientListLocator.sortingContactsNameC).toBeVisible();
            await this.clientListLocator.sortingContactsNameT.click();
            await expect(this.clientListLocator.sortingContactsNameGridTSR).toBeVisible();
            await this.clientListLocator.sortingContactsNameC.click();
            await expect(this.clientListLocator.sortingContactsNameC).toBeVisible();
        }

        async testCheckSortingMSA(){
            await expect(this.clientListLocator.sortingMSANameC).toBeVisible();
            await this.clientListLocator.sortingMSANameC.click();
            await expect(this.clientListLocator.sortingMSAGridName).toBeVisible();
            await expect(this.clientListLocator.sortingMSANameC).toBeVisible();
            await expect(this.clientListLocator.sortingMSAStatusC).toBeVisible();
            await this.clientListLocator.sortingMSAStatusC.click();
            await expect(this.clientListLocator.sortingMSAEDateC).toBeVisible();
            await this.clientListLocator.sortingMSAEDateC.click();
            await expect(this.clientListLocator.sortingMSAUpdatedC).toBeVisible();
            await this.clientListLocator.sortingMSAUpdatedC.click();
        }

        async testCheckSortingTeamMembers(){
            await expect(this.clientListLocator.sortingTeamMemberEmployeeC).toBeVisible();
            await this.clientListLocator.sortingTeamMemberEmployeeC.click();
            await expect(this.clientListLocator.sortingTeamMemberPositionC).toBeVisible();
            await this.clientListLocator.sortingTeamMemberPositionC.click();
            await expect(this.clientListLocator.sortingTeamMemberClientRatingC).toBeVisible();
            await this.clientListLocator.sortingTeamMemberClientRatingC.click();
            await this.clientListLocator.sortingTeamMemberEmployeeC.click();
        }

        async testCheckSortingProjects(){
            await expect(this.clientListLocator.sortingProjectNameC).toBeVisible();
            await this.clientListLocator.sortingProjectNameC.click();
            await expect(this.clientListLocator.sortingDescriptionC).toBeVisible();
            await this.clientListLocator.sortingDescriptionC.click();
            await expect(this.clientListLocator.sortingProjectNameC).toBeVisible();
            await this.clientListLocator.sortingProjectNameC.click();
        }
}
