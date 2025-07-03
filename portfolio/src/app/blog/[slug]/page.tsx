"use client";
import React, { useEffect, useState } from 'react';
import { useBlogStore } from '@/store/blogStore';
import Image from 'next/image';
import type { BlogPost } from '@/types/notion_database';
import { useParams } from 'next/navigation';
import { TracingBeam } from '@/components/ui/tracing-beam';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function BlogPost() {
  const { posts, fetchBlogData } = useBlogStore();
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [markdown, setMarkdown] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!posts.length) {
        await fetchBlogData();
      }
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
        // If Contentnew exists, fetch the markdown
        const contentNewUrl = foundPost.properties?.Contentnew?.url;
        if (contentNewUrl) {
          try {
            const res = await fetch(contentNewUrl);
            if (res.ok) {
              const md = await res.text();
              setMarkdown(md);
            } else {
              setMarkdown(null);
            }
          } catch {
            setMarkdown(null);
          }
        } else {
          setMarkdown(null);
        }
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
          {markdown ? (
            markdown.split(/(?=^# )/m).map((section, idx) => (
              <ReactMarkdown
                key={idx}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: (props) => <h1 className="text-4xl font-bold mt-8 mb-4 dark:text-white" {...props} />,
                  h2: (props) => <h2 className="text-3xl font-semibold mt-6 mb-3 dark:text-white" {...props} />,
                  h3: (props) => <h3 className="text-2xl font-semibold mt-4 mb-2 dark:text-white" {...props} />,
                  code: (props) => <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm" {...props} />,
                  pre: (props) => <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-x-auto my-4" {...props} />,
                  table: (props) => <table className="table-auto border-collapse my-4" {...props} />,
                  th: (props) => <th className="border px-2 py-1 bg-gray-200 dark:bg-gray-700" {...props} />,
                  td: (props) => <td className="border px-2 py-1" {...props} />,
                  a: (props) => <a className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                }}
              >
                {section}
              </ReactMarkdown>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              No content available
            </p>
          )}
        </div>
      </article>
    </TracingBeam>
  );
}