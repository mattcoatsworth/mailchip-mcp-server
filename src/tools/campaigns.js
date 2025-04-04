import { z } from 'zod';
    import { mailchimpClient, handleApiError, formatResponse } from '../mailchimp-client.js';

    export const registerCampaignTools = (server) => {
      // Get all campaigns
      server.tool(
        "get_campaigns",
        {
          count: z.number().optional().describe("Number of campaigns to return"),
          offset: z.number().optional().describe("Number of campaigns to skip"),
          type: z.enum(['regular', 'plaintext', 'absplit', 'rss', 'variate']).optional().describe("Type of campaign"),
          status: z.enum(['save', 'paused', 'schedule', 'sending', 'sent']).optional().describe("Status of campaign")
        },
        async (params) => {
          try {
            const response = await mailchimpClient.campaigns.list(params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get a list of campaigns" }
      );

      // Get campaign info
      server.tool(
        "get_campaign",
        {
          campaign_id: z.string().describe("The unique ID of the campaign")
        },
        async ({ campaign_id }) => {
          try {
            const response = await mailchimpClient.campaigns.get(campaign_id);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get information about a specific campaign" }
      );

      // Create a campaign
      server.tool(
        "create_campaign",
        {
          type: z.enum(['regular', 'plaintext', 'absplit', 'rss', 'variate']).describe("Type of campaign"),
          recipients: z.object({
            list_id: z.string().describe("The unique ID of the list")
          }).describe("List settings for the campaign"),
          settings: z.object({
            subject_line: z.string().describe("The subject line of the campaign"),
            title: z.string().describe("The title of the campaign"),
            from_name: z.string().describe("The from name of the campaign"),
            reply_to: z.string().describe("The reply-to email address for the campaign")
          }).describe("Settings for the campaign")
        },
        async (params) => {
          try {
            const response = await mailchimpClient.campaigns.create(params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Create a new campaign" }
      );

      // Delete a campaign
      server.tool(
        "delete_campaign",
        {
          campaign_id: z.string().describe("The unique ID of the campaign")
        },
        async ({ campaign_id }) => {
          try {
            await mailchimpClient.campaigns.remove(campaign_id);
            return {
              content: [{ type: "text", text: `Campaign ${campaign_id} successfully deleted.` }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Delete a campaign" }
      );

      // Send a campaign
      server.tool(
        "send_campaign",
        {
          campaign_id: z.string().describe("The unique ID of the campaign")
        },
        async ({ campaign_id }) => {
          try {
            await mailchimpClient.campaigns.send(campaign_id);
            return {
              content: [{ type: "text", text: `Campaign ${campaign_id} has been sent.` }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Send a campaign" }
      );

      // Set campaign content
      server.tool(
        "set_campaign_content",
        {
          campaign_id: z.string().describe("The unique ID of the campaign"),
          html: z.string().optional().describe("The raw HTML for the campaign"),
          template_id: z.number().optional().describe("The ID of the template to use"),
          plain_text: z.string().optional().describe("The plain-text content of the campaign")
        },
        async ({ campaign_id, ...params }) => {
          try {
            const response = await mailchimpClient.campaigns.setContent(campaign_id, params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Set the content for a campaign" }
      );
    };
