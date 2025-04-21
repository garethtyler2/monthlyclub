import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { injury, context  } = await req.json();

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
          content: `Create a 7-day rehab plan for: "${injury}". The context of the injury is: "${context}". Include warm-up, exercises, cooldown for each day.`,
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
                    warmup: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          name: { type: "string" },
                          instructions: { type: "string" },
                          duration: { type: "string" },
                          notes: { type: "string" },
                        },
                        required: ["name", "instructions", "duration", "notes"],
                      },
                    },
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
                    cooldown: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          name: { type: "string" },
                          instructions: { type: "string" },
                          duration: { type: "string" },
                          notes: { type: "string" },
                        },
                        required: ["name", "instructions", "duration", "notes"],
                      },
                    },
                  },
                  required: ["day", "warmup", "exercises", "cooldown"],
                },
              },
            },
            required: ["weekPlan"],
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
