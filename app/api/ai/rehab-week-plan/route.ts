import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { injury } = await req.json();

  const prompt = `
You are a certified physical therapist and rehabilitation expert. Create a detailed 1-week rehabilitation workout program for the following injury: "${injury}". 

Include:
- Day-by-day breakdown (Day 1 through Day 7)
- Each day's exercises, with name, instructions, reps or duration, and any important notes or precautions.
- Include warm-up, main rehab exercises, and cooldown/stretching where relevant.

Respond in this JSON format:
{
  "weekPlan": [
    {
      "day": "Day 1",
      "warmup": [...],
      "exercises": [...],
      "cooldown": [...]
    },
    ...
  ]
}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const response = completion.choices[0]?.message?.content;
  console.log("🧠 RAW AI RESPONSE:\n", response);
  const cleaned = response?.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned ?? "{}");
    return NextResponse.json({ data: parsed });
  } catch (err) {
    console.error("Failed to parse JSON from OpenAI:", err);
    return NextResponse.json({ error: "Invalid JSON from OpenAI" }, { status: 500 });
  }
}
