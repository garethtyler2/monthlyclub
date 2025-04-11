import { Suspense } from "react"
import InjuryDetailContent from "./InjuryDetailContent"

export default function InjuryDetailPageWrapper() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-muted-foreground">Loading...</p>}>
      <InjuryDetailContent />
    </Suspense>
  )
}
