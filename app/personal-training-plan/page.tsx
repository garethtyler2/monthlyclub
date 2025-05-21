import { Suspense } from "react";
import PersonalTrainingPlan from "./PersonalTrainingPlan";

export default function PrehabResultsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading plan...</div>}>
      <PersonalTrainingPlan />
    </Suspense>
  );
}