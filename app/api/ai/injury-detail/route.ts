import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function POST(req: Request) {
  const body = await req.json()
  const { injury } = body

  console.log("🛠 AI ROUTE - Received:", { injury })

  if (!injury?.title) {
    console.error("❌ Missing injury title:", injury)
    return NextResponse.json({ error: "Missing injury title" }, { status: 400 })
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: "You are a knowledgeable AI physiotherapy assistant. Always respond with structured JSON only — no conversational text, no explanation.",
        },
        {
          role: "user",
          content: `
Provide detailed and clinically accurate information about the injury: "${injury.title}".

The output must include:
- A clear, patient-friendly description of the injury
- A list of common symptoms
- Self-tests with instructions and interpretations
- General recovery tips

Return the information using the exact JSON schema provided.
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
