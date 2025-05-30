import Features from "@/components/Homepage/Features";
import Hero from "@/components/Homepage/HeroSection";
import Testimonials from "@/components/Homepage/Testimonials";
import Metrics from "@/components/Homepage/Metrics"; 
import MultiCTASection from "@/components/Homepage/MultiCTASection";
import CommunityFeature from "@/components/Homepage/CommunityFeature";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <CommunityFeature />
      <Metrics />
      <Testimonials />
      <MultiCTASection />
    </>
  );
}
