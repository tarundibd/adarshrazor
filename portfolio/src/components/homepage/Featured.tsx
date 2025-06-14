"use client";
import React from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useBlogStore } from '@/store/blogStore';
import { useProjectStore } from '@/store/projectStore';
import { HoverBorderGradient } from '../ui/hover-border-gradient'
import {NotificationList} from "@/components/homepage/Notification";
import Link from 'next/link';

// Dynamically import the Globe component with no SSR
const DynamicGlobe = dynamic(() => Promise.resolve(Globe), { ssr: false });

export function FeaturesSection() {
    // Use the blog store for blog data
    const { 
      latestPost, 
      fetchBlogData 
    } = useBlogStore();
    
    // Use the project store for project data
    const { 
      projects,
      fetchProjectData 
    } = useProjectStore();

    useEffect(() => {
      // Fetch data from both stores in parallel
      fetchBlogData();
      fetchProjectData();
    }, [fetchBlogData, fetchProjectData]);
    
    // Log projects data when it changes
    useEffect(() => {
      console.log("Projects data:", projects);
    }, [projects]);
    
  const features = [
    {
      id: "blogs",
      title: "Blogs ✍",
      description: latestPost ?
        ("▶ "+latestPost.properties?.Title?.title?.[0]?.plain_text || "Latest blog post") : 
        "Check out my latest blog posts and articles",
      skeleton: <SkeletonOne headerImage={latestPost?.properties?.HeaderImage?.files?.[0]?.file?.url} />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      id: "changelog",
      title: (
        <div className="flex items-center justify-between">
          <span>Change log</span>
          <button 
            onClick={() => {
              const skeletonTwo = document.querySelector('#skeleton-two');
              if (skeletonTwo) {
                const event = new Event('reload');
                skeletonTwo.dispatchEvent(event);
              }
            }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Reload notifications"
          >
            <svg 
              className="w-4 h-4 text-gray-600 dark:text-gray-300"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
          </button>
        </div>
      ),
      description: "⭕ Live update notifications from my website.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      id: "youtube",
      title: "Catch me on YouTube",
      description:
        "Live vibe coding, TLDR contents, informative videos and game streaming.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      id: "news",
      title: "News from the world 🌎",
      description:
        "Get the latest news and blogs from the world in a single place.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <div className="relative z-20 py-8 lg:py-20 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Packed with thousands of features
        </h4>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          From Blog posts to news, from AI to gaming, everything in one place. You can find most featured content here.
        </p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.id} className={feature.className}>
              <FeatureTitle>
                <span className="font-bold font-mono">{feature.title}</span>
              </FeatureTitle>
              <FeatureDescription><span className="text-lg text-neutral-500 dark:text-neutral-300">{feature.description}</span></FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </div>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-800 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = ({ headerImage }: { headerImage?: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative flex h-[400px]">
      <div className="w-full mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full relative">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
              <div className="text-gray-500 dark:text-gray-400">Loading...</div>
            </div>
          )}
          
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="text-gray-500 dark:text-gray-400">Image unavailable</div>
            </div>
          )}
          
          <div className="relative group/blog">
            <Image
              src={headerImage || "https://placehold.co/600x400?text=Image+not+available"}
              alt="header"
              width={800}
              height={800}
              className={`mb-2 rounded-sm ${!imageLoaded && !imageError ? 'invisible' : ''}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/blog:opacity-100 transition-opacity duration-300 bg-black/20">
              <Link href="/blog">
                <HoverBorderGradient 
                  containerClassName="rounded-full" 
                  as="button" 
                  className="dark:bg-black/80 bg-white/80 backdrop-blur-sm text-black dark:text-white flex items-center space-x-2 text-sm"
                  gradientColor="#f83232">
                  <span>Read more...</span>
                </HoverBorderGradient>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <a
      href="https://www.youtube.com/@RazorCloak"
      target="__blank"
      className="relative flex gap-10  h-full group/image"
    >
      <div className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
          {/* TODO */}
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto " />
          <Image
            src="/images/website/razoryt.png"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
          />
        </div>
      </div>
    </a>
  );
};

export const SkeletonTwo = () => {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    const element = document.querySelector('#skeleton-two');
    if (element) {
      element.addEventListener('reload', () => {
        setKey(prev => prev + 1);
      });
    }
  }, []);
  
  return (
    <div id="skeleton-two" className="relative flex flex-col items-start p-4 gap-4 h-[400px] overflow-hidden">
      <NotificationList key={key}/>
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-[400px] flex flex-col items-center relative bg-transparent dark:bg-transparent mt-5">
      <DynamicGlobe className="absolute -right-10 md:-right-10 -bottom-60 md:-bottom-52" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.02 },
        { location: [20.5937, 78.9629], size: 0.07 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
