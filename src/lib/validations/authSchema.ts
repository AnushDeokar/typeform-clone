import z from "zod"

export const signinSchema = z.object({
  email: z.string().min(1, { message: "Email is required to login!" }).email(),
  password: z.string().min(1, "Password is required!"),
})

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required!" }).email(),
})

export const changePasswordSchema = z.object({
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
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
})

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Email is required to login!" })
    .max(20, { message: "Name can be of maximum 20 characters!" }),
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
