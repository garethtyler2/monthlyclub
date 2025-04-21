import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function POST(req: Request) {
  const body = await req.json()
  const { injury, levels } = body

  console.log("🛠 AI ROUTE - Received:", { injury, levels })

  if (!injury?.title || !injury?.context) {
    console.error("❌ Missing injury title or context:", injury)
    return NextResponse.json({ error: "Missing injury data" }, { status: 400 })
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini", // ✅ make sure this model is supported for your OpenAI plan
      input: [
        {
          role: "system",
          content: "You are a helpful AI physiotherapist assistant. Return structured JSON only.",
        },
        {
          role: "user",
          content: `
A user is experiencing "${injury.title}" in the context of "${injury.context}".
Their pain level is ${levels?.painLevel || "unknown"}/10,
strength is ${levels?.strengthLevel || "unknown"}/10,
mobility is ${levels?.mobilityLevel || "unknown"}/10.

Return injury details in structured JSON format.
          `,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "injury_detail",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              detailedDescription: { type: "string" },
              symptoms: {
                type: "array",
                items: { type: "string" },
              },
              selfTests: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    name: { type: "string" },
                    instructions: { type: "string" },
                    interpretation: { type: "string" },
                  },
                  required: ["name", "instructions", "interpretation"],
                },
              },
              earlyExercises: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    name: { type: "string" },
                    instructions: { type: "string" },
                    reps: { type: "string" },
                    tip: { type: "string" },
                  },
                  required: ["name", "instructions", "reps", "tip"],
                },
              },
              tips: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: [
              "title",
              "detailedDescription",
              "symptoms",
              "selfTests",
              "earlyExercises",
              "tips",
            ],
          },
        },
      },
    })

    console.log("✅ OpenAI response:", response)
    const structured = JSON.parse(response.output_text)
    return NextResponse.json(structured)

  } catch (error) {
    console.error("❌ Failed to fetch injury detail from OpenAI:", error)
    return NextResponse.json({ error: "Failed to fetch from AI" }, { status: 500 })
  }
}
