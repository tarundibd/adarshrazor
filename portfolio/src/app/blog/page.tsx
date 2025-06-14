"use client";
import React, { useEffect } from 'react';
import { useBlogStore } from '@/store/blogStore';
import Image from 'next/image';
import { BlogPost } from '@/types/notion_database';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import Link from 'next/link';

export default function Blog() {
  const { posts, isLoading, error, fetchBlogData } = useBlogStore();
  
  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  // Filter published posts
  const publishedPosts = posts.filter(post => 
    post.properties?.Status?.select?.name === 'Published'
  );
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading blogs...</div>;
  }
  
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  // Blog card component with hover effect
  const BlogCard = ({ post }: { post: BlogPost }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    
    // Create a URL-friendly slug from the title
    const slug = post.properties?.Title?.title?.[0]?.plain_text
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'untitled';

    return (
      <Link 
        href={`/blog/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div 
          className={cn(
            "relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-200",
            "flex flex-col cursor-pointer"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10">
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
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                {post.properties?.Title?.title?.[0]?.plain_text || 'Untitled'}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.properties?.summary?.rich_text?.[0]?.plain_text || 'No summary available'}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {post.properties?.Date?.date?.start 
                    ? new Date(post.properties.Date.date.start).toLocaleDateString() 
                    : 'No date'}
                </div>
                
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Published
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">Blog Posts</h1>
      
      {publishedPosts.length === 0 ? (
        <p className="dark:text-gray-300">No published blog posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedPosts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}