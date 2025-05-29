import { create } from 'zustand';
import { Changelog } from '@/types/notion_database';

interface ChangelogState {
  changelogs: Changelog[];
  isLoading: boolean;
  error: string | null;
  fetchChangelogData: () => Promise<void>;
}

export const useChangelogStore = create<ChangelogState>((set) => ({
  changelogs: [],
  isLoading: false,
  error: null,
  fetchChangelogData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/notion/changelog');
      if (!response.ok) {
        throw new Error('changelogStore: Failed to fetch changelog data');
      }
      const data = await response.json();
      set({ changelogs: data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoading: false 
      });
    }
  },
}));
