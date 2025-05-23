import React from 'react'
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { FlipWords } from '../ui/flip-words';
//import { HoverBorderGradient } from '../ui/hover-border-gradient'
import { RainbowButton } from "@/components/magicui/rainbow-button";
//import { ShinyButton } from "@/components/magicui/shiny-button";

function Hero() {
    const resumeLink = process.env.NEXT_PUBLIC_RESUME_LINK;
    const words = ["Hello\u002C ","नमस्ते\u002C ", "Bonjour\u002C ", "Hola\u002C ", "Ciao\u002C ", "Ni hao\u002C "];

  return (
    <div className="relative">
        <HeroHighlight containerClassName="h-[55rem]">
            <motion.h1 initial={{ opacity: 0, y: 20, }} animate={{ opacity: 1, y: [20, -5, 0], }} transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1], }}>
                <div className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
                    👋<FlipWords words={words}/>
                    <Highlight className="text-black dark:text-white">
                        Adarsh
                    </Highlight> here !!
                </div>
            </motion.h1>
            <div className='flex justify-center items-center my-10'>
                {/* <HoverBorderGradient 
                    containerClassName="rounded-full" 
                    as="button" 
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-sm"
                    gradientColor="#f83232"
                    onClick={() => window.open(resumeLink, '_blank')}
                >
                    <span>Resume </span>
                </HoverBorderGradient> */}
                <RainbowButton onClick={() => window.open(resumeLink, '_blank')}>Resume 📜</RainbowButton>
            </div>
        </HeroHighlight>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent">  
        </div> 
    </div>
  )
}

export default Hero