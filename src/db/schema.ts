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
  responses: many(responses),
}))

export const questions = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  text: text("text").notNull(),
  type: text("type").notNull(),
  order: integer("order").notNull(),
  formId: uuid("form_id").notNull(),
})

export type Question = typeof questions.$inferSelect

export const questionsRelation = relations(questions, ({ one, many }) => ({
  form: one(forms, {
    fields: [questions.formId],
    references: [forms.id],
  }),
  responses: many(responses),
}))

export const responses = pgTable("responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  text: text("text").notNull(),
  formId: uuid("form_id").notNull(),
  questionId: uuid("question_id").notNull(),
})

export const responsessRelation = relations(responses, ({ one, many }) => ({
  question: one(questions, {
    fields: [responses.questionId],
    references: [questions.id],
  }),
  form: one(forms, {
    fields: [responses.formId],
    references: [forms.id],
  }),
}))
