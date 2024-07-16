"use server"

import db from "@/db/drizzle"
import { Question, questions } from "@/db/schema"
import { and, count, eq, gt, sql } from "drizzle-orm"

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
    if (!question) {
      return false
    }
    const { id, text, order } = question
    await db
      .update(questions)
      .set({
        text: text,
        order: order,
      })
      .where(eq(questions.id, id))
      .execute()

    return true
  } catch (err) {
    console.error("Error updating question:", err)
    throw new Error(getErrorMessage(err))
  }
}

export const deleteQuestion = async (
  question: Question
): Promise<Question[]> => {
  try {
    const { id, formId, order } = question
    await db.delete(questions).where(eq(questions.id, id)).execute()

    await db
      .update(questions)
      .set({
        order: sql`${questions.order} - 1`,
      })
      .where(and(eq(questions.formId, formId), gt(questions.order, order)))
      .execute()
    const updatedQuestions = await getQuestionByFormId(formId)
    return updatedQuestions
  } catch (err) {
    console.error("Error Deleting question:", err)
    throw new Error(getErrorMessage(err))
  }
}

export const duplicateQuestion = async (
  question: Question
): Promise<Question[]> => {
  try {
    const { id, formId, order } = question
    await db
      .update(questions)
      .set({
        order: sql`${questions.order} + 1`,
      })
      .where(and(eq(questions.formId, formId), gt(questions.order, order)))
      .execute()

    await addQuestion({
      text: question.text,
      order: order + 1,
      formId: question.formId,
      type: question.type as any,
    })

    const updatedQuestions = await getQuestionByFormId(formId)
    return updatedQuestions
  } catch (err) {
    console.error("Error Deleting question:", err)
    throw new Error(getErrorMessage(err))
  }
}
