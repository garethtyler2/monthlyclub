import { Suspense } from "react";
import StepThree from "./StepThree";

export default function ConfirmBusinessPageWrapper() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <StepThree />
    </Suspense>
  );
}