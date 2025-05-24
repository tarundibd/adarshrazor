"use client";
import React, { useEffect } from 'react';
import { useBlogStore } from '@/store/blogStore';
import Image from 'next/image';
import { BlogPost } from '@/types/notion_database';

export default function Blog() {
  const { posts, isLoading, error, fetchBlogData } = useBlogStore();
  
  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading blogs...</div>;
  }
  
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      
      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: BlogPost) => (
            <div 
              key={post.id} 
              className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {post.properties?.HeaderImage?.files?.[0]?.file?.url && (
                <div className="relative w-full h-48">
                  <Image 
                    src={post.properties.HeaderImage.files[0].file.url} 
                    alt={post.properties?.Title?.title?.[0]?.plain_text || 'Blog post'} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {post.properties?.Title?.title?.[0]?.plain_text || 'Untitled'}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.properties?.Description?.rich_text?.[0]?.plain_text || 'No description available'}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {post.properties?.Date?.date?.start 
                      ? new Date(post.properties.Date.date.start).toLocaleDateString() 
                      : 'No date'}
                  </div>
                  
                  {post.properties?.Status?.select?.name && (
                    <span className={`px-2 py-1 text-xs rounded ${
                      post.properties.Status.select.name === 'Published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {post.properties.Status.select.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}