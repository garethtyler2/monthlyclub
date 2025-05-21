import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST route to generate a personal training exercise plan
export async function POST(req: Request) {
  const body = await req.json();
  console.log("📥 Incoming user input:", body);

  const {
    trainingGoal,
    hasInjury,
    timeframe,
    location,
    equipment,
    focusArea,
    trainingStyle,
    fitnessLevel,
    activityLevel,
    workoutDuration,
  } = body;

  const userPrompt = `
A user is requesting a personalized training plan. Here are the details they provided:

- Goal: ${trainingGoal}
- Focus area: ${focusArea}
- Training style: ${trainingStyle}
- Fitness level: ${fitnessLevel}
- Activity level: ${activityLevel}
- Workout duration: ${workoutDuration}
- Injury considerations: ${hasInjury}
- Timeframe: ${timeframe}
- Preferred training location: ${location}
- Available equipment: ${equipment?.join(", ") || "Not specified"}

Please generate a structured weekly plan in JSON format like this:

{
  "title": "Short, clear title of the program",
  "summary": "Brief explanation of the plan and its purpose",
  "exercises": [
    {
      "day": "Day 1",
      "name": "Workout Title",
      "exercises": [
        {
          "name": "Exercise name",
          "sets": "3",
          "reps": "12",
          "instructions": "Instruction or modifier"
        }
      ]
    }
  ]
}
`.trim();

  console.log("🧠 Prompt sent to OpenAI:\n", userPrompt);

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: `You are a certified personal trainer helping users build customized training plans.`,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "personal_training_plan",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              summary: { type: "string" },
              exercises: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    day: { type: "string" },
                    name: { type: "string" },
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
                        },
                        required: ["name", "sets", "reps", "instructions"],
                      },
                    },
                  },
                  required: ["day", "name", "exercises"],
                },
              },
            },
            required: ["title", "summary", "exercises"],
          },
        },
      },
    });

    const structured = JSON.parse(response.output_text);
    return NextResponse.json({ data: structured });

  } catch (error) {
    console.error("❌ Failed to generate personal training plan:", error);
    return NextResponse.json(
      { error: "Something went wrong with OpenAI" },
      { status: 500 }
    );
  }
}