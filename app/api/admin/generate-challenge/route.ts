"use server";

import { NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";
import { Type } from "@google/genai";

export async function GET() {
  try {
    const generateChallengePrompt = `
    You're a master challenge designer for a special Steamoji Hackathon! Your goal is to create an exciting, age-appropriate (4-14 years old), and open-ended challenge that inspires creativity, problem-solving, and collaboration, all while aligning with the "Build to Solve™" philosophy.

    Our Steamoji participants are eager to use the awesome tools they're learning with, including: 3D printers, laser cutters, Micro:bits, VEX Robotics, and various coding and digital design software (like the ones they use for 3D modeling, game creation, and digital art).

    The challenge should encourage kids to:

    Identify a real-world problem or a fun, imaginative scenario that needs a creative solution.
    Design and prototype a practical solution using the Steamoji tools at their disposal. This could involve coding an interactive game, designing and 3D printing a helpful gadget, building a robot to solve a task, creating a smart device with a Micro:bit, or even designing a digital art piece that communicates a solution.
    Present their solution in a clear, engaging, and understandable way, explaining how their creation solves the problem.
    Think about how to make their solution useful and easy for others to interact with.
    Your task is to generate a challenge theme and a brief description that:

    Is captivating and sparks imagination for children in the specified age range.
    Is broad enough to allow for diverse interpretations and solutions across the various Steamoji tools and skill sets.
    Clearly outlines a core problem or scenario the kids need to address.
    Implicitly or explicitly suggests opportunities to use the specific Steamoji tools (e.g., "design a new toy" might hint at 3D printing, "create a smart device" points to Micro:bit/VEX, "code a game" suggests coding software).
    Encourages not just technical skill, but also critical thinking, problem-solving, and effective presentation.


    `;
    const generatedChallenge = await gemini.models.generateContent({
      model: `gemini-2.0-flash`,
      contents: generateChallengePrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
            },
            themeColor: {
              type: Type.STRING,
            },
            tags: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            dueDate: {
              type: Type.TYPE_UNSPECIFIED,
            },
            coinsOffered: {
              type: Type.NUMBER,
            },
            description: {
              type: Type.STRING,
            },
            reference: {
              type: Type.OBJECT,
              properties: {
                referenceDescription: {
                  type: Type.STRING,
                },
                referenceLink: {
                  type: Type.STRING,
                },
              },
            },
            imageAlt: {
              type: Type.STRING,
            },
            platform: {
              type: Type.STRING,
            },
            lockStatus: {
              type: Type.STRING,
            },
            hints: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
        },
      },
    });

    const finalResponse = generatedChallenge.text;

    console.log(finalResponse);
    return NextResponse.json(
      { message: `Challenge generated successfully !` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error retrieving challenges: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
