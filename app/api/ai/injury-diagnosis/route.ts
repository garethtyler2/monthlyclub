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
      content: "You are a helpful medical diagnostic assistant.",
    },
    {
      role: "user",
      content: `A user is reporting an issue with their body. Here is the detail:
- Location: ${location}
- Onset: ${onsetType}
- Cause: ${cause || "Not provided"}
- Pain level (1–10): ${painLevel}
- Strength level (1–10): ${strengthLevel}
- Mobility level (1–10): ${mobilityLevel}

Please return the top 5 most likely injuries that match this presentation in the following strict JSON format:

[
  {
    "title": "Injury Name",
    "description": "One or two sentences about the injury.",
    "selfTest": "A quick self-test or mention if one is not recommended."
    "summary": "A short phrase describing what and where the injury is (e.g., 'hamstring strain in the back of the thigh')."
  }
]`,
    },
  ]
  console.log("Sending messages to OpenAI:", messages)

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0,
    })

    const responseText = chat.choices[0].message.content || "[]"

    // Remove Markdown code block backticks if they exist
    const cleaned = responseText.replace(/```json|```/g, "").trim()
    
    const parsed = JSON.parse(cleaned)
    

    console.log("AI Diagnosis Response:", parsed)

    return NextResponse.json({ injuries: parsed })
  } catch (error: any) {
    console.error("AI error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
