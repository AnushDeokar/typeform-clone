import db from "@/db/drizzle"
import { questions } from "@/db/schema"

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
    const data = await db
      .insert(questions)
      .values({
        ...input,
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
