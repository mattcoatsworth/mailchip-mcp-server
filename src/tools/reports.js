import { z } from 'zod';
    import { mailchimpClient, handleApiError, formatResponse } from '../mailchimp-client.js';

    export const registerReportTools = (server) => {
      // Get all campaign reports
      server.tool(
        "get_campaign_reports",
        {
          count: z.number().optional().describe("Number of reports to return"),
          offset: z.number().optional().describe("Number of reports to skip"),
          type: z.enum(['regular', 'plaintext', 'absplit', 'rss', 'variate']).optional().describe("Type of campaign"),
          before_send_time: z.string().optional().describe("Restrict results to campaigns sent before this time (ISO 8601 format)"),
          since_send_time: z.string().optional().describe("Restrict results to campaigns sent after this time (ISO 8601 format)")
        },
        async (params) => {
          try {
            const response = await mailchimpClient.reports.getAllCampaignReports(params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get reports for all campaigns" }
      );

      // Get campaign report
      server.tool(
        "get_campaign_report",
        {
          campaign_id: z.string().describe("The unique ID of the campaign")
        },
        async ({ campaign_id }) => {
          try {
            const response = await mailchimpClient.reports.getCampaignReport(campaign_id);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get report for a specific campaign" }
      );

      // Get campaign click details
      server.tool(
        "get_campaign_click_details",
        {
          campaign_id: z.string().describe("The unique ID of the campaign"),
          count: z.number().optional().describe("Number of click details to return"),
          offset: z.number().optional().describe("Number of click details to skip")
        },
        async ({ campaign_id, ...params }) => {
          try {
            const response = await mailchimpClient.reports.getCampaignClickDetails(campaign_id, params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get click details for a campaign" }
      );

      // Get campaign open details
      server.tool(
        "get_campaign_open_details",
        {
          campaign_id: z.string().describe("The unique ID of the campaign"),
          count: z.number().optional().describe("Number of open details to return"),
          offset: z.number().optional().describe("Number of open details to skip")
        },
        async ({ campaign_id, ...params }) => {
          try {
            const response = await mailchimpClient.reports.getCampaignOpenDetails(campaign_id, params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get open details for a campaign" }
      );
    };
