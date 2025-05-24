import React from 'react'
import {LinkPreview} from '@/components/ui/link-preview'
import ColourfulText from "@/components/ui/colourful-text";
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MovingBorder } from "../ui/moving-border";
import { Button } from "../ui/button";
import { NumberTicker } from "@/components/magicui/number-ticker";

function About() {
    // Using a different approach for the quote with colored part
    const normalText = "I perform symphonies with my keyboard, turning the world into my stage and";
    const colorfulText = "it's people";
    const endText = "into my audience.";
  
  return (
    <div>
        {/* About me section */}
    <div className="flex justify-center items-center h-[50rem] flex-col px-2">
      <div className='text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-7xl mx-auto mb-10'>
        I am a <a href="https://en.wikipedia.org/wiki/Hacker" target="_blank" rel="noopener noreferrer" className="cursor-pointer" style={{color: 'inherit', textDecoration: 'none'}}>hacker</a> 👋🏻. Deeply curious about technology, social-engineering, and AI. I graduated from{" "} 
        <LinkPreview url="https://www.reva.edu.in/" className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-600 to-orange-400">
            Reva University
        </LinkPreview>{" "}
        as an Engineer with a Bachelor's in computer science.
      </div>
      <div className='text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-7xl mx-auto mb-10'>
        I started developing websites at an early age for various startups, became a webmaster for various universities, IEEE, and IISc Bangalore events, and also wrote a research paper on {" "}
        <LinkPreview url="http://www.testmagzine.biz/index.php/testmagzine/article/view/8343/6317" className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-purple-500">
            Virtual Assistants based on User Preferences.
        </LinkPreview>
      </div>
      <div className='text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-7xl mx-auto mb-10'>
        I started my career as a frontend developer, but the latter of my curiosities learned about Cloud technologies. Currently, I'm seeking job opportunities as a {" "}
        <LinkPreview url="https://www.linkedin.com/in/adarsh007/" className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-green-500 to-green-700">
            full-stack developer.
        </LinkPreview>
      </div>
      <div className='text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-7xl mx-auto mb-10'>
        When I'm not in front of the screen, I focus on personal growth and striving to be the best version of myself. I like cafes, music, exploring and creativity.
      </div>
    </div>
    {/* Featured section */}
    <div className='flex justify-center items-center flex-col mx-auto max-w-4xl my-20 px-4'>
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            <TextGenerateEffect 
                words={normalText} 
                triggerOnScroll={true} 
                duration={0.8} 
                textClassName="inline"
            />
            <span className="inline-block">
                <ColourfulText text={colorfulText} />
            </span>
            <TextGenerateEffect 
                words={endText} 
                triggerOnScroll={true} 
                duration={0.8} 
                textClassName="inline"
            />
        </div>
    </div>
    {/* Crunching numbers */}
    <div className="relative mx-10 p-[1px] rounded-xl overflow-hidden mb-10">
      <MovingBorder duration={3500} rx="20%" ry="30%">
        <div className="h-20 w-20 bg-gradient-to-r from-blue-500 to-teal-500 opacity-[0.8]" />
      </MovingBorder>
      <div className="relative bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-slate-800">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="text-7xl font-bold text-gray-700">8</span>
              <span className="text-xl mt-2">projects completed</span>
              <span>[still counting ...]</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-7xl font-bold text-[#0A6847]"><NumberTicker value={1500} className='text-[#0A6847]'/>+</span>
              <span className="text-xl mt-2 text-[#0A6847]">open source commits</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-7xl font-bold text-gray-700">5</span>
              <span className="text-gray-700">yrs</span>
              <span className="text-xl mt-2">total experience</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-6xl font-bold text-[#0A6847] mb-7">Experience</span>
                <Button variant="outline" onClick={() => window.location.href = '/projects'}>view</Button>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-7xl font-bold text-gray-700">7</span>
              <span className="text-xl mt-2">Certifications</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-6xl font-bold text-[#0A6847] mb-7">Projects</span>
                <Button variant="outline" onClick={() => window.location.href = '/projects'}>view</Button>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
    </div>
  )
}

export default About