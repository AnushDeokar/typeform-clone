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

export const updateQuestionById = async (
  question: Question | null
): Promise<boolean> => {
  try {
    // Extract the properties needed for update
    if (!question) {
      return false
    }
    const { id, text, order } = question
    console.log("question", question)
    await db
      .update(questions)
      .set({
        text: text,
        order: order,
      })
      .where(eq(questions.id, id))
      .execute()

    return true // Return true if update was successful
  } catch (err) {
    console.error("Error updating question:", err)
    throw new Error(getErrorMessage(err))
  }
}
