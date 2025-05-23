// generateInsightsPages.mjs

import fs from 'fs/promises';
import path from 'path';

// Define the structure
const structure = {
  "ai-physical-rehabilitation": [
    "what-is-ai-physical-rehabilitation",
    "ai-injury-identification",
    "personalized-rehab-plans",
    "benefits-ai-physical-therapy",
    "limitations-ai-rehabilitation",
    "success-stories-ai-rehabilitation"
  ],
  "ai-prehabilitation": [
    "what-is-ai-powered-prehabilitation",
    "how-can-ai-help-prevent-injuries",
    "prehab-exercises-tailored-by-ai",
    "is-ai-prehabilitation-effective-for-surgery-prep",
    "how-does-ai-analyze-your-prehab-needs"
  ],
  "ai-personal-training": [
    "what-is-ai-powered-personal-training",
    "how-can-ai-help-optimize-training-results",
    "examples-of-ai-personalized-workouts",
    "is-ai-effective-for-specific-fitness-goals",
    "how-does-ai-track-progress-in-training"
  ],
  "ai-physiotherapy": [
    "how-ai-transforms-physiotherapy",
    "ai-in-injury-identification",
    "ai-for-rehabilitation-exercises",
    "ai-in-prehab-and-injury-prevention",
    "personalized-ai-training-for-recovery-and-fitness",
    "online-physiotherapy",
    "virtual-vs-traditional-physio",
    "ai-physiotherapist",
    "home-physio-guide",
    "the-future-of-ai-in-physiotherapy-and-fitness",
    "virtual-physio-faq"
  ],
  "contact": [],
  "terms": [],
  "privacy": []

};

// Base directory (adjust if needed)
const baseDir = path.resolve("app/insights");

// Basic React page template
const getPageContent = (title) => `// Auto-generated page for ${title}
export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">${title.replace(/-/g, ' ')}</h1>
      <p className="text-muted-foreground">This is a placeholder page for "${title.replace(/-/g, ' ')}"</p>
    </div>
  );
}
`;

async function createPages() {
  for (const [topic, subtopics] of Object.entries(structure)) {
    const topicPath = path.join(baseDir, topic);
    await fs.mkdir(topicPath, { recursive: true });
    await fs.writeFile(
      path.join(topicPath, 'page.tsx'),
      getPageContent(topic)
    );

    for (const sub of subtopics) {
      const subPath = path.join(topicPath, sub);
      await fs.mkdir(subPath, { recursive: true });
      await fs.writeFile(
        path.join(subPath, 'page.tsx'),
        getPageContent(sub)
      );
    }
  }

  console.log("✅ Pages created in /app/insights/");
}

createPages().catch(console.error);