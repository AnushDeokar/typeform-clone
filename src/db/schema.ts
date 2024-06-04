import { relations } from "drizzle-orm"
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core"

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  userId: varchar("user_id", { length: 36 }).notNull(),
})

export const workspaceRelation = relations(workspaces, ({ many }) => ({
  forms: many(forms),
}))
export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  workspaceId: uuid("workspace_id").notNull(),
})

export const formsRelation = relations(forms, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [forms.workspaceId],
    references: [workspaces.id],
  }),
}))
