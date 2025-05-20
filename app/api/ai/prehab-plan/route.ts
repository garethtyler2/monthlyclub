import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST route to generate a prehabilitation exercise plan
export async function POST(req: Request) {
  // Parse the incoming JSON body to extract the search term
  const body = await req.json();
  const { search } = body;

  try {
    // Call the OpenAI responses.create API with a system message defining the assistant role
    // and a user message requesting a structured JSON plan
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: `You are a highly qualified physiotherapist.`.trim(),
        },
        {
          role: "user",
          content: `A user has asked for a prehabilitation plan for the following area or concern: "${search}". Please provide a structured list of exercises to help them reduce injury risk and build resilience.

Return the response in JSON format like this:
{
  "summary": "Short summary of focus and goals",
  "exercises": [
    {
      "name": "Exercise Name",
      "sets": "3",
      "reps": "10",
      "instructions": "Clear, simple instructions.",
      "note": "Why this is included in prehab."
    }
  ]
}`.trim(),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "prehab_plan",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              summary: { type: "string" },
              exercises: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    name: { type: "string" },
                    sets: { type: "string" },
                    reps: { type: "string" },
                    instructions: { type: "string" },
                    note: { type: "string" },
                  },
                  required: ["name", "sets", "reps", "instructions", "note"],
                },
              },
            },
            required: ["summary", "exercises"],
          },
        },
      },
    });

    const structured = JSON.parse(response.output_text);
    return NextResponse.json({ data: structured });
    
  } catch (error) {
    // Log the error and return a 500 response
    console.error("❌ Failed to generate prehabilitation plan:", error);
    return NextResponse.json(
      { error: "Something went wrong with OpenAI" },
      { status: 500 }
    );
  }
}
