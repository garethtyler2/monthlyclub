// app/api/generateRehabPlan/route.ts

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
      "reps": "Reps or duration",
      "image": "Optional (or leave blank)"
    }
  ]
}
Injury: ${injury}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const response = completion.choices[0]?.message?.content;

  return NextResponse.json({ data: JSON.parse(response ?? "{}") });
}
