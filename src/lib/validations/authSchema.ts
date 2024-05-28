import z from "zod"

export const signinSchema = z.object({
  email: z.string().min(1, { message: "Email is required to login!" }).email(),
  password: z.string().min(1, "Password is required!"),
})

export const signupSchema = z.object({
  email: z.string().min(1, { message: "Email is required to login!" }).email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least one special character",
    })
    .regex(/(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    }),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})
