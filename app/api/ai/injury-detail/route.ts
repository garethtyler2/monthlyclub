// /app/api/ai/injury-detail/route.ts
import { OpenAI } from "openai"
import { NextResponse } from "next/server"
import type { ChatCompletionMessageParam } from "openai/resources"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const body = await req.json()
  const { injury, levels } = body

  if (!injury?.title || !injury?.context) {
    return NextResponse.json({ error: "Missing injury data" }, { status: 400 })
  }

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "You are a helpful AI physiotherapist assistant.",
    },
    {
      role: "user",
      content: `
The user has selected the following injury:

- Title: ${injury.title}
- Context: ${injury.context} (summary of their complaint)

Their pain level is ${levels.painLevel}/10,
strength level is ${levels.strengthLevel}/10,
mobility level is ${levels.mobilityLevel}/10.

Please return detailed information in this format:

{
  "title": "Injury name again",
  "detailedDescription": "Explanation of the injury, causes, anatomy",
  "symptoms": ["symptom 1", "symptom 2"],
  "selfTests": [
    {
      "name": "Test name",
      "instructions": "How to perform the test",
      "interpretation": "What the result means"
    }
  ],
  "earlyExercises": [
    {
      "name": "Exercise name",
      "instructions": "How to perform it",
      "reps": "3 sets of 10",
      "tip": "What to watch out for"
    }
  ],
  "tips": ["Helpful advice", "What to avoid"],
}
Return only valid, strict JSON.
All keys must be double-quoted.
Do not include markdown formatting, comments, or explanations.
Do not include any text before or after the JSON.

      `,
    },
  ]

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages,
      temperature: 0,
    })

    const responseText = chat.choices[0].message.content || ""
    const cleaned = responseText.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(cleaned)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("AI error:", error)
    return NextResponse.json({ error: "Failed to fetch from AI" }, { status: 500 })
  }
}
