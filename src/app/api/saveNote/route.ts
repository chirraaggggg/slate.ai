import { db } from "@/lib/db";
import { notesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { noteId, editorState } = body;

    if (!editorState || !noteId) {
      return new NextResponse("Missing editorState or noteId", { status: 400 });
    }

    const parsedNoteId = Number.parseInt(String(noteId), 10);
    if (Number.isNaN(parsedNoteId)) {
      return new NextResponse("Invalid noteId", { status: 400 });
    }

    const notes = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.id, parsedNoteId));

    if (notes.length !== 1) {
      return new NextResponse("failed to update", { status: 500 });
    }

    const note = notes[0];
    if (note.editorState !== editorState) {
      await db
        .update(notesTable)
        .set({
          editorState,
        })
        .where(eq(notesTable.id, parsedNoteId));
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
