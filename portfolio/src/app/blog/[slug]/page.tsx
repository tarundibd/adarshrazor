"use client";
import React, { useEffect, useState } from 'react';
import { useBlogStore } from '@/store/blogStore';
import Image from 'next/image';
import type { BlogPost } from '@/types/notion_database';
import { useParams } from 'next/navigation';
import { TracingBeam } from '@/components/ui/tracing-beam';

export default function BlogPost() {
  const { posts, fetchBlogData } = useBlogStore();
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      await fetchBlogData();
      const slug = params.slug as string;
      
      // Find the post that matches the slug
      const foundPost = posts.find(p => {
        const postTitle = p.properties?.Title?.title?.[0]?.plain_text || '';
        const postSlug = postTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        return postSlug === slug;
      });

      if (foundPost && foundPost.properties?.Status?.select?.name === 'Published') {
        setPost(foundPost);
      }
      setIsLoading(false);
    };

    loadPost();
  }, [params.slug, fetchBlogData, posts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">The blog post you&apos;re looking for doesn&apos;t exist or isn&apos;t published.</p>
        </div>
      </div>
    );
  }

  return (
    <TracingBeam className="px-4">
      <article className="container mx-auto py-12 max-w-4xl">
        {/* Header Image */}
        {post.properties?.HeaderImage?.files?.[0]?.file?.url && (
          <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.properties.HeaderImage.files[0].file.url}
              alt={post.properties?.Title?.title?.[0]?.plain_text || 'Blog post header'}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 dark:text-white">
          {post.properties?.Title?.title?.[0]?.plain_text || 'Untitled'}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-4 mb-8 text-gray-600 dark:text-gray-400">
          <time>
            {post.properties?.Date?.date?.start 
              ? new Date(post.properties.Date.date.start).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : 'No date'}
          </time>
          <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Published
          </span>
        </div>

        {/* Summary */}
        {post.properties?.summary?.rich_text?.[0]?.plain_text && (
          <div className="text-xl text-gray-600 dark:text-gray-300 mb-8 italic">
            {post.properties.summary.rich_text[0].plain_text}
          </div>
        )}

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300">
            {post.properties?.Content?.rich_text?.[0]?.plain_text || 'No content available'}
          </p>
        </div>
      </article>
    </TracingBeam>
  );
}