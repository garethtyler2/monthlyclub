
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { injury } = await req.json();

  const prompt = `
You are a rehabilitation expert. Based on the injury provided, return the top 6 most recommended rehab exercises. 
Respond with JSON in the following format:
{
  "exercises": [
    {
      "name": "Exercise Name",
      "description": "Brief description",
      "reps": "Reps or duration"
    }
  ]
}
Injury: ${injury}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  const response = completion.choices[0]?.message?.content;
  console.log("🧠 RAW AI RESPONSE:\n", response);
  // Remove markdown formatting if it's included
  const cleanedResponse = response?.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(cleanedResponse ?? "{}");
    return NextResponse.json({ data: parsed });
  } catch (err) {
    console.error("Failed to parse JSON from OpenAI:", err);
    console.error("Response was:", cleanedResponse);
    return NextResponse.json({ error: "Invalid response format from OpenAI" }, { status: 500 });
  }
}
