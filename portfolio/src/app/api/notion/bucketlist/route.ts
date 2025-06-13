import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Use server-side environment variables (without NEXT_PUBLIC_ prefix)
const notionApiKey = process.env.NOTION_PROJECT_API_KEY || process.env.NEXT_PUBLIC_NOTION_BUCKETLIST_API;
const notionDatabaseId = process.env.NOTION_PROJECT_DATABASE_ID || process.env.NEXT_PUBLIC_NOTION_BUCKETLIST_DATABASE_ID;

export async function GET() {
  // Check if API key and database ID are available
  if (!notionApiKey) {
    console.error('Notion API key is missing');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (!notionDatabaseId) {
    console.error('Notion database ID is missing');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const notion = new Client({ auth: notionApiKey });
    
    // Convert database ID to string explicitly to avoid type errors
    const response = await notion.databases.query({
      database_id: notionDatabaseId as string,
      sorts: [
        {
          property: 'no',
          direction: 'ascending',
        },
      ],
    });
    
    return NextResponse.json(response.results);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Notion' }, { status: 500 });
  }
} 