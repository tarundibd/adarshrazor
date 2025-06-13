import { create } from 'zustand';
import { BucketList } from '@/types/notion_database';

interface BucketListState {
  bucketList: BucketList[];
  isLoading: boolean;
  error: string | null;
  fetchBucketListData: () => Promise<void>;
}

export const useBucketListStore = create<BucketListState>((set) => ({
  bucketList: [],
  isLoading: false,
  error: null,
  fetchBucketListData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/notion/bucketlist');
      if (!response.ok) {
        throw new Error('bucketlistStore: Failed to fetch bucket list data');
      }
      const data = await response.json();
      set({ bucketList: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
}));
