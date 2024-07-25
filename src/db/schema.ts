import { relations } from "drizzle-orm"
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export type Workspace = typeof workspaces.$inferSelect

export const workspaceRelation = relations(workspaces, ({ many }) => ({
  forms: many(forms),
}))
export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  isPublished: boolean("is_published").default(false),
  workspaceId: uuid("workspace_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Form = typeof forms.$inferSelect

export const formsRelation = relations(forms, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [forms.workspaceId],
    references: [workspaces.id],
  }),
  questions: many(questions),
}))

export const questions = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  text: text("text").notNull(),
  type: text("type").notNull(),
  order: integer("order").notNull(),
  formId: uuid("form_id").notNull(),
})

export type Question = typeof questions.$inferSelect

export const questionsRelation = relations(questions, ({ one }) => ({
  form: one(forms, {
    fields: [questions.formId],
    references: [forms.id],
  }),
}))
