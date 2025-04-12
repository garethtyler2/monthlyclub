"use client";
import SearchBarTemplate from "@/components/shared/SearchBarTemplate";
import SEOContent from "@/components/shared/SEOContent";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react"

export default function DirectRehabSearchPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const handleSearch = (query: string) => {
    toast({
      title: "Searching for body part",
      description: `You entered: "${query}"`,
    });
    console.log("Searching for:", query);
    // You can also add routing logic here later
  };

  return (
    <>
      <SearchBarTemplate
        titleStart="Injury Rehab"
        titleHighlight="Quickly Access Rehab Information"
        placeholderList={[
            'Herniated Disc', 'Shoulder Surgery', 'Carpel Tunnel Syndrome', 'Ankle Sprain', 'Sciatica'
        ]}
        description="Tip: Use a specific injury for targeted rehab guidance."
        onSearch={handleSearch}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        cta={(
            <Button className="hero-button-primary" asChild>
              <Link href="/injury-diagnosis">
              Don't know your injury?
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        )}
      />


        <SEOContent
  titleStart="AI-Powered"
  titleHighlight="Rehabilitation Plans"
  sections={[
    {
      content:
        "Already know your injury? Our AI Injury Rehab Tool allows you to quickly access personalized rehab plans tailored to your specific condition. Skip the guesswork and start your recovery journey today with evidence-based guidance powered by artificial intelligence.",
    },
    {
      heading: "What You’ll Get",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Rehab Exercises:</strong> A structured program with stretches and strengthening exercises customized for your injury.</li>
          <li><strong>Treatment Tips:</strong> Advice on managing pain, reducing inflammation, and safely progressing through recovery.</li>
          <li><strong>Nutrition Guidance:</strong> Tips on foods and supplements that support healing and muscle repair.</li>
          <li><strong>Prevention Strategies:</strong> Long-term solutions to avoid reinjury and maintain optimal physical health.</li>
        </ul>
      ),
    },
    {
      heading: "Why Use the AI Rehab Tool?",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Fast and Direct:</strong> Enter your injury and get immediate rehab recommendations.</li>
          <li><strong>AI-Driven Accuracy:</strong> Reliable, up-to-date rehab programs based on clinical research and best practices.</li>
          <li><strong>Comprehensive Plans:</strong> Everything you need, from exercises to recovery tips, in one place.</li>
          <li><strong>Designed for Everyone:</strong> Whether you're an athlete, recovering from surgery, or addressing daily aches, our tool adapts to your needs.</li>
        </ul>
      ),
    },
    {
      heading: "Who Benefits From the Tool?",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Athletes:</strong> Find sport-specific rehab plans to safely return to peak performance.</li>
          <li><strong>Injury Recovery Patients:</strong> Get personalized rehab guidance for post-injury or post-surgery recovery.</li>
          <li><strong>Everyday Users:</strong> Address pain from repetitive strain, poor posture, or sudden injuries.</li>
          <li><strong>Health-Conscious Individuals:</strong> Strengthen your body and prevent injuries with tailored recommendations.</li>
        </ul>
      ),
    },
  ]}
/>


    </>
  );
}
