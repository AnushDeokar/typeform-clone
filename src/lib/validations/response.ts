import z from "zod"

export const addResponseSchema = z.array(
  z.object({
    text: z.string(),
    questionId: z.string(),
    formId: z.string(),
  })
)

export type AddResponseSchema = z.infer<typeof addResponseSchema>
