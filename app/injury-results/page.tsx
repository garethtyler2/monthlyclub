"use client"

import { Suspense } from "react"
import InjuryResultsContent from "./InjuryResultsContent"

export default function InjuryResultsPage() {
  return (
    <Suspense fallback={<div>Loading injury results...</div>}>
      <InjuryResultsContent />
    </Suspense>
  )
}
