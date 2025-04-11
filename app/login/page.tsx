import { Suspense } from "react"
import LoginPageContent from "./LoginPageContent"

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-muted-foreground">Loading login...</p>}>
      <LoginPageContent />
    </Suspense>
  )
}
