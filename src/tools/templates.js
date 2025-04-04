import { z } from 'zod';
    import { mailchimpClient, handleApiError, formatResponse } from '../mailchimp-client.js';

    export const registerTemplateTools = (server) => {
      // Get all templates
      server.tool(
        "get_templates",
        {
          count: z.number().optional().describe("Number of templates to return"),
          offset: z.number().optional().describe("Number of templates to skip"),
          type: z.enum(['user', 'gallery', 'base']).optional().describe("Type of templates to return")
        },
        async (params) => {
          try {
            const response = await mailchimpClient.templates.list(params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get all templates in the account" }
      );

      // Get template info
      server.tool(
        "get_template",
        {
          template_id: z.number().describe("The unique ID of the template")
        },
        async ({ template_id }) => {
          try {
            const response = await mailchimpClient.templates.getTemplate(template_id);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Get information about a specific template" }
      );

      // Create a template
      server.tool(
        "create_template",
        {
          name: z.string().describe("The name of the template"),
          html: z.string().describe("The HTML content of the template"),
          folder_id: z.number().optional().describe("The ID of the folder to put the template in")
        },
        async (params) => {
          try {
            const response = await mailchimpClient.templates.create(params);
            return formatResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Create a new template" }
      );

      // Delete a template
      server.tool(
        "delete_template",
        {
          template_id: z.number().describe("The unique ID of the template")
        },
        async ({ template_id }) => {
          try {
            await mailchimpClient.templates.deleteTemplate(template_id);
            return {
              content: [{ type: "text", text: `Template ${template_id} successfully deleted.` }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        },
        { description: "Delete a template" }
      );
    };
