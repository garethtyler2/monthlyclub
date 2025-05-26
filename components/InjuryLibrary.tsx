"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

type Injury = {
  id: string
  title: string
  slug: string
}

export default function InjuryLibrary() {
  const [injuries, setInjuries] = useState<Injury[]>([])
  const [search, setSearch] = useState("")
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchInjuries = async () => {
      const { data, error } = await supabase
        .from("injuries")
        .select("id, title, slug")
        .not("details", "is", null)

      if (error) {
        console.error("❌ Failed to load injuries:", error)
      } else {
        setInjuries(data || [])
      }
    }

    fetchInjuries()
  }, [])

  const filtered = injuries.filter(injury =>
    injury.title.toLowerCase().includes(search.toLowerCase())
  )
  const injuriesToShow = showAll ? filtered : filtered.slice(0, 9)

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Injury Knowledge Library</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This library grows with every search users make. Each injury listed below has been explored through our AI system and made public for everyone to learn from.
        </p>
        <p className="text-sm text-muted-foreground italic">
          Keep exploring — the more you use it, the smarter it gets.
        </p>

        <div className="mt-6">
          <Input
            type="text"
            placeholder="Search injuries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {injuriesToShow.map(injury => (
          <Link href={`/injuries/${injury.slug}`} key={injury.id}>
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg text-brand-purple">{injury.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">View AI-generated rehab insights</p>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length > 9 && (
        <div className="text-center mt-6">
          <button
            className="text-sm text-brand-purple underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">
          No injuries found yet. Try searching something else!
        </p>
      )}
    </section>
  )
}