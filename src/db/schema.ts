import {  pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";


export const workspace = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  userId: varchar("user_id", { length: 36 }).notNull(), // uuid v4
})