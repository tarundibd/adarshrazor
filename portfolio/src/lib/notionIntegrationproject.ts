import { Project } from '@/types/notion_database';

/**
 * Fetch data from the Notion database through our API route
 * @returns {Promise<Project[]>} The data from the Notion database
 */
export async function fetchNotionProjectData(): Promise<Project[]> {
  try {
    const response = await fetch('/api/notion/project', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Ensures fresh data
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API responded with error:', response.status, errorData);
      return []; // Return empty array to prevent UI errors
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    return []; // Return empty array to prevent UI errors
  }
}