"use client";
import { Suspense } from "react";
import RehabPlanContent from "./RehabPlanContent";

export const dynamic = "force-dynamic";

export default function RehabPlanExercisesPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RehabPlanContent />
    </Suspense>
  );
}
