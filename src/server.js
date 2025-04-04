import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { registerCampaignTools } from './tools/campaigns.js';
    import { registerListTools } from './tools/lists.js';
    import { registerTemplateTools } from './tools/templates.js';
    import { registerReportTools } from './tools/reports.js';
    import { registerAutomationTools } from './tools/automations.js';

    // Create an MCP server for Mailchimp API
    const server = new McpServer({
      name: "Mailchimp API",
      version: "1.0.0",
      description: "MCP Server for interacting with the Mailchimp API"
    });

    // Add resources for API documentation
    server.resource(
      "docs",
      new ResourceTemplate("mailchimp://docs/{category}", { list: undefined }),
      async (uri, { category }) => {
        const categories = {
          "overview": `# Mailchimp API Overview
    
    The Mailchimp Marketing API provides programmatic access to Mailchimp data and functionality, allowing developers to build custom features to do things like sync email activity and campaign analytics with their database, manage audiences and campaigns, and more.
    
    ## Base URL
    
    All API requests should be made to: \`https://{dc}.api.mailchimp.com/3.0/\`
    
    Where \`{dc}\` is the data center prefix for your account (e.g., "us1").
    
    ## Authentication
    
    Mailchimp API uses API keys for authentication. You can find your API key by logging into your Mailchimp account and navigating to Account > Extras > API keys.
    
    ## Rate Limits
    
    Mailchimp enforces rate limits on API requests. The specific limits depend on your Mailchimp plan.`,
          
          "campaigns": `# Campaigns API
    
    The Campaigns API allows you to manage your Mailchimp campaigns.
    
    ## Endpoints
    
    - GET /campaigns - Get all campaigns
    - GET /campaigns/{campaign_id} - Get campaign info
    - POST /campaigns - Create a new campaign
    - PATCH /campaigns/{campaign_id} - Update a campaign
    - DELETE /campaigns/{campaign_id} - Delete a campaign
    - POST /campaigns/{campaign_id}/actions/send - Send a campaign
    
    ## Campaign Types
    
    - regular: Regular email campaign
    - plaintext: Plain-text email campaign
    - absplit: A/B testing campaign
    - rss: RSS campaign
    - variate: Multivariate campaign`,
          
          "lists": `# Lists API
    
    The Lists API allows you to manage your Mailchimp lists (audiences).
    
    ## Endpoints
    
    - GET /lists - Get all lists
    - GET /lists/{list_id} - Get list info
    - POST /lists - Create a new list
    - PATCH /lists/{list_id} - Update a list
    - DELETE /lists/{list_id} - Delete a list
    
    ## List Members
    
    - GET /lists/{list_id}/members - Get all members in a list
    - GET /lists/{list_id}/members/{subscriber_hash} - Get member info
    - POST /lists/{list_id}/members - Add a member to a list
    - PATCH /lists/{list_id}/members/{subscriber_hash} - Update a list member
    - PUT /lists/{list_id}/members/{subscriber_hash} - Add or update a list member
    - DELETE /lists/{list_id}/members/{subscriber_hash} - Remove a member from a list`,
          
          "templates": `# Templates API
    
    The Templates API allows you to manage your Mailchimp templates.
    
    ## Endpoints
    
    - GET /templates - Get all templates
    - GET /templates/{template_id} - Get template info
    - POST /templates - Create a new template
    - PATCH /templates/{template_id} - Update a template
    - DELETE /templates/{template_id} - Delete a template`,
          
          "automations": `# Automations API
    
    The Automations API allows you to manage your Mailchimp automations.
    
    ## Endpoints
    
    - GET /automations - Get all automations
    - GET /automations/{workflow_id} - Get automation info
    - POST /automations - Create a new automation
    - PATCH /automations/{workflow_id} - Update an automation
    - DELETE /automations/{workflow_id} - Delete an automation
    - POST /automations/{workflow_id}/actions/start - Start an automation
    - POST /automations/{workflow_id}/actions/pause - Pause an automation`,
          
          "reports": `# Reports API
    
    The Reports API allows you to access your Mailchimp campaign reports.
    
    ## Endpoints
    
    - GET /reports - Get all campaign reports
    - GET /reports/{campaign_id} - Get campaign report
    - GET /reports/{campaign_id}/click-details - Get campaign click details
    - GET /reports/{campaign_id}/open-details - Get campaign open details
    - GET /reports/{campaign_id}/email-activity - Get email activity`
        };
        
        if (!category || category === 'all') {
          return {
            contents: [{
              uri: uri.href,
              text: `# Mailchimp API Documentation
    
    ## Available Documentation Categories
    
    - [Overview](mailchimp://docs/overview)
    - [Campaigns](mailchimp://docs/campaigns)
    - [Lists](mailchimp://docs/lists)
    - [Templates](mailchimp://docs/templates)
    - [Automations](mailchimp://docs/automations)
    - [Reports](mailchimp://docs/reports)`
            }]
          };
        }
        
        if (categories[category]) {
          return {
            contents: [{
              uri: uri.href,
              text: categories[category]
            }]
          };
        } else {
          return {
            contents: [{
              uri: uri.href,
              text: `Documentation for "${category}" not found. Available categories: overview, campaigns, lists, templates, automations, reports.`
            }]
          };
        }
      }
    );

    // Register all tools
    registerCampaignTools(server);
    registerListTools(server);
    registerTemplateTools(server);
    registerReportTools(server);
    registerAutomationTools(server);

    export { server };
