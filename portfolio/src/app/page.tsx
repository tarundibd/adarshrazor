'use client'

import Hero from "@/components/homepage/Hero";
import About from "@/components/homepage/About";
import { FeaturesSection } from "@/components/homepage/Featured";
import TechStack from "@/components/homepage/techstack";
import MyTechStack from "@/components/homepage/MyTechStack";
import Contactme from "@/components/homepage/Contactme";
import { Playground } from "@/components/homepage/Playground";
import Footer from "@/components/homepage/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <FeaturesSection />
      <TechStack /> 
      <MyTechStack/>
      <Contactme />
      <Playground />
      <Footer />  
    </div>
  );
}
