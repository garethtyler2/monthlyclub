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
          content: `Create a personalized 7-day rehab plan for a patient with the following:

- Injury: ${injury}
- Context: ${context}

Only include a structured week plan of exercises (no warm-ups or cooldowns inside each day). Also return two short advice statements — one for how to warm up before workouts, and one for how to cool down after workouts. Each statement should be no more than 2 sentences, and written in a friendly, helpful tone.

Respond strictly in JSON using the schema.`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "rehab_plan",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              weekPlan: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    day: { type: "string" },
                    exercises: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          name: { type: "string" },
                          instructions: { type: "string" },
                          reps: { type: "string" },
                          sets: { type: "string" },
                          notes: { type: "string" },
                        },
                        required: ["name", "instructions", "reps", "sets", "notes"],
                      },
                    },
                  },
                  required: ["day", "exercises"],
                },
              },
              warmupAdvice: { type: "string" },
              cooldownAdvice: { type: "string" },
            },
            required: ["weekPlan", "warmupAdvice", "cooldownAdvice"],
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
