'use client';

import CTASection from "@/components/public/sections/commons/CTASection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import FocusAreasSection from "@/components/sections/FocusAreasSection";
// import { Sidebar } from "@/components/navbars/SideBar";
import HeroSection from "@/components/sections/HesoSection";
import ImpactStats from "@/components/sections/ImpactStats";
import MissionSection from "@/components/sections/MissionSection";
import PartnersSection from "@/components/sections/PartnersSection";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      
      <main>
        <HeroSection />
        <MissionSection />
        <FocusAreasSection />
       <FeaturedProjects />
         <ImpactStats />
        <UpcomingEvents />
        <PartnersSection />
        <CTASection />
      </main>

    </div>
  );
}
