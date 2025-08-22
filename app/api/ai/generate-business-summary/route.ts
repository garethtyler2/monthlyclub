import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  let businessName: string;
  let paragraph: string;

  try {
    const body = await req.json();
    businessName = body.businessName;
    paragraph = body.paragraph;
  } catch (error) {
    console.error("❌ Invalid JSON in request:", error);
    return NextResponse.json({ error: "Invalid JSON in request body." }, { status: 400 });
  }

  // Validate required fields
  if (!businessName || !paragraph) {
    return NextResponse.json({ 
      error: "Missing required fields: businessName and paragraph are required." 
    }, { status: 400 });
  }

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
          content: `Please summarize the business below and extract up to 3 subscription products from the user's paragraph.

Business Name: ${businessName}
Paragraph: ${paragraph}

🧠 Instructions:
- Write a concise, friendly business summary.
- Extract up to 3 products.
- Each product should include:
  - A short, clear name (e.g., "Weekly Cleaning")
  - A 1–2 sentence description
  - A monthly price (number only, no currency)

📦 Return only valid JSON in this format:
{
  "summary": "Business summary here...",
  "products": [
    {
      "name": "Option 1",
      "description": "Description...",
      "price": 25
    }
  ]
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
              summary: { type: "string" },
              products: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number" }
                  },
                  required: ["name", "description", "price"]
                }
              }
            },
            required: ["summary", "products"]
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