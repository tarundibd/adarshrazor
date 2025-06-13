import { create } from 'zustand';
import { StoreItem } from '@/types/notion_database';

interface StoreWebsiteState {
  storeItems: StoreItem[];
  isLoading: boolean;
  error: string | null;
  fetchStoreData: () => Promise<void>;
}

export const useStoreWebsite = create<StoreWebsiteState>((set) => ({
  storeItems: [],
  isLoading: false,
  error: null,
  fetchStoreData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/notion/store');
      if (!response.ok) {
        throw new Error('storeWebsite: Failed to fetch store data');
      }
      const data = await response.json();
      set({ storeItems: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
}));
