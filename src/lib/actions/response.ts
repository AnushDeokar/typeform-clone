"use server"

import db from "@/db/drizzle"
import { responses } from "@/db/schema"

import { getErrorMessage } from "../utils"
import { addResponseSchema, AddResponseSchema } from "../validations/response"

export const addResponses = async (input: AddResponseSchema) => {
  try {
    const result = addResponseSchema.safeParse(input)
    if (!result.success) {
      return {
        data: null,
        error: "Invalid Input Type!",
      }
    }

    const data = await db.insert(responses).values(input).returning()

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
