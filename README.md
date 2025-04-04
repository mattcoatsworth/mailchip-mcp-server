# Mailchimp MCP Server

    A Model Context Protocol (MCP) server for interacting with the Mailchimp API.

    ## Features

    - Comprehensive access to Mailchimp API functionality
    - Tools for managing campaigns, lists, templates, reports, and automations
    - Documentation resources for API reference

    ## Setup

    1. Clone this repository
    2. Install dependencies:
       ```
       npm install
       ```
    3. Create a `.env` file with your Mailchimp API credentials (see `.env.example`)
    4. Run the server:
       ```
       npm run dev
       ```

    ## Testing with MCP Inspector

    To test the server with the MCP Inspector:

    ```
    npm run inspect
    ```

    This will open a web interface where you can explore and test all available tools and resources.

    ## Available Tools

    ### Campaigns
    - `get_campaigns`: Get a list of campaigns
    - `get_campaign`: Get information about a specific campaign
    - `create_campaign`: Create a new campaign
    - `delete_campaign`: Delete a campaign
    - `send_campaign`: Send a campaign
    - `set_campaign_content`: Set the content for a campaign

    ### Lists
    - `get_lists`: Get all lists (audiences) in the account
    - `get_list`: Get information about a specific list
    - `create_list`: Create a new list (audience)
    - `get_list_members`: Get members of a list
    - `add_list_member`: Add a member to a list

    ### Templates
    - `get_templates`: Get all templates in the account
    - `get_template`: Get information about a specific template
    - `create_template`: Create a new template
    - `delete_template`: Delete a template

    ### Reports
    - `get_campaign_reports`: Get reports for all campaigns
    - `get_campaign_report`: Get report for a specific campaign
    - `get_campaign_click_details`: Get click details for a campaign
    - `get_campaign_open_details`: Get open details for a campaign

    ### Automations
    - `get_automations`: Get all automations in the account
    - `get_automation`: Get information about a specific automation
    - `start_automation`: Start an automation
    - `pause_automation`: Pause an automation
    - `get_automation_emails`: Get emails in an automation workflow

    ## Resources

    - `mailchimp://docs/overview`: Overview of the Mailchimp API
    - `mailchimp://docs/campaigns`: Documentation for the Campaigns API
    - `mailchimp://docs/lists`: Documentation for the Lists API
    - `mailchimp://docs/templates`: Documentation for the Templates API
    - `mailchimp://docs/automations`: Documentation for the Automations API
    - `mailchimp://docs/reports`: Documentation for the Reports API
