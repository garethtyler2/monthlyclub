"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CompletionPage() {
  // supabase is already created in the import, so no need to call a function
  const [slug, setSlug] = useState("")
  const [copied, setCopied] = useState(false)

  const baseUrl = "https://www.monthlyclubhq.com/businesses"

  useEffect(() => {
    const fetchBusinessSlug = async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()

      if (userError || !user) return

      const { data, error } = await supabase
        .from("businesses")
        .select("slug")
        .eq("user_id", user.id)
        .single()

      if (error || !data?.slug) return

      setSlug(data.slug)
    }

    fetchBusinessSlug()
  }, [])

  const fullUrl = `${baseUrl}/${slug}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 md:py-32 text-center px-4">
      <div className="max-w-2xl mx-auto bg-white/5 rounded-lg p-8 border border-gray-200 shadow-md">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">You're all set up!</h1>
        <p className="text-gray-300 mb-6">
          Your business is now ready to start accepting subscribers. You can visit your dashboard to manage everything or share your unique link below.
        </p>
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
         <code className="bg-gray-700 text-white px-4 py-2 rounded text-sm max-w-full overflow-x-auto whitespace-nowrap block">
            {fullUrl}
            </code>
          <Button onClick={handleCopy} className="hero-button-primary">
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
        <Button onClick={() => window.location.href = "/dashboard"} variant="outline">
          Go to Dashboard
        </Button>
      </div>
    </section>
  )
}

