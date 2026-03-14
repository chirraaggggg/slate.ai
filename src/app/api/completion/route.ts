import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const completionSystemPrompt = `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences.
The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
AI is a well-behaved and well-mannered individual.
AI is always friendly, kind, and inspiring, and is eager to provide vivid and thoughtful responses to the user.`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey =
      process.env.GEMINI_API_KEY ?? process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const completionPrompt = `${completionSystemPrompt}\n\nUser context:\nI am writing a piece of text in a notion text editor app.\nHelp me complete my train of thought here: ##${prompt}##\nKeep the tone of the text consistent with the rest of the text.\nKeep the response short and sweet.`;

    const result = await model.generateContent(completionPrompt);
    const completionText = result.response.text();

    return new Response(completionText, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Completion API error:", error);
    return NextResponse.json(
      { error: "Failed to generate completion" },
      { status: 500 }
    );
  }
}