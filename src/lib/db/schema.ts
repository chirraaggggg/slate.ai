// here we define the database schema and tables 

import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const $notes = pgTable("users", {
  id: serial().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  imageUrl: text('image_url'),
  userId: text('user_id').notNull().unique(),
  editorState: text('editor_state'),
});

export type NoteType = typeof $notes.$inferInsert;