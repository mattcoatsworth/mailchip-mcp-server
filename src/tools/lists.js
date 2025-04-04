import { z } from 'zod';
    import { mailchimpClient, handleApiError, formatResponse } from '../mailchimp-client.js';

    export const registerListTools = (server) => {
      // Get all lists
      server.tool(
        "get_lists",
        {
          count: z.number().optional().describe("Number of lists to return"),
          offset: z.number().optional().describe("Number of lists to skip")
        },
        async (params) => {
          try {
            const response = await mailchimpClient.lists.getAllLists(params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get all lists (audiences) in the account" }
      );

      // Get list info
      server.tool(
        "get_list",
        {
          list_id: z.string().describe("The unique ID of the list")
        },
        async ({ list_id }) => {
          try {
            const response = await mailchimpClient.lists.getList(list_id);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get information about a specific list" }
      );

      // Create a list
      server.tool(
        "create_list",
        {
          name: z.string().describe("The name of the list"),
          contact: z.object({
            company: z.string().describe("The company name"),
            address1: z.string().describe("The first line of the address"),
            city: z.string().describe("The city"),
            state: z.string().describe("The state or province"),
            zip: z.string().describe("The zip or postal code"),
            country: z.string().describe("The country code")
          }).describe("Contact information for the list"),
          permission_reminder: z.string().describe("The permission reminder for the list"),
          campaign_defaults: z.object({
            from_name: z.string().describe("The default from name for campaigns"),
            from_email: z.string().describe("The default from email for campaigns"),
            subject: z.string().describe("The default subject for campaigns"),
            language: z.string().describe("The default language for campaigns")
          }).describe("Default settings for campaigns"),
          email_type_option: z.boolean().describe("Whether the list supports multiple formats for emails")
        },
        async (params) => {
          try {
            const response = await mailchimpClient.lists.createList(params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Create a new list (audience)" }
      );

      // Get list members
      server.tool(
        "get_list_members",
        {
          list_id: z.string().describe("The unique ID of the list"),
          count: z.number().optional().describe("Number of members to return"),
          offset: z.number().optional().describe("Number of members to skip"),
          status: z.enum(['subscribed', 'unsubscribed', 'cleaned', 'pending', 'transactional']).optional().describe("Status of members to return")
        },
        async ({ list_id, ...params }) => {
          try {
            const response = await mailchimpClient.lists.getListMembersInfo(list_id, params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get members of a list" }
      );

      // Add or update list member
      server.tool(
        "add_list_member",
        {
          list_id: z.string().describe("The unique ID of the list"),
          email_address: z.string().describe("The email address of the list member"),
          status: z.enum(['subscribed', 'unsubscribed', 'cleaned', 'pending', 'transactional']).describe("The status of the list member"),
          merge_fields: z.record(z.string()).optional().describe("A dictionary of merge fields")
        },
        async ({ list_id, ...params }) => {
          try {
            const response = await mailchimpClient.lists.addListMember(list_id, params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Add a member to a list" }
      );
    };
