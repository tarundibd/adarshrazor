import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_EXPERIENCE_API,
});

export async function GET() {
  try {
    const databaseId = process.env.NEXT_PUBLIC_NOTION_EXPERIENCE_DATABASE_ID;
    
    if (!databaseId) {
      throw new Error('Database ID not found');
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'ID',
          direction: 'descending',
        },
      ],
    });

    console.log('Notion API Response:', JSON.stringify(response.results, null, 2));

    // Validate the response structure
    const validatedResults = response.results.map(result => {
      console.log('Processing result:', {
        result,
      });
      return result;
    });

    return NextResponse.json(validatedResults);
  } catch (error) {
    console.error('Error fetching experience data:', error);
    return NextResponse.json({ error: 'Failed to load experience data' }, { status: 500 });
  }
}