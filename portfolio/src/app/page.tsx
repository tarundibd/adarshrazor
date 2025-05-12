'use client'

import Hero from "@/components/homepage/Hero";
import About from "@/components/homepage/About";
import { FeaturesSection } from "@/components/homepage/Featured";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <FeaturesSection />
    </div>
  );
}
