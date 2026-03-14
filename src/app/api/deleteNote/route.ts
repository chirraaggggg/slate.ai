import { db } from "@/lib/db";
import { notesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { noteId } = await req.json();
    const parsedNoteId = Number.parseInt(String(noteId), 10);

    if (Number.isNaN(parsedNoteId)) {
      return new NextResponse("Invalid noteId", { status: 400 });
    }

    await db.delete(notesTable).where(eq(notesTable.id, parsedNoteId));
    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    console.error("Delete note error:", error);
    return new NextResponse("failed to delete", { status: 500 });
  }
}