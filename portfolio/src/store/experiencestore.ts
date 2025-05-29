import { create } from 'zustand'
import { fetchNotionExperienceData } from '@/lib/notionIntegrationexperience'
import { Experience } from '@/types/notion_database'

interface ExperienceStore {
  // Experience data
  experiences: Experience[]
  
  // Loading state
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchExperienceData: () => Promise<void>
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  // Initial state
  experiences: [],
  isLoading: false,
  error: null,
  
  // Fetch experience data from Notion
  fetchExperienceData: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await fetchNotionExperienceData()
      
      set({ 
        experiences: data,
        isLoading: false
      })
    } catch (error) {
      console.error("Failed to load experience data from Notion:", error)
      set({ 
        error: "Failed to load experience data", 
        isLoading: false 
      })
    }
  }
}))
