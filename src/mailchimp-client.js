import mailchimp from '@mailchimp/mailchimp_marketing';

    // Initialize the Mailchimp client
    const initializeClient = () => {
      const apiKey = process.env.MAILCHIMP_API_KEY;
      const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
      
      if (!apiKey || !serverPrefix) {
        console.error('Missing Mailchimp API credentials. Please set MAILCHIMP_API_KEY and MAILCHIMP_SERVER_PREFIX in your .env file.');
        return null;
      }
      
      mailchimp.setConfig({
        apiKey: apiKey,
        server: serverPrefix
      });
      
      return mailchimp;
    };

    export const mailchimpClient = initializeClient();

    // Helper function to handle API errors
    export const handleApiError = (error) => {
      console.error('Mailchimp API Error:', error);
      
      let errorMessage = 'An error occurred while communicating with the Mailchimp API.';
      
      if (error.response && error.response.body) {
        try {
          const body = JSON.parse(error.response.body);
          errorMessage = body.detail || body.message || errorMessage;
        } catch (e) {
          errorMessage = error.response.body || errorMessage;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        content: [{ type: "text", text: `Error: ${errorMessage}` }],
        isError: true
      };
    };

    // Helper function to format response data
    export const formatResponse = (data) => {
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
      };
    };
