// here we define the database schema and tables 

import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  id: serial().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  imageUrl: text('image_url'),
  userId: text('user_id').notNull(),
  editorState: text('editor_state'),
});

export type NoteType = typeof notesTable.$inferInsert;