import z from "zod"

export const renameFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required to create a workspace" })
    .max(30, { message: "Name can be of maximum 30 characters" }),
})

export type RenameFormSchema = z.infer<typeof renameFormSchema>
