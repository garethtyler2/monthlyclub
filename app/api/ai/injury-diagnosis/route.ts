import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { location, onsetType, cause, painLevel, strengthLevel, mobilityLevel } = body;

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: `
You are a helpful physiotherapist assistant with expert knowledge on injury diagnosis.

Given a user's physical complaint, provide:
1. A short, human-readable summary of the complaint (max 1 line).
2. A list of the top 6 most likely injuries in strict JSON format.

Guidelines:
- Be specific with injury titles (e.g., “lower back muscle strain” instead of “muscle strain”).
- Exclude any personal or user-submitted details from the output (e.g., “from playing cricket”).
- Avoid laterality — do not include "left" or "right" in injury names.
- Avoid creating multiple injuries that describe the same condition slightly differently (e.g., "elbow sprain", "elbow ligament sprain", and "elbow joint sprain" should be treated as the same injury).
- If multiple possible names exist for the same condition, choose the most common, general clinical name.
- Prefer broader diagnosis names unless anatomical specificity is essential to distinguish different rehab protocols.
 
          `.trim(),
        },
        {
          role: "user",
          content: `
Complaint:
- Location: ${location}
- Onset: ${onsetType}
- Cause: ${cause || "Not provided"}
- Pain: ${painLevel}/10
- Strength: ${strengthLevel}/10
- Mobility: ${mobilityLevel}/10
          `.trim(),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "injury_suggestions",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              summaryLabel: { type: "string" },
              injuries: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    selfTest: { type: "string" },
                  },
                  required: ["title", "description", "selfTest"],
                },
              },
            },
            required: ["summaryLabel", "injuries"],
          },
        },
      },
    });

    const parsed = JSON.parse(response.output_text);

    return NextResponse.json({
      summaryLabel: parsed.summaryLabel,
      injuries: parsed.injuries,
    });
  } catch (error) {
    console.error("❌ Failed to get structured diagnosis from AI:", error);
    return NextResponse.json({ error: "Something went wrong with OpenAI" }, { status: 500 });
  }
}
