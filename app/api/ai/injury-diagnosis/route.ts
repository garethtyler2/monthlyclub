import { NextResponse } from "next/server"
import { OpenAI } from "openai"
import type { ChatCompletionMessageParam } from "openai/resources"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { location, onsetType, cause, painLevel, strengthLevel, mobilityLevel } = body

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "You are a helpful medical assistant. Given the user's complaint, create:\n1. A short, human-readable summary (1 line max).\n2. A list of 5 likely injuries matching this case. Format response as JSON with `summaryLabel` and `injuries[]`.",
    },
    {
      role: "user",
      content: `Complaint info:
- Location: ${location}
- Onset: ${onsetType}
- Cause: ${cause || "Not provided"}
- Pain level: ${painLevel}
- Strength level: ${strengthLevel}
- Mobility level: ${mobilityLevel}

Please return the top 5 most likely injuries that match this presentation in the following strict JSON format:

[
  {
    "title": "Injury Name",
    "description": "One or two sentences about the injury.",
    "selfTest": "A quick self-test or mention if one is not recommended."
  }
]`,
    },
  ]

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0,
    })

    const responseText = chat.choices[0].message.content || "{}"
    const cleaned = responseText.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(cleaned)

    return NextResponse.json({
      summaryLabel: parsed.summaryLabel,
      injuries: parsed.injuries,
    })
  } catch (error: any) {
    console.error("AI error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
