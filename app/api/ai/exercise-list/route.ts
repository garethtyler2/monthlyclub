import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { injury, context } = await req.json();

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: "You are a certified physical therapist and rehabilitation expert.",
        },
        {
          role: "user",
          content: `You're a highly specialized physical therapist with deep expertise in injury rehab.

Please provide a JSON-formatted response that includes the top 10 most useful rehabilitation exercises for the injury below:

- Injury: ${injury}
- Context: ${context}

🏷️ **Naming Rules**:
- Use the **base, singular form** (e.g., "Push Up", "Glute Bridge")
- ❌ Do NOT include gerunds, plural forms, or modifiers: "Push Ups", "Bridging", "Bird Dog Hold", "Push Up Variation"
- ❌ Avoid all variations or modifiers like "Banded", "Weighted", "Wall", or "Isometric"
- ❌ Do NOT use suffixes like "Hold", "Stretch", or "Against Wall"
- ✅ If multiple versions of the same exercise exist, use the most **standardized, canonical** name
- ✅ Keep names consistent across requests to ensure deduplication

📦 **Formatting Requirements**:
- Return exercises in order of usefulness (most essential first)
- Include sets, reps, instructions, and a short clinical note on why each is important
- Return exactly 10 exercises, unless fewer are truly appropriate

Do not include warm-ups, cooldowns, or general advice.

Return only the list of exercises in structured JSON using the provided schema.`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "top_exercises",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              topExercises: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    name: { type: "string" },
                    instructions: { type: "string" },
                    reps: { type: "string" },
                    sets: { type: "string" },
                    note: { type: "string" }
                  },
                  required: ["name", "instructions", "reps", "sets", "note"]
                }
              }
            },
            required: ["topExercises"]
          },
        },
      },
    });

    const structured = JSON.parse(response.output_text);
    return NextResponse.json({ data: structured });
  } catch (error) {
    console.error("❌ Structured output error:", error);
    return NextResponse.json({ error: "Failed to fetch rehab plan from OpenAI." }, { status: 500 });
  }
}
