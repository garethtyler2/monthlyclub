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
          content: "You are a helpful physiotherapist assistant with expert knowledge on injury diagnosis. Given a user's physical complaint, provide a short, human-readable summary (1 line max), and the top 6 most likely injuries associated with the complaint in strict JSON format. Be specific with injury titles — always include the affected area or body part. Avoid vague terms like muscle strain or fracture by instead using precise terms like lower back muscle strain or left ankle fracture.",
        },
        {
          role: "user",
          content: `Complaint:
- Location: ${location}
- Onset: ${onsetType}
- Cause: ${cause || "Not provided"}
- Pain: ${painLevel}/10
- Strength: ${strengthLevel}/10
- Mobility: ${mobilityLevel}/10`,
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
