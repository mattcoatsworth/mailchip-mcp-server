import { z } from 'zod';
    import { mailchimpClient, handleApiError, formatResponse } from '../mailchimp-client.js';

    export const registerAutomationTools = (server) => {
      // Get all automations
      server.tool(
        "get_automations",
        {
          count: z.number().optional().describe("Number of automations to return"),
          offset: z.number().optional().describe("Number of automations to skip"),
          status: z.enum(['sending', 'paused']).optional().describe("Status of automations to return")
        },
        async (params) => {
          try {
            const response = await mailchimpClient.automations.list(params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get all automations in the account" }
      );

      // Get automation info
      server.tool(
        "get_automation",
        {
          workflow_id: z.string().describe("The unique ID of the automation workflow")
        },
        async ({ workflow_id }) => {
          try {
            const response = await mailchimpClient.automations.getWorkflow(workflow_id);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get information about a specific automation" }
      );

      // Start an automation
      server.tool(
        "start_automation",
        {
          workflow_id: z.string().describe("The unique ID of the automation workflow")
        },
        async ({ workflow_id }) => {
          try {
            await mailchimpClient.automations.startWorkflow(workflow_id);
            return {
              content: [{ type: "text", text: `Automation ${workflow_id} has been started.` }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Start an automation" }
      );

      // Pause an automation
      server.tool(
        "pause_automation",
        {
          workflow_id: z.string().describe("The unique ID of the automation workflow")
        },
        async ({ workflow_id }) => {
          try {
            await mailchimpClient.automations.pauseWorkflow(workflow_id);
            return {
              content: [{ type: "text", text: `Automation ${workflow_id} has been paused.` }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Pause an automation" }
      );

      // Get automation emails
      server.tool(
        "get_automation_emails",
        {
          workflow_id: z.string().describe("The unique ID of the automation workflow")
        },
        async ({ workflow_id }) => {
          try {
            const response = await mailchimpClient.automations.getWorkflowEmails(workflow_id);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get emails in an automation workflow" }
      );
    };
