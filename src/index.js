#!/usr/bin/env node
    import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { server } from './server.js';
    import dotenv from 'dotenv';

    // Load environment variables
    dotenv.config();

    console.log('Starting Mailchimp MCP server...');

    // Start receiving messages on stdin and sending messages on stdout
    const transport = new StdioServerTransport();
    await server.connect(transport);
