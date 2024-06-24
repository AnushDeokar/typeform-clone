import z from "zod"

import { FIELD_TYPES } from "@/components/fields"

export const addQuestionSchema = z.object({
  text: z.string(),
  type: z.enum(FIELD_TYPES),
  order: z.number().positive().optional(),
  formId: z.string(),
})

export type AddQuestionSchema = z.infer<typeof addQuestionSchema>
