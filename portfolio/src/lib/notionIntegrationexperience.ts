import { Experience } from '@/types/notion_database';

export async function fetchNotionExperienceData(): Promise<Experience[]> {
  try {
    const response = await fetch('/api/notion/experience');
    if (!response.ok) {
      throw new Error('Failed to fetch experience data');
    }
    const data = await response.json();
    return data as Experience[];
  } catch (error) {
    console.error('Error in fetchNotionExperienceData:', error);
    throw error;
  }
}