"use server"

import db from "@/db/drizzle"
import { Question, questions } from "@/db/schema"
import { eq } from "drizzle-orm"

import { getErrorMessage } from "../utils"
import { AddQuestionSchema, addQuestionSchema } from "../validations/question"

export const addQuestion = async (input: AddQuestionSchema) => {
  try {
    const result = addQuestionSchema.safeParse(input)

    if (!result.success) {
      console.log("error", result)
      return {
        data: null,
        error: "Invalid Input Type!",
      }
    }

    const data = await db
      .insert(questions)
      .values({
        ...input,
        order: 1,
      })
      .returning({ id: questions.id })

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
