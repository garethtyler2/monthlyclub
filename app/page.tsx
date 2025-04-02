import Features from "@/components/Features";
import Hero from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import Metrics from "@/components/Metrics"; 
import MultiCTASection from "@/components/MultiCTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Metrics />
      <Testimonials />
      <MultiCTASection />
    </>
  );
}
