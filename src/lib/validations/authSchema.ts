import z from "zod"

export const signinSchema = z.object({
  email: z.string().min(1, { message: "Email is required to login!" }).email(),
  password: z.string().min(1, "Password is required!"),
})

export const registerUserSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string(),
    email: z.string().email(),
    phone: z.string().transform((data) => Number(data)),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
    avatar: z.string().optional(),
    isVerified: z.boolean().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      })
    }
  })
