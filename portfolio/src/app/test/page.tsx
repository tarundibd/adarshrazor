"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

function Test() {
  // List of icon filenames without paths
  const iconNames = [
    "Next.js.svg", 
    "React.svg", 
    "Tailwind-CSS.svg", 
    "TypeScript.svg", 
    "Figma.svg", 
    "Git.svg", 
    "GitHub.svg", 
    "Vercel.svg", 
    "Vite.js.svg",
    "JavaScript.svg",
    "HTML5.svg",
    "CSS3.svg",
    "Node.js.svg",
    "MongoDB.svg",
    "PostgresSQL.svg",
    "Firebase.svg",
    "AWS.svg",
    "Docker.svg"
  ];

  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
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
        <ThreeDMarquee images={images} />
      </ContainerScroll>
    </div>
  )
}

export default Test