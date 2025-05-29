"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useChangelogStore } from "@/store/changelogStore";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function NotificationList({
  className,
}: {
  className?: string;
}) {
  const { changelogs, isLoading, error, fetchChangelogData } = useChangelogStore();

  useEffect(() => {
    console.log('NotificationList mounted, fetching data...');
    fetchChangelogData();
  }, [fetchChangelogData]);

  useEffect(() => {
    console.log('Current changelogs:', changelogs);
    console.log('Loading state:', isLoading);
    console.log('Error state:', error);
  }, [changelogs, isLoading, error]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-[500px]">Loading notifications...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-[500px] text-red-500">{error}</div>;
  }

  const formattedNotifications = changelogs.map((changelog) => {
    const formatted = {
      name: changelog.properties.name?.title?.[0]?.plain_text || "",
      description: changelog.properties.description?.rich_text?.[0]?.plain_text || "",
      icon: changelog.properties.icon?.rich_text?.[0]?.plain_text || "📢",
      color: changelog.properties.color?.rich_text?.[0]?.plain_text || "#1E86FF",
      time: changelog.created_time
        ? formatDistanceToNow(new Date(changelog.created_time), { addSuffix: true })
        : 'just 1 now',
    };
    console.log('Formatted notification:', formatted);
    return formatted;
  });

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList>
        {formattedNotifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
