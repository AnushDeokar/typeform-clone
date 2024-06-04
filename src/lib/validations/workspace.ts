import z from "zod"

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required to create a workspace" })
    .max(15, { message: "Name can be of maximum 15 characters" }),
})
