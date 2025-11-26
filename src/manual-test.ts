import { config } from 'dotenv';
import { FreeScoutAPI } from './freescout-api.js';

// Load environment variables
config();

const FREESCOUT_URL = process.env.FREESCOUT_URL;
const FREESCOUT_API_KEY = process.env.FREESCOUT_API_KEY;
const MAILBOX_ID = parseInt(process.env.FREESCOUT_MAILBOX_ID || '1');

if (!FREESCOUT_URL || !FREESCOUT_API_KEY) {
    console.error('Missing required environment variables: FREESCOUT_URL and FREESCOUT_API_KEY');
    process.exit(1);
}

async function main() {
    const api = new FreeScoutAPI(FREESCOUT_URL!, FREESCOUT_API_KEY!);

    console.log('Creating test ticket...');
    try {
        const conversation = await api.createConversation(
            'Test Ticket from MCP',
            'This is a test ticket created via the MCP server manual test script.',
            'test-user@example.com',
            MAILBOX_ID,
            {
                firstName: 'Test',
                lastName: 'User',
            }
        );

        console.log('✅ Ticket created successfully!');
        console.log(`ID: ${conversation.id}`);
        console.log(`Number: ${conversation.number}`);
        console.log(`Subject: ${conversation.subject}`);
        console.log(`URL: ${FREESCOUT_URL}/conversation/${conversation.id}`);
    } catch (error: any) {
        console.error('❌ Failed to create ticket:', error.message);
    }
}

main().catch(console.error);
