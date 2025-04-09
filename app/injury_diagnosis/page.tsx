"use client";
import SearchBarTemplate from "@/components/shared/SearchBarTemplate";
import SEOContent from "@/components/shared/SEOContent";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function InjuryDiagnosisSearchPage() {
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
        titleStart="AI Injury Diagnosis"
        titleHighlight="Identify Your Injury with AI Assistance"
        placeholderList={[
            'Neck ache', 'Lower back pain', 'Sore wrist', 'Pain when I sit'
        ]}
        description="Tip: You can search by body part or a symptom."
        onSearch={handleSearch}
      />
           <div className="flex justify-center my-6">
            <Button className="hero-button-primary" asChild>
                <Link href="/direct_rehab">
                Already know your injury?
                <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>


<SEOContent
  titleStart="AI-Powered Injury"
  titleHighlight="Identification Tool"
  sections={[
    {
      content:
        "Struggling with pain or discomfort? Our AI Injury Identification Tool helps you pinpoint the cause, offering tailored insights into common injuries, treatment options, self-tests, rehab exercises, and prevention tips—all in one place.",
    },
    {
      heading: "How It Works",
      content: (
        <>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Search by Body Part:</strong> Enter the area where you’re experiencing pain—like “lower back,” “shoulder,” or “knee.” Our AI-driven injury database analyzes your input and generates a list of the most common injuries for that body part.
            </li>
            <li>
              <strong>Explore Injury Insights:</strong> Select an injury from the list to access:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Injury Overview:</strong> Clear, detailed explanations of the injury, its symptoms, and potential causes.</li>
                <li><strong>Self-Diagnosis Tests:</strong> Simple, actionable tests to help confirm the injury.</li>
                <li><strong>Nutrition for Recovery:</strong> Tips on foods, supplements, and hydration strategies to support healing.</li>
                <li><strong>Treatment Advice:</strong> Initial care options, such as rest, ice, compression, or elevation (RICE).</li>
                <li><strong>Rehabilitation Exercises:</strong> Easy-to-follow stretches and strengthening exercises designed for your specific injury.</li>
                <li><strong>Injury Prevention Tips:</strong> Strategies to avoid reinjury and build long-term resilience.</li>
              </ul>
            </li>
            <li>
              <strong>AI Recommendations Tailored to You:</strong> Our tool uses artificial intelligence to deliver personalized injury suggestions and recovery plans.
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Why Use the AI Injury Identification Tool?",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Comprehensive Coverage:</strong> From injury diagnosis to treatment, rehab, and prevention, we cover everything you need to get back to feeling your best.</li>
          <li><strong>AI-Powered Accuracy:</strong> Advanced AI technology ensures reliable, up-to-date information specific to your symptoms and needs.</li>
          <li><strong>Save Time and Effort:</strong> Avoid vague internet searches and receive targeted results for your pain and discomfort.</li>
        </ul>
      ),
    },
    {
      heading: "Who Benefits From the Tool?",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Athletes:</strong> Discover common sports injuries and learn how to recover faster.</li>
          <li><strong>Everyday Users:</strong> Find insights into pain caused by daily activities like sitting, lifting, or exercising.</li>
          <li><strong>Rehabilitation Seekers:</strong> Access personalized rehab plans to help recover from injury or surgery.</li>
          <li><strong>Health-Conscious Individuals:</strong> Learn how to prevent injuries and improve mobility for the long term.</li>
        </ul>
      ),
    },
  ]}
/>

    </>
  );
}
