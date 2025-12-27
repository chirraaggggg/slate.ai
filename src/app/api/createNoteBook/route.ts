import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { notesTable } from "@/lib/db/schema";
import { generateImagePrompt, generateImage } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Note name is required" },
        { status: 400 }
      );
    }

    // Generate image prompt using Gemini
    const imagePrompt = await generateImagePrompt(name);
    
    // Generate image using Pixabay
    const imageUrl = await generateImage(imagePrompt);

    // Create note in database
    const note = await db
      .insert(notesTable)
      .values({
        name: name.trim(),
        userId,
        imageUrl: imageUrl || null,
      })
      .returning();

    return NextResponse.json(
      { success: true, note: note[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating notebook:", error);
    return NextResponse.json(
      { error: "Failed to create notebook" },
      { status: 500 }
    );
  }
}
