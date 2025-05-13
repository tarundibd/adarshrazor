"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

function Test() {
  // List of icon filenames without paths
  const iconNames = [
    "Next.js.svg", 
    "React.svg", 
    "Tailwind-CSS.svg", 
    "Typescript.svg", 
    "Figma.svg", 
    "Notion.svg", 
    "Git.svg", 
    "Github.svg", 
    "Vercel.svg", 
    "Framer.svg", 
    "Vite.svg",
    "JavaScript.svg",
    "HTML.svg",
    "CSS.svg",
    "Node.js.svg",
    "MongoDB.svg",
    "PostgreSQL.svg",
    "Firebase.svg",
    "AWS.svg",
    "Docker.svg"
  ];

  // Map the icon names to their full paths
  const iconPaths = iconNames.map(icon => `/images/techicons/${icon}`);

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Powered by <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Modern Tech Stack
              </span>
            </h1>
          </>
        }
      >
        <ThreeDMarquee images={iconPaths} />
      </ContainerScroll>
    </div>
  )
}

export default Test