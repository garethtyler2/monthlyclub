import Features from "@/components/Homepage/Features";
import Hero from "@/components/Homepage/HeroSection";
import Testimonials from "@/components/Homepage/Testimonials";
import Metrics from "@/components/Homepage/Metrics"; 
import MultiCTASection from "@/components/Homepage/MultiCTASection";

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
