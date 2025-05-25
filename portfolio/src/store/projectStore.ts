import { create } from 'zustand'
import { fetchNotionProjectData } from '@/lib/notionIntegrationproject'
import { Project } from '@/types/notion_database'

interface ProjectStore {
  // Project data
  projects: Project[]
  
  // Loading state
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchProjectData: () => Promise<void>
}

export const useProjectStore = create<ProjectStore>((set) => ({
  // Initial state
  projects: [],
  isLoading: false,
  error: null,
  
  // Fetch project data from Notion
  fetchProjectData: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await fetchNotionProjectData() as Project[]
      
      set({ 
        projects: data,
        isLoading: false
      })
    } catch (error) {
      console.error("Failed to load project data from Notion:", error)
      set({ 
        error: "Failed to load project data", 
        isLoading: false 
      })
    }
  }
}))
