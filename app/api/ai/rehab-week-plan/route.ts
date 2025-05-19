import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { injury, context, topExercises = [] } = await req.json();

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
          content: `Create a 7-day rehab plan for a patient with: "${injury}". 
The context of the injury is: "${context}". 
You must base the core of the plan on these exercises: ${topExercises.map((e: string) => `"${e}"`).join(", ")} 
DO NOT CHANGE ANY NAMES OF EXERCISES OR ADD NEW EXERCISES. 
Do not include warm-up or cooldown per day. Just list the exercises for each day, with reps, sets, instructions, and notes if needed. 
Also include a general warmupAdvice and cooldownAdvice at the top level of the plan.`,
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
