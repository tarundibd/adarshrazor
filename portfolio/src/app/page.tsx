'use client'

import Hero from "@/components/homepage/Hero";
import About from "@/components/homepage/About";
import { FeaturesSection } from "@/components/homepage/Featured";
import TechStack from "@/components/homepage/techstack";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <FeaturesSection />
      <TechStack />
    </div>
  );
}
