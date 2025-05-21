import { Suspense } from "react";
import PrehabPlanContent from "./PrehabPlanContent";

export default function PrehabResultsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading plan...</div>}>
      <PrehabPlanContent />
    </Suspense>
  );
}