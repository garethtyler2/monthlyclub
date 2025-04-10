"use client"

import { useState } from "react"
import SearchBarTemplate from "@/components/shared/SearchBarTemplate"
import SEOContent from "@/components/shared/SEOContent"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { RadioCard } from "@/components/ui/radio-card"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { LoadingOverlay } from "@/components/ui/loading-overlay"



export default function InjuryDiagnosisSearchPage() {
  const [pain, setPain] = useState(5)
  const [strength, setStrength] = useState(5)
  const [mobility, setMobility] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState("");


  const handleSearch = (query: string) => {
    toast({
      title: "Searching for body part",
      description: `You entered: "${query}"`,
    })
    console.log("Searching for:", query)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const form = e.currentTarget
    const onsetType = (form.elements.namedItem("onset_type") as RadioNodeList)?.value
    const cause = (form.elements.namedItem("injury_cause") as HTMLTextAreaElement)?.value
  
    const payload = {
      location,
      onsetType,
      cause,
      painLevel: pain,
      strengthLevel: strength,
      mobilityLevel: mobility,
    }
  
    console.log("Submitting to AI:", payload)

    setIsLoading(true)

    try {
      const res = await fetch("/api/ai/injury-diagnosis", {
        method: "POST",
        body: JSON.stringify(payload),
      })
  
      const data = await res.json()

      // Save response in localStorage for next page
      localStorage.setItem("injury_results", JSON.stringify(data.injuries))
      localStorage.setItem("injury_levels", JSON.stringify({
        painLevel: pain,
        strengthLevel: strength,
        mobilityLevel: mobility
      }))
      localStorage.setItem("injury_location", location)

      
      
      // Redirect to results page
      window.location.href = "/injury_results"
      
    } catch (err) {
      console.error("Submission error:", err)
      setIsLoading(false) // fallback if error
    }
  }
  

  return (
    <>
      
      <LoadingOverlay show={isLoading} message="Diagnosing..." />


      <div className="max-w-3xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="space-y-8">
        <SearchBarTemplate
            titleStart="AI Injury Diagnosis"
            titleHighlight="Identify Your Injury with AI Assistance"
            placeholderList={["Neck ache", "Lower back pain", "Sore wrist", "Pain when I sit"]}
            description="Tip: You can search by body part or a symptom."
            searchValue={location}
            onSearchChange={setLocation}
            onSearch={(query) => setLocation(query)} // optional, for enter-key submit
            cta={(
            <Button className="hero-button-primary" asChild>
              <Link href="/direct_rehab">
                Already know your injury?
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        )}
      />
          {/* Onset type */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">How did the pain start?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-900">
              <RadioCard id="onset_sudden" name="onset_type" value="sudden" label="Suddenly" />
              <RadioCard id="onset_gradual" name="onset_type" value="gradual" label="Gradually" />
            </div>
          </div>

          {/* Cause of injury */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Did anything specific happen to cause it?</h3>
            <Textarea
              name="injury_cause"
              placeholder="e.g. I fell down the stairs, I twisted it during football..."
              className="min-h-[100px]"
            />
          </div>

          {/* Sliders */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Rate the following from 1 to 10</h3>

            <div className="space-y-2">
              <label htmlFor="pain_level" className="block font-medium">Pain Level</label>
              <Slider value={[pain]} onValueChange={(val) => setPain(val[0])} min={1} max={10} step={1} />
            </div>

            <div className="space-y-2">
              <label htmlFor="strength_level" className="block font-medium">Strength Level</label>
              <Slider value={[strength]} onValueChange={(val) => setStrength(val[0])} min={1} max={10} step={1} />
            </div>

            <div className="space-y-2">
              <label htmlFor="mobility_level" className="block font-medium">Mobility Level</label>
              <Slider value={[mobility]} onValueChange={(val) => setMobility(val[0])} min={1} max={10} step={1} />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4 hero-button-primary">Submit</Button>
        </form>
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
  )
}
