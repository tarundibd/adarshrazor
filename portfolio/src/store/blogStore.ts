import { create } from 'zustand'
import { fetchNotionBlogData } from '@/lib/notionIntegrationblog'
import { BlogPost } from '@/types/notion_database'

interface BlogStore {
  // Blog posts
  posts: BlogPost[]
  latestPost: BlogPost | null
  
  // Loading state
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchBlogData: () => Promise<void>
}

export const useBlogStore = create<BlogStore>((set) => ({
  // Initial state
  posts: [],
  latestPost: null,
  isLoading: false,
  error: null,
  
  // Fetch blog data from Notion
  fetchBlogData: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await fetchNotionBlogData() as BlogPost[]
      
      // Find the first published post
      let latestPost: BlogPost | null = null
      if (data && data.length > 0) {
        // Look for the first post with status "published"
        const publishedPost = data.find((post) => 
          post.properties?.Status?.select?.name === 'Published'
        )
        
        if (publishedPost) {
          latestPost = publishedPost
        } else {
          // Fall back to first post if no published posts found
          latestPost = data[0]
        }
      }
      
      set({ 
        posts: data,
        latestPost,
        isLoading: false
      })
    } catch (error) {
      console.error("Failed to load blog data from Notion:", error)
      set({ 
        error: "Failed to load blog data", 
        isLoading: false 
      })
    }
  }
}))
