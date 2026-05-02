import Hero from "@/components/Hero";
import About from "@/components/About";
import VisionMission from "@/components/VisionMission";
import Services from "@/components/Services";
import FounderNote from "@/components/FounderNote";
import Portfolio from "@/components/Portfolio";
import MarketOpportunity from "@/components/MarketOpportunity";
import PartnerWithUs from "@/components/PartnerWithUs";
import Roadmap from "@/components/Roadmap";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getHomepage } from "@/lib/storyblok";
import type {
  HeroSection,
  AboutSection,
  MissionVisionSection,
  WorkSection,
  FounderSection,
  LookbookSection,
  OpportunitySection,
  PartnerSection,
  RoadmapSection,
} from "@/types/storyblok";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const response = await getHomepage();
  const story = response?.story;

  // Extract sections from Storyblok content
  const heroSection = story?.content.body.find((section) => section.component === "hero") as HeroSection | undefined;
  const aboutSection = story?.content.body.find((section) => section.component === "about") as AboutSection | undefined;
  const missionVisionSection = story?.content.body.find((section) => section.component === "mission_vision") as MissionVisionSection | undefined;
  const workSection = story?.content.body.find((section) => section.component === "work") as WorkSection | undefined;
  const founderSection = story?.content.body.find((section) => section.component === "founder") as FounderSection | undefined;
  const lookbookSection = story?.content.body.find((section) => section.component === "lookbook") as LookbookSection | undefined;
  const opportunitySection = story?.content.body.find((section) => section.component === "opportunity") as OpportunitySection | undefined;
  const partnerSection = story?.content.body.find((section) => section.component === "partner") as PartnerSection | undefined;
  const roadmapSection = story?.content.body.find((section) => section.component === "roadmap") as RoadmapSection | undefined;

  return (
    <>
      <Header />
      <main>
        <Hero data={heroSection} />
        <About data={aboutSection} />
        <VisionMission data={missionVisionSection} />
        <Services data={workSection} />
        <FounderNote data={founderSection} />
        <Portfolio data={lookbookSection} />
        <MarketOpportunity data={opportunitySection} />
        <Roadmap data={roadmapSection} />
        <PartnerWithUs data={partnerSection} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
