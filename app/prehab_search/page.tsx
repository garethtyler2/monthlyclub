"use client";
import SearchBarTemplate from "@/components/shared/SearchBarTemplate";
import SEOContent from "@/components/shared/SEOContent";
import { toast } from "@/hooks/use-toast";

export default function PrehabSearchPage() {
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
        titleStart="Prehab"
        titleHighlight="Build Resilience, Prevent Injuries, and Optimize Recovery"
        placeholderList={[
          "Knee Replacement",
          "ACL Reconstruction",
          "Rotator Cuff Surgery",
          "Hip Replacement",
          "Spinal Fusion",
          "Achilles Tendon Repair",
        ]}
        description="Tip: Search for specific conditions, surgeries, or goals."
        onSearch={handleSearch}
      />



      <SEOContent
        titleStart="What Is Prehab?"
        titleHighlight="A Complete Guide to Prehabilitation"
        sections={[
          {
            content:
              "Prehab (short for 'prehabilitation') is a proactive approach in physical therapy and fitness designed to prevent injuries, optimize recovery, and enhance performance. Whether you're preparing for surgery, managing a chronic condition, or improving athletic performance, prehab helps build resilience and strengthens your body before injuries happen.",
          },
          {
            heading: "Key Goals of Prehab",
            content: (
              <>
                <p>
                  The primary objectives of prehab focus on creating a stronger, more resilient body while improving movement and reducing risks of injury. Here are the main goals:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Injury Prevention:</strong> Strengthen muscles, joints, and ligaments to avoid strains, sprains, and overuse conditions.
                  </li>
                  <li>
                    <strong>Surgical Preparation:</strong> Build strength and mobility before surgery to speed up post-op recovery.
                  </li>
                  <li>
                    <strong>Performance Enhancement:</strong> Improve flexibility and coordination to push performance safely.
                  </li>
                  <li>
                    <strong>Chronic Condition Management:</strong> Help conditions like arthritis or back pain by maintaining mobility and quality of life.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: "Who Can Benefit from Prehab?",
            content: (
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Athletes:</strong> Reduce injury risk and recover safely.
                </li>
                <li>
                  <strong>Surgical Patients:</strong> Prepare better for surgery and recover faster.
                </li>
                <li>
                  <strong>Everyday Individuals:</strong> Avoid posture/work-related injuries and stay active.
                </li>
              </ul>
            ),
          },
          {
            heading: "Why Start Prehab Today?",
            content:
              "Prehab isn’t just about preventing injuries—it's about building a stronger, healthier body. Whether you're managing pain, preparing for surgery, or optimizing performance, prehab provides customized support. Start exploring now and take control of your recovery journey.",
          },
        ]}
      />
    </>
  );
}
