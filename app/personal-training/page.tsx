import PersonalTrainingForm from "./PersonalTrainingForm";
import SEOContent from "@/components//shared/SEOContent";

export default function PersonalTrainingPage() {
  return (
    <>
      <PersonalTrainingForm />

        <SEOContent
  titleStart="What Is"
  titleHighlight="AI-Powered Personal Training?"
  sections={[
    {
      content:
        "AI-Powered Personal Training revolutionizes fitness by delivering tailored workout plans and real-time progress tracking. Whether you're looking to lose weight, gain muscle, or improve endurance, AI adapts to your goals and fitness level to create a plan that's just right for you.",
    },
    {
      content:
        "In this guide, we'll explore the key benefits of AI in personal training, how it works, and why it's a game-changer in achieving fitness goals.",
    },
    {
      heading: "Why Choose AI-Powered Personal Training?",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personalized Workouts:</strong> AI tailors exercise routines to your current fitness level, goals, and preferences, ensuring every workout is effective and engaging.</li>
          <li><strong>Real-Time Feedback:</strong> Unlike static plans, AI adjusts your workouts based on your performance, helping you stay on track and avoid plateaus.</li>
          <li><strong>Goal Optimization:</strong> Whether you aim to lose weight, build muscle, or improve endurance, AI crafts a path to help you achieve it efficiently.</li>
          <li><strong>Progress Tracking:</strong> AI monitors your journey, highlighting milestones and providing actionable insights to keep you motivated.</li>
        </ul>
      ),
    },
    {
      heading: "Who Can Benefit from AI-Powered Personal Training?",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Beginners:</strong> Start your fitness journey with guidance tailored to your abilities, making it easier to build confidence and create sustainable habits.</li>
          <li><strong>Experienced Athletes:</strong> Take your training to the next level with insights that identify weak points, optimize performance, and prevent overtraining.</li>
          <li><strong>Time-Crunched Individuals:</strong> Maximize your workouts with efficient plans that deliver results in less time.</li>
          <li><strong>Rehabilitation and Recovery:</strong> Use AI to transition from rehab to regular training, focusing on safe and effective exercises.</li>
        </ul>
      ),
    },
    {
      heading: "Why Start Your AI-Powered Fitness Journey Today?",
      content:
        "AI-Powered Personal Training isn’t just a trend—it’s the future of fitness. With personalized plans, progress tracking, and real-time adjustments, you can achieve your goals faster and more effectively than ever before. Ready to take the first step? Explore our tailored search now and start your journey to a healthier, stronger you!",
    },
  ]}
/>


    </>
  );
}
