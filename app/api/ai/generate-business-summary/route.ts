import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { businessName, paragraph } = await req.json();

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: "You are an assistant helping to create service subscription pages.",
        },
        {
          role: "user",
          content: `Please create a polished, professional business summary based on the user's description.

Business Name: ${businessName}
Paragraph: ${paragraph}

🧠 Instructions:
- Write a concise, friendly, and professional business summary
- Keep the same key information but make it more polished and engaging
- Focus on what makes the business unique and valuable
- Use clear, compelling language that would appeal to potential customers

📦 Return only valid JSON in this format:
{
  "summary": "Polished business summary here..."
}`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "business_summary",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              summary: { type: "string" }
            },
            required: ["summary"]
          },
        },
      },
    });

    const structured = JSON.parse(response.output_text);
    return NextResponse.json({ data: structured });
  } catch (error) {
    console.error("❌ AI response error:", error);
    return NextResponse.json({ error: "Failed to generate business summary." }, { status: 500 });
  }
}