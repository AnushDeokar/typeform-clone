"use server"

import db from "@/db/drizzle"
import { Question, questions } from "@/db/schema"
import { count, eq, sql } from "drizzle-orm"

import { getErrorMessage } from "../utils"
import { AddQuestionSchema, addQuestionSchema } from "../validations/question"

export const addQuestion = async (input: AddQuestionSchema) => {
  try {
    const result = addQuestionSchema.safeParse(input)

    if (!result.success) {
      return {
        data: null,
        error: "Invalid Input Type!",
      }
    }

    const [{ count: rowCount }] = await db
      .select({ count: count() })
      .from(questions)
      .where(eq(questions.formId, input.formId))

    const data = await db
      .insert(questions)
      .values({
        ...input,
        order: rowCount + 1,
      })
      .returning()

    return {
      data: data[0],
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export const getQuestionByFormId = async (
  formId: string
): Promise<Question[]> => {
  const data = await db.query.questions.findMany({
    where: eq(questions.formId, formId),
    orderBy: questions.order,
  })

  return data
}
