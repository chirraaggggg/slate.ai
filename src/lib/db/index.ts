// contains the drizzle configuration to initalize the database connection

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true; // it doesnt make new connections every time we reload the page

if(!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);
